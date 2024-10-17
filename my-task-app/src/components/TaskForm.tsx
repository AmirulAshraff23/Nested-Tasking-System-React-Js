import React, { useState } from 'react';

interface TaskFormProps {
  addTask: (taskName: string, parentId: number | null) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [taskName, setTaskName] = useState('');
  const [parentId, setParentId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(taskName, parentId ? parseInt(parentId) : null);
    setTaskName('');
    setParentId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task name"
        required
      />
      <input
        type="number"
        value={parentId}
        onChange={(e) => setParentId(e.target.value)}
        placeholder="Parent ID (optional)"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;