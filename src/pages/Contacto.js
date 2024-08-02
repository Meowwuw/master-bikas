import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, TextField, Button, Box, AppBar, Toolbar, IconButton } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import logo from '../assets/images/logo.jpeg';

const Contacto = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para manejar el envío del formulario
  };

  return (
    <Box sx={{ bgcolor: '#FEFEFE', minHeight: '100vh' }}>
            <AppBar position="static" sx={{ bgcolor: '#1E494F' }}>
                <Toolbar>
                    <img src={logo} alt="Logo" style={{ marginRight: 20, width: '50px', height: '50px' }} />
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        MasterBikas
                    </Typography>
                    <nav>
                        <Button component={Link} to="/" color="inherit" sx={{ fontWeight: 'bold', color: '#FEFEFE' }}>Inicio</Button>
                        <Button component={Link} to="/services" color="inherit" sx={{ color: '#FEFEFE' }}>Servicios</Button>
                        <Button component={Link} to="/about" color="inherit" sx={{ color: '#FEFEFE' }}>Sobre Nosotros</Button>
                        <Button component={Link} to="/contact" color="inherit" sx={{ color: '#FEFEFE' }}>Contacto</Button>
                    </nav>
                    <IconButton color="inherit">
                        <LoginIcon sx={{ color: '#FEFEFE' }} />
                    </IconButton>
                </Toolbar>
            </AppBar>
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: '#1E494F' }}>
        Contacto
      </Typography>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            ¡Trabajemos Juntos!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Si deseas consultar mayor información sobre nuestros servicios o tienes alguna duda al respecto, no dudes en solicitar una consultoría gratuita y uno de nuestros asesores te contactará a la brevedad.
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Contáctanos vía WhatsApp +52 55 7977 1949
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">
              ¿Quieres saber más?
            </Typography>
            <TextField label="Nombre" variant="outlined" required fullWidth />
            <TextField label="Apellido" variant="outlined" required fullWidth />
            <TextField label="Correo empresarial" variant="outlined" required fullWidth />
            <TextField label="Teléfono" variant="outlined" required fullWidth />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Enviar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
    </Box>
  );
};

export default Contacto;
