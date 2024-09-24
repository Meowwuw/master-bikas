import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Box, Button, Typography, AppBar, Toolbar, IconButton, TextField } from '@mui/material';
import QRCode from 'qrcode.react';
import axios from 'axios';

import logo from '../assets/images/logo.jpeg';
import LoginIcon from '@mui/icons-material/Login';

const PagoYape = () => {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutos
  const [amount, setAmount] = useState(''); // Monto ingresado por el usuario
  const navigate = useNavigate();

  useEffect(() => {
    let countdown;
    if (paymentConfirmed) {
      // Temporizador para contar 5 minutos
      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            clearInterval(countdown);
            checkPaymentStatus(); // Verificar el estado del pago cuando el tiempo llegue a 0
            return 0;
          }
        });
      }, 1000);
  
      // Verificar el estado del pago cada 10 segundos
      const statusCheckInterval = setInterval(() => {
        checkPaymentStatus();
      }, 10000); // Verificación cada 10 segundos
  
      return () => {
        clearInterval(countdown);
        clearInterval(statusCheckInterval); // Limpiar ambos intervalos
      };
    }
  }, [paymentConfirmed, navigate]);
  

  const handlePayment = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Por favor, ingresa un monto válido.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/payments/confirm',
        { amount }, // Se envía el monto
        {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token JWT correctamente
          },
        }
      );

      if (response.status === 200) {
        setPaymentConfirmed(true); // Actualiza el estado para mostrar el temporizador
        alert('Pago realizado. Espera la confirmación.');
      }
    } catch (error) {
      console.error('Error al realizar el pago', error);
      alert('Hubo un problema al procesar tu pago.');
    }
  };

  const checkPaymentStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/payments/check-payment-status', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === 'confirmado') {
        navigate('/course/:courseName/topic/:topicName/question/:questionName'); 
      } else {
        console.log('El pago no ha sido confirmado todavía.');
      }
    } catch (error) {
      console.error('Error al verificar el estado del pago', error);
      alert('Hubo un problema al verificar el estado del pago.');
    }
  };

  return (
    <Box sx={{ bgcolor: '#FEFEFE', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: '#1E494F' }}>
        <Toolbar>
          <img src={logo} alt="Logo" style={{ marginRight: 20, width: '50px', height: '50px' }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            MasterBikas
          </Typography>
          <nav>
            <Button color="inherit" sx={{ fontWeight: 'bold', color: '#FEFEFE' }} component={Link} to="/">
              Inicio
            </Button>
            <Button component={Link} to="/services" color="inherit" sx={{ color: '#FEFEFE' }}>
              Servicios
            </Button>
            <Button component={Link} to="/about" color="inherit" sx={{ color: '#FEFEFE' }}>
              Sobre Nosotros
            </Button>
            <Button component={Link} to="/contact" color="inherit" sx={{ color: '#FEFEFE' }}>
              Contacto
            </Button>
          </nav>
          <IconButton color="inherit" component={Link} to="/register">
            <LoginIcon sx={{ color: '#FEFEFE' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Paga con Yape
          </Typography>
          <QRCode value="URL_DEL_CODIGO_QR_DE_YAPE" size={256} />
          <TextField
            label="Monto"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            sx={{ mt: 4 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handlePayment}
            sx={{ mt: 4 }}
            disabled={paymentConfirmed}
          >
            Pago realizado
          </Button>
          {paymentConfirmed && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              Espera {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)} minutos para la confirmación.
            </Typography>
          )}
          {paymentConfirmed && timer <= 0 && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              No se ha recibido la confirmación del pago. Serás redirigido a WhatsApp para obtener ayuda.
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default PagoYape;
