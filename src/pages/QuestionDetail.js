import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Button, Box, AppBar, Toolbar, IconButton } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import logo from '../assets/images/logo.jpeg';

const questionDetails = {
  'Pregunta 1 de Tema 1': { video: 'video1_url', answer: 'Respuesta detallada de Pregunta 1 de Tema 1' },
  'Pregunta 2 de Tema 1': { video: 'video2_url', answer: 'Respuesta detallada de Pregunta 2 de Tema 1' },
};

const QuestionDetail = () => {
  const { questionName } = useParams();
  const question = questionDetails[questionName] || {};
  const navigate = useNavigate();

  const handlePayClick = () => {
    navigate('/register');
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
        {questionName}
      </Typography>
      <div>
        <video src={question.video} controls style={{ width: '100%', maxHeight: '400px' }} />
      </div>
      <Typography variant="body1" sx={{ mt: 4 }}>
        {question.answer}
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={handlePayClick}>
        Consultar más respuestas
      </Button>
    </Container>

    <Box sx={{ bgcolor: '#1E494F', color: '#FEFEFE', textAlign: 'center', p: 2, mt: 'auto' }}>
        <Typography variant="body2">
          © 2024 MasterBikas. Todos los derechos reservados.
        </Typography>
      </Box>
    </Box >
  );
};

export default QuestionDetail;
