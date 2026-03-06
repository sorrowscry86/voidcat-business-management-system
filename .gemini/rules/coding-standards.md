# Coding Standards: VoidCat RDC

To ensure the "VoidCat Excellence" standard, all code within the BMS must follow these technical guidelines.

## 1. Language Protocol
- **Logic & Automation**: Python is the "Brain" for advanced logic and automation scripts.
- **Execution & Wrappers**: PowerShell is the "Hand" for system execution, environment setup, and wrappers.

## 2. Technical Requirements
- **TypeScript First**: All frontend and backend code must use TypeScript.
- **100% Type Hints**: No `any` types. Interfaces and types must be explicitly defined for all data structures.
- **Explicit Error Handling**: Use try-catch blocks or result objects. Never ignore errors.
- **Prisma for Persistence**: Use Prisma schemas and client for all database interactions.
- **Clean Architecture**: Maintain a clear separation between the Next.js frontend and the Express/Prisma backend.

## 3. Quality Gates
- Code must be production-ready before being committed.
- Documentation must accompany all internal APIs.
- Modular design: Small, focused components and utility functions.
