import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';
import logo from '../assets/images/logo.jpeg';
import img1 from '../assets/images/login1.png';
import img2 from '../assets/images/login2.png';
import img3 from '../assets/images/login3.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';




const images = [img1, img2, img3];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Resetea el mensaje de error
  
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
  
      // Maneja la respuesta exitosa
      if (response.status === 200) {
        console.log('Login exitoso:', response.data);
        localStorage.setItem('token', response.data.token); // Guardar el token JWT
        localStorage.setItem('username', response.data.username); // Guardar el username
        navigate('/'); // Redirigir al dashboard o a la página principal
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
      }
    }
  };
  
  
  


  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: isMobile ? 'column' : 'row' }}>
      {!isMobile && (
        <Box
          sx={{
            width: '50%',
            height: '100%',
            backgroundImage: `url(${images[currentImage]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            transition: 'background-image 1s ease-in-out'
          }}
        />
      )}
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: isMobile ? '100%' : '50%',
          bgcolor: '#FEFEFE'
        }}
      >
        <img src={logo} alt="Logo" style={{ marginBottom: 20, width: '125px', height: '125px' }} />
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
        <Link href="/register" underline="hover" sx={{ mt: 2, color: 'gray' }}>
          ¿No tienes cuenta? Regístrate
        </Link>

        <Link href="/forgot-password" underline="hover" sx={{ mt: 2, color: 'gray' }}>
          Olvidé mi contraseña
        </Link>
      </Container>
    </Box>
  );
};

export default Login;