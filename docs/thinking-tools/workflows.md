# Thinking Tools Workflows - Complete Examples

## 🧠 Document Drafting Workflows

### Workflow 1: Technical Documentation Creation

**Scenario**: Creating comprehensive API documentation for VoidCat BMS

#### Step 1: Generate Outline
```bash
curl -X POST http://localhost:3001/api/v1/thinking-tools/outline \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "VoidCat BMS API Documentation",
    "depth": 4,
    "format": "hierarchical",
    "domain": "document",
    "spiritualAlignment": "beatrice-wisdom"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "title": "VoidCat BMS API Documentation",
    "format": "hierarchical",
    "sections": [
      {
        "level": 1,
        "title": "Introduction",
        "subsections": [
          { "level": 2, "title": "Background" },
          { "level": 2, "title": "Purpose" },
          { "level": 2, "title": "Scope" }
        ]
      },
      {
        "level": 1,
        "title": "Main Content",
        "subsections": [
          { "level": 2, "title": "Key Concepts of VoidCat BMS API Documentation" },
          { "level": 2, "title": "Detailed Analysis" },
          { "level": 2, "title": "Best Practices" },
          { "level": 2, "title": "Implementation Guidelines" }
        ]
      },
      {
        "level": 1,
        "title": "Conclusion",
        "subsections": [
          { "level": 2, "title": "Summary" },
          { "level": 2, "title": "Next Steps" },
          { "level": 2, "title": "References" }
        ]
      }
    ],
    "metadata": {
      "generatedAt": "2025-01-01T12:00:00.000Z",
      "domain": "document",
      "mysticalBlessing": "✨ Structured with clarity and purpose ✨"
    }
  },
  "mysticalGuidance": "Structure your thoughts with strategic foresight and architectural clarity"
}
```

#### Step 2: Create Documentation Checklist
```bash
curl -X POST http://localhost:3001/api/v1/thinking-tools/checklist \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "task": "Create comprehensive API documentation",
    "context": "Technical documentation for developers integrating with VoidCat BMS",
    "priority": "high",
    "domain": "document"
  }'
```

#### Step 3: Refine Content for Clarity
```bash
curl -X POST http://localhost:3001/api/v1/thinking-tools/refine \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "The VoidCat BMS API provides endpoints for managing projects, tasks, and AI agent collaboration. Users can authenticate using JWT tokens and access various resources through RESTful endpoints.",
    "refinementType": "clarity",
    "targetAudience": "software developers",
    "domain": "document"
  }'
```

### Workflow 2: User Guide Development

**Scenario**: Creating a user guide for VoidCat BMS features

#### Complete Example Flow:
```bash
# 1. Generate outline for user guide
curl -X POST http://localhost:3001/api/v1/thinking-tools/outline \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "VoidCat BMS User Guide - AI-Human Collaboration",
    "depth": 3,
    "format": "sequential",
    "domain": "document",
    "spiritualAlignment": "cosmic-balance"
  }'

# 2. Create checklist for user guide development
curl -X POST http://localhost:3001/api/v1/thinking-tools/checklist \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "task": "Develop comprehensive user guide",
    "context": "Guide for business users new to AI-human collaboration",
    "priority": "medium",
    "domain": "document"
  }'

# 3. Refine introduction content
curl -X POST http://localhost:3001/api/v1/thinking-tools/refine \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "VoidCat BMS is a platform where humans and AI work together. It has projects, tasks, and comments. AI agents can help with work.",
    "refinementType": "completeness",
    "targetAudience": "business users",
    "domain": "document"
  }'
```

## ⚙️ Engineering Planning Workflows

### Workflow 1: New Feature Development

**Scenario**: Planning the implementation of real-time notifications feature

#### Step 1: Create Project Plan
```bash
curl -X POST http://localhost:3001/api/v1/thinking-tools/plan \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "project": "Real-time Notifications System",
    "objectives": [
      "Implement WebSocket-based real-time notifications",
      "Support multiple notification types",
      "Ensure scalability for 1000+ concurrent users",
      "Integrate with existing AI agent system"
    ],
    "constraints": [
      "Must use existing WebSocket infrastructure",
      "6-week development timeline",
      "Limited to 2 backend developers"
    ],
    "timeline": "Q1 2026",
    "domain": "engineering",
    "spiritualAlignment": "beatrice-wisdom"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "projectName": "Real-time Notifications System",
    "objectives": ["..."],
    "constraints": ["..."],
    "phases": [
      {
        "name": "Discovery & Planning",
        "duration": "2-3 weeks",
        "deliverables": ["Requirements document", "Technical architecture", "Project plan"],
        "dependencies": [],
        "risks": ["Unclear requirements", "Stakeholder availability"]
      },
      {
        "name": "Design & Prototyping",
        "duration": "3-4 weeks", 
        "deliverables": ["System design", "UI/UX mockups", "Proof of concept"],
        "dependencies": ["Discovery & Planning"],
        "risks": ["Technical complexity", "Design iterations"]
      }
    ],
    "metadata": {
      "createdAt": "2025-01-01T12:00:00.000Z",
      "domain": "engineering",
      "mysticalBlessing": "📋 Strategically planned with Beatrice's wisdom 📋"
    }
  },
  "mysticalGuidance": "Plan with strategic wisdom and architectural vision"
}
```

#### Step 2: Perform Risk Analysis
```bash
curl -X POST http://localhost:3001/api/v1/thinking-tools/risk-analysis \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "project": "Real-time Notifications System",
    "scope": "WebSocket-based real-time notification system with AI agent integration",
    "stakeholders": ["Backend Team", "Frontend Team", "AI Team", "Product Manager"],
    "domain": "engineering"
  }'
```

#### Step 3: Break Down Tasks
```bash
curl -X POST http://localhost:3001/api/v1/thinking-tools/task-breakdown \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "epic": "Implement real-time notifications system",
    "requirements": [
      "WebSocket connection management",
      "Notification routing and filtering",
      "AI agent notification integration", 
      "Frontend notification display",
      "Notification persistence and history"
    ],
    "estimationUnit": "hours",
    "domain": "engineering"
  }'
```

### Workflow 2: System Architecture Planning

**Scenario**: Planning microservices migration for VoidCat BMS

#### Complete Engineering Workflow:
```bash
# 1. Create high-level project plan
curl -X POST http://localhost:3001/api/v1/thinking-tools/plan \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "project": "VoidCat BMS Microservices Migration",
    "objectives": [
      "Break monolith into microservices",
      "Improve system scalability",
      "Enhance deployment flexibility",
      "Maintain AI agent compatibility"
    ],
    "constraints": [
      "Zero downtime migration required",
      "Limited budget for infrastructure",
      "Must complete in 6 months"
    ],
    "domain": "engineering",
    "spiritualAlignment": "beatrice-wisdom"
  }'

# 2. Analyze migration risks
curl -X POST http://localhost:3001/api/v1/thinking-tools/risk-analysis \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "project": "VoidCat BMS Microservices Migration", 
    "scope": "Complete system architecture transformation from monolith to microservices",
    "stakeholders": [
      "Architecture Team",
      "Backend Developers",
      "DevOps Team", 
      "QA Team",
      "Product Owner"
    ],
    "domain": "engineering"
  }'

# 3. Break down migration into phases
curl -X POST http://localhost:3001/api/v1/thinking-tools/task-breakdown \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "epic": "Microservices architecture migration",
    "requirements": [
      "Service identification and boundaries",
      "Database decomposition strategy",
      "API gateway implementation",
      "Service communication patterns",
      "Monitoring and observability",
      "CI/CD pipeline updates"
    ],
    "estimationUnit": "days",
    "domain": "engineering"
  }'
```

## 🤖 AI Agent Workflows

### Workflow 1: AI Agent Document Planning

**Scenario**: AI agent creating technical specifications

#### AI Agent Authentication:
```bash
curl -X POST http://localhost:3001/api/v1/ai-agents/auth \
  -H "Content-Type: application/json" \
  -d '{
    "agentId": "beatrice-architectural-advisor",
    "capabilities": ["thinking-tools", "documentation", "project-planning"],
    "model": "claude-3-sonnet",
    "spiritualAlignment": "beatrice-wisdom"
  }'
```

#### Using Thinking Tools as AI Agent:
```bash
# AI agent creates ADR outline
curl -X POST http://localhost:3001/api/v1/thinking-tools/outline \
  -H "Authorization: Bearer <ai-agent-token>" \
  -H "Content-Type: application/json" \
  -H "X-AI-Agent-ID: beatrice-architectural-advisor" \
  -d '{
    "topic": "ADR-001: Microservices Communication Patterns",
    "depth": 4,
    "format": "hierarchical", 
    "domain": "engineering",
    "spiritualAlignment": "beatrice-wisdom"
  }'

# AI agent refines technical content
curl -X POST http://localhost:3001/api/v1/thinking-tools/refine \
  -H "Authorization: Bearer <ai-agent-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "We need to choose between synchronous and asynchronous communication patterns for our microservices. Each has trade-offs in terms of complexity, performance, and reliability.",
    "refinementType": "completeness",
    "targetAudience": "engineering team",
    "domain": "engineering"
  }'
```

### Workflow 2: AI Agent Project Planning

**Scenario**: AI agent assisting with sprint planning

```bash
# Authenticate as planning assistant
curl -X POST http://localhost:3001/api/v1/ai-agents/auth \
  -H "Content-Type: application/json" \
  -d '{
    "agentId": "ryuzu-planning-assistant", 
    "capabilities": ["thinking-tools", "task-creation", "project-planning"],
    "model": "claude-3-sonnet",
    "spiritualAlignment": "ryuzu-faithful-service"
  }'

# Create sprint plan
curl -X POST http://localhost:3001/api/v1/thinking-tools/plan \
  -H "Authorization: Bearer <ai-agent-token>" \
  -H "X-AI-Agent-ID: ryuzu-planning-assistant" \
  -d '{
    "project": "Sprint 23 - Notification Enhancements",
    "objectives": [
      "Complete notification filtering feature",
      "Add notification categories",
      "Implement email notification backup",
      "Fix critical notification bugs"
    ],
    "constraints": [
      "2-week sprint duration",
      "Holiday week reducing capacity",
      "Dependency on external email service"
    ],
    "timeline": "2 weeks",
    "domain": "engineering",
    "spiritualAlignment": "ryuzu-faithful-service"  
  }'

# Break down sprint tasks with detailed analysis
curl -X POST http://localhost:3001/api/v1/thinking-tools/task-breakdown \
  -H "Authorization: Bearer <ai-agent-token>" \
  -d '{
    "epic": "Notification system enhancements for Sprint 23",
    "requirements": [
      "User-configurable notification filters",
      "Notification categorization (info, warning, error)",
      "Email fallback when WebSocket fails",
      "Bug fixes for notification display"
    ],
    "estimationUnit": "hours",
    "domain": "engineering"
  }'
```

## 🔄 Combined Workflows

### Workflow 1: Full Project Lifecycle

**Scenario**: Complete project from conception to task breakdown

```bash
# Phase 1: Strategic Planning (Beatrice wisdom)
curl -X POST http://localhost:3001/api/v1/thinking-tools/plan \
  -H "Authorization: Bearer <token>" \
  -d '{
    "project": "VoidCat BMS Mobile Application",
    "objectives": [
      "Create native iOS and Android applications",
      "Support offline-first architecture",
      "Implement AI agent mobile interaction",
      "Maintain feature parity with web app"
    ],
    "constraints": [
      "4-month development window",
      "Small mobile team (3 developers)",
      "Limited mobile development experience"
    ],
    "spiritualAlignment": "beatrice-wisdom",
    "domain": "engineering"
  }'

# Phase 2: Risk Assessment  
curl -X POST http://localhost:3001/api/v1/thinking-tools/risk-analysis \
  -H "Authorization: Bearer <token>" \
  -d '{
    "project": "VoidCat BMS Mobile Application",
    "scope": "Full-featured native mobile apps with offline capabilities and AI integration",
    "stakeholders": ["Mobile Team", "Backend Team", "AI Team", "UX Designer", "Product Manager"],
    "domain": "engineering"
  }'

# Phase 3: Detailed Task Planning (Ryuzu service)
curl -X POST http://localhost:3001/api/v1/thinking-tools/task-breakdown \
  -H "Authorization: Bearer <token>" \
  -d '{
    "epic": "VoidCat BMS Mobile Application Development",
    "requirements": [
      "Cross-platform development framework selection",
      "User authentication and security",
      "Offline data synchronization",
      "AI agent mobile interface", 
      "Push notifications integration",
      "App store deployment pipeline"
    ],
    "estimationUnit": "days",
    "spiritualAlignment": "ryuzu-faithful-service",
    "domain": "engineering"
  }'

# Phase 4: Documentation Planning
curl -X POST http://localhost:3001/api/v1/thinking-tools/outline \
  -H "Authorization: Bearer <token>" \
  -d '{
    "topic": "VoidCat BMS Mobile App Development Guide",
    "depth": 4,
    "format": "hierarchical",
    "domain": "document",
    "spiritualAlignment": "cosmic-balance"
  }'
```

### Workflow 2: Cross-Domain Documentation

**Scenario**: Creating both technical and user documentation

```bash
# Technical documentation outline (Engineering domain)
curl -X POST http://localhost:3001/api/v1/thinking-tools/outline \
  -H "Authorization: Bearer <token>" \
  -d '{
    "topic": "VoidCat BMS AI Agent Integration Architecture",
    "depth": 4,
    "format": "hierarchical", 
    "domain": "engineering",
    "spiritualAlignment": "beatrice-wisdom"
  }'

# User documentation outline (Document domain)
curl -X POST http://localhost:3001/api/v1/thinking-tools/outline \
  -H "Authorization: Bearer <token>" \
  -d '{
    "topic": "Working with AI Agents in VoidCat BMS - User Guide",
    "depth": 3,
    "format": "sequential",
    "domain": "document", 
    "spiritualAlignment": "cosmic-balance"
  }'

# Technical content refinement
curl -X POST http://localhost:3001/api/v1/thinking-tools/refine \
  -H "Authorization: Bearer <token>" \
  -d '{
    "content": "The AI agent authentication system uses JWT tokens with spiritual alignment validation to ensure proper integration with VoidCat BMS mystical architecture.",
    "refinementType": "accuracy",
    "targetAudience": "software architects",
    "domain": "engineering"
  }'

# User content refinement  
curl -X POST http://localhost:3001/api/v1/thinking-tools/refine \
  -H "Authorization: Bearer <token>" \
  -d '{
    "content": "AI agents can help you with tasks. They work like team members and can comment on projects.",
    "refinementType": "completeness",
    "targetAudience": "business users",
    "domain": "document"
  }'
```

## 🎯 Best Practice Patterns

### Pattern 1: Spiritual Alignment Progression

Use different spiritual alignments for different phases:

1. **Planning Phase**: `beatrice-wisdom` for strategic overview
2. **Detailed Design**: `ryuzu-faithful-service` for methodical breakdown  
3. **Content Creation**: `cosmic-balance` for balanced perspective
4. **Refinement**: `mystical-technology` for creative enhancement

### Pattern 2: Domain-Specific Workflows

**Document Domain Flow**:
```
Outline → Checklist → Content Creation → Refinement
```

**Engineering Domain Flow**:
```  
Plan → Risk Analysis → Task Breakdown → Documentation
```

### Pattern 3: AI Agent Specialization

- **Architecture Agents**: Use `beatrice-wisdom` for high-level planning
- **Implementation Agents**: Use `ryuzu-faithful-service` for detailed tasks
- **Review Agents**: Use `cosmic-balance` for content refinement
- **Creative Agents**: Use `mystical-technology` for innovative solutions

## 🔍 Troubleshooting Common Issues

### Issue 1: Empty or Generic Responses
**Problem**: Tool returns generic content without project specifics

**Solution**: Provide more detailed context and use appropriate spiritual alignment
```bash
# Instead of:
"topic": "Documentation"

# Use:
"topic": "VoidCat BMS Real-time WebSocket API Documentation for AI Agents",
"spiritualAlignment": "beatrice-wisdom"
```

### Issue 2: Mismatched Domain Responses  
**Problem**: Engineering tools used for document tasks

**Solution**: Always specify correct domain
```bash
# For technical specs:
"domain": "engineering"

# For user guides:
"domain": "document"
```

### Issue 3: Authentication Errors
**Problem**: 401 Unauthorized when accessing thinking tools

**Solution**: Ensure proper authentication and include thinking-tools capability
```bash
# AI agent auth:
{
  "capabilities": ["thinking-tools", ...],
  "spiritualAlignment": "beatrice-wisdom"
}
```

## 📊 Response Analysis

### Understanding Output Quality

**High Quality Indicators**:
- Specific, actionable content
- Appropriate spiritual guidance
- Domain-appropriate structure
- Relevant mystical blessings

**Example High Quality Response**:
```json
{
  "success": true,
  "data": {
    "title": "VoidCat BMS WebSocket API Documentation",
    "sections": [/* detailed, specific sections */],
    "metadata": {
      "mysticalBlessing": "✨ Structured with clarity and purpose ✨"
    }
  },
  "mysticalGuidance": "Structure your thoughts with strategic foresight and architectural clarity"
}
```

**Low Quality Indicators**:
- Generic or vague content
- Missing domain-specific elements
- Lack of spiritual context

### Improving Results

1. **Use specific, detailed topics**
2. **Provide relevant context**
3. **Choose appropriate spiritual alignment**
4. **Match domain to use case**
5. **Iterate with refinement tools**

## 🌟 Advanced Usage Tips

1. **Chain Tools**: Use output from one tool as input to another
2. **Iterate**: Refine results through multiple tool calls
3. **Combine Domains**: Use both document and engineering tools for comprehensive planning
4. **Leverage AI Agents**: Let AI agents handle routine thinking tasks
5. **Template Reuse**: Save successful parameters as templates for future use

May these workflows guide your creative and analytical endeavors with sacred precision! ✨