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
import ZoomableImageModal from "./ZoomableImageModal";

import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const QuestionDetail = () => {
  const { courseId, topicId, questionId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: "50%", y: "50%" });
  const [currentImage, setCurrentImage] = useState(null);
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Fetch question details
        const questionResponse = await axios.get(
          `https://api.master-bikas.com/api/topics/${topicId}/questions`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setQuestion(questionResponse.data);

        const answersMap = {};

        await Promise.all(
          questionResponse.data.map(async (q) => {
            try {
              const paymentResponse = await axios.get(
                `https://api.master-bikas.com/api/check-payment-status/${q.QUESTION_ID}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );

              if (paymentResponse.data.status === "confirmado") {
                const answerResponse = await axios.get(
                  `https://api.master-bikas.com/api/answers/${q.QUESTION_ID}`
                );
                answersMap[q.QUESTION_ID] = {
                  link: answerResponse.data.LINK,
                  isLocked: false,
                };
              } else {
                answersMap[q.QUESTION_ID] = { link: null, isLocked: true };
              }
            } catch (error) {
              answersMap[q.QUESTION_ID] = { link: null, isLocked: true };
            }
          })
        );

        setAnswer(answersMap);

        // Check remaining attempts
        const attemptsResponse = await axios.get(
          "https://api.master-bikas.com/api/attempts",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAttempts(attemptsResponse.data.remaining_attempts);
      } catch (error) {
        if (error.response?.status === 401) {
          alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
          navigate("/login");
        } else if (error.response?.status === 404) {
          console.error("La pregunta o el estado de pago no se encontró.");
        } else {
          console.error("Error al cargar los datos iniciales:", error);
        }
      }
    };

    fetchInitialData();
  }, [topicId, navigate]);

  const handleUnlockContent = async (questionId) => {
    if (isSubmitting) return;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/register");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "https://api.master-bikas.com/api/attempts/use",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.remaining_attempts >= 0) {
        // Intentos disponibles, desbloquear la respuesta
        setAttempts(response.data.remaining_attempts);

        const answerResponse = await axios.get(
          `https://api.master-bikas.com/api/answers/${questionId}`
        );

        setAnswer((prev) => ({
          ...prev,
          [questionId]: { link: answerResponse.data.LINK, isLocked: false },
        }));
      } else {
        // Sin intentos, mostrar el diálogo
        setOpenDialog(true);
      }
    } catch (error) {
      console.error("Error al desbloquear el contenido:", error);
      setOpenDialog(true); // Mostrar el diálogo si hay un error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    navigate("/pago", { state: { questionId } });
  };

  const handleImageClick = (image) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
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
        {Array.isArray(question) && question.length > 0 ? (
          question.map((item, index) => (
            <Box key={index} sx={{ mb: 4 }}>
              {/* Título de la Pregunta */}
              <Typography
                variant="h4"
                sx={{ my: 2, textAlign: "center", color: "#0cc0df" }}
              >
                {`Pregunta ${index + 1}: ${item.QUESTION_TEXT}`}
              </Typography>

              {/* Puntos y Monto */}
              <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
                <strong>Puntos requeridos:</strong> {item.POINTS || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "center", mt: 1 }}>
                <strong>Monto:</strong> S/ {item.AMOUNT || "N/A"}
              </Typography>

              {/* Imagen de la Pregunta */}
              <div
                style={{
                  width: "50%",
                  textAlign: "center",
                  marginBottom: "16px",
                  maxHeight: "400px",
                }}
              >
                <img
                  src={item.QUESTION_IMAGE}
                  alt={`Pregunta ${index + 1}`}
                  style={{
                    width: "100%",
                    maxHeight: "400px",
                    objectFit: "contain",
                    transition: "filter 0.5s ease",
                  }}
                />
              </div>

              {/* Mostrar Respuesta */}
              {answer[item.QUESTION_ID]?.isLocked ? (
                <>
                  <Typography variant="body1" sx={{ textAlign: "center" }}>
                    La respuesta está bloqueada. Usa un intento para
                    desbloquearla.
                  </Typography>
                  <Button
                    onClick={() => handleUnlockContent(item.QUESTION_ID)}
                    disabled={isSubmitting}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    {isSubmitting ? "Procesando..." : "Desbloquear Contenido"}
                  </Button>
                </>
              ) : answer[item.QUESTION_ID]?.link ? (
                <div style={{ width: "50%", margin: "0 auto" }}>
                  <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
                    Respuesta:
                  </Typography>
                  <img
                    src={answer[item.QUESTION_ID].link}
                    alt="Respuesta"
                    style={{ width: "100%", height: "auto", cursor: "pointer" }}
                    onClick={() =>
                      handleImageClick(answer[item.QUESTION_ID].link)
                    }
                  />
                </div>
              ) : (
                <Typography
                  variant="body1"
                  sx={{ textAlign: "center", color: "gray" }}
                >
                  La respuesta no está disponible.
                </Typography>
              )}
            </Box>
          ))
        ) : (
          <Typography
            variant="body1"
            sx={{ color: "red", textAlign: "center" }}
          >
            No hay preguntas disponibles.
          </Typography>
        )}
        {/* Modal para Mostrar la Imagen */}
        <ZoomableImageModal
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          currentImage={currentImage}
        />
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
