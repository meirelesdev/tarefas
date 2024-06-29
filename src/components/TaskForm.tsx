import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Task as TaskInterface } from '../interfaces';
import Api from '../api/axiosConfig';

interface TaskFormProps {
  addTask: (task: TaskInterface) => void;
}


const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [due_date, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: TaskInterface = {
      id: Date.now(),
      title,
      description,
      status: 'pending',
      createdAt: new Date().toISOString(),
      due_date
    };
    Api.post('/tarefas', newTask)
      .then(response => addTask(response.data))
      .catch(error => console.error('Error adding task:', error));
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
      <TextField
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        multiline
      />
      <TextField
        label="Data de Conclusão"
        type="date"
        value={due_date}
        onChange={(e) => setDueDate(e.target.value)}
        required
        InputLabelProps={{ shrink: true }}
      />
      <Button type="submit" variant="contained" color="primary">
        Adicionar Tarefa
      </Button>
    </Box>
  );
};

export default TaskForm;
