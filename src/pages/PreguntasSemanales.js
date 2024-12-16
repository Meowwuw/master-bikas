import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Alert,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Navbar from "./Navbar";
import axios from "axios";
import Footer from "./Footer";

const PreguntasSemanales = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState(""); // 'error' o 'success'

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://54.165.220.109:3000/api/weekly-questions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Error al obtener las preguntas:", error);
        setDialogMessage("Error al cargar las preguntas semanales.");
        setDialogType("error");
        setOpenDialog(true);
      }
    };

    fetchQuestions();
  }, []);

  const handleResponse = async (questionId) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      const fileInput = document.getElementById(`file-input-${questionId}`);
      const file = fileInput.files[0];

      if (!file) {
        setDialogMessage("Por favor, selecciona un archivo antes de subir tu respuesta.");
        setDialogType("error");
        setOpenDialog(true);
        return;
      }

      formData.append("file", file);
      formData.append("QUESTION_W_ID", questionId);

      await axios.post(
        "http://54.165.220.109:3000/api/upload-weekly-answer",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setDialogMessage("¡Respuesta enviada correctamente!");
      setDialogType("success");
      setOpenDialog(true);
      // Actualizar el conteo de respuestas
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.QUESTION_W_ID === questionId
            ? { ...q, RESPONSE_COUNT: q.RESPONSE_COUNT + 1 }
            : q
        )
      );
    } catch (error) {
      console.error("Error al enviar la respuesta:", error);
      setDialogMessage("No se pudo enviar la respuesta. Puede que se haya alcanzado el límite.");
      setDialogType("error");
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogMessage("");
  };

  return (
    <Box sx={{ bgcolor: "#FEFEFE", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ p: 5, mt: 2, mb: 5 }}>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            ¡Resuelve y Gana Puntos!
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            Cada pregunta tiene un valor específico en puntos, así que
            ¡¡prepárate que hoy te toca!! Responde correctamente y acumula
            puntos para canjear por premios increíbles. Recuerda, aquí no solo
            se trata de responder, ¡cada respuesta cuenta y puede acercarte un
            paso más a ese premio que tanto deseas!
          </Typography>

          <Box sx={{ my: 4, p: 3, bgcolor: "#f9f9f9", borderRadius: "8px" }}>
            <Typography variant="h6" gutterBottom>
              Reglas de participación:
            </Typography>
            <Typography variant="body2" gutterBottom>
              - La plataforma solo permite <strong>2 respuestas</strong> en
              total para cada pregunta. Una vez que 2 usuarios hayan enviado sus
              respuestas, el botón de envío se desactivará automáticamente.
            </Typography>
            <Typography variant="body2" gutterBottom>
              - Los puntos se actualizarán a los usuarios participantes los días
              domingos luego de que se hayan revisado por Master Bikas.
            </Typography>
            <Typography variant="body2" gutterBottom>
              - Las respuestas deben ser enviadas antes de las{" "}
              <strong>11:59 p.m.</strong> del día en la cual se publicaron las
              preguntas semanales para ser consideradas.
            </Typography>
            <Typography variant="body2" gutterBottom>
              - No se permite plagio ni el uso de múltiples cuentas para
              participar.
            </Typography>
            <Typography variant="body2" gutterBottom>
              - Recordar que todos los puntos se reiniciarán el{" "}
              <strong>día 1 de cada mes.</strong>
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          {questions.map((question) => (
            <Box
              key={question.QUESTION_W_ID}
              sx={{
                mb: 4,
                p: 2,
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h6">
                {question.TOPIC_NAME} (Vale {question.POINTS} puntos)
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <img
                  src={question.QUESTION_IMAGE}
                  alt={question.TOPIC_NAME}
                  style={{ maxWidth: "100%", borderRadius: "8px" }}
                />
              </Typography>
              <input
                type="file"
                id={`file-input-${question.QUESTION_W_ID}`}
                accept="image/*"
                style={{ display: "block", marginBottom: "1rem" }}
                disabled={question.RESPONSE_COUNT >= 2}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={() => handleResponse(question.QUESTION_W_ID)}
                disabled={question.RESPONSE_COUNT >= 2}
              >
                {question.RESPONSE_COUNT >= 2
                  ? "Intentos agotados"
                  : "Sube tu respuesta"}
              </Button>
              <Typography
                variant="caption"
                display="block"
                sx={{
                  mt: 1,
                  color: question.RESPONSE_COUNT >= 2 ? "red" : "green",
                }}
              >
                {question.RESPONSE_COUNT} usuario(s) ya subió su respuesta
              </Typography>
            </Box>
          ))}

{error && (
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
          </Alert>
        )}

        {/* Diálogo de éxito o error */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{dialogType === "error" ? "Error" : "Éxito"}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default PreguntasSemanales;
