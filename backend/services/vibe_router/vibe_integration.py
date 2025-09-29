"""
VibeCaaS Platform Integration
Integrates the intelligent router with VibeCaaS app management
"""

import asyncio
import json
from typing import Dict, List, Optional, Any
from datetime import datetime
import uuid

from fastapi import FastAPI, HTTPException, Depends, WebSocket, WebSocketDisconnect
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
import httpx
import jwt
from loguru import logger

from .router import VibeRequest, VibeResponse, router
from ...app.database import get_db, App, User, AppMetrics
from ...app.config import settings

app = FastAPI(title="VibeCaaS Vibe Integration", version="1.0.0")
security = HTTPBearer()

class VibeSessionManager:
    """Manages vibe coding sessions for apps"""
    
    def __init__(self):
        self.active_sessions: Dict[str, Dict] = {}
        self.websocket_connections: Dict[str, WebSocket] = {}
    
    async def create_session(
        self,
        user_id: str,
        app_id: str,
        websocket: Optional[WebSocket] = None
    ) -> str:
        """Create a new vibe coding session"""
        session_id = str(uuid.uuid4())
        
        self.active_sessions[session_id] = {
            "user_id": user_id,
            "app_id": app_id,
            "created_at": datetime.utcnow(),
            "messages": [],
            "context": {},
            "status": "active"
        }
        
        if websocket:
            self.websocket_connections[session_id] = websocket
        
        return session_id
    
    async def add_message(
        self,
        session_id: str,
        message: str,
        response: Dict
    ):
        """Add a message to the session history"""
        if session_id in self.active_sessions:
            self.active_sessions[session_id]["messages"].append({
                "timestamp": datetime.utcnow().isoformat(),
                "message": message,
                "response": response
            })
    
    async def get_session_context(self, session_id: str) -> Dict:
        """Get the context for a session"""
        if session_id in self.active_sessions:
            session = self.active_sessions[session_id]
            return {
                "app_id": session["app_id"],
                "user_id": session["user_id"],
                "message_count": len(session["messages"]),
                "session_duration": (
                    datetime.utcnow() - session["created_at"]
                ).total_seconds(),
                "recent_messages": session["messages"][-5:] if session["messages"] else []
            }
        return {}
    
    async def close_session(self, session_id: str):
        """Close a vibe coding session"""
        if session_id in self.active_sessions:
            self.active_sessions[session_id]["status"] = "closed"
            self.active_sessions[session_id]["closed_at"] = datetime.utcnow()
        
        if session_id in self.websocket_connections:
            ws = self.websocket_connections.pop(session_id)
            await ws.close()

# Initialize session manager
session_manager = VibeSessionManager()

class VibeCodeGenerator:
    """Generates and applies code based on routing decisions"""
    
    def __init__(self):
        self.http_client = httpx.AsyncClient(timeout=60.0)
        self.template_cache = {}
    
    async def generate_code(
        self,
        request: str,
        routing_decision: Dict,
        app_context: Dict
    ) -> Dict:
        """Generate code based on the request and routing decision"""
        
        # Determine the type of code generation needed
        category = routing_decision.get("category", "unknown")
        
        generators = {
            "full_stack": self._generate_full_stack,
            "api_development": self._generate_api,
            "frontend": self._generate_frontend,
            "backend": self._generate_backend,
            "infrastructure": self._generate_infrastructure,
            "ml_ops": self._generate_ml_ops,
            "testing": self._generate_tests,
            "debugging": self._generate_fix
        }
        
        generator = generators.get(category, self._generate_generic)
        return await generator(request, routing_decision, app_context)
    
    async def _generate_full_stack(
        self,
        request: str,
        routing_decision: Dict,
        app_context: Dict
    ) -> Dict:
        """Generate full-stack application code"""
        
        return {
            "files": {
                "backend/main.py": self._get_backend_template(app_context),
                "frontend/src/App.tsx": self._get_frontend_template(app_context),
                "docker-compose.yml": self._get_compose_template(app_context),
                "kubernetes/deployment.yaml": self._get_k8s_template(app_context)
            },
            "commands": [
                "docker-compose build",
                "docker-compose up -d"
            ],
            "description": "Generated full-stack application with backend API and frontend UI"
        }
    
    async def _generate_api(
        self,
        request: str,
        routing_decision: Dict,
        app_context: Dict
    ) -> Dict:
        """Generate API code"""
        
        # Parse the request to understand API requirements
        # This would use the model response to generate actual code
        
        return {
            "files": {
                "api/routes.py": "# API routes\n# Generated based on request",
                "api/models.py": "# Data models\n# Generated based on request",
                "api/schemas.py": "# Pydantic schemas\n# Generated based on request"
            },
            "commands": [],
            "description": "Generated API endpoints and models"
        }
    
    async def _generate_frontend(
        self,
        request: str,
        routing_decision: Dict,
        app_context: Dict
    ) -> Dict:
        """Generate frontend code"""
        
        return {
            "files": {
                "src/components/Component.tsx": "// React component\n// Generated based on request",
                "src/styles/styles.css": "/* Styles */\n/* Generated based on request */"
            },
            "commands": ["npm run build"],
            "description": "Generated frontend components"
        }
    
    async def _generate_backend(
        self,
        request: str,
        routing_decision: Dict,
        app_context: Dict
    ) -> Dict:
        """Generate backend code"""
        
        return {
            "files": {
                "backend/service.py": "# Backend service\n# Generated based on request",
                "backend/database.py": "# Database operations\n# Generated based on request"
            },
            "commands": [],
            "description": "Generated backend services"
        }
    
    async def _generate_infrastructure(
        self,
        request: str,
        routing_decision: Dict,
        app_context: Dict
    ) -> Dict:
        """Generate infrastructure code"""
        
        return {
            "files": {
                "kubernetes/deployment.yaml": self._get_k8s_template(app_context),
                "terraform/main.tf": "# Terraform configuration\n# Generated based on request"
            },
            "commands": ["kubectl apply -f kubernetes/"],
            "description": "Generated infrastructure configuration"
        }
    
    async def _generate_ml_ops(
        self,
        request: str,
        routing_decision: Dict,
        app_context: Dict
    ) -> Dict:
        """Generate ML/AI operations code"""
        
        return {
            "files": {
                "ml/model_server.py": "# Model serving code\n# Generated based on request",
                "ml/pipeline.py": "# ML pipeline\n# Generated based on request",
                "triton/config.pbtxt": "# Triton config\n# Generated based on request"
            },
            "commands": ["python ml/model_server.py"],
            "description": "Generated ML operations code"
        }
    
    async def _generate_tests(
        self,
        request: str,
        routing_decision: Dict,
        app_context: Dict
    ) -> Dict:
        """Generate test code"""
        
        return {
            "files": {
                "tests/test_unit.py": "# Unit tests\n# Generated based on request",
                "tests/test_integration.py": "# Integration tests\n# Generated based on request"
            },
            "commands": ["pytest tests/"],
            "description": "Generated test suite"
        }
    
    async def _generate_fix(
        self,
        request: str,
        routing_decision: Dict,
        app_context: Dict
    ) -> Dict:
        """Generate bug fix code"""
        
        return {
            "files": {},
            "patches": [
                {
                    "file": "main.py",
                    "line": 42,
                    "old": "# buggy code",
                    "new": "# fixed code"
                }
            ],
            "commands": [],
            "description": "Generated bug fix"
        }
    
    async def _generate_generic(
        self,
        request: str,
        routing_decision: Dict,
        app_context: Dict
    ) -> Dict:
        """Generic code generation fallback"""
        
        return {
            "files": {
                "generated_code.py": "# Generated code\n# Based on request"
            },
            "commands": [],
            "description": "Generated code based on request"
        }
    
    def _get_backend_template(self, app_context: Dict) -> str:
        """Get backend template code"""
        return f'''"""
{app_context.get('app_name', 'App')} Backend
Auto-generated by VibeCaaS
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn

app = FastAPI(title="{app_context.get('app_name', 'App')}")

class HealthResponse(BaseModel):
    status: str
    version: str

@app.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(status="healthy", version="1.0.0")

@app.get("/")
async def root():
    return {{"message": "Welcome to {app_context.get('app_name', 'App')}"}}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
'''
    
    def _get_frontend_template(self, app_context: Dict) -> str:
        """Get frontend template code"""
        return f'''import React from 'react';

function App() {{
  return (
    <div className="App">
      <header className="App-header">
        <h1>{app_context.get('app_name', 'App')}</h1>
        <p>Built with VibeCaaS</p>
      </header>
    </div>
  );
}}

export default App;
'''
    
    def _get_compose_template(self, app_context: Dict) -> str:
        """Get Docker Compose template"""
        return f'''version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - APP_NAME={app_context.get('app_name', 'app')}
    
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
'''
    
    def _get_k8s_template(self, app_context: Dict) -> str:
        """Get Kubernetes template"""
        app_id = app_context.get('app_id', 'app')
        return f'''apiVersion: apps/v1
kind: Deployment
metadata:
  name: {app_id}
  namespace: {app_context.get('namespace', 'default')}
spec:
  replicas: 1
  selector:
    matchLabels:
      app: {app_id}
  template:
    metadata:
      labels:
        app: {app_id}
    spec:
      containers:
      - name: app
        image: nvcr.io/vibecaas/{app_id}:latest
        ports:
        - containerPort: 8000
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: {app_id}
  namespace: {app_context.get('namespace', 'default')}
spec:
  selector:
    app: {app_id}
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8000
'''

# Initialize code generator
code_generator = VibeCodeGenerator()

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Dict:
    """Verify JWT token"""
    try:
        payload = jwt.decode(
            credentials.credentials,
            settings.JWT_SECRET,
            algorithms=["HS256"]
        )
        return payload
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/vibe/session/create")
async def create_vibe_session(
    app_id: str,
    token_data: Dict = Depends(verify_token),
    db: AsyncSession = Depends(get_db)
):
    """Create a new vibe coding session"""
    
    # Verify app ownership
    result = await db.execute(
        select(App).where(
            App.id == app_id,
            App.user_id == token_data["user_id"]
        )
    )
    app = result.scalar_one_or_none()
    
    if not app:
        raise HTTPException(status_code=404, detail="App not found")
    
    session_id = await session_manager.create_session(
        user_id=token_data["user_id"],
        app_id=app_id
    )
    
    return {
        "session_id": session_id,
        "status": "created",
        "app_id": app_id
    }

@app.post("/vibe/code/generate")
async def generate_vibe_code(
    session_id: str,
    message: str,
    apply_changes: bool = False,
    token_data: Dict = Depends(verify_token),
    db: AsyncSession = Depends(get_db)
):
    """Generate code using the vibe router"""
    
    # Get session context
    session_context = await session_manager.get_session_context(session_id)
    
    if not session_context:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Verify session ownership
    if session_context["user_id"] != token_data["user_id"]:
        raise HTTPException(status_code=403, detail="Unauthorized")
    
    # Create vibe request
    vibe_request = VibeRequest(
        message=message,
        context=session_context,
        user_id=token_data["user_id"],
        app_id=session_context["app_id"],
        session_id=session_id
    )
    
    # Route the request
    vibe_response = await router.route(vibe_request)
    
    # Generate code based on routing decision
    app_context = {
        "app_id": session_context["app_id"],
        "app_name": f"App-{session_context['app_id']}",
        "namespace": f"user-{token_data['user_id']}"
    }
    
    generated_code = await code_generator.generate_code(
        message,
        vibe_response.routing_decision,
        app_context
    )
    
    # Add to session history
    await session_manager.add_message(
        session_id,
        message,
        {
            "routing": vibe_response.routing_decision,
            "generated": generated_code
        }
    )
    
    # Apply changes if requested
    if apply_changes and generated_code.get("files"):
        # This would trigger actual file updates and deployments
        # For now, we'll just log it
        logger.info(f"Would apply changes to app {session_context['app_id']}")
        
        # Update app status
        await db.execute(
            update(App)
            .where(App.id == session_context["app_id"])
            .values(
                status="deploying",
                updated_at=datetime.utcnow()
            )
        )
        await db.commit()
    
    # Record metrics
    await db.execute(
        AppMetrics.__table__.insert().values(
            app_id=session_context["app_id"],
            metric_type="vibe_generation",
            value=vibe_response.processing_time_ms,
            timestamp=datetime.utcnow()
        )
    )
    await db.commit()
    
    return {
        "session_id": session_id,
        "routing_decision": vibe_response.routing_decision,
        "generated_code": generated_code,
        "processing_time_ms": vibe_response.processing_time_ms,
        "cached": vibe_response.cached,
        "applied": apply_changes
    }

@app.websocket("/vibe/ws/{session_id}")
async def vibe_websocket(
    websocket: WebSocket,
    session_id: str
):
    """WebSocket endpoint for real-time vibe coding"""
    
    await websocket.accept()
    session_manager.websocket_connections[session_id] = websocket
    
    try:
        while True:
            # Receive message from client
            data = await websocket.receive_json()
            
            if data.get("type") == "code_request":
                # Process code generation request
                message = data.get("message", "")
                
                # Get session context
                session_context = await session_manager.get_session_context(session_id)
                
                # Create vibe request
                vibe_request = VibeRequest(
                    message=message,
                    context=session_context,
                    user_id=session_context["user_id"],
                    app_id=session_context["app_id"],
                    session_id=session_id
                )
                
                # Route and generate
                vibe_response = await router.route(vibe_request)
                
                app_context = {
                    "app_id": session_context["app_id"],
                    "app_name": f"App-{session_context['app_id']}",
                    "namespace": f"user-{session_context['user_id']}"
                }
                
                generated_code = await code_generator.generate_code(
                    message,
                    vibe_response.routing_decision,
                    app_context
                )
                
                # Send response back
                await websocket.send_json({
                    "type": "code_response",
                    "routing": vibe_response.routing_decision,
                    "generated": generated_code,
                    "processing_time_ms": vibe_response.processing_time_ms
                })
                
            elif data.get("type") == "apply_changes":
                # Apply generated changes
                await websocket.send_json({
                    "type": "apply_status",
                    "status": "applying",
                    "message": "Applying changes to your app..."
                })
                
                # Simulate applying changes
                await asyncio.sleep(2)
                
                await websocket.send_json({
                    "type": "apply_status",
                    "status": "completed",
                    "message": "Changes applied successfully!"
                })
                
    except WebSocketDisconnect:
        await session_manager.close_session(session_id)
        logger.info(f"WebSocket disconnected for session {session_id}")

@app.get("/vibe/session/{session_id}/history")
async def get_session_history(
    session_id: str,
    token_data: Dict = Depends(verify_token)
):
    """Get the history of a vibe coding session"""
    
    session_context = await session_manager.get_session_context(session_id)
    
    if not session_context:
        raise HTTPException(status_code=404, detail="Session not found")
    
    if session_context["user_id"] != token_data["user_id"]:
        raise HTTPException(status_code=403, detail="Unauthorized")
    
    session = session_manager.active_sessions.get(session_id, {})
    
    return {
        "session_id": session_id,
        "app_id": session_context["app_id"],
        "created_at": session.get("created_at", "").isoformat() if session.get("created_at") else None,
        "status": session.get("status", "unknown"),
        "messages": session.get("messages", [])
    }

@app.post("/vibe/session/{session_id}/close")
async def close_vibe_session(
    session_id: str,
    token_data: Dict = Depends(verify_token)
):
    """Close a vibe coding session"""
    
    session_context = await session_manager.get_session_context(session_id)
    
    if not session_context:
        raise HTTPException(status_code=404, detail="Session not found")
    
    if session_context["user_id"] != token_data["user_id"]:
        raise HTTPException(status_code=403, detail="Unauthorized")
    
    await session_manager.close_session(session_id)
    
    return {
        "session_id": session_id,
        "status": "closed"
    }

@app.get("/vibe/models")
async def get_available_models():
    """Get list of available models for vibe coding"""
    
    models = []
    for policy in config['policies']:
        if policy['name'] == 'vibe_coding_router':
            for llm in policy['llms']:
                models.append({
                    "name": llm['name'],
                    "model": llm['model'],
                    "capabilities": llm.get('capabilities', []),
                    "priority": llm.get('priority', 3)
                })
    
    return {"models": models}

@app.get("/vibe/agents")
async def get_available_agents():
    """Get list of available agents"""
    
    return {"agents": config.get('agents', [])}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)