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
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false);
  const [questionId, setQuestionId] = useState(
    location.state?.questionId || null
  );
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (!questionId) {
      alert("No se seleccionó ninguna pregunta.");
      navigate("/");
    }
  }, [questionId, navigate]);

  useEffect(() => {
    const fetchAmount = async () => {
      if (!questionId) return;
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://api.master-bikas.com/api/questions/${questionId}`,
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
            setShowWhatsAppButton(true);
            checkPaymentStatus();
            return 0;
          }
        });
      }, 1000);

      const statusCheckInterval = setInterval(() => {
        checkPaymentStatus();
      }, 10000);

      return () => {
        clearInterval(countdown);
        clearInterval(statusCheckInterval);
      };
    }
  }, [paymentConfirmed]);

  const redirectToWhatsApp = () => {
    const phoneNumber = "+51921346549";
    const message = encodeURIComponent(
      "Hola, necesito ayuda para confirmar mi pago realizado por Yape. ¿Podrían ayudarme?"
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const checkIfPaymentConfirmed = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://api.master-bikas.com/api/check-payment-status",
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

  const handlePayment = async () => {
    if (!selectedMethod) {
      alert("Por favor, selecciona un método de pago.");
      return;
    }

    if (!questionId) {
      alert("Por favor, selecciona una pregunta.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://api.master-bikas.com/api/payments-confirm",
        {
          amount,
          payment_method: selectedMethod,
          currency: "PEN",
          description: `Pago por acceso a contenido con ${selectedMethod}`,
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

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const checkPaymentStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://api.master-bikas.com/api/check-payment-status",
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
          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 4 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleMethodSelect("YAPE")}
              sx={{
                bgcolor: selectedMethod === "YAPE" ? "#0cc0df" : "inherit",
              }}
            >
              Pagar con YAPE
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleMethodSelect("PLIN")}
              sx={{
                bgcolor: selectedMethod === "PLIN" ? "#0cc0df" : "inherit",
              }}
            >
              Pagar con PLIN
            </Button>
          </Box>

          {selectedMethod && (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <img
                src={selectedMethod === "YAPE" ? QRCode : QRCode2}
                alt={`Código QR ${selectedMethod}`}
                style={{ width: 256, height: 256 }}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Escanea el código para pagar con {selectedMethod}
              </Typography>
            </Box>
          )}

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

          {showWhatsAppButton && (
            <button
              onClick={redirectToWhatsApp}
              style={{
                backgroundColor: "#25D366",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                marginTop: "1rem",
              }}
            >
              Contactar por WhatsApp
            </button>
          )}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default PagoYape;
