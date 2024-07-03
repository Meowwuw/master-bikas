import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Lógica de autenticación simulacion
    if (email === "admin@example.com" && password === "adminpassword") {
      navigate('/admin');
    } else if (email === "supervisor@example.com" && password === "supervisorpassword") {
      navigate('/supervisor');
    } else if (email === "usuario@example.com" && password === "usuariopassword") {
      navigate('/client');
    } else {
      setError("Correo electrónico o contraseña incorrectos");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', bgcolor: '#FEFEFE' }}>
      <Box component="form" onSubmit={handleLogin} sx={{ p: 4, borderRadius: 1, boxShadow: 3, width: '100%', maxWidth: 400, bgcolor: 'white' }}>
        <Typography variant="h4" color="#63D9DE" gutterBottom>
          Iniciar sesión
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <TextField
          fullWidth
          label="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          type="password"
          label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 2, bgcolor: '#63D9DE', '&:hover': { bgcolor: '#4bb4b8' } }}
        >
          Iniciar sesión
        </Button>
      </Box>
      <Link href="#" underline="hover" sx={{ mt: 2, color: 'gray' }}>
        Olvidé mi contraseña
      </Link>
    </Container>
  );
};

export default Login;
