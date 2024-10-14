import React, { useState} from 'react';
import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Publicidad from './Publicidad';
import Podium from './Podium';
import Navbar from './Navbar'; 
import carouselImage1 from '../assets/images/action.png';
import carouselImage2 from '../assets/images/carousel2.jpg';
import carouselImage3 from '../assets/images/carousel3.jpg';

const carouselItems = [
  { image: carouselImage1 },
  { image: carouselImage2, text: "Apoyo personalizado" },
  { image: carouselImage3, text: "Resultados garantizados" }
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

const testimonials = [
  {
    name: "Doris Tito",
    job: "Project Manager - Fandango antes Cinepapaya",
    text: "Tengo un equipo magnífico y mis funciones involucran el rol de Scrum Master; por eso opté por certificarme en GESAP, así mismo su lista de temas me convenció y estoy muy contenta.",
    photo: require('../assets/images/testimonio1.jpg'),
  },
  {
    name: "Denisse Rodríguez",
    job: "Project Manager - DNS del Perú",
    text: "Decidí llevar un curso porque es un plus para mi carrera y elegí a GESAP para certificarme por buenas referencias de amigos. Me ayudó a entender los temas.",
    photo: require('../assets/images/testimonio2.jpg'),
  },
  {
    name: "Iris Fernández Tinco",
    job: "Ingeniera Civil y Jefe de Proyecto - NEXCOM S.A.C.",
    text: "Un amigo Scrum Master me recomendó certificarme en GESAP. La clase me ha parecido espectacular, porque no solo escuchas, sino que construyes, creas y aplicas la teoría aprendida.",
    photo: require('../assets/images/testimonio3.jpg'),
  },
];

const LandingPage = () => {
  const [ads] = useState(() => {
    const storedAds = JSON.parse(localStorage.getItem('ads'));
    return storedAds || [
      { title: "Demian the Rat", description: "Se presenta en shows que mezclan humor y anécdotas...", image: "phoneImage" },
      { title: "Wendy Ramos", description: "Wendy Ramos es una actriz, clown y conferencista peruana...", image: "phoneImage2" }
    ];
  });

  return (
    <Box sx={{ bgcolor: '#FEFEFE', minHeight: '100vh' }}>
      <Navbar />

      <Box sx={{ width: '100%', p: 0 }}>
        <Carousel indicators={false} navButtonsAlwaysInvisible>
          {carouselItems.map((item, index) => (
            <Box key={index} sx={{ height: '100vh', textAlign: 'center', position: 'relative', width: '100%' }}>
            <img 
              src={item.image} 
              alt={`Carousel ${index}`} 
              style={{ 
                width: '100%', 
                height: '100vh', 
                objectFit: 'cover',
                objectPosition: 'top'
              }} 
            />
            <Typography 
              variant="h4" 
              sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                color: '#FFFFFF' 
              }}
            >
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
                    {/* Ajustar la posición de la imagen */}
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      style={{ width: '100%', height: '300px', objectFit: 'cover', objectPosition: 'top' }}
                    />
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: '#1E494F' }}>
                      {testimonial.name.toUpperCase()}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: '#666' }}>
                      {testimonial.job}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {testimonial.text}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>



        </Box>


        <Box sx={{ mt: 8, textAlign: 'center', color: '#306D90', p: 4 }}>
          <Podium />
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
