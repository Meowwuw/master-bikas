import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import Navbar from "./Navbar";
import axios from "axios";
import Footer from './Footer'; 

const Services = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  // Llamada a la API para obtener cursos
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://54.165.220.109:3000/api/courses");
        setCourses(response.data || []);
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (course) => {
    navigate(`/course/${course.COURSE_ID}/topics`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <Container sx={{ flexGrow: 1 }}>
        <Typography
          variant="h4"
          sx={{ my: 4, textAlign: "center", color: "#0cc0df" }}
        >
          Nuestros Cursos
        </Typography>

        <Grid container spacing={4}>
          {courses.map((course, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%", 
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardContent>
                  <img
                    src={course.IMAGE_URL || "https://via.placeholder.com/150"}
                    alt={course.COURSE_NAME}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                    {course.COURSE_NAME}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 2 }}
                  >
                    {course.COURSE_DESCRIPTION || "Descripción del curso"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => handleCourseClick(course)}
                    sx={{
                      bgcolor: "#0cc0df",
                      color: "#FFFFFF",
                      borderRadius: "20px",
                      px: 2,
                      py: 1,
                      "&:hover": {
                        bgcolor: "#2E5A5F",
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
      <Box sx={{ mt: 10}}>
      <Footer />
      </Box>
    </Box>
  );
};

export default Services;
