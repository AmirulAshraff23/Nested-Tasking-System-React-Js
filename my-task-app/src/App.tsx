import React, { useState, useEffect } from 'react';
import TaskManagement from './components/TaskManagement';
import { Task } from './types';
import './styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <Container>
      <TaskManagement tasks={tasks} setTasks={setTasks} />
    </Container>
  );
};

export default App;