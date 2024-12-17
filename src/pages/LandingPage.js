import React from "react";
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
import Footer from "./Footer";

const carouselItems = [
  { image: carouselImage1 },
  { image: carouselImage2 },
  { image: carouselImage3 },
];

const services = [
  {
    title: "Videos de Matemáticas",
    description:
      "¡Aprender matemáticas nunca fue tan entretenido! Descubre videos interactivos y dinámicos en nuestro TikTok @MasterBikas, donde hacemos que los conceptos más complejos sean fáciles y divertidos de entender. ¡Síguenos y disfruta aprendiendo!",
    icon: "📹",
  },
  {
    title: "Tutoría de Matemáticas",
    description:
      "Envía tus preguntas y recibe soluciones personalizadas explicadas paso a paso. Nuestros tutores expertos se enfocan en tus necesidades para que aprendas de manera rápida y efectiva. Aprende a tu ritmo y alcanza tus objetivos con nuestro apoyo personalizado.",
    icon: "📘",
  },
  {
    title: "Recursos de Matemáticas",
    description:
      "Encuentra respuestas detalladas a tus dudas, participa en preguntas semanales y acumula puntos para ganar increíbles premios. Aprende mientras te diviertes con recursos diseñados especialmente para que domines las matemáticas y seas recompensado por tu esfuerzo.",
    icon: "📚",
  },
];

const LandingPage = () => {
  return (
    <Box sx={{ bgcolor: "#FEFEFE", minHeight: "100vh" }}>
      <Navbar />

      {/* Carousel */}
      <Box sx={{ width: "100%", height: "100vh", p: 0 }}>
        <Carousel indicators={false} navButtonsAlwaysInvisible>
          {carouselItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                height: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={item.image}
                alt={`Carousel ${index}`}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
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
                  zIndex: 1,
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
        <Box sx={{ mt: 28, textAlign: "center" }}>
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
                sx={{ mb: 2, color: "#0cc0df", fontWeight: "bold" }}
              >
                ¿Quienes somos?
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Impulsamos el aprendizaje en todo el Perú, ayudando a
                estudiantes a resolver dudas, fortalecer sus conocimientos y
                alcanzar sus metas académicas con herramientas personalizadas,
                preguntas desafiantes y recompensas motivadoras.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Servicios */}
        <Box sx={{ mt: 10, textAlign: "center" }}>
          <Typography variant="h4" sx={{ mb: 4, color: "#0cc0df" }}>
            NUESTROS SERVICIOS
          </Typography>
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%", 
                  }}
                >
                  <CardContent
                    sx={{
                      flexGrow: 1, 
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
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

      <Footer />
    </Box>
  );
};

export default LandingPage;
