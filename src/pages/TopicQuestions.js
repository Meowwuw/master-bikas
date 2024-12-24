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
  TextField,
} from "@mui/material";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const TopicQuestions = () => {
  const { courseId } = useParams();
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseName, setCourseName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.master-bikas.com/api/courses/${courseId}`
        );
        setCourseName(response.data.COURSE_NAME || "Nombre no disponible");
      } catch (error) {
        console.error("Error al obtener el nombre del curso:", error);
        setCourseName("Nombre no disponible");
      }
    };

    const fetchTopics = async () => {
      try {
        const response = await axios.get(
          `https://api.master-bikas.com/api/courses/${courseId}/topics`
        );

        setTopics(response.data || []);
        setFilteredTopics(response.data || []);
      } catch (error) {
        console.error("Error al obtener los temas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
    fetchTopics();
  }, [courseId]);

  // Filtra los temas en tiempo real
  useEffect(() => {
    const results = topics.filter((topic) =>
      topic.TOPIC_NAME.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTopics(results);
  }, [searchTerm, topics]);

  const handleTopicClick = async (topicId) => {
    try {
      const response = await axios.get(
        `https://api.master-bikas.com/api/topics/${topicId}/questions`
      );
      const questions = response.data;

      if (questions.length > 0) {
        const firstQuestionId = questions[0].QUESTION_ID;
        navigate(
          `/course/${courseId}/topic/${topicId}/questions/${firstQuestionId}`
        );
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
        {/* Contenedor del título y buscador */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 5,
            mt: 5,
          }}
        >
          {/* Título centrado */}
          <Typography
            variant="h4"
            sx={{
              color: "#0cc0df",
              textAlign: "center",
              mb: 2,
            }}
          >
            {courseName}
          </Typography>

          {/* Buscador alineado a la derecha */}
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            <TextField
              label="Buscar curso"
              variant="outlined"
              placeholder="Ejemplo: Calculo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: "30%" }}
            />
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredTopics.length === 0 ? (
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ textAlign: "center", mt: 4 }}
          >
            No se encontraron temas relacionados.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      bgcolor: "#0cc0df",
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    TEMAS
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTopics.map((topic) => (
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
      <Footer />
    </Box>
  );
};

export default TopicQuestions;
