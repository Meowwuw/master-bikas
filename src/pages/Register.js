import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';
import logo from '../assets/images/logo.jpeg';
import img1 from '../assets/images/login1.png';
import img2 from '../assets/images/login2.png';
import img3 from '../assets/images/login3.png';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const images = [img1, img2, img3];

const Register = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  useState(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    // Implementa la lógica de registro aquí
    // Redirigir a otra ruta después del registro si es necesario
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
        <Box component="form" onSubmit={handleRegister} sx={{ p: 4, borderRadius: 1, boxShadow: 3, width: '100%', maxWidth: 400, bgcolor: 'white' }}>
          <Typography variant="h4" color="#63D9DE" gutterBottom>
            Registro
          </Typography>
          <TextField
            fullWidth
            label="Nombre"
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Correo Electrónico"
            type="email"
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Confirmar Contraseña"
            type="password"
            margin="normal"
            variant="outlined"
            required
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2, bgcolor: '#63D9DE', '&:hover': { bgcolor: '#4bb4b8' } }}
          >
            Registrarse
          </Button>
        </Box>
        <Link href="/login" underline="hover" sx={{ mt: 2, color: 'gray' }}>
          ¿Ya tienes una cuenta? Iniciar sesión
        </Link>
      </Container>
    </Box>
  );
};

export default Register;
