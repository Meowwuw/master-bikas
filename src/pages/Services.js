import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box } from '@mui/material';
import Navbar from './Navbar';
import axios from 'axios';

const Services = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  // Llamada a la API para obtener cursos
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses'); // Tu API de cursos
        setCourses(response.data || []); // Guardar los cursos en el estado
      } catch (error) {
        console.error('Error al obtener los cursos:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (course) => {
    navigate(`/course/${course.id}/topics`); // Navegar a la ruta de temas del curso
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <Container sx={{ flexGrow: 1 }}>
        <Typography variant="h4" sx={{ my: 4, textAlign: 'center', color: '#1E494F' }}>
          Nuestros Cursos
        </Typography>

        <Grid container spacing={4}>
          {courses.map((course, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardContent>
                  <img
                    src={course.image || 'https://via.placeholder.com/150'}
                    alt={course.name}
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                  />
                  <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                    {course.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {course.description || 'Descripción del curso'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => handleCourseClick(course)} // Redirigir a los temas del curso
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
        <Typography variant="body2">© 2024 MasterBikas. Todos los derechos reservados.</Typography>
      </Box>
    </Box>
  );
};

export default Services;
