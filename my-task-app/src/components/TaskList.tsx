import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  currentPage: number;
  tasksPerPage: number;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks, currentPage, tasksPerPage }) => {
  const updateTaskStatus = (taskId: number, newStatus: 'IN_PROGRESS' | 'DONE' | 'COMPLETE') => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => {
        if (task.id === taskId) {
          return { ...task, status: newStatus };
        }
        return task;
      });
      return updateDependentTasks(updatedTasks, taskId);
    });
  };

  const updateDependentTasks = (tasks: Task[], taskId: number): Task[] => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return tasks;

    if (task.status === 'DONE' || task.status === 'COMPLETE') {
      const children = tasks.filter(t => t.parentId === task.id);
      const allChildrenComplete = children.every(child => child.status === 'COMPLETE');
      if (allChildrenComplete) {
        task.status = 'COMPLETE';
      }
    }

    if (task .parentId) {
      return updateDependentTasks(tasks, task.parentId);
    }

    return tasks;
  };

  const updateTaskName = (taskId: number, newName: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, name: newName } : task
      )
    );
  };

  const updateTaskParent = (taskId: number, newParentId: number | null) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, parentId: newParentId } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task, index) => {
    const startTaskIndex = (currentPage - 1) * tasksPerPage;
    const endTaskIndex = startTaskIndex + tasksPerPage;
    return index >= startTaskIndex && index < endTaskIndex;
  });

  return (
    <ul>
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          updateTaskStatus={updateTaskStatus}
          updateTaskName={updateTaskName}
          updateTaskParent={updateTaskParent}
        />
      ))}
    </ul>
  );
};

export default TaskList;