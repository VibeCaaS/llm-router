# VibeCaaS Intelligent Vibe Router

An intelligent routing service that automatically directs coding requests to the most appropriate AI models and agents based on request type, complexity, and required capabilities.

## Features

- 🧠 **Intelligent Classification**: Automatically categorizes coding requests
- 🎯 **Smart Model Selection**: Routes to the best model based on task requirements
- 🤝 **Agent Orchestration**: Coordinates multiple specialized agents for complex tasks
- ⚡ **Performance Optimized**: Caching, load balancing, and parallel processing
- 📊 **Full Observability**: Prometheus metrics and detailed logging
- 🔄 **Session Management**: Persistent coding sessions with context preservation
- 🌐 **WebSocket Support**: Real-time bidirectional communication

## Quick Start

### Local Development

1. **Install dependencies**:
```bash
pip install -r requirements.txt
```

2. **Set environment variables**:
```bash
export NVIDIA_API_KEY="your-api-key"
export DATABASE_URL="postgresql://user:pass@localhost/db"
export REDIS_URL="redis://localhost:6379"
export JWT_SECRET="your-secret"
```

3. **Run the service**:
```bash
python router.py
```

4. **Test the router**:
```bash
curl -X POST http://localhost:8001/route \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Create a REST API for user management",
    "user_id": "test-user",
    "app_id": "test-app"
  }'
```

### Docker Deployment

```bash
docker build -t vibe-router .
docker run -p 8001:8001 \
  -e NVIDIA_API_KEY=$NVIDIA_API_KEY \
  -e DATABASE_URL=$DATABASE_URL \
  -e REDIS_URL=$REDIS_URL \
  vibe-router
```

## API Endpoints

### Core Routing

- `POST /route` - Route a vibe coding request
- `GET /health` - Health check
- `GET /metrics` - Prometheus metrics
- `GET /config` - Current configuration
- `POST /analyze` - Analyze request without routing

### Session Management

- `POST /vibe/session/create` - Create coding session
- `POST /vibe/code/generate` - Generate code in session
- `GET /vibe/session/{id}/history` - Get session history
- `POST /vibe/session/{id}/close` - Close session
- `WebSocket /vibe/ws/{session_id}` - Real-time coding

### Information

- `GET /vibe/models` - List available models
- `GET /vibe/agents` - List available agents

## Configuration

The router is configured via `config.yaml`:

```yaml
policies:
  - name: "vibe_coding_router"
    llms:
      - name: FullStackDevelopment
        model: nvidia/llama-3.3-nemotron-super-49b-v1
        capabilities: ["full_app_generation"]
        priority: 1

classification_rules:
  - pattern: "create.*app|build.*application"
    category: "full_stack"
    models: ["FullStackDevelopment"]
    agents: ["project_architect", "code_generator"]

routing_strategy:
  mode: "intelligent"
  fallback_model: "mistralai/mixtral-8x22b-instruct-v0.1"
  caching:
    enabled: true
    ttl_seconds: 300
```

## Request Categories

| Category | Description | Example Requests |
|----------|-------------|------------------|
| `full_stack` | Complete application development | "Create a todo app with authentication" |
| `api_development` | REST/GraphQL API creation | "Build a REST API for user management" |
| `frontend` | UI/UX component development | "Create a React dashboard component" |
| `backend` | Server-side logic | "Implement a payment processing service" |
| `infrastructure` | Deployment and DevOps | "Create Kubernetes deployment configs" |
| `ml_ops` | ML model serving | "Deploy a model with GPU optimization" |
| `testing` | Test generation | "Write unit tests for the auth module" |
| `debugging` | Bug fixes | "Fix the memory leak in the API" |

## Model Selection Logic

1. **Classification**: Analyze request to determine category
2. **Complexity Assessment**: Evaluate request complexity (Simple/Moderate/Complex)
3. **Model Matching**: Select model based on:
   - Task category capabilities
   - Complexity requirements
   - Model priority and availability
   - Load balancing considerations

## Agent Orchestration

Agents work together for complex requests:

```python
agents = {
    "project_architect": "System design and architecture",
    "code_generator": "Implementation and features",
    "devops_engineer": "Deployment and infrastructure",
    "qa_specialist": "Testing and code review"
}
```

## Performance Optimization

### Caching Strategy

- Local in-memory cache (TTLCache)
- Redis distributed cache
- Content-based cache keys
- Configurable TTL per request type

### Load Balancing

- Weighted round-robin distribution
- Model health checks
- Automatic failover
- Request priority queuing

## Monitoring

### Metrics

- `vibe_router_requests_total` - Total requests by model/category
- `vibe_router_latency_seconds` - Request latency
- `vibe_router_active_requests` - Currently processing
- `vibe_router_cache_hits_total` - Cache effectiveness

### Logging

```python
logger.info("Request routed", extra={
    "model": model_name,
    "category": category,
    "complexity": complexity,
    "latency_ms": processing_time
})
```

## WebSocket Protocol

```javascript
// Client -> Server
{
  "type": "code_request",
  "message": "Create a user authentication system"
}

// Server -> Client
{
  "type": "code_response",
  "routing": {
    "model": "FullStackDevelopment",
    "category": "backend",
    "complexity": "moderate"
  },
  "generated": {
    "files": {...},
    "commands": [...],
    "description": "..."
  }
}
```

## Testing

```bash
# Unit tests
pytest tests/test_router.py

# Integration tests
pytest tests/test_integration.py

# Load testing
locust -f tests/loadtest.py --host http://localhost:8001
```

## Troubleshooting

### High Latency
- Check cache hit rate
- Scale up replicas
- Adjust model timeout

### Model Errors
- Verify API keys
- Check model availability
- Review rate limits

### Cache Issues
- Verify Redis connection
- Check cache size limits
- Monitor memory usage

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - See LICENSE file for details