import React from 'react';
import { Container, Typography, AppBar, Toolbar, Button, Box, IconButton, Card, CardContent, Grid, TextField } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import LoginIcon from '@mui/icons-material/Login';
import logo from '../assets/images/logo.jpeg';
import carouselImage1 from '../assets/images/carousel1.jpg';
import carouselImage2 from '../assets/images/carousel2.jpg';
import carouselImage3 from '../assets/images/carousel3.jpg';

const testimonials = [
  {
    text: "MasterBikas me ayudó a mejorar mis notas en matemáticas. Sus videos explicativos son geniales.",
    author: "Juan Pérez, Estudiante"
  },
  {
    text: "Gracias a MasterBikas, nuestros estudiantes están más comprometidos y entienden mejor las matemáticas.",
    author: "Ana Gómez, Profesora"
  },
  {
    text: "La plataforma de MasterBikas es muy intuitiva y fácil de usar. Mis hijos han mejorado mucho en sus estudios.",
    author: "Carlos Rivera, Padre de familia"
  }
];

const carouselItems = [
  {
    image: carouselImage1,
    text: "Aprende matemáticas de manera fácil y divertida"
  },
  {
    image: carouselImage2,
    text: "Apoyo personalizado"
  },
  {
    image: carouselImage3,
    text: "Resultados garantizados"
  }
];

const services = [
  {
    title: "Tutoría de Matemáticas",
    description: "Nuestros tutores expertos brindan apoyo personalizado para ayudar a los estudiantes a sobresalir en matemáticas.",
    icon: "📘"
  },
  {
    title: "Videos de Matemáticas",
    description: "Videos de matemáticas interactivos y atractivos para ayudar a los estudiantes a entender conceptos complejos.",
    icon: "📹"
  },
  {
    title: "Recursos de Matemáticas",
    description: "Recursos de matemáticas completos, incluyendo hojas de trabajo, actividades y pruebas de práctica.",
    icon: "📚"
  }
];

const LandingPage = () => {
  return (
    <Box sx={{ bgcolor: '#FEFEFE', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: '#1E494F' }}>
        <Toolbar>
          <img src={logo} alt="Logo" style={{ marginRight: 20, width: '50px', height: '50px' }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            MasterBikas
          </Typography>
          <nav>
            <Button color="inherit" sx={{ fontWeight: 'bold', color: '#FEFEFE' }}>Inicio</Button>
            <Button color="inherit" sx={{ color: '#FEFEFE' }}>Servicios</Button>
            <Button color="inherit" sx={{ color: '#FEFEFE' }}>Sobre Nosotros</Button>
            <Button color="inherit" sx={{ color: '#FEFEFE' }}>Contacto</Button>
          </nav>
          <IconButton color="inherit">
            <LoginIcon sx={{ color: '#FEFEFE' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ width: '100%', p: 0 }}>
        <Carousel indicators={false} navButtonsAlwaysInvisible>
          {carouselItems.map((item, index) => (
            <Box key={index} sx={{ height: '70vh', textAlign: 'center', position: 'relative', width: '100%' }}>
              <img src={item.image} alt={`Carousel ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <Typography variant="h4" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#FFFFFF' }}>
                {item.text}
              </Typography>
            </Box>
          ))}
        </Carousel>
      </Box>

      <Container maxWidth="lg" sx={{ p: 0 }}>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 4, color: '#1E494F' }}>
            Nuestros Servicios
          </Typography>
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                      {service.icon} {service.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{mt: 7, textAlign: 'center', bgcolor: '#1E494F', color: '#FEFEFE', p: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Sobre Nosotros
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            MasterBikas es un proveedor líder de apoyo y recursos en matemáticas para colegios y estudiantes. Nuestra misión es empoderar a los estudiantes de todas las edades para que sobresalgan en matemáticas a través de contenido interactivo, atractivo y accesible.
          </Typography>
          <Button variant="contained" sx={{ bgcolor: '#306D90', '&:hover': { bgcolor: '#000000' } }}>
            Aprende Más
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: '#1E494F' }}>
            Testimonios
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="body1" color="textSecondary" component="p">
                      "{testimonial.text}"
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" sx={{ textAlign: 'right', mt: 2 }}>
                      - {testimonial.author}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 8, textAlign: 'center', bgcolor: '#306D90', color: '#FEFEFE', p: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            ¡Empieza hoy mismo!
          </Typography>
          <Button variant="contained" sx={{ bgcolor: '#1E494F', '&:hover': { bgcolor: '#000000' } }}>
            Inscríbete ahora
          </Button>
        </Box>

        <Box sx={{ mt: 8, textAlign: 'center', bgcolor: '#FEFEFE', color: '#1E494F', p: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Contáctanos
          </Typography>
          
          <form>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={6}>
                <TextField label="Nombre" variant="outlined" fullWidth required />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Correo Electrónico" variant="outlined" fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Mensaje" variant="outlined" fullWidth multiline rows={4} required />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" sx={{ bgcolor: '#1E494F', '&:hover': { bgcolor: '#000000' } }}>
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>

      <Box sx={{ bgcolor: '#1E494F', color: '#FEFEFE', textAlign: 'center', p: 2, mt: 4 }}>
        <Typography variant="body2">
          © 2024 MasterBikas. Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;
