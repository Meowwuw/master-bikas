import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "./Navbar";
import TicketDialog from "./TicketDialog";
import QR from "../assets/images/QR.jpeg";
import QR2 from "../assets/images/QR2.jpeg";
import Footer from "./Footer";
import {
  Typography,
  TextField,
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Autocomplete,
} from "@mui/material";
import axios from "axios";

const PreguntasPersonalizadas = () => {
  const [selectedOption, setSelectedOption] = useState("correo");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [amount, setAmount] = useState(1);
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [questionImage, setQuestionImage] = useState(null);
  const [paymentProof, setPaymentProof] = useState(null);
  const [questionUploaded, setQuestionUploaded] = useState(false);
  const [paymentUploaded, setPaymentUploaded] = useState(false);
  const [courses, setCourses] = useState([]);
  const [ticketId, setTicketId] = useState("");
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [whatsappOption, setWhatsappOption] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);

      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            "https://api.master-bikas.com/api/perfil",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUserPhone(response.data.TELEPHONE || "");
          setUserEmail(response.data.EMAIL || "");
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
        }
      };

      fetchUserData();
    }

    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://api.master-bikas.com/api/courses"
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    const validExtensions = ["image/png", "image/jpeg", "image/jpg"];

    if (!file || !validExtensions.includes(file.type)) {
      setError("Solo se permiten archivos de tipo PNG, JPG o JPEG.");
      return;
    }

    setError("");

    if (type === "question") {
      setQuestionImage(file);
      setQuestionUploaded(true);
    }

    if (type === "payment") {
      setPaymentProof(file);
      setPaymentUploaded(true);
    }
  };

  const handleWhatsAppOption = async () => {
    console.log("Iniciando envío por WhatsApp...");
    setWhatsappOption(true);
    setPaymentProof(null);
    setPaymentUploaded(false);

    // Validaciones específicas antes de enviar
    if (!questionImage) {
      console.error("Error: Falta adjuntar la imagen de la pregunta.");
      setError(
        "Por favor, adjunta la imagen de la pregunta antes de continuar."
      );
      return;
    }

    if (!selectedCourse) {
      console.error("Error: No se seleccionó un curso.");
      setError("Por favor, selecciona un curso antes de enviar la consulta.");
      return;
    }

    if (!selectedLevel || !schoolName) {
      console.error(
        "Error: Datos incompletos (nivel escolar o nombre de la escuela)."
      );
      setError(
        "Por favor, completa el nivel escolar y el nombre de la escuela."
      );
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log("Token obtenido:", token);

      let questionImageUrl = null;

      // Subir la imagen de la pregunta si existe
      if (questionImage) {
        console.log("Subiendo imagen de la pregunta...");
        const questionFormData = new FormData();
        questionFormData.append("file", questionImage);

        const questionUploadResponse = await axios.post(
          "https://api.master-bikas.com/api/upload-question",
          questionFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(
          "Respuesta del backend (upload-question):",
          questionUploadResponse.data
        );
        questionImageUrl = questionUploadResponse.data.url;
      }

      console.log("URL de la imagen de la pregunta:", questionImageUrl);

      // Manejo de COURSE_ID y USER_COURSE
      let courseId = null;
      let userCourse = null;

      if (typeof selectedCourse === "string") {
        // Curso personalizado
        userCourse = selectedCourse;
      } else if (selectedCourse?.COURSE_ID) {
        // Curso existente
        courseId = selectedCourse.COURSE_ID;
      }

      // Crear el payload con la URL de la imagen
      const payload = {
        COURSE_ID: courseId,
        USER_COURSE: userCourse,
        SCHOOL_CATEGORY: selectedLevel,
        SCHOOL_NAME: schoolName,
        CUSTOM_QUESTION_URL: questionImageUrl,
        CUSTOM_PAYMENT_URL: null,
        WHATSAPP_OPTION: true,
      };

      console.log("Datos enviados al backend (WhatsApp):", payload);

      const response = await axios.post(
        "https://api.master-bikas.com/api/pregunta",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Respuesta del backend (WhatsApp):", response.data);

      const ticketId = response.data.ticketId;
      console.log("Ticket generado:", ticketId);

      // Redirigir a WhatsApp
      const message = encodeURIComponent(
        `Hola, tengo una consulta personalizada. Mi ticket es ${ticketId}. Por favor, ayúdenme con más información.`
      );
      const whatsappUrl = `https://wa.me/51921346549?text=${message}`;
      console.log("URL de WhatsApp:", whatsappUrl);

      window.open(whatsappUrl, "_blank");
      setTicketId(ticketId);
      setOpenDialog(true);
      window.location.reload();
    } catch (error) {
      console.error("Error al enviar la pregunta por WhatsApp:", error);
      setError("No se pudo enviar la consulta. Intenta de nuevo.");
    }
  };

  const handleSubmit = async () => {
    console.log("Iniciando envío del formulario...");

    // Validaciones específicas
    if (!questionImage && !whatsappOption && !paymentProof) {
      console.error("Error: Ningún archivo o opción seleccionada.");
      setError(
        "Por favor, adjunta una imagen de la pregunta, un comprobante de pago, o elige enviar por WhatsApp."
      );
      return;
    }

    if (paymentProof && !questionImage) {
      console.error(
        "Error: Se adjuntó comprobante, pero falta la imagen de la pregunta."
      );
      setError(
        "Por favor, adjunta la imagen de la pregunta antes de enviar el comprobante de pago."
      );
      return;
    }

    if (!selectedCourse) {
      console.error("Error: No se seleccionó un curso.");
      setError("Por favor, selecciona un curso antes de enviar la consulta.");
      return;
    }

    if (!selectedLevel || !schoolName) {
      console.error(
        "Error: Datos incompletos (nivel escolar o nombre de la escuela)."
      );
      setError(
        "Por favor, completa el nivel escolar y el nombre de la escuela."
      );
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log("Token obtenido:", token);

      let questionImageUrl = null;
      let paymentProofUrl = null;

      // Subir la imagen de la pregunta si existe
      if (questionImage) {
        console.log("Subiendo imagen de la pregunta...");
        const questionFormData = new FormData();
        questionFormData.append("file", questionImage);

        const questionUploadResponse = await axios.post(
          "https://api.master-bikas.com/api/upload-question",
          questionFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(
          "Respuesta del backend (upload-question):",
          questionUploadResponse.data
        );
        questionImageUrl = questionUploadResponse.data.url;
      }

      // Subir el comprobante de pago si existe
      if (paymentProof) {
        console.log("Subiendo comprobante de pago...");
        const paymentFormData = new FormData();
        paymentFormData.append("file", paymentProof);

        const paymentUploadResponse = await axios.post(
          "https://api.master-bikas.com/api/upload-payment-proof",
          paymentFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(
          "Respuesta del backend (upload-payment-proof):",
          paymentUploadResponse.data
        );
        paymentProofUrl = paymentUploadResponse.data.url;
      }

      console.log("Valor de selectedCourse antes del manejo:", selectedCourse);
      console.log("Tipo de selectedCourse:", typeof selectedCourse);

      // Manejo de COURSE_ID y USER_COURSE
      let courseId = null;
      let userCourse = null;

      if (typeof selectedCourse === "string") {
        // Curso personalizado
        userCourse = selectedCourse;
      } else if (selectedCourse?.COURSE_ID) {
        // Curso existente
        courseId = selectedCourse.COURSE_ID;
      }

      // Enviar los datos al backend
      const payload = {
        COURSE_ID: courseId,
        USER_COURSE: userCourse,
        SCHOOL_CATEGORY: selectedLevel,
        SCHOOL_NAME: schoolName,
        CUSTOM_QUESTION_URL: questionImageUrl,
        CUSTOM_PAYMENT_URL: paymentProofUrl,
        WHATSAPP_OPTION: whatsappOption,
      };

      console.log("Datos enviados al backend (pregunta):", payload);

      const response = await axios.post(
        "https://api.master-bikas.com/api/pregunta",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Respuesta del backend (pregunta):", response.data);

      setTicketId(response.data.ticketId);
      setOpenDialog(true);
    } catch (error) {
      console.error("Error al enviar la pregunta:", error);
      setError("Error al enviar la pregunta. Por favor, intenta nuevamente.");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    window.location.reload();
  };

  return (
    <Box sx={{ bgcolor: "#FEFEFE", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ p: 5, mt: 2, mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Envíanos tus preguntas
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", mb: 2 }} gutterBottom>
          ¿No encontraste una pregunta similar a la que buscas? No te preocupes,
          envíanos tu ejercicio y<br></br>recibirás la solución detallada en un
          plazo máximo de 1 día hábil.
        </Typography>
        {error && (
          <Typography variant="body2" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <RadioGroup
                row
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <FormControlLabel
                  value="correo"
                  control={<Radio />}
                  label="Correo"
                />
                <FormControlLabel
                  value="whatsapp"
                  control={<Radio />}
                  label="WhatsApp"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              label={selectedOption === "correo" ? "Correo" : "Número WhatsApp"}
              value={selectedOption === "correo" ? userEmail : userPhone}
              fullWidth
              sx={{ mb: 3 }}
              disabled
            />
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Autocomplete
                options={courses}
                getOptionLabel={(option) =>
                  typeof option === "string"
                    ? option
                    : option?.COURSE_NAME || ""
                }
                value={selectedCourse}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    // El usuario escribió un curso personalizado
                    setSelectedCourse(newValue);
                  } else if (newValue && newValue.COURSE_NAME) {
                    // El usuario seleccionó un curso existente
                    setSelectedCourse(newValue);
                  } else {
                    // Vaciar el valor si el usuario borra el texto
                    setSelectedCourse("");
                  }
                }}
                onInputChange={(event, newInputValue) => {
                  // Actualizar el estado mientras el usuario escribe
                  setSelectedCourse(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecciona o escribe un curso"
                    variant="outlined"
                  />
                )}
                freeSolo
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <Select
                value={selectedLevel}
                onChange={(e) => {
                  const level = e.target.value;
                  setSelectedLevel(level);

                  // Lógica de precios
                  if (level === "Colegio" || level === "Academia") {
                    setAmount(1);
                  } else if (level === "Instituto" || level === "Universidad") {
                    setAmount(3);
                  }
                }}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Selecciona el nivel de estudio
                </MenuItem>
                <MenuItem value="Colegio">Colegio</MenuItem>
                <MenuItem value="Instituto">Instituto</MenuItem>
                <MenuItem value="Academia">Academia</MenuItem>
                <MenuItem value="Universidad">Universidad</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Nombre de la institución educativa (opcional)"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              fullWidth
              sx={{ mb: 3 }}
            />

            <TextField
              label="Monto"
              value={selectedLevel ? `S/ ${amount}` : "Monto a pagar"}
              fullWidth
              sx={{
                mb: 3,
                "& .MuiInputBase-root.Mui-disabled": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 2,
              }}
            >

              <Button
                variant="outlined"
                component="label"
                sx={{
                  bgcolor: questionUploaded ? "success.main" : "inherit",
                  color: questionUploaded ? "white" : "inherit",
                  border: questionUploaded
                    ? "1px solid #4caf50"
                    : "1px solid rgba(0, 0, 0, 0.23)",
                  "&:hover": {
                    bgcolor: questionUploaded
                      ? "success.dark"
                      : "rgba(0, 0, 0, 0.04)",
                    border: questionUploaded
                      ? "1px solid #43a047"
                      : "1px solid rgba(0, 0, 0, 0.23)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                {questionUploaded
                  ? "Imagen adjuntada ✓"
                  : "Adjuntar imagen de la pregunta"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onInput={(e) => {
                    handleFileChange(e, "question");
                  }}
                />
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!whatsappOption && !paymentUploaded}
              >
                Enviar
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
            <img
              src={QR}
              alt="Código QR de Yape"
              style={{ maxWidth: "250px", marginBottom: "20px" }}
            />

            <img
              src={QR2}
              alt="Código QR de Yape"
              style={{ maxWidth: "250px", marginBottom: "20px" }}
            />
            <Typography variant="body1" gutterBottom>
              Escanea el código QR para realizar el pago
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 3,
              }}
            >
              <Button
                variant="outlined"
                component="label"
                disabled={!questionUploaded || whatsappOption} 
                sx={{
                  mb: 2,
                  bgcolor: paymentUploaded ? "success.main" : "inherit",
                  color: paymentUploaded ? "white" : "inherit",
                  border: paymentUploaded
                    ? "1px solid #4caf50"
                    : "1px solid rgba(0, 0, 0, 0.23)",
                  "&:hover": {
                    bgcolor: paymentUploaded
                      ? "success.dark"
                      : "rgba(0, 0, 0, 0.04)",
                    border: paymentUploaded
                      ? "1px solid #43a047"
                      : "1px solid rgba(0, 0, 0, 0.23)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                {paymentUploaded
                  ? "Comprobante adjuntado ✓"
                  : "Adjuntar comprobante de pago"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "payment")}
                />
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleWhatsAppOption}
                disabled={!questionUploaded}    
                sx={{
                  mt: 2,
                  bgcolor: whatsappOption ? "success.main" : "inherit",
                  color: whatsappOption ? "white" : "inherit",
                  border: whatsappOption
                    ? "1px solid #4caf50"
                    : "1px solid rgba(0, 0, 0, 0.23)",
                  "&:hover": {
                    bgcolor: whatsappOption
                      ? "success.dark"
                      : "rgba(0, 0, 0, 0.04)",
                    border: whatsappOption
                      ? "1px solid #43a047"
                      : "1px solid rgba(0, 0, 0, 0.23)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                Enviar por WhatsApp
              </Button>
            </Box>
          </Grid>
        </Grid>

        <TicketDialog
          open={openDialog}
          onClose={handleCloseDialog}
          ticketId={ticketId}
          userEmail={userEmail}
          userPhone={userPhone}
          selectedOption={selectedOption}
        />
      </Box>
      <Footer />
    </Box>
  );
};

export default PreguntasPersonalizadas;
