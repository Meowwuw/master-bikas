import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('https://api.master-bikas.com/api/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.error || 'Error al solicitar restablecimiento de contraseña');
    }
  };

  return (
    <div>
      <h2>Restablecer contraseña</h2>
      <TextField
        label="Correo electrónico"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <Button onClick={handleForgotPassword} color="primary">
        Enviar enlace de restablecimiento
      </Button>
    </div>
  );
};

export default ForgotPassword;
