import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Publicidad from "./Publicidad";
import Testimonials from "./Testimonials";
import Podium from "./Podium";
import Navbar from "./Navbar";
import carouselImage1 from "../assets/images/action.png";
import carouselImage2 from "../assets/images/action2.png";
import carouselImage3 from "../assets/images/action3.png";

const carouselItems = [
  { image: carouselImage1 },
  { image: carouselImage2},
  { image: carouselImage3},
];

const services = [
  {
    title: "Tutoría de Matemáticas",
    description:
      "Nuestros tutores expertos brindan apoyo personalizado para ayudar a los estudiantes a sobresalir en matemáticas.",
    icon: "📘",
  },
  {
    title: "Videos de Matemáticas",
    description:
      "Videos de matemáticas interactivos y atractivos para ayudar a los estudiantes a entender conceptos complejos.",
    icon: "📹",
  },
  {
    title: "Recursos de Matemáticas",
    description:
      "Recursos de matemáticas completos, incluyendo hojas de trabajo, actividades y pruebas de práctica.",
    icon: "📚",
  },
];


const LandingPage = () => {
  return (
    <Box sx={{ bgcolor: "#FEFEFE", minHeight: "100vh" }}>
      <Navbar />

      {/* Carousel */}
      <Box sx={{ width: "100%", p: 0 }}>
        <Carousel indicators={false} navButtonsAlwaysInvisible>
          {carouselItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                height: "110vh",
                textAlign: "center",
                position: "relative",
                width: "100%",
              }}
            >
              <img
                src={item.image}
                alt={`Carousel ${index}`}
                style={{
                  width: "100%",
                  height: "100vh",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#FFFFFF",
                }}
              >
                {item.text}
              </Typography>
            </Box>
          ))}
        </Carousel>
      </Box>

      {/* Quienes somos */}
      <Container maxWidth="lg" sx={{ p: 0 }}>
        <Box sx={{ mt: 10, textAlign: "center" }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <video
                controls
                width="100%"
                style={{ borderRadius: "8px" }}
                src="ruta/del/video.mp4"
              ></video>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                sx={{ mb: 2, color: "#1E494F", fontWeight: "bold" }}
              >
                Quienes somos?
              </Typography>
              <Typography variant="body1" color="textSecondary">
                MasterBikas ha construido una red robusta y global de
                estudiantes, educadores y profesionales que están comprometidos
                con el aprendizaje continuo.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Servicios */}
        <Box sx={{ mt: 10, textAlign: "center" }}>
          <Typography variant="h4" sx={{ mb: 4, color: "#1E494F" }}>
            Nuestros Servicios
          </Typography>
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                      {service.icon} {service.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Publicidad */}
      <Publicidad />

      {/* Testimonios */}
      <Testimonials />

      <Box sx={{ mt: 8, textAlign: "center", color: "#306D90", p: 4 }}>
          <Podium />
        </Box>
        
      {/* Footer */}
      <Box
        sx={{
          bgcolor: "#1E494F",
          color: "#FEFEFE",
          textAlign: "center",
          p: 2,
          mt: 4,
        }}
      >
        <Typography variant="body2">
          © 2024 MasterBikas. Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;
