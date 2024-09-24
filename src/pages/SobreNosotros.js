import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Divider, Tabs, Tab, AppBar, Toolbar, Button, IconButton } from '@mui/material';
import { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import logo from '../assets/images/logo.jpeg';

const teamMembers = [
  {
    name: 'Doris Tito',
    job: 'Project Manager',
    photo: require('../assets/images/testimonio1.jpg'),
  },
  {
    name: 'Denisse Rodríguez',
    job: 'Desarrolladora Frontend',
    photo: require('../assets/images/testimonio1.jpg'),
  },
  {
    name: 'Carlos Gómez',
    job: 'Ingeniero de Software',
    photo: require('../assets/images/testimonio1.jpg'),
  }
];

const SobreNosotros = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#FEFEFE' }}>
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
      <Container maxWidth="lg" sx={{ flex: 1 }}>
        <Box sx={{ my: 4 }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="NUESTROS VALORES" />
            <Tab label="NUESTRA VISIÓN" />
            <Tab label="NUESTRA HISTORIA" />
            <Tab label="NUESTRO EQUIPO" />
          </Tabs>
          <Divider sx={{ my: 2 }} />
          <TabPanel value={value} index={0}>
            <Typography variant="h4" gutterBottom>
              Nuestros Valores
            </Typography>
            <Typography variant="body1" gutterBottom>
              En MasterBikas, valoramos la integridad, la innovación y el compromiso con la educación de calidad. Creemos en el poder del conocimiento para transformar vidas y estamos dedicados a proporcionar las mejores herramientas y recursos para nuestros estudiantes.
            </Typography>
            <Box sx={{ textAlign: 'center', my: 4 }}>
              <img src="https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Nuestra Visión" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography variant="h4" gutterBottom>
              Nuestra Visión
            </Typography>
            <Typography variant="body1" gutterBottom>
              La visión de MasterBikas ha permanecido igual desde el primer día. A través de nuestra plataforma de educación segura, MasterBikas está cambiando la forma en que las personas aprenden y trabajan, creando un mundo más seguro y conectado. Transformamos el aprendizaje en una experiencia fluida y accesible para todos.
            </Typography>
            <Box sx={{ textAlign: 'center', my: 4 }}>
              <img src="https://images.pexels.com/photos/15543048/pexels-photo-15543048/free-photo-of-creativo-respeto-respetar-pasion.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Nuestros Valores" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Typography variant="h4" gutterBottom>
              Nuestra Historia
            </Typography>
            <Typography variant="body1" gutterBottom>
              MasterBikas ha construido una red robusta y global de estudiantes, educadores y profesionales que están comprometidos con el aprendizaje continuo. Nuestra red nos permite ofrecer experiencias educativas enriquecedoras y apoyar a nuestros estudiantes en cada paso de su viaje educativo.
            </Typography>
            <Box sx={{ textAlign: 'center', my: 4 }}>
              <img src="https://images.pexels.com/photos/4365443/pexels-photo-4365443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Nuestra Red" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Typography variant="h4" gutterBottom>
              Nuestro Equipo
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
              {teamMembers.map((member, index) => (
                <Box key={index} sx={{ textAlign: 'center', maxWidth: '200px', mb: 4 }}>
                  <img src={member.photo} alt={member.name} style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} />
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {member.job}
                  </Typography>
                </Box>
              ))}
            </Box>
          </TabPanel>
        </Box>
      </Container>
      <Box sx={{ bgcolor: '#1E494F', color: '#FEFEFE', textAlign: 'center', p: 2, mt: 'auto' }}>
        <Typography variant="body2">
          © 2024 MasterBikas. Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export default SobreNosotros;
