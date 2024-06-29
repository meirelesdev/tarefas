import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import { Task as TaskInterface} from '../interfaces';
import Api from '../api/axiosConfig';
import { Typography } from '@mui/material';

const TaskListPage: React.FC = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  useEffect(() => {
    (async()=>{
      const response = await Api.get("/tarefas")
      setTasks(response.data);
    })()
  }, []);

  const updateTask = (updatedTask: TaskInterface) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <>
    <Typography variant="h6" sx={{ flexGrow: 1 }}>Lista de  Tarefas </Typography>
    <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </>
  );
};

export default TaskListPage;
