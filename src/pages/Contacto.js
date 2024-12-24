import React, { useState } from "react";
import axios from "axios";
import { Container, Typography, Grid, TextField, Button, Box, Alert } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Contacto = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess(false);
    setError(false);

    try {
      const response = await axios.post(
        "https://api.master-bikas.com/api/contact-request",
        formData
      );

      if (response.status === 201) {
        setSuccess(true); 
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
        }); // Limpiar el formulario
      }
    } catch (err) {
      console.error("Error al enviar el formulario:", err);
      setError(true); // Mostrar mensaje de error
    }
  };

  return (
    <Box sx={{ bgcolor: "#FEFEFE", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ p: 5, mt: 2, mb: 5 }}>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: "center", color: "#0cc0df" }}>
            Contacto
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                ¡Trabajemos Juntos!
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Si deseas consultar mayor información sobre nuestros servicios o tienes alguna duda al respecto, no dudes en solicitar una consultoría gratuita y uno de nuestros asesores te contactará a la brevedad.
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Contáctanos vía WhatsApp +52 55 7977 1949
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h6">¿Quieres saber más?</Typography>
                <TextField
                  label="Nombre"
                  variant="outlined"
                  required
                  fullWidth
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <TextField
                  label="Apellido"
                  variant="outlined"
                  required
                  fullWidth
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <TextField
                  label="Correo"
                  variant="outlined"
                  required
                  fullWidth
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  label="Teléfono"
                  variant="outlined"
                  fullWidth
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Enviar
                </Button>
                {success && <Alert severity="success">¡Envío correcto!</Alert>}
                {error && <Alert severity="error">Error al enviar el formulario. Intenta de nuevo.</Alert>}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Contacto;
