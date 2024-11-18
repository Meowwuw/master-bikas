import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';

const VerifyEmail = () => {
  const [message, setMessage] = useState('Verificando tu correo...');
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://master-bikas.com/api/users/verify-email?token=${token}`);
        setMessage('Correo verificado exitosamente.');
        setTimeout(() => navigate('/login'), 3000); // Redirige al login después de 3 segundos
      } catch (error) {
        setMessage('Error al verificar el correo. Por favor, inténtalo de nuevo.');
      }
    };

    verifyEmail();
  }, [navigate]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>{message}</Typography>
      {message === 'Verificando tu correo...' && <CircularProgress />}
    </Box>
  );
};

export default VerifyEmail;
