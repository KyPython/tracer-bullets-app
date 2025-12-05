// TRACER: This is a stubbed persistence layer
// In a real application, this would be replaced with a database (PostgreSQL, MongoDB, etc.)
// The API contract (routes/tasks.ts) remains unchanged when swapping implementations

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

// TRACER: In-memory storage - replace with database queries later
class TasksRepository {
  private tasks: Task[] = [];
  private nextId = 1;

  findAll(): Task[] {
    return [...this.tasks];
  }

  create(data: { title: string; description: string }): Task {
    const task: Task = {
      id: String(this.nextId++),
      title: data.title,
      description: data.description,
      createdAt: new Date().toISOString(),
    };
    this.tasks.push(task);
    return task;
  }

  // TRACER: Additional methods can be added here as needed
  // findById(id: string): Task | undefined
  // update(id: string, data: Partial<Task>): Task
  // delete(id: string): void
}

export const tasksRepo = new TasksRepository();

