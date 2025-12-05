import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/tasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = () => {
    // Refresh the task list after creating a new task
    fetchTasks();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎯 Tracer Bullets Demo</h1>
        <p className="subtitle">End-to-end integration prototype</p>
      </header>

      <main className="app-main">
        <TaskForm onTaskCreated={handleTaskCreated} />

        {loading && <div className="loading">Loading tasks...</div>}
        {error && <div className="error">Error: {error}</div>}
        {!loading && !error && <TaskList tasks={tasks} />}
      </main>
    </div>
  );
}

export default App;

