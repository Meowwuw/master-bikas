import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const QuestionDetail = () => {
  const { courseId, topicId, questionId } = useParams();
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchInitialData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/register");
        return;
      }
  
      try {
        // Fetch question details
        const questionResponse = await axios.get(
          `http://54.165.220.109:3000/api/questions/${questionId}`
        );
        setQuestion(questionResponse.data);
  
        // Check payment status for this question
        const paymentResponse = await axios.get(
          `http://54.165.220.109:3000/api/check-payment-status/${questionId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        if (paymentResponse.data.status === "confirmado") {
          await fetchAnswer(); // Auto-unlock if paid
          return;
        }
  
        // Check remaining attempts
        const attemptsResponse = await axios.get(
          "http://54.165.220.109:3000/api/users/attempts",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAttempts(attemptsResponse.data.remaining_attempts);
  
      } catch (error) {
        if (error.response?.status === 401) {
          alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
          navigate("/register");
        } else if (error.response?.status === 404) {
          console.error("La pregunta o el estado de pago no se encontró.");
        } else {
          console.error("Error al cargar los datos iniciales:", error);
        }
      }
    };
  
    fetchInitialData();
  }, [questionId, navigate]);
  

  const fetchAnswer = async () => {
    try {
      const answerResponse = await axios.get(
        `http://54.165.220.109:3000/api/answers/${questionId}`
      );
      setAnswer(answerResponse.data); // Save answer
      setIsLocked(false); // Unlock content
    } catch (error) {
      console.error("Error al obtener la respuesta:", error);
    }
  };

  const handleUnlockContent = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.post(
          "http://54.165.220.109:3000/api/users/attempts/use",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.remaining_attempts >= 0) {
          setAttempts(response.data.remaining_attempts);
          await fetchAnswer(); // Unlock using attempts
        } else {
          setOpenDialog(true); // Show dialog if no attempts
        }
      } catch (error) {
        console.error("Error al usar los intentos:", error);
        if (error.response?.status === 403) setOpenDialog(true);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      navigate("/register");
      setIsSubmitting(false);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    navigate("/pago", { state: { questionId } });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <Container sx={{ flexGrow: 1 }}>
        <Typography
          variant="h4"
          sx={{ my: 4, textAlign: "center", color: "#0cc0df" }}
        >
          {question.QUESTION_TEXT}
        </Typography>

        <div>
          <img
            src={question.QUESTION_IMAGE}
            alt="Pregunta"
            style={{
              width: "100%",
              maxHeight: "400px",
              transition: "filter 0.5s ease",
            }}
          />
        </div>

        {isLocked ? (
          <Typography variant="body1" sx={{ mt: 4 }}>
            La respuesta está bloqueada. Usa un intento para desbloquearla.
          </Typography>
        ) : (
          <div>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Respuesta:
            </Typography>
            <div style={{ textAlign: "center" }}>
              <img
                src={answer?.LINK}
                alt="Respuesta"
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "contain",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "8px",
                  backgroundColor: "#f9f9f9",
                }}
              />
            </div>
          </div>
        )}

        {isLocked && (
          <Button
            onClick={handleUnlockContent}
            disabled={isSubmitting}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            {isSubmitting ? "Procesando..." : "Desbloquear Contenido"}
          </Button>
        )}
      </Container>

      {/* No Attempts Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Sin intentos restantes</DialogTitle>
        <DialogContent>
          <Typography>
            No tienes intentos restantes. Serás redirigido a la página de pago
            para realizar el pago correspondiente.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            color="primary"
            variant="contained"
          >
            Ir al Pago
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </Box>
  );
};

export default QuestionDetail;
