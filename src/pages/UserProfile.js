import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, TextField, Grid } from '@mui/material';
import axios from 'axios';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // Simulación de la obtención de datos del usuario desde localStorage o la API
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email'); // Simulación, podrías obtener estos datos de la API
    if (storedUsername) setUsername(storedUsername);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  // Handlers para los cambios
  const handleNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  // Simulación de la actualización de datos del perfil
  const handleUpdateProfile = () => {
    // Aquí puedes llamar a la API para actualizar los datos del usuario
    console.log('Actualización de perfil:', { username, currentPassword, newPassword, confirmPassword });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Perfil de Usuario
        </Typography>

        <Grid container spacing={2}>
          {/* Visualización del nombre y correo */}
          <Grid item xs={12}>
            <Typography variant="h6">Información del Usuario</Typography>
            <Typography variant="body1">Nombre: {username}</Typography>
            <Typography variant="body1">Correo: {email}</Typography>
          </Grid>

          {/* Formulario para actualizar el nombre */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre de Usuario"
              value={username}
              onChange={handleNameChange}
              variant="outlined"
            />
          </Grid>

          {/* Formulario para actualizar la contraseña */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 3 }}>
              Cambiar Contraseña
            </Typography>
            <TextField
              fullWidth
              label="Contraseña Actual"
              type="password"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              variant="outlined"
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Nueva Contraseña"
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              variant="outlined"
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Confirmar Nueva Contraseña"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              variant="outlined"
              sx={{ mt: 2 }}
            />
          </Grid>

          {/* Botón para actualizar el perfil */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth onClick={handleUpdateProfile} sx={{ mt: 4 }}>
              Actualizar Perfil
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UserProfile;
