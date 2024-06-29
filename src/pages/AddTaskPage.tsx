import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import Api from '../api/axiosConfig';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { Task as TaskInterface } from '../interfaces';
import { useNavigate } from 'react-router-dom';



const AddTaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async()=>{
      const response = await Api.get('/tarefas')
      setTasks(response.data);
    })()
  }, []);

  const addTask = (task: TaskInterface) => {
    navigate('/');
  };

  const updateTask = (updatedTask: TaskInterface) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} >
        <Typography variant="h6" sx={{ flexGrow: 1, marginBottom: "10px" }}>Cadastrar tarefa</Typography>
        <TaskForm addTask={addTask} />
      </Grid>
      {tasks.length > 0 && (
        <Grid item xs={12} md={12} >
          <Typography variant="h6" sx={{ flexGrow: 1, marginBottom: "10px" }}>Suas tarefas</Typography>
          <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
        </Grid>
      )}
    </Grid>
  );
};

export default AddTaskPage;
