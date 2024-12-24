import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();

  const handleResetPassword = async () => {
    const token = searchParams.get('token'); // Obtener el token de la URL

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('https://api.master-bikas.com/api/reset-password', { password, token });
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.error || 'Error al restablecer la contraseña');
    }
  };

  return (
    <div>
      <h2>Restablecer contraseña</h2>
      <TextField
        label="Nueva contraseña"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="Confirmar nueva contraseña"
        type="password"
        fullWidth
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <Button onClick={handleResetPassword} color="primary">
        Restablecer contraseña
      </Button>
    </div>
  );
};

export default ResetPassword;
