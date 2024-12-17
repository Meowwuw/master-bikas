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
  Modal
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
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentImage, setCurrentImage] = useState(null); // Guarda la imagen seleccionada
  const [position, setPosition] = useState({ x: "50%", y: "50%" });
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
        const questionsResponse = await axios.get(
          `http://54.165.220.109:3000/api/topics/${topicId}/questions`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setQuestion(questionsResponse.data);

        const paymentResponse = await axios.get(
          `http://54.165.220.109:3000/api/check-payment-status/${questionId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (paymentResponse.data.status === "confirmado") {
          await fetchAnswer();
          return;
        }

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
      setAnswer(answerResponse.data);
      setIsLocked(false);
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
          await fetchAnswer();
        } else {
          setOpenDialog(true);
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

  // Manejar movimiento del mouse para zoom
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100; // Posición horizontal
    const y = ((e.clientY - top) / height) * 100; // Posición vertical
    setPosition({ x: `${x}%`, y: `${y}%` });
  };

  // Manejar apertura del modal
  const handleImageClick = (image) => {
    setCurrentImage(image);
    setIsZoomed(true);
  };

  // Cerrar el modal
  const handleClose = () => {
    setIsZoomed(false);
    setCurrentImage(null);
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setPosition({ x: "50%", y: "50%" });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <Container
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {question.map((question, index) => (
        <Box
          key={index}
          sx={{
            mb: 4,
            textAlign: "center",
          }}
        >
          {/* Título de la pregunta */}
          <Typography
            variant="h4"
            sx={{ my: 2, textAlign: "center", color: "#0cc0df" }}
          >
            {question.QUESTION_TEXT}
          </Typography>

          {/* Imagen con click para agrandar */}
          <div
            style={{
              width: "50%",
              margin: "0 auto",
              cursor: "pointer",
            }}
          >
            <img
              src={question.QUESTION_IMAGE}
              alt={`Pregunta ${index + 1}`}
              style={{
                width: "100%",
                maxHeight: "400px",
                transition: "transform 0.3s ease",
              }}
              onClick={() => handleImageClick(question.QUESTION_IMAGE)} // Click para abrir modal
            />
          </div>
        </Box>
      ))}

      {/* Modal para mostrar imagen grande */}
      <Modal
        open={isZoomed}
        onClose={handleClose}
        aria-labelledby="zoomed-image-modal"
        aria-describedby="image-zoom-description"
      >
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
          onMouseMove={handleMouseMove}
          onClick={handleClose} // Cerrar modal al hacer click afuera
        >
          <img
            src={currentImage}
            alt="Zoomed"
            style={{
              width: "auto",
              height: "80%",
              transformOrigin: `${position.x} ${position.y}`,
              transform: "scale(2)", // Zoom
              transition: "transform 0.2s ease",
            }}
          />
        </Box>
      </Modal>

        {/* Mensaje o respuesta centrada */}
        {isLocked ? (
          <Typography variant="body1" sx={{ mt: 4, textAlign: "center" }}>
            La respuesta está bloqueada. Usa un intento para desbloquearla.
          </Typography>
        ) : (
          <div
            style={{
              width: "50%",
              margin: "0 auto",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Respuesta:
            </Typography>

            <div
              style={{
                overflow: "hidden",
                position: "relative",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <img
                src={answer?.LINK}
                alt="Respuesta"
                style={{
                  width: "100%",
                  height: "auto",
                  transition: "transform 0.3s ease",
                  transform: isZoomed ? "scale(1.5)" : "scale(1)",
                  transformOrigin: `${position.x} ${position.y}`,
                }}
                onMouseEnter={handleMouseEnter}
                onMouseMove={isZoomed ? handleMouseMove : null}
                onMouseLeave={handleMouseLeave}
              />
            </div>
          </div>
        )}

        {/* Botón centrado */}
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
