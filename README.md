# 🎯 Tracer Bullets Demo App

A full-stack prototype demonstrating the **Tracer Bullets** development approach—a thin, working slice of an application that wires together all layers from UI to API to persistence, enabling end-to-end integration testing and rapid iteration.

## What are Tracer Bullets?

**Tracer Bullets** is a development technique from *The Pragmatic Programmer* that emphasizes:

- **End-to-end integration**: Build a working path through all layers of your application
- **Rapid feedback**: See the full system working together early
- **Incremental refinement**: Replace stubbed modules with real implementations without breaking the flow
- **Risk reduction**: Validate architecture and integration points before building everything

This demo app creates a simple task management system that demonstrates the complete data flow:

```
User Input → React Form → API Request → Express Route → Repository → In-Memory Storage
                                                                    ↓
User Display ← React List ← API Response ← Express Route ← Repository ← In-Memory Storage
```

## Architecture

### Backend (`/backend`)

- **Express + TypeScript** server
- **Routes** (`src/routes/tasks.ts`): RESTful API endpoints
  - `GET /api/tasks` - List all tasks
  - `POST /api/tasks` - Create a new task
- **Repository** (`src/data/tasksRepo.ts`): **TRACER** - Stubbed persistence layer
  - Currently uses in-memory storage
  - Clearly marked with `// TRACER:` comments
  - Designed to be swapped with a real database without changing the API contract

### Frontend (`/frontend`)

- **React + TypeScript + Vite**
- **Components**:
  - `TaskForm.tsx` - Create new tasks
  - `TaskList.tsx` - Display all tasks
  - `App.tsx` - Main application orchestrator

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

Install dependencies for all projects:

```bash
npm run install:all
```

Or manually:

```bash
# Root
npm install

# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

### Running the Application

You'll need two terminal windows:

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

The backend will start on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

The frontend will start on `http://localhost:3000` and automatically open in your browser.

### Testing

Run the backend integration tests:

```bash
npm run test:backend
```

The test verifies the end-to-end flow:
1. Creates a task via `POST /api/tasks`
2. Retrieves all tasks via `GET /api/tasks`
3. Verifies the created task appears in the list

## How This Demonstrates Tracer Bullets

### 1. **Complete Integration Path**

Every layer is connected and working:
- ✅ User can type in the form
- ✅ Form submits to backend API
- ✅ Backend processes and stores data
- ✅ Backend returns response
- ✅ Frontend updates UI with new data
- ✅ Full round trip works immediately

### 2. **Stubbed Modules with Clear Boundaries**

The persistence layer (`tasksRepo.ts`) is intentionally simple:
- Uses in-memory storage
- Marked with `// TRACER:` comments
- Has a clear interface that won't change when swapping implementations

### 3. **Easy to Replace Stubs**

When you're ready to add a real database:

1. **Keep the API contract unchanged** - `routes/tasks.ts` stays the same
2. **Replace the repository implementation** - Swap `tasksRepo.ts` with database queries
3. **Test the integration** - The existing tests still validate the flow

Example migration path:

```typescript
// Current: tasksRepo.ts (in-memory)
class TasksRepository {
  private tasks: Task[] = [];
  // ...
}

// Future: tasksRepo.ts (PostgreSQL)
class TasksRepository {
  async findAll(): Promise<Task[]> {
    return db.query('SELECT * FROM tasks');
  }
  // ...
}
```

The routes don't need to change because they depend on the repository interface, not the implementation.

## Project Structure

```
tracer-bullets-app/
├── backend/
│   ├── src/
│   │   ├── index.ts              # Express server setup
│   │   ├── routes/
│   │   │   └── tasks.ts          # API endpoints
│   │   ├── data/
│   │   │   └── tasksRepo.ts      # TRACER: Stubbed persistence
│   │   └── __tests__/
│   │       └── tasks.test.ts     # Integration test
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── App.tsx               # Main app component
│   │   ├── components/
│   │   │   ├── TaskForm.tsx     # Create task form
│   │   │   └── TaskList.tsx     # Task list display
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── package.json                  # Root scripts
└── README.md
```

## Next Steps

Once you have the tracer bullet working:

1. **Add more features** - Delete, update, filter tasks
2. **Replace persistence** - Swap in-memory storage with PostgreSQL, MongoDB, etc.
3. **Add authentication** - Wire in auth flow end-to-end
4. **Enhance UI** - Add animations, better styling, error handling
5. **Add more tests** - Expand test coverage as you add features

The key is: **always keep the end-to-end path working**. Each new feature should be a new tracer bullet that goes all the way through the stack.

## Why This Approach Works

- **Early validation**: You know the architecture works before building everything
- **Rapid iteration**: See changes immediately across all layers
- **Risk reduction**: Integration issues surface early
- **Team alignment**: Everyone can see the full system working
- **Confidence**: You're always one step away from a working system

## References

- *The Pragmatic Programmer* by Andrew Hunt and David Thomas
- Tracer Bullets concept: Build a working path through all layers, then refine incrementally

---

**Happy prototyping! 🚀**

