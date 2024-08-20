import React, { useState, useEffect } from 'react';
import { Container, Box, Button, Typography, CircularProgress } from '@mui/material';
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const PagoYape = ({ user, onPaymentConfirmed }) => {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutos
  const navigate = useNavigate();

  useEffect(() => {
    let countdown;
    if (paymentConfirmed) {
      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            clearInterval(countdown);
            navigate('/whatsapp');
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [paymentConfirmed, navigate]);

  const handlePaymentConfirmed = () => {
    setPaymentConfirmed(true);
    onPaymentConfirmed(user); // Notificar al backend
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4">Realizar Pago con Yape</Typography>
        <Box sx={{ my: 4 }}>
          <QRCode value="https://yape-link" size={256} />
        </Box>
        {!paymentConfirmed ? (
          <Button variant="contained" color="primary" onClick={handlePaymentConfirmed}>
            He realizado el pago
          </Button>
        ) : (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Esperando confirmación del pago...</Typography>
            <Typography variant="body1">Tiempo restante: {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}</Typography>
            <CircularProgress sx={{ mt: 2 }} />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default PagoYape;
