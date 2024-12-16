import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TikTokIcon from '../assets/images/tiktok.png'; 

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#3FD5EC',
        color: '#ffffff',
        textAlign: 'center',
        p: 2,
        mt: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        © 2024 MasterBikas. Todos los derechos reservados.
      </Typography>
      <Box>
        <IconButton
          component="a"
          href="https://www.facebook.com/profile.php?id=61566966383351"
          target="_blank"
          sx={{ color: '#ffffff', mx: 1 }}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.instagram.com"
          target="_blank"
          sx={{ color: '#ffffff', mx: 1 }}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          component="a"
          href=" wa.me/+51921346549"
          target="_blank"
          sx={{ color: '#ffffff', mx: 1 }}
        >
          <WhatsAppIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.tiktok.com/@master.bikas"
          target="_blank"
          sx={{ mx: 1 }}
        >
          <img
            src={TikTokIcon}
            alt="TikTok"
            style={{ width: 24, height: 24 }}
            
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
