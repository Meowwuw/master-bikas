import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import Navbar from './Navbar';

const TopicQuestions = () => {
  const { courseId } = useParams(); // Obtener el ID del curso desde la URL
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate(); // Usar navigate para redirigir

  // Llamar a la API para obtener los temas del curso seleccionado
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${courseId}/topics`);
        setTopics(response.data || []); // Guardar los temas en el estado
      } catch (error) {
        console.error('Error al obtener los temas:', error);
      }
    };

    fetchTopics();
  }, [courseId]);

  // Obtener las preguntas del tema y redirigir a la primera pregunta
  const handleTopicClick = async (topicId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/topics/${topicId}/questions`);
      const questions = response.data;

      if (questions.length > 0) {
        // Redirigir a la primera pregunta del tema
        const firstQuestionId = questions[0].id;
        navigate(`/course/${courseId}/topic/${topicId}/questions/${firstQuestionId}`);
      } else {
        alert('No hay preguntas disponibles para este tema.');
      }
    } catch (error) {
      console.error('Error al obtener las preguntas:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container sx={{ flexGrow: 1 }}>
        <Typography variant="h4" sx={{ my: 4, textAlign: 'center', color: '#1E494F' }}>
          Temas del Curso
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: '#407c85', color: '#FFFFFF', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>Temas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topics.map((topic) => (
                <TableRow key={topic.id} onClick={() => handleTopicClick(topic.id)} hover>
                  <TableCell sx={{ cursor: 'pointer', textAlign: 'center' }}>{topic.name}</TableCell>
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
