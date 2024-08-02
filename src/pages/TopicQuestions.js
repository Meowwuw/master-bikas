import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Button, Box, AppBar, Toolbar, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import logo from '../assets/images/logo.jpeg';

const topicQuestions = {
  'Tema 1': [
    { question: 'Pregunta 1 de Tema 1', video: 'video1_url' },
    { question: 'Pregunta 2 de Tema 1', video: 'video2_url' },
  ],
  'Tema 2': [
    { question: 'Pregunta 1 de Tema 2', video: 'video1_url' },
    { question: 'Pregunta 2 de Tema 2', video: 'video2_url' },
  ],
};

const TopicQuestions = () => {
  const { courseName, topicName } = useParams();
  const questions = topicQuestions[topicName] || [];
  const navigate = useNavigate();

  const handleQuestionClick = (question) => {
    navigate(`/course/${courseName}/topic/${topicName}/question/${question.question}`);
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
        <Typography variant="h4" sx={{ my: 4, textAlign: 'center', color: '#1E494F' }}>
          {topicName} - {courseName}
        </Typography>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: '#407c85', color: '#FFFFFF', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>Preguntas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.map((question, index) => (
                <TableRow key={index} onClick={() => handleQuestionClick(question)} hover>
                  <TableCell>{question.question}</TableCell>
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
    </Box>
  );
};

export default TopicQuestions;
