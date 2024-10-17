import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { Task } from '../types';
import { Row, Col } from 'react-bootstrap';
import '../styles/TaskManagement.css';

interface TaskManagementProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskManagement: React.FC<TaskManagementProps> = ({ tasks, setTasks }) => {
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 20;

    const addTask = (taskName: string, parentId: number | null) => {
        if (isCircularDependency(parentId)) {
            alert("Circular dependency detected!");
            return;
        }

        const newTask: Task = {
            id: Date.now(),
            name: taskName,
            parentId: parentId,
            status: 'IN_PROGRESS'
        };

        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    const isCircularDependency = (parentId: number | null): boolean => {
        if (!parentId) return false;

        const checkCircular = (currentId: number, targetId: number): boolean => {
            const currentTask = tasks.find(task => task.id === currentId);
            if (!currentTask || !currentTask.parentId) return false;
            if (currentTask.parentId === targetId) return true;
            return checkCircular(currentTask.parentId, targetId);
        };

        return checkCircular(parentId, parentId);
    };

    const filteredTasks = tasks.filter(task =>
        statusFilter === 'all' || task.status.toLowerCase() === statusFilter.toLowerCase()
    );

    const pageCount = Math.ceil(filteredTasks.length / tasksPerPage);

    return (
        <div className="container task-management">
            <h1>Task Management System</h1>
            <div className="filter">
                <label htmlFor="statusFilter">Filter by Status:</label>
                <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="in_progress">IN PROGRESS</option>
                    <option value="done">DONE</option>
                    <option value="complete">COMPLETE</option>
                </select>
            </div>
            <div className="row">
                <div className="col">
                    <TaskForm addTask={addTask} />
                </div>
                <div className="col">
                    <TaskList
                        tasks={filteredTasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage)}
                        setTasks={setTasks} currentPage={0} tasksPerPage={0} />
                </div>
            </div>
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span>Page {currentPage} of {pageCount}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                    disabled={currentPage === pageCount}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TaskManagement;