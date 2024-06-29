import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmptyStateCard = () => {
  const navigate = useNavigate();

  const handleCreateTask = () => {
    // Navegue para a tela de criação de tarefa quando o botão for clicado
    navigate('/criar')
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Você ainda não possui nenhuma tarefa criada.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Comece agora mesmo adicionando sua primeira tarefa!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateTask}
          style={{ marginTop: '1rem' }}
        >
          Criar Tarefa
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyStateCard;
