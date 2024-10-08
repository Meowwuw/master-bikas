import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Button, Box, AppBar, Toolbar, IconButton, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import logo from '../assets/images/logo.jpeg';
import answerImage from '../assets/images/answer.jpg';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const questionDetails = {
  'Pregunta 1 de Tema 1': { video: 'video1_url', answer: 'Respuesta detallada de Pregunta 1 de Tema 1' },
  'Pregunta 2 de Tema 1': { video: 'video2_url', answer: 'Respuesta detallada de Pregunta 2 de Tema 1' },
};

const QuestionDetail = () => {
  const { questionName } = useParams();
  const question = questionDetails[questionName] || {};
  const navigate = useNavigate();
  
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(true); 
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchAttempts = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/users/attempts', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setAttempts(response.data.remaining_attempts);
          // Mantener el contenido bloqueado inicialmente
        } catch (error) {
          console.error('Error fetching attempts:', error);
        }
      }
    };
    fetchAttempts();
  }, []);

  const handleUnlockContent = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.post('http://localhost:5000/api/users/attempts/use', {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.data.remaining_attempts > 0) {
          setIsLocked(false); // Desbloquear contenido si quedan intentos
          setAttempts(response.data.remaining_attempts);
        } else {
          setIsLocked(true); // Mantener bloqueado si no quedan intentos
          navigate('/pago'); // Redirigir al pago si se acabaron los intentos
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          navigate('/pago');
        } else {
          console.error('Error using attempts:', error);
        }
      }
    } else {
      navigate('/register');
    }
  };

  const handlePayClick = () => {
    navigate('/pago');
  };

  const handleCommentSubmit = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/users/comments',
          { questionName: questionName, commentText: comment }, // Modificación aquí
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        if (response.status === 201) {
          alert('Comentario guardado exitosamente');
          setComment('');
        }
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    } else {
      navigate('/register');
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
          {questionName}
        </Typography>

        {/* Mostrar el contenido según los intentos */}
        <div>
          <img
            src={answerImage}
            alt="Answer"
            style={{
              width: '100%',
              maxHeight: '400px',
              filter: isLocked ? 'blur(10px)' : 'none',
              transition: 'filter 0.5s ease'
            }}
          />
          <video
            src={question.video}
            controls={!isLocked}
            style={{
              width: '100%',
              maxHeight: '400px',
              filter: isLocked ? 'grayscale(100%)' : 'none',
              pointerEvents: isLocked ? 'none' : 'auto',
              transition: 'filter 0.5s ease'
            }}
          />
        </div>

        <Typography variant="body1" sx={{ mt: 4 }}>
          {isLocked ? 'Este contenido está bloqueado.' : question.answer}
        </Typography>

        {/* Botón para desbloquear contenido */}
        <Button variant="outlined" color="secondary" sx={{ mt: 4 }} onClick={handleUnlockContent}>
          Desbloquear Contenido
        </Button>

        {/* Sección de comentarios siempre visible */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Comentarios</Typography>
          <TextField
            label="Deja tu comentario"
            multiline
            rows={4}
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleCommentSubmit}>
            Enviar Comentario
          </Button>
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

export default QuestionDetail;
