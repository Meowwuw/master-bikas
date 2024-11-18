import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Grid, Typography, Fade } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import DotPagination from "./DotPagination";
import axios from "axios";

const Publicidad = () => {
  const [ads, setAds] = useState([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // Fetch videos from API
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get("http://54.165.220.109:3000/api/videos");
        setAds(response.data);
      } catch (error) {
        console.error("Error al obtener los videos:", error);
      }
    };
    fetchAds();
  }, []);

  // Carousel functionality
  useEffect(() => {
    if (isPlaying || ads.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
        setFade(true);
      }, 500);
    }, 7000);

    return () => clearInterval(interval);
  }, [ads, isPlaying]);

  const handlePageChange = (event, value) => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setFade(false);
    setTimeout(() => {
      setCurrentAdIndex(value - 1);
      setFade(true);
    }, 500);
  };

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  if (ads.length === 0) {
    return (
      <Box
        sx={{
          mt: 14,
          pb: 7,
          textAlign: "center",
          bgcolor: "#c5d9db",
          color: "#1E494F",
          width: "100%",
        }}
      >
        <Container>
          <Typography variant="h6" sx={{ mt: 4 }}>
            Cargando anuncios...
          </Typography>
        </Container>
      </Box>
    );
  }

  const currentAd = ads[currentAdIndex];

  return (
    <Box
      sx={{
        mt: 14,
        pb: 7,
        textAlign: "center",
        bgcolor: "#c5d9db",
        color: "#1E494F",
        width: "100%",
      }}
    >
      <Container>
        <Grid container spacing={7} alignItems="center">
          {/* Text Content */}
          <Grid item xs={12} md={6} lg={6} textAlign="left">
            <Fade in={fade} timeout={{ enter: 500, exit: 500 }}>
              <Box>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  {currentAd.TITLE}
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  {currentAd.ACTOR_DESCRIPTION}
                </Typography>
              </Box>
            </Fade>
          </Grid>
          {/* Video Container */}
          <Grid item xs={12} md={6} lg={6} textAlign="center">
            <Box
              sx={{
                position: "relative",
                width: "280px",
                height: "500px",
                margin: "0 auto",
                borderRadius: "30px",
                backgroundColor: "#000",
                padding: "8px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                border: "8px solid #333",
              }}
            >
              {/* Notch del celular */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "120px",
                  height: "20px",
                  backgroundColor: "#000",
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px",
                  zIndex: 2,
                }}
              />
              {/* Contenedor de video */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  borderRadius: "30px",
                  overflow: "hidden",
                }}
              >
                <video
                  key={currentAdIndex}
                  ref={videoRef}
                  src={ads[currentAdIndex].LINK}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onPause={handlePause}
                  onEnded={handleVideoEnd}
                  controls={false}
                />
                {/* Botón de play */}
                {!isPlaying && (
                  <Box
                    onClick={handlePlay}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.4)", 
                      },
                    }}
                  >
                    <PlayCircleOutlineIcon
                      sx={{
                        fontSize: 50,
                        color: "#FFFFFF",
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <DotPagination
            count={ads.length}
            page={currentAdIndex + 1}
            onChange={handlePageChange}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Publicidad;
