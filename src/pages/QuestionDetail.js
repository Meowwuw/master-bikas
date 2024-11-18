import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Button, Box, AppBar, Toolbar, IconButton } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import logo from '../assets/images/logo.png';
import axios from 'axios';

const QuestionDetail = () => {
  const { courseId, topicId, questionId } = useParams();
  const [question, setQuestion] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(true); 
  const navigate = useNavigate();

  // Obtener los detalles de la pregunta desde la API
  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const response = await axios.get(`http://54.165.220.109:3000/api/questions/${questionId}`);
        setQuestion(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles de la pregunta:', error);
      }
    };

    const fetchAttempts = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://54.165.220.109:3000/api/users/attempts', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setAttempts(response.data.remaining_attempts);
        } catch (error) {
          console.error('Error al obtener los intentos:', error);
        }
      }
    };

    fetchQuestionDetails();
    fetchAttempts();
  }, [questionId]);

  const handleUnlockContent = async () => {
    if (isSubmitting) return; // Evitar múltiples clics
    setIsSubmitting(true);
  
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.post('http://54.165.220.109:3000/api/users/attempts/use', {}, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (response.data.remaining_attempts >= 0) {
          setIsLocked(false);
          setAttempts(response.data.remaining_attempts);
        } else {
          setIsLocked(true);
          navigate('/pago');
        }
      } catch (error) {
        console.error('Error al usar los intentos:', error);
        if (error.response?.status === 403) navigate('/pago');
      } finally {
        setIsSubmitting(false); // Permitir clics de nuevo
      }
    } else {
      navigate('/register');
      setIsSubmitting(false);
    }
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
          {question.QUESTION_TEXT}
        </Typography>

        <div>
          <img
            src={isLocked ? question.QUESTION_IMAGE : question.QUESTION_IMAGE}
            alt="Answer"
            style={{
              width: '100%',
              maxHeight: '400px',
              filter: isLocked ? 'blur(10px)' : 'none',
              transition: 'filter 0.5s ease'
            }}
          />
        </div>

        <Typography variant="body1" sx={{ mt: 4 }}>
          {isLocked ? 'Este contenido está bloqueado.' : question.answer}
        </Typography>

        <Button variant="outlined" color="secondary" sx={{ mt: 4 }} onClick={handleUnlockContent}>
          Desbloquear Contenido
        </Button>
      </Container>

      <Box sx={{ bgcolor: '#1E494F', color: '#FEFEFE', textAlign: 'center', p: 2, mt: 'auto' }}>
        <Typography variant="body2">
          © 2024 MasterBikas. Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default QuestionDetail;
