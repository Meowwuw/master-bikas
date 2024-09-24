import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, AppBar, Toolbar, Button, Box, IconButton, Card, CardContent, Grid, Menu, MenuItem, Avatar } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import logo from '../assets/images/logo.jpeg';
import osoIcon from '../assets/images/oso.png';

import carouselImage1 from '../assets/images/carousel1.jpg';
import carouselImage2 from '../assets/images/carousel2.jpg';
import carouselImage3 from '../assets/images/carousel3.jpg';
import clientLogo1 from '../assets/images/client1.png';
import clientLogo2 from '../assets/images/client2.jpg';
import clientLogo3 from '../assets/images/client3.png';
import clientLogo4 from '../assets/images/client4.jpg';
import Publicidad from './Publicidad';
import Podium from './Podium';

import axios from 'axios';
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

  const [username, setUsername] = useState('');
  const [anchorEl, setAnchorEl] = useState(null); // Estado para el menú desplegable
  const navigate = useNavigate();
  const [points, setPoints] = useState(0); // Estado para los puntos



  const [ads] = useState(() => {
    const storedAds = JSON.parse(localStorage.getItem('ads'));
    return storedAds || [
      { title: "Demian the Rat", description: "Se presenta en shows que mezclan humor y anécdotas...", image: "phoneImage" },
      { title: "Wendy Ramos", description: "Wendy Ramos es una actriz, clown y conferencista peruana...", image: "phoneImage2" }
    ];
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedToken = localStorage.getItem('token');

    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Obtener los puntos del usuario desde la API
    const fetchPoints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/points', {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
          },
        });
        setPoints(response.data.points); // Asignar los puntos obtenidos
      } catch (error) {
        console.error('Error al obtener los puntos:', error);
      }
    };

    if (storedToken) {
      fetchPoints(); // Llamada a la API para obtener los puntos
    }
  }, []);


  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        console.log('Cierre de sesión exitoso');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };

  // Funciones para manejar la apertura y cierre del menú
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
            <Button color="inherit" sx={{ fontWeight: 'bold', color: '#FEFEFE' }} component={Link} to="/">Inicio</Button>
            <Button color="inherit" sx={{ color: '#FEFEFE' }} component={Link} to="/services">Servicios</Button>
            <Button color="inherit" sx={{ color: '#FEFEFE' }} component={Link} to="/about">Sobre Nosotros</Button>
            <Button color="inherit" sx={{ color: '#FEFEFE' }} component={Link} to="/contact">Contacto</Button>
          </nav>

          {username ? (
            <>
              <Typography sx={{ color: '#FEFEFE', marginRight: '10px' }}>
                Hola {username}
              </Typography>
              {/* Ícono del oso y puntos */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleMenuClick}>
                  <Avatar src={osoIcon} alt="Oso" />
                </IconButton>
                <Typography sx={{ color: '#FEFEFE', marginLeft: '8px' }}>
                  {points} pts
                </Typography>
              </Box>
              {/* Menú desplegable */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => navigate('/user-profile')}>Mi Perfil</MenuItem>
                <MenuItem onClick={() => navigate('/puntos')}>Mis Puntos</MenuItem>
                <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login" sx={{ color: '#FEFEFE' }}>INICIAR SESIÓN</Button>
          )}
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
