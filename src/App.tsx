import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import AddTaskPage from './pages/AddTaskPage';
import EditTaskPage from './pages/EditTaskPage';
import TaskListPage from './pages/TaskListPage';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<TaskListPage />} />
          <Route path="/criar" element={<AddTaskPage />} />
          <Route path="/editar/:id" element={<EditTaskPage />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
