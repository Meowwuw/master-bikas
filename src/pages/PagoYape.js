import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Box, Button, Typography } from "@mui/material";
import Navbar from "./Navbar";

import QRCode from "../assets/images/QR.jpeg";
import QRCode2 from "../assets/images/QR2.jpeg";
import axios from "axios";
import Footer from "./Footer";

const PagoYape = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [timer, setTimer] = useState(300);
  const [questionId, setQuestionId] = useState(
    location.state?.questionId || null
  );
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (!questionId) {
      alert("No se seleccionó ninguna pregunta.");
      navigate("/"); // Redirige si no hay una pregunta seleccionada
    }
  }, [questionId, navigate]);

  useEffect(() => {
    const fetchAmount = async () => {
      if (!questionId) return;
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://54.165.220.109:3000/api/questions/${questionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setAmount(response.data.AMOUNT); 
        }
      } catch (error) {
        console.error("Error al obtener el monto de la pregunta", error);
        alert("Hubo un problema al obtener el monto.");
      }
    };
    fetchAmount();
  }, [questionId]);

  useEffect(() => {
    let countdown;
    if (paymentConfirmed) {
      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            clearInterval(countdown);
            // Check payment status
            checkPaymentStatus();
            
            // If payment is not confirmed, redirect to WhatsApp
            if (!checkIfPaymentConfirmed()) {
              redirectToWhatsApp();
            }
            return 0;
          }
        });
      }, 1000);

      const statusCheckInterval = setInterval(() => {
        checkPaymentStatus();
      }, 10000); // Verificación cada 10 segundos

      return () => {
        clearInterval(countdown);
        clearInterval(statusCheckInterval);
      };
    }
  }, [paymentConfirmed]);


  const checkIfPaymentConfirmed = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://54.165.220.109:3000/api/check-payment-status",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.status === "confirmado";
    } catch (error) {
      console.error("Error al verificar el estado del pago", error);
      return false;
    }
  };
  
  const redirectToWhatsApp = () => {
    const phoneNumber = "+51921346549";
    const message = encodeURIComponent(
      "Hola, necesito ayuda para confirmar mi pago realizado por Yape. ¿Podrían ayudarme?"
    );
    window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
  };

  const handlePayment = async () => {
    if (!questionId) {
      alert("Por favor, selecciona una pregunta.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://54.165.220.109:3000/api/payments-confirm",
        {
          amount,
          payment_method: "YAPE",
          currency: "PEN",
          description: "Pago por acceso a contenido",
          question_id: questionId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setPaymentConfirmed(true);
        alert("Pago realizado. Espera la confirmación.");
      }
    } catch (error) {
      console.error("Error al realizar el pago", error);
      alert("Hubo un problema al procesar tu pago.");
    }
  };

  const checkPaymentStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://54.165.220.109:3000/api/check-payment-status",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "confirmado") {
        // Redirigir a la ruta específica de la pregunta
        const { courseId, topicId, questionId } = response.data;
        navigate(
          `/course/${courseId}/topic/${topicId}/questions/${questionId}`
        );
      } else {
        console.log("El pago no ha sido confirmado todavía.");
      }
    } catch (error) {
      console.error("Error al verificar el estado del pago", error);
    }
  };

  return (
    <Box sx={{ bgcolor: "#FEFEFE", minHeight: "100vh" }}>
      <Navbar />
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
          }}
        >
          <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
            PAGA CON YAPE O PLIN 
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "16px", 
            }}
          >
            <img
              src={QRCode}
              alt="Código QR Yape 1"
              style={{ width: 256, height: 256 }}
            />
            <img
              src={QRCode2}
              alt="Código QR Yape 2"
              style={{ width: 256, height: 256 }}
            />
          </div>
          {amount && (
            <Typography variant="h6" sx={{ mt: 2, textAlign: "center" }}>
              Monto a pagar: S/ {amount}
            </Typography>
          )}

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
              Espera {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}{" "}
              minutos para la confirmación.
            </Typography>
          )}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default PagoYape;
