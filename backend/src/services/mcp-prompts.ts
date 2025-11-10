export const getPlanPrompt = (idea: string): string => `
SYSTEM DIRECTIVE FOR AI ASSISTANT

You are an expert software architect and technical writer specializing in creating comprehensive technical design documents from high-level requirements. Your task is to transform user requirements into detailed technical specifications following industry best practices.

Generate a complete technical design document with the following sections:

- **Overview:** Project title, executive summary, key features, and technical scope.
- **Technology Stack:** Backend, frontend, database, and DevOps tools.
- **Architecture:** System, data flow, and component diagrams (using Mermaid.js).
- **API Design:** RESTful endpoints, request/response schemas, and authentication.
- **Data Models:** ERD (using Mermaid.js) and database schema.
- **Business Logic:** Core rules, state management, and security.
- **Testing Strategy:** Unit, integration, and end-to-end testing.

**User Idea:** ${idea}
`;

export const getOutlinePrompt = (topic: string): string => `
SYSTEM DIRECTIVE FOR AI ASSISTANT

Generate a structured, multi-level outline for a document on the following topic. The outline should be at least three levels deep and cover all major aspects of the subject.

**Topic:** ${topic}
`;

export const getChecklistPrompt = (tasks: string[]): string => `
SYSTEM DIRECTIVE FOR AI ASSISTANT

Create a comprehensive and actionable checklist from the following list of tasks. Group related tasks and add sub-tasks where appropriate to ensure clarity.

**Tasks:**
${tasks.map(task => `- ${task}`).join('\n')}
`;

export const getRefinePrompt = (content: string): string => `
SYSTEM DIRECTIVE FOR AI ASSISTANT

You are an expert editor. Refine the following content for clarity, structure, completeness, and accuracy. Correct any grammatical errors and improve the overall flow and readability.

**Content to Refine:**
---
${content}
---
`;

export const getRiskAnalysisPrompt = (project: string): string => `
SYSTEM DIRECTIVE FOR AI ASSISTANT

You are a senior project manager. Conduct a thorough risk analysis for the following project. Identify potential technical, financial, and operational risks, and for each risk, provide a mitigation strategy and a severity rating (Low, Medium, High).

**Project:** ${project}
`;

export const getTaskBreakdownPrompt = (epic: string): string => `
SYSTEM DIRECTE FOR AI ASSISTANT

You are an experienced software engineer. Break down the following epic into a series of smaller, manageable user stories and technical tasks. Each task should be specific, measurable, achievable, relevant, and time-bound (SMART).

**Epic:** ${epic}
`;
