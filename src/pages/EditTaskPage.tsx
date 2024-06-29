import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import Api from '../api/axiosConfig';
import { Status, Task as TaskInterface} from '../interfaces';

const EditTaskPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<TaskInterface | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Status>('pending');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    Api.get(`/tarefas/${id}`)
      .then(response => {
        setTask(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setStatus(response.data.status);
        setDueDate(response.data.due_date);
      })
      .catch(error => console.error('Error fetching task:', error));
  }, [id]);

  const handleSave = () => {
    if (task) {
      const updatedTask: TaskInterface = { ...task, title, description, status, due_date: dueDate };
      Api.put(`/tarefas/${task.id}`, updatedTask)
        .then(response => {
          navigate('/');
        })
        .catch(error => console.error('Error updating task:', error));
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as Status);
  };

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
    <InputLabel id="demo-simple-select-label">Status</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={status}
    label="Status"
    onChange={handleChange}
  >
    <MenuItem value={`completed`}>Finalizado</MenuItem>
    <MenuItem value={`pending`}>Pendente</MenuItem>
  </Select>
      <TextField
        label="Data de Conclusão"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Salvar
      </Button>
    </Box>
  );
};

export default EditTaskPage;
