import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box, AppBar, Toolbar, IconButton, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Autocomplete from '@mui/material/Autocomplete';
import logo from '../assets/images/logo.jpeg';
import geometryImage from '../assets/images/geometry.gif';
import algebraImage from '../assets/images/algebra.jpg';
import arithmeticImage from '../assets/images/arithmetic.jpg';
import trigonometryImage from '../assets/images/trigonometry.jpg';
import chemistryImage from '../assets/images/chemistry.gif';
import physicsImage from '../assets/images/physics.png';
import excelImage from '../assets/images/excel.gif';

// Mock data for courses
const allCourses = [
  { name: 'Geometría', description: 'Aprende conceptos geométricos', image: geometryImage },
  { name: 'Álgebra', description: 'Domina las ecuaciones algebraicas', image: algebraImage },
  { name: 'Aritmética', description: 'Aprende las operaciones básicas', image: arithmeticImage },
  { name: 'Trigonometría', description: 'Descubre las funciones trigonométricas', image: trigonometryImage },
  { name: 'Química', description: 'Explora los conceptos químicos', image: chemistryImage },
  { name: 'Física', description: 'Aprende los principios físicos', image: physicsImage },
  { name: 'Excel', description: 'Domina las hojas de cálculo', image: excelImage },
];

// Mock data for colegios
const colegios = [
  { id: 1, name: 'Colegio A', courses: { Geometría: true, Álgebra: true, Aritmética: true, Trigonometría: true, Química: true, Física: true, Excel: true }},
  { id: 2, name: 'Colegio B', courses: { Geometría: false, Álgebra: true, Aritmética: true, Trigonometría: false, Química: true, Física: true, Excel: true }},
  { id: 3, name: 'Colegio C', courses: { Geometría: true, Álgebra: false, Aritmética: true, Trigonometría: true, Química: true, Física: false, Excel: true }},
  { id: 4, name: 'Colegio D', courses: { Geometría: true, Álgebra: true, Aritmética: false, Trigonometría: true, Química: true, Física: true, Excel: false }},
];

const Services = () => {
  const navigate = useNavigate();
  const [selectedColegio, setSelectedColegio] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(allCourses);

  useEffect(() => {
    if (selectedColegio) {
      const colegioCourses = colegios.find(colegio => colegio.name === selectedColegio)?.courses || {};
      const filtered = allCourses.filter(course => colegioCourses[course.name]);
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(allCourses);
    }
  }, [selectedColegio]);

  const handleCourseClick = (course) => {
    navigate(`/course/${course.name}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
          <IconButton color="inherit">
            <LoginIcon sx={{ color: '#FEFEFE' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ flexGrow: 1 }}>
        <Autocomplete
          freeSolo
          options={colegios.slice(0, 5).map((colegio) => colegio.name)}
          renderInput={(params) => <TextField {...params} label="Selecciona un Colegio" variant="outlined" />}
          onInputChange={(event, newInputValue) => {
            setSelectedColegio(newInputValue);
          }}
          sx={{ my: 4 }}
        />
        
        <Typography variant="h4" sx={{ my: 4, textAlign: 'center', color: '#1E494F' }}>
          Nuestros Cursos
        </Typography>
        <Grid container spacing={4}>
          {filteredCourses.map((course, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardContent>
                  <img src={course.image} alt={course.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                  <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                    {course.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {course.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => handleCourseClick(course)}
                    sx={{
                      bgcolor: '#1E494F',
                      color: '#FFFFFF',
                      borderRadius: '20px',
                      px: 2,
                      py: 1,
                      '&:hover': {
                        bgcolor: '#2E5A5F',
                      },
                    }}
                  >
                    Ver Temas
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ bgcolor: '#1E494F', color: '#FEFEFE', textAlign: 'center', p: 2, mt: 4 }}>
        <Typography variant="body2">
          © 2024 MasterBikas. Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default Services;
