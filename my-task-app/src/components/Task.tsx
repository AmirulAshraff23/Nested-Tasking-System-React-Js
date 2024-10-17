import React from 'react';
import { Task } from '../types';

interface TaskProps {
  task: Task;
  updateTaskStatus: (taskId: number, newStatus: 'IN_PROGRESS' | 'DONE' | 'COMPLETE') => void;
  updateTaskName: (taskId: number, newName: string) => void;
  updateTaskParent: (taskId: number, newParentId: number | null) => void;
}

const TaskItem: React.FC<TaskProps> = ({ task, updateTaskStatus, updateTaskName, updateTaskParent }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [newName, setNewName] = React.useState(task.name);
  const [newParentId, setNewParentId] = React.useState(task.parentId);

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = event.target.checked ? 'DONE' : 'IN_PROGRESS';
    updateTaskStatus(task.id, newStatus);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleParentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewParentId(parseInt(event.target.value, 10) || null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateTaskName(task.id, newName);
    updateTaskParent(task.id, newParentId);
    setIsEditing(false);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={task.status === 'DONE'}
        onChange={handleStatusChange}
      />
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input type="text" value={newName} onChange={handleNameChange} />
          <input type="number" value={newParentId || ''} onChange={handleParentChange} />
          <button type="submit">Save</button>
        </form>
      ) : (
        <span>
          {task.name}
          {task.parentId ? ` (Parent: ${task.parentId})` : ''}
        </span>
      )}
      <button onClick={() => setIsEditing(true)}>Edit</button>
    </li>
  );
};

export default TaskItem;