import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import logo from '../assets/images/logo.jpeg';
import osoIcon from '../assets/images/oso.png';
import axios from 'axios';

const Navbar = () => {
  const [username, setUsername] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [points, setPoints] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedToken = localStorage.getItem('token');

    if (storedUsername) {
      setUsername(storedUsername);
    }

    const fetchPoints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/points', {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
          },
        });
        setPoints(response.data.points); // Asignar los puntos obtenidos
      } catch (error) {
        console.error('Error al obtener los puntos:', error);
      }
    };

    if (storedToken) {
      fetchPoints(); // Llamada a la API para obtener los puntos
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        console.log('Cierre de sesión exitoso');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#1E494F' }}>
      <Toolbar>
        <img src={logo} alt="Logo" style={{ marginRight: 20, width: '50px', height: '50px' }} />
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          MasterBikas
        </Typography>
        <nav>
          <Button color="inherit" sx={{ fontWeight: 'bold', color: '#FEFEFE' }} component={Link} to="/">Inicio</Button>
          <Button color="inherit" sx={{ color: '#FEFEFE' }} component={Link} to="/services">Servicios</Button>
          <Button color="inherit" sx={{ color: '#FEFEFE' }} component={Link} to="/preguntas-personalizadas">Preguntas personalizadas</Button>
          <Button color="inherit" sx={{ color: '#FEFEFE' }} component={Link} to="/about">Sobre Nosotros</Button>
          <Button color="inherit" sx={{ color: '#FEFEFE' }} component={Link} to="/contact">Contacto</Button>
        </nav>

        {username ? (
          <>
            <Typography sx={{ color: '#FEFEFE', marginRight: '10px' }}>
              Hola {username}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={handleMenuClick}>
                <Avatar src={osoIcon} alt="Oso" />
              </IconButton>
              <Typography sx={{ color: '#FEFEFE', marginLeft: '8px' }}>
                {points} pts
              </Typography>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => navigate('/user-profile')}>Mi Perfil</MenuItem>
              <MenuItem onClick={() => navigate('/puntos')}>Mis Puntos</MenuItem>
              <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login" sx={{ color: '#FEFEFE' }}>INICIAR SESIÓN</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
