# VibeCaaS Intelligent Vibe Router Integration Guide

## Overview

The VibeCaaS Vibe Router is an intelligent routing system that automatically directs coding requests to the most appropriate AI models and agents based on request type, complexity, and required capabilities. This system seamlessly integrates with the VibeCaaS platform to provide automated code generation, deployment, and management.

## Architecture

### Core Components

1. **Vibe Router Service** (`backend/services/vibe_router/`)
   - Intelligent request classification
   - Model selection based on task type
   - Agent orchestration for complex tasks
   - Response caching and optimization

2. **Vibe Integration Service** (`backend/services/vibe_router/vibe_integration.py`)
   - Session management for coding sessions
   - Code generation based on routing decisions
   - Real-time WebSocket support
   - Integration with VibeCaaS app management

3. **Configuration System** (`backend/services/vibe_router/config.yaml`)
   - Model endpoints and capabilities
   - Agent definitions and responsibilities
   - Classification rules and patterns
   - Routing strategies and thresholds

## Key Features

### 1. Intelligent Request Classification

The router analyzes incoming requests and classifies them into categories:

- **Full Stack Development**: Complete application generation
- **API Development**: REST/GraphQL endpoint creation
- **Frontend Development**: UI/UX component generation
- **Backend Development**: Server-side logic and services
- **Infrastructure**: Kubernetes, Docker, deployment configs
- **ML/AI Operations**: Model serving, GPU optimization
- **Testing**: Test generation and quality assurance
- **Debugging**: Bug fixes and issue resolution

### 2. Model Selection Strategy

Models are selected based on:

- **Task Category**: Matching models with specific capabilities
- **Complexity Level**: Simple, Moderate, or Complex
- **Priority Tiers**: High-priority models for critical tasks
- **Load Balancing**: Distributing requests across available models

#### Available Models

| Model | Best For | Priority |
|-------|----------|----------|
| nvidia/llama-3.3-nemotron-super-49b-v1 | Full-stack, Complex code | High |
| meta/llama-3.1-70b-instruct | API design, Architecture | High |
| mistralai/mixtral-8x22b-instruct-v0.1 | Frontend, General tasks | Medium |
| meta/llama-3.1-8b-instruct | Simple tasks, Quick fixes | Low |

### 3. Agent Orchestration

Multiple specialized agents work together for complex requests:

- **Project Architect**: System design and architecture decisions
- **Code Generator**: Implementation and feature development
- **DevOps Engineer**: Deployment and infrastructure
- **QA Specialist**: Testing and code review

### 4. Session Management

Persistent coding sessions with:
- Context preservation across requests
- Message history tracking
- Real-time WebSocket communication
- Session-based code generation

## API Endpoints

### Core Routing

```http
POST /route
```
Route a vibe coding request to the appropriate model.

**Request:**
```json
{
  "message": "Create a REST API for user management",
  "user_id": "user-123",
  "app_id": "app-456",
  "context": {}
}
```

**Response:**
```json
{
  "request_id": "req-789",
  "routing_decision": {
    "model": "APIDesign",
    "category": "api_development",
    "complexity": "moderate",
    "confidence": 0.85
  },
  "model_response": {...},
  "agents_involved": ["code_generator"],
  "processing_time_ms": 234.5
}
```

### Session Management

```http
POST /vibe/session/create
```
Create a new vibe coding session.

```http
POST /vibe/code/generate
```
Generate code within a session.

```http
WebSocket /vibe/ws/{session_id}
```
Real-time vibe coding via WebSocket.

### Information Endpoints

```http
GET /vibe/models
```
List available models and capabilities.

```http
GET /vibe/agents
```
List available agents and responsibilities.

## Integration with VibeCaaS

### 1. Add to Docker Compose

```yaml
# docker-compose.yml
services:
  vibe-router:
    build: ./backend/services/vibe_router
    ports:
      - "8001:8001"
    environment:
      - NVIDIA_API_KEY=${NVIDIA_API_KEY}
      - DATABASE_URL=postgresql://vibecaas_user:vibecaas_dev_password@postgres:5432/vibecaas
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - postgres
      - redis
    volumes:
      - ./backend/services/vibe_router/config.yaml:/app/config.yaml
```

### 2. Update Kong API Gateway

Add vibe router routes to Kong configuration:

```yaml
# kubernetes/production/kong-config.yaml
services:
  - name: vibe-router
    url: http://vibe-router:8001
    routes:
      - name: vibe-router-route
        paths:
          - /api/v1/vibe
        strip_path: true
    plugins:
      - name: jwt
      - name: rate-limiting
        config:
          minute: 100
          hour: 1000
```

### 3. Frontend Integration

```typescript
// frontend/src/lib/vibeClient.ts
import api from './api';

export class VibeClient {
  private sessionId: string | null = null;
  private ws: WebSocket | null = null;

  async createSession(appId: string): Promise<string> {
    const response = await api.post('/api/v1/vibe/session/create', { app_id: appId });
    this.sessionId = response.data.session_id;
    return this.sessionId;
  }

  async generateCode(message: string, applyChanges = false): Promise<any> {
    if (!this.sessionId) throw new Error('No active session');
    
    const response = await api.post('/api/v1/vibe/code/generate', {
      session_id: this.sessionId,
      message,
      apply_changes: applyChanges
    });
    
    return response.data;
  }

  connectWebSocket(sessionId: string, onMessage: (data: any) => void): void {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8002';
    this.ws = new WebSocket(`${wsUrl}/vibe/ws/${sessionId}`);
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };
  }

  sendMessage(message: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'code_request',
        message
      }));
    }
  }
}
```

### 4. Dashboard Component Integration

```tsx
// frontend/src/components/VibeCodeAssistant.tsx
import React, { useState, useEffect } from 'react';
import { VibeClient } from '@/lib/vibeClient';

export function VibeCodeAssistant({ appId }: { appId: string }) {
  const [client] = useState(() => new VibeClient());
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Create session on mount
    client.createSession(appId).then(setSessionId);
  }, [appId]);

  useEffect(() => {
    if (sessionId) {
      client.connectWebSocket(sessionId, (data) => {
        if (data.type === 'code_response') {
          setMessages(prev => [...prev, {
            type: 'assistant',
            content: data.generated,
            routing: data.routing
          }]);
          setLoading(false);
        }
      });
    }
  }, [sessionId]);

  const sendMessage = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    setLoading(true);
    client.sendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-2xl p-3 rounded-lg ${
              msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}>
              {msg.type === 'assistant' && msg.routing && (
                <div className="text-xs text-gray-500 mb-2">
                  Model: {msg.routing.model} | Category: {msg.routing.category}
                </div>
              )}
              <div className="whitespace-pre-wrap">{
                typeof msg.content === 'object' 
                  ? JSON.stringify(msg.content, null, 2)
                  : msg.content
              }</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="animate-pulse">Thinking...</div>
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me to code anything..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
```

## Deployment

### Local Development

1. Start the services:
```bash
docker-compose up -d vibe-router
```

2. Test the router:
```bash
curl -X POST http://localhost:8001/route \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Create a user authentication API",
    "user_id": "test-user",
    "app_id": "test-app"
  }'
```

### Production Deployment

1. Build and push the image:
```bash
docker build -t nvcr.io/vibecaas/vibe-router:latest ./backend/services/vibe_router
docker push nvcr.io/vibecaas/vibe-router:latest
```

2. Deploy to Kubernetes:
```bash
kubectl apply -f kubernetes/production/vibe-router.yaml
```

3. Verify deployment:
```bash
kubectl get pods -n vibecaas-system -l app=vibe-router
kubectl logs -n vibecaas-system -l app=vibe-router
```

## Monitoring

### Prometheus Metrics

The vibe router exposes metrics at `/metrics`:

- `vibe_router_requests_total`: Total routing requests by model and category
- `vibe_router_latency_seconds`: Request latency histogram
- `vibe_router_active_requests`: Currently active requests
- `vibe_router_cache_hits_total`: Cache hit count
- `vibe_router_cache_misses_total`: Cache miss count

### Grafana Dashboard

Import the vibe router dashboard:

```json
{
  "dashboard": {
    "title": "VibeCaaS Vibe Router",
    "panels": [
      {
        "title": "Requests by Model",
        "targets": [
          {
            "expr": "rate(vibe_router_requests_total[5m])"
          }
        ]
      },
      {
        "title": "Request Latency",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(vibe_router_latency_seconds_bucket[5m]))"
          }
        ]
      },
      {
        "title": "Cache Hit Rate",
        "targets": [
          {
            "expr": "rate(vibe_router_cache_hits_total[5m]) / (rate(vibe_router_cache_hits_total[5m]) + rate(vibe_router_cache_misses_total[5m]))"
          }
        ]
      }
    ]
  }
}
```

## Configuration Tuning

### Performance Optimization

1. **Caching**: Adjust TTL and cache size based on usage patterns
```yaml
caching:
  enabled: true
  ttl_seconds: 300  # Increase for stable requests
  max_cache_size: 1000  # Increase for higher throughput
```

2. **Load Balancing**: Configure algorithm and weights
```yaml
load_balancing:
  algorithm: "weighted_round_robin"  # or "least_connections"
  weights:
    FullStackDevelopment: 3
    QuickFixes: 1
```

3. **GPU Allocation**: Optimize for ML workloads
```yaml
gpu_allocation:
  time_slicing:
    enabled: true
    replicas_per_gpu: 4  # Adjust based on model size
```

### Model Selection Tuning

Adjust complexity thresholds based on your workload:

```yaml
complexity_thresholds:
  simple: 0.3      # Lower = more tasks classified as simple
  moderate: 0.6    # Balanced threshold
  complex: 0.9     # Higher = fewer tasks classified as complex
```

## Troubleshooting

### Common Issues

1. **Model Timeout**: Increase timeout in config
```yaml
routing_strategy:
  timeout_seconds: 60  # Increase for complex requests
```

2. **Cache Misses**: Check Redis connection
```bash
kubectl exec -it vibe-router-pod -- redis-cli ping
```

3. **High Latency**: Scale up replicas
```bash
kubectl scale deployment vibe-router --replicas=5 -n vibecaas-system
```

## Security Considerations

1. **API Key Management**: Store NVIDIA API keys securely in Kubernetes secrets
2. **Rate Limiting**: Configure appropriate limits per user/app
3. **Input Validation**: Sanitize user inputs before routing
4. **Network Policies**: Restrict egress to required endpoints only

## Future Enhancements

- [ ] Multi-model ensemble responses
- [ ] Fine-tuned models for specific domains
- [ ] A/B testing for model selection
- [ ] Automatic model performance optimization
- [ ] Integration with external code repositories
- [ ] Support for custom model endpoints
- [ ] Advanced caching strategies with embeddings
- [ ] Real-time collaboration features