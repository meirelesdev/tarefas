import React from 'react';
import { List } from '@mui/material';
import Task from './Task';
import { Task as TaskInterface } from '../interfaces';
import EmptyStateCard from './CardNewTask';

interface TaskListProps {
  tasks: TaskInterface[];
  updateTask: (task: TaskInterface) => void;
  deleteTask: (taskId: number) => void;
}
const TaskList: React.FC<TaskListProps> = ({ tasks, updateTask, deleteTask }) => {
  return (
    <List sx={{width: '100%', margin: 0}}>
      {tasks.length === 0 ? <EmptyStateCard/> : tasks.map(task => (
        <Task key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
      ))}
    </List>
  );
};

export default TaskList;
