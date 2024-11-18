import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import Navbar from "./Navbar";

const TopicQuestions = () => {
  const { courseId } = useParams(); // Obtener el ID del curso desde la URL
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para mostrar un spinner mientras carga
  const navigate = useNavigate(); // Navegar entre rutas

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(
          `http://54.165.220.109:3000/api/courses/${courseId}/topics`
        );

        setTopics(response.data || []); // Guardar los temas en el estado
      } catch (error) {
        console.error("Error al obtener los temas:", error);
      } finally {
        setLoading(false); // Desactivar el spinner después de cargar
      }
    };

    fetchTopics();
  }, [courseId]);

  const handleTopicClick = async (topicId) => {
    try {
      const response = await axios.get(`http://54.165.220.109:3000/api/topics/${topicId}/questions`);
      const questions = response.data;
  
      if (questions.length > 0) {
        // Asegúrate de que estás obteniendo el `QUESTION_ID` correcto
        const firstQuestionId = questions[0].QUESTION_ID;
        navigate(`/course/${courseId}/topic/${topicId}/questions/${firstQuestionId}`);
      } else {
        alert("No hay preguntas disponibles para este tema.");
      }
    } catch (error) {
      console.error("Error al obtener las preguntas:", error);
    }
  };
  

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Container sx={{ flexGrow: 1, mt: 4 }}>
        <Typography
          variant="h4"
          sx={{ my: 4, textAlign: "center", color: "#1E494F" }}
        >
          Temas del Curso
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : topics.length === 0 ? (
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ textAlign: "center", mt: 4 }}
          >
            No hay temas disponibles para este curso.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      bgcolor: "#407c85",
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    Temas
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topics.map((topic) => (
                  <TableRow
                    key={topic.TOPIC_ID}
                    onClick={() => handleTopicClick(topic.TOPIC_ID)}
                    hover
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: "#f5f5f5",
                      },
                    }}
                  >
                    <TableCell sx={{ textAlign: "center" }}>
                      {topic.TOPIC_NAME}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>

      <Box
        sx={{
          bgcolor: "#1E494F",
          color: "#FEFEFE",
          textAlign: "center",
          p: 2,
          mt: "auto",
        }}
      >
        <Typography variant="body2">
          © 2024 MasterBikas. Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default TopicQuestions;
