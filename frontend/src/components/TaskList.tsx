import { Task } from '../App';
import './TaskList.css';

interface TaskListProps {
  tasks: Task[];
}

function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="task-list-container">
        <h2>Tasks</h2>
        <div className="empty-state">
          <p>No tasks yet. Create your first task above!</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="task-list-container">
      <h2>Tasks ({tasks.length})</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <div className="task-header">
              <h3 className="task-title">{task.title}</h3>
              <span className="task-date">{formatDate(task.createdAt)}</span>
            </div>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;

