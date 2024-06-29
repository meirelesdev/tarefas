import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Edit, Delete, ExpandMore } from '@mui/icons-material';
import Api from '../api/axiosConfig';
import { Status, Task as TaskInterface } from '../interfaces';
import { format } from 'date-fns';
import DeleteModal from './DeleteModal';

interface TaskProps {
  task: TaskInterface;
  updateTask: (task: TaskInterface) => void;
  deleteTask: (taskId: number) => void;
}


const Task: React.FC<TaskProps> = ({ task, deleteTask }) => {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskInterface | null>(null);

  const handleDelete = () => {
    if(selectedTask) {
      Api.delete(`/tarefas/${selectedTask.id}`)
        .then(() => deleteTask(selectedTask.id))
        .catch(error => console.error('Error deleting task:', error));
    }
  };

  const formatarData = (data:string) => {
    return format(new Date(data), 'dd-MM-yyyy');
  };

  const translateStatus = (status: Status) => {
    switch (status) {
      case 'completed':
        return 'Finalizado';
      case 'pending':
        return 'Pendente';
      default:
        return 'Status não definido';
    }

  }
  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
  };
  const handleOpen = (task: TaskInterface) => {
    setSelectedTask(task);
    setOpen(true);
  };
  return (
    <ListItem sx={{width: '100%'}} >
      <Accordion sx={{width: '100%'}}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={`panel${task.id}-content`}
            id={`panel${task.id}-header`}
          >
            <ListItemText primary={task.title} />
          </AccordionSummary>
          <AccordionDetails>
            <ListItemText 
              primary="Descrição:"
              secondary={`${task.description}`} />
            <ListItemText
              primary={`Status:`}
              secondary={`${translateStatus(task.status)}`}/>
      <ListItemText 
        primary={`Data de Conclusão:`}
        secondary={`${formatarData(task.due_date)}`}
      />
        <ListItemSecondaryAction sx={{marginRight: '20px', marginTop: 10}}>
          <IconButton edge="start" color='primary' aria-label="edit" component={Link} to={`/editar/${task.id}`}>
            <Edit />
          </IconButton>
          <IconButton edge="start" color='error' aria-label="delete" onClick={() => handleOpen(task)}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
          </AccordionDetails>
      </Accordion>
      <DeleteModal open={open} handleClose={handleClose} handleDelete={handleDelete} />
    </ListItem>
  );
};

export default Task;
