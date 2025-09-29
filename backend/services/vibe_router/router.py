"""
VibeCaaS Intelligent Routing Service
Routes vibe coding requests to appropriate models and agents
"""

import asyncio
import json
import re
import time
from dataclasses import dataclass
from enum import Enum
from typing import Dict, List, Optional, Tuple, Any
from datetime import datetime, timedelta
import hashlib

import yaml
from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import httpx
from prometheus_client import Counter, Histogram, Gauge, generate_latest
from cachetools import TTLCache
import redis.asyncio as redis
from loguru import logger

# Load configuration
with open("config.yaml", "r") as f:
    config = yaml.safe_load(f)

# Initialize FastAPI app
app = FastAPI(title="VibeCaaS Router", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Redis for distributed caching
redis_client = None

# Metrics
request_counter = Counter('vibe_router_requests_total', 'Total routing requests', ['model', 'category'])
latency_histogram = Histogram('vibe_router_latency_seconds', 'Request latency', ['model'])
active_requests = Gauge('vibe_router_active_requests', 'Active requests', ['model'])
cache_hits = Counter('vibe_router_cache_hits_total', 'Cache hit count')
cache_misses = Counter('vibe_router_cache_misses_total', 'Cache miss count')

# Local cache for quick lookups
local_cache = TTLCache(
    maxsize=config['routing_strategy']['caching']['max_cache_size'],
    ttl=config['routing_strategy']['caching']['ttl_seconds']
)

class RequestCategory(Enum):
    FULL_STACK = "full_stack"
    API_DEVELOPMENT = "api_development"
    FRONTEND = "frontend"
    BACKEND = "backend"
    INFRASTRUCTURE = "infrastructure"
    ML_OPS = "ml_ops"
    TESTING = "testing"
    DEBUGGING = "debugging"
    UNKNOWN = "unknown"

class ComplexityLevel(Enum):
    SIMPLE = "simple"
    MODERATE = "moderate"
    COMPLEX = "complex"

@dataclass
class RoutingDecision:
    """Represents a routing decision for a request"""
    model_name: str
    model_config: Dict
    agents: List[str]
    category: RequestCategory
    complexity: ComplexityLevel
    confidence: float
    reasoning: str

class VibeRequest(BaseModel):
    """Incoming vibe coding request"""
    message: str
    context: Optional[Dict] = Field(default_factory=dict)
    user_id: str
    app_id: Optional[str] = None
    session_id: Optional[str] = None
    priority: int = Field(default=5, ge=1, le=10)
    metadata: Optional[Dict] = Field(default_factory=dict)

class VibeResponse(BaseModel):
    """Response from the routing service"""
    request_id: str
    routing_decision: Dict
    model_response: Optional[Dict] = None
    agents_involved: List[str]
    processing_time_ms: float
    cached: bool = False

class RequestClassifier:
    """Classifies incoming requests to determine routing"""
    
    def __init__(self, rules: List[Dict]):
        self.rules = rules
        self.pattern_cache = {}
        self._compile_patterns()
    
    def _compile_patterns(self):
        """Pre-compile regex patterns for efficiency"""
        for rule in self.rules:
            pattern = rule['pattern']
            self.pattern_cache[pattern] = re.compile(pattern, re.IGNORECASE)
    
    def classify(self, request: VibeRequest) -> Tuple[RequestCategory, List[str], List[str]]:
        """Classify request and return category, models, and agents"""
        message_lower = request.message.lower()
        
        for rule in self.rules:
            pattern = self.pattern_cache[rule['pattern']]
            if pattern.search(message_lower):
                category = RequestCategory(rule['category'])
                models = rule.get('models', [])
                agents = rule.get('agents', [])
                return category, models, agents
        
        return RequestCategory.UNKNOWN, [], []
    
    def assess_complexity(self, request: VibeRequest) -> ComplexityLevel:
        """Assess the complexity of the request"""
        message_length = len(request.message)
        word_count = len(request.message.split())
        
        # Check for complexity indicators
        complex_indicators = [
            'architecture', 'distributed', 'scalable', 'microservices',
            'optimization', 'performance', 'security', 'integration'
        ]
        moderate_indicators = [
            'api', 'database', 'authentication', 'deployment',
            'testing', 'refactor', 'migrate'
        ]
        
        message_lower = request.message.lower()
        complex_count = sum(1 for ind in complex_indicators if ind in message_lower)
        moderate_count = sum(1 for ind in moderate_indicators if ind in message_lower)
        
        # Scoring logic
        complexity_score = (
            (word_count / 50) * 0.3 +
            complex_count * 0.4 +
            moderate_count * 0.2 +
            (message_length / 500) * 0.1
        )
        
        thresholds = config['routing_strategy']['complexity_thresholds']
        if complexity_score >= thresholds['complex']:
            return ComplexityLevel.COMPLEX
        elif complexity_score >= thresholds['moderate']:
            return ComplexityLevel.MODERATE
        else:
            return ComplexityLevel.SIMPLE

class ModelSelector:
    """Selects the best model based on request characteristics"""
    
    def __init__(self, policies: List[Dict]):
        self.policies = policies
        self.model_configs = {}
        self._load_models()
    
    def _load_models(self):
        """Load model configurations"""
        for policy in self.policies:
            if policy['name'] == 'vibe_coding_router':
                for llm in policy['llms']:
                    self.model_configs[llm['name']] = llm
    
    def select_model(
        self, 
        category: RequestCategory,
        complexity: ComplexityLevel,
        preferred_models: List[str]
    ) -> Tuple[str, Dict]:
        """Select the most appropriate model"""
        
        # First try preferred models from classification
        for model_name in preferred_models:
            if model_name in self.model_configs:
                return model_name, self.model_configs[model_name]
        
        # Fallback to complexity-based selection
        if complexity == ComplexityLevel.COMPLEX:
            # Prefer high-capability models
            priority_models = [
                'FullStackDevelopment',
                'BackendDevelopment',
                'MLOpsDeployment'
            ]
        elif complexity == ComplexityLevel.MODERATE:
            priority_models = [
                'APIDesign',
                'FrontendDevelopment',
                'DataEngineering'
            ]
        else:
            priority_models = [
                'QuickFixes',
                'DockerContainerization',
                'TestGeneration'
            ]
        
        for model_name in priority_models:
            if model_name in self.model_configs:
                return model_name, self.model_configs[model_name]
        
        # Ultimate fallback
        fallback_name = 'QuickFixes'
        return fallback_name, self.model_configs.get(fallback_name, {})

class AgentOrchestrator:
    """Orchestrates multiple agents for complex requests"""
    
    def __init__(self, agent_configs: List[Dict]):
        self.agents = {agent['name']: agent for agent in agent_configs}
    
    async def orchestrate(
        self,
        request: VibeRequest,
        agents_needed: List[str],
        routing_decision: RoutingDecision
    ) -> Dict:
        """Orchestrate multiple agents to handle the request"""
        
        results = {}
        
        # Sequential orchestration for now (can be parallelized)
        for agent_name in agents_needed:
            if agent_name not in self.agents:
                continue
            
            agent = self.agents[agent_name]
            
            # Simulate agent processing (replace with actual agent calls)
            agent_result = await self._invoke_agent(
                agent,
                request,
                routing_decision,
                previous_results=results
            )
            
            results[agent_name] = agent_result
        
        return results
    
    async def _invoke_agent(
        self,
        agent: Dict,
        request: VibeRequest,
        routing_decision: RoutingDecision,
        previous_results: Dict
    ) -> Dict:
        """Invoke a specific agent"""
        
        # This would call the actual agent service
        # For now, returning a placeholder
        return {
            "agent": agent['name'],
            "type": agent['type'],
            "status": "completed",
            "output": f"Processed by {agent['name']}",
            "timestamp": datetime.utcnow().isoformat()
        }

class Router:
    """Main routing logic"""
    
    def __init__(self):
        self.classifier = RequestClassifier(config['classification_rules'])
        self.model_selector = ModelSelector(config['policies'])
        self.agent_orchestrator = AgentOrchestrator(config['agents'])
        self.http_client = httpx.AsyncClient(timeout=30.0)
    
    async def route(self, request: VibeRequest) -> VibeResponse:
        """Route the request to appropriate model and agents"""
        
        start_time = time.time()
        request_id = self._generate_request_id(request)
        
        # Check cache first
        cache_key = self._get_cache_key(request)
        cached_response = await self._check_cache(cache_key)
        if cached_response:
            cache_hits.inc()
            cached_response['cached'] = True
            return VibeResponse(**cached_response)
        
        cache_misses.inc()
        
        # Classify the request
        category, preferred_models, agents = self.classifier.classify(request)
        complexity = self.classifier.assess_complexity(request)
        
        # Select the best model
        model_name, model_config = self.model_selector.select_model(
            category, complexity, preferred_models
        )
        
        # Track metrics
        request_counter.labels(model=model_name, category=category.value).inc()
        
        # Create routing decision
        routing_decision = RoutingDecision(
            model_name=model_name,
            model_config=model_config,
            agents=agents,
            category=category,
            complexity=complexity,
            confidence=0.85,  # Placeholder confidence
            reasoning=f"Classified as {category.value} with {complexity.value} complexity"
        )
        
        # Execute with the selected model
        with latency_histogram.labels(model=model_name).time():
            with active_requests.labels(model=model_name).track_inprogress():
                model_response = await self._call_model(request, model_config)
        
        # Orchestrate agents if needed
        agent_results = {}
        if agents and complexity in [ComplexityLevel.MODERATE, ComplexityLevel.COMPLEX]:
            agent_results = await self.agent_orchestrator.orchestrate(
                request, agents, routing_decision
            )
        
        # Prepare response
        processing_time = (time.time() - start_time) * 1000
        
        response = VibeResponse(
            request_id=request_id,
            routing_decision={
                "model": model_name,
                "category": category.value,
                "complexity": complexity.value,
                "confidence": routing_decision.confidence,
                "reasoning": routing_decision.reasoning
            },
            model_response=model_response,
            agents_involved=agents,
            processing_time_ms=processing_time,
            cached=False
        )
        
        # Cache the response
        await self._cache_response(cache_key, response.dict())
        
        return response
    
    async def _call_model(self, request: VibeRequest, model_config: Dict) -> Dict:
        """Call the actual model endpoint"""
        
        try:
            # Prepare the request for the model
            model_request = {
                "model": model_config['model'],
                "messages": [
                    {"role": "user", "content": request.message}
                ],
                "temperature": 0.7,
                "max_tokens": 2048
            }
            
            # Add context if available
            if request.context:
                model_request["messages"].insert(0, {
                    "role": "system",
                    "content": f"Context: {json.dumps(request.context)}"
                })
            
            # Call the model endpoint
            headers = {
                "Authorization": f"Bearer {model_config['api_key']}",
                "Content-Type": "application/json"
            }
            
            response = await self.http_client.post(
                f"{model_config['api_base']}/v1/chat/completions",
                json=model_request,
                headers=headers
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                logger.error(f"Model call failed: {response.status_code}")
                return {"error": f"Model call failed with status {response.status_code}"}
                
        except Exception as e:
            logger.error(f"Error calling model: {str(e)}")
            return {"error": str(e)}
    
    def _generate_request_id(self, request: VibeRequest) -> str:
        """Generate unique request ID"""
        timestamp = datetime.utcnow().isoformat()
        content = f"{request.user_id}:{request.message}:{timestamp}"
        return hashlib.sha256(content.encode()).hexdigest()[:16]
    
    def _get_cache_key(self, request: VibeRequest) -> str:
        """Generate cache key for request"""
        # Include relevant fields for cache key
        key_content = f"{request.user_id}:{request.message}:{request.app_id or ''}"
        return hashlib.md5(key_content.encode()).hexdigest()
    
    async def _check_cache(self, cache_key: str) -> Optional[Dict]:
        """Check cache for existing response"""
        # First check local cache
        if cache_key in local_cache:
            return local_cache[cache_key]
        
        # Then check Redis if available
        if redis_client:
            try:
                cached = await redis_client.get(cache_key)
                if cached:
                    return json.loads(cached)
            except Exception as e:
                logger.warning(f"Redis cache check failed: {e}")
        
        return None
    
    async def _cache_response(self, cache_key: str, response: Dict):
        """Cache the response"""
        # Store in local cache
        local_cache[cache_key] = response
        
        # Store in Redis if available
        if redis_client:
            try:
                await redis_client.setex(
                    cache_key,
                    config['routing_strategy']['caching']['ttl_seconds'],
                    json.dumps(response)
                )
            except Exception as e:
                logger.warning(f"Redis cache write failed: {e}")

# Initialize router
router = Router()

@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    global redis_client
    
    # Initialize Redis connection
    try:
        redis_client = await redis.from_url(
            "redis://redis:6379",
            encoding="utf-8",
            decode_responses=True
        )
        await redis_client.ping()
        logger.info("Connected to Redis")
    except Exception as e:
        logger.warning(f"Redis connection failed: {e}")
        redis_client = None
    
    logger.info("VibeCaaS Router started")

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    if router.http_client:
        await router.http_client.aclose()
    
    if redis_client:
        await redis_client.close()
    
    logger.info("VibeCaaS Router stopped")

@app.post("/route", response_model=VibeResponse)
async def route_request(request: VibeRequest):
    """Main routing endpoint"""
    try:
        response = await router.route(request)
        return response
    except Exception as e:
        logger.error(f"Routing error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "redis": "connected" if redis_client else "disconnected"
    }

@app.get("/metrics")
async def get_metrics():
    """Prometheus metrics endpoint"""
    return generate_latest()

@app.get("/config")
async def get_config():
    """Get current routing configuration"""
    return {
        "models": list(router.model_selector.model_configs.keys()),
        "agents": list(router.agent_orchestrator.agents.keys()),
        "categories": [cat.value for cat in RequestCategory],
        "complexity_levels": [level.value for level in ComplexityLevel]
    }

@app.post("/analyze")
async def analyze_request(request: VibeRequest):
    """Analyze a request without routing (for debugging)"""
    category, preferred_models, agents = router.classifier.classify(request)
    complexity = router.classifier.assess_complexity(request)
    model_name, model_config = router.model_selector.select_model(
        category, complexity, preferred_models
    )
    
    return {
        "category": category.value,
        "complexity": complexity.value,
        "preferred_models": preferred_models,
        "selected_model": model_name,
        "agents": agents
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)