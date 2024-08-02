import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Button, Box, AppBar, Toolbar, IconButton, TextField, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Autocomplete from '@mui/material/Autocomplete';
import logo from '../assets/images/logo.jpeg';

// Mock data for course topics
const courseTopics = {
  Geometría: ['Tema 1', 'Tema 2', 'Tema 3'],
  Álgebra: ['Tema 1', 'Tema 2', 'Tema 3'],
  Aritmética: ['Tema 1', 'Tema 2', 'Tema 3'],
  Trigonometría: ['Tema 1', 'Tema 2', 'Tema 3'],
  Química: ['Tema 1', 'Tema 2', 'Tema 3'],
  Física: ['Tema 1', 'Tema 2', 'Tema 3'],
  Excel: ['Tema 1', 'Tema 2', 'Tema 3'],
};

// Mock data for colegios
const colegios = [
  { id: 1, name: 'Colegio A', courses: { Geometría: true, Álgebra: true, Aritmética: true, Trigonometría: true, Química: true, Física: true, Excel: true }},
  { id: 2, name: 'Colegio B', courses: { Geometría: false, Álgebra: true, Aritmética: true, Trigonometría: false, Química: true, Física: true, Excel: true }},
  { id: 3, name: 'Colegio C', courses: { Geometría: true, Álgebra: false, Aritmética: true, Trigonometría: true, Química: true, Física: false, Excel: true }},
  { id: 4, name: 'Colegio D', courses: { Geometría: true, Álgebra: true, Aritmética: false, Trigonometría: true, Química: true, Física: true, Excel: false }},
];

const CourseTopics = () => {
  const { courseName } = useParams();
  const [selectedColegio, setSelectedColegio] = useState('');
  const [topics, setTopics] = useState(courseTopics[courseName] || []);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedColegio) {
      const colegioCourses = colegios.find(colegio => colegio.name === selectedColegio)?.courses || {};
      if (colegioCourses[courseName]) {
        setTopics(courseTopics[courseName]);
        setErrorMessage('');
      } else {
        setTopics([]);
        setErrorMessage(`No tenemos disponibles los cursos de ${courseName} para el colegio ${selectedColegio}`);
      }
    } else {
      setTopics(courseTopics[courseName]);
      setErrorMessage('');
    }
  }, [selectedColegio, courseName]);

  const handleTopicClick = (topic) => {
    navigate(`/course/${courseName}/topic/${topic}`);
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

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {errorMessage}
          </Alert>
        )}

        <Typography variant="h4" sx={{ my: 4, textAlign: 'center', color: '#1E494F' }}>
          {courseName}
        </Typography>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell sx={{ bgcolor: '#407c85', color: '#FFFFFF', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>Temas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topics.map((topic, index) => (
                <TableRow key={index} onClick={() => handleTopicClick(topic)} hover>
                  <TableCell>{topic}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Box sx={{ bgcolor: '#1E494F', color: '#FEFEFE', textAlign: 'center', p: 2, mt: 'auto' }}>
        <Typography variant="body2">
          © 2024 MasterBikas. Todos los derechos reservados.
        </Typography>
      </Box>
    </Box >
  );
};

export default CourseTopics;
