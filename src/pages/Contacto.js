import React from 'react';
import { Container, Typography, Grid, TextField, Button, Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer'; 

const Contacto = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ bgcolor: "#FEFEFE", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ p: 5, mt: 2, mb: 5 }}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: '#0cc0df' }}>
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
              <TextField label="Correo" variant="outlined" required fullWidth />
              <TextField label="Teléfono" variant="outlined" required fullWidth />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Enviar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Contacto;
