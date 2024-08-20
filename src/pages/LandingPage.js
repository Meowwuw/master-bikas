import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, AppBar, Toolbar, Button, Box, IconButton, Card, CardContent, Grid } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import LoginIcon from '@mui/icons-material/Login';
import logo from '../assets/images/logo.jpeg';
import carouselImage1 from '../assets/images/carousel1.jpg';
import carouselImage2 from '../assets/images/carousel2.jpg';
import carouselImage3 from '../assets/images/carousel3.jpg';
import clientLogo1 from '../assets/images/client1.png';
import clientLogo2 from '../assets/images/client2.jpg';
import clientLogo3 from '../assets/images/client3.png';
import clientLogo4 from '../assets/images/client4.jpg';
import Publicidad from './Publicidad';

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

const clients = [
  { name: 'Colegio Nacional', logo: clientLogo1 },
  { name: 'Colegio Particular', logo: clientLogo2 },
  { name: 'Universidad', logo: clientLogo3 },
  { name: 'Instituto', logo: clientLogo4 },
];

const LandingPage = () => {

  const [ads, setAds] = useState(() => {
    const storedAds = JSON.parse(localStorage.getItem('ads'));
    return storedAds || [
      { title: "Demian the Rat", description: "Se presenta en shows que mezclan humor y anécdotas...", image: "phoneImage" },
      { title: "Wendy Ramos", description: "Wendy Ramos es una actriz, clown y conferencista peruana...", image: "phoneImage2" }
    ];
  });
  
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
            <Button component={Link}  to="/services" color="inherit" sx={{ color: '#FEFEFE' }}>Servicios</Button>
            <Button component={Link}  to="/about" color="inherit" sx={{ color: '#FEFEFE' }}>Sobre Nosotros</Button>
            <Button component={Link}  to="/contact" color="inherit" sx={{ color: '#FEFEFE' }}>Contacto</Button>
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
        
        </Container>

        <Publicidad ads={ads} />

        <Container maxWidth="lg" sx={{ p: 0 }}>

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

        <Box sx={{ mt: 8, textAlign: 'center', color: '#306D90', p: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Clientes o Mercado
          </Typography>
          <Grid container spacing={4}>
            {clients.map((client, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box sx={{
                  textAlign: 'center',
                  '&:hover': {
                    filter: 'none',
                    transition: 'filter 0.3s',
                  },
                  filter: 'grayscale(100%)',
                  transition: 'filter 0.3s'
                }}>
                  <img src={client.logo} alt={client.name} style={{ maxWidth: '100px', marginBottom: '8px' }} />
                  <Typography variant="body1">{client.name}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
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
