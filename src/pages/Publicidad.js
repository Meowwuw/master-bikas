import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Fade } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import phoneImage from '../assets/images/phone.png';
import phoneImage2 from '../assets/images/phone2.png';
import DotPagination from './DotPagination';

const ads = [
  {
    title: "Demian the Rat",
    description: "Se presenta en shows que mezclan humor y anécdotas, siendo conocido por su capacidad para conectar con el público a través de su singular narrativa y estilo cómico. Ha realizado presentaciones en diversos lugares y ha ganado reconocimiento en la industria del entretenimiento en Chile.",
    image: phoneImage
  },
  {
    title: "Wendy Ramos",
    description: "Wendy Ramos es una actriz, clown y conferencista peruana, conocida por su trabajo en teatro y televisión. Ha dedicado gran parte de su carrera a la enseñanza y al trabajo social, utilizando el clown como herramienta para el desarrollo personal.",
    image: phoneImage2
  }
];

const Publicidad = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
        setFade(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePageChange = (event, value) => {
    setFade(false);
    setTimeout(() => {
      setCurrentAdIndex(value - 1);
      setFade(true);
    }, 1000);
  };

  const currentAd = ads[currentAdIndex];

  return (
    <Box sx={{ mt: 10, textAlign: 'center', bgcolor: '#c5d9db', color: '#1E494F', width: '100%', p: 3 }}>
      <Container>
        <Grid container spacing={7} alignItems="center">
          <Grid item xs={12} md={6} lg={6} textAlign="left">
            <Fade in={fade} timeout={{ enter: 500, exit: 500 }}>
              <Box>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  {currentAd.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  {currentAd.description}
                </Typography>
              </Box>
            </Fade>
          </Grid>
          <Grid item xs={12} md={6} lg={6} textAlign="center">
            <Fade in={fade} timeout={{ enter: 500, exit: 500 }}>
              <Box sx={{ position: 'relative',  mt: 3 }}>
                <img src={currentAd.image} alt="Publicidad" style={{ width: '300px', height: '600px' }} />
                <PlayCircleOutlineIcon sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 72, color: '#FFFFFF', cursor: 'pointer' }} />
              </Box>
            </Fade>
          </Grid>
        </Grid>
        <DotPagination count={ads.length} page={currentAdIndex + 1} onChange={handlePageChange} />
      </Container>
    </Box>
  );
};

export default Publicidad;
