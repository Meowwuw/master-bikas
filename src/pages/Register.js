import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import logo from "../assets/images/logo.png";
import img1 from "../assets/images/login1.png";
import img2 from "../assets/images/login2.png";
import img3 from "../assets/images/login3.png";

const images = [img1, img2, img3];

const Register = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [username, setUsername] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
  
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
  
    if (!telephone || !countryCode) {
      setError("El código de país y el número de teléfono son obligatorios");
      return;
    }
  
    try {
      const response = await axios.post("http://54.165.220.109:3000/api/users/register", {
        names: username,
        lastName,
        gender,
        email,
        countryCode, // Enviar el código de país como un campo separado
        telephone, // Enviar el número de teléfono como un campo separado
        birthdate,
        password,
      });
  
      if (response.status === 201) {
        setSuccessMessage("Registro exitoso. Revisa tu correo para verificar tu cuenta.");
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (error) {
      setError(error.response?.data?.error || "Hubo un problema con el registro");
    }
  };
  

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      {!isMobile && (
        <Box
          sx={{
            width: "50%",
            height: "100%",
            backgroundImage: `url(${images[currentImage]})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            transition: "background-image 1s ease-in-out",
          }}
        />
      )}
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: isMobile ? "100%" : "50%",
          bgcolor: "#FEFEFE",
          paddingY: 4,
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ marginBottom: 20, width: "125px", height: "125px" }}
        />
        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{
            p: 4,
            borderRadius: 1,
            boxShadow: 3,
            width: "100%",
            bgcolor: "white",
          }}
        >
          <Typography variant="h4" color="#63D9DE" gutterBottom>
            Registro
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombres"
                margin="normal"
                variant="outlined"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Apellidos"
                margin="normal"
                variant="outlined"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Género</InputLabel>
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  label="Género"
                >
                  <MenuItem value="Hombre">Hombre</MenuItem>
                  <MenuItem value="Mujer">Mujer</MenuItem>
                  <MenuItem value="No binario">No binario</MenuItem>
                  <MenuItem value="Otro">Otro</MenuItem>
                  <MenuItem value="Prefiero no decir">
                    Prefiero no decir
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Correo Electrónico"
                type="email"
                margin="normal"
                variant="outlined"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            
              {/* Input para seleccionar el código de país */}
              <Grid item xs={12} sm={3}>
              <FormControl fullWidth margin="normal">
                <PhoneInput
                  country={"pe"} // País predeterminado
                  value={countryCode}
                  onChange={(phone, data) =>
                    setCountryCode(`+${data.dialCode}`)
                  }
                  inputProps={{
                    readOnly: true, // Desactiva la escritura
                  }}
                  inputStyle={{
                    width: "100%",
                    height: "56px",
                    borderRadius: "4px",
                    paddingLeft: "50px",
                    fontSize: "16px",
                  }}
                  buttonStyle={{
                    background: "#FEFEFE",
                    borderTopLeftRadius: "4px",
                    borderBottomLeftRadius: "4px",
                  }}
                  placeholder="Código País"
                />
                </FormControl>
              </Grid>

              {/* Input para escribir el número de teléfono */}
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Número de Teléfono"
                  margin="normal"
                  variant="outlined"
                  required
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="Ingrese su número"
                />
              </Grid>

              {/* Input para la Fecha de Nacimiento */}
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="Fecha de Nacimiento"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                  variant="outlined"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </Grid>
            

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contraseña"
                type="password"
                margin="normal"
                variant="outlined"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Confirmar Contraseña"
                type="password"
                margin="normal"
                variant="outlined"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: "#56b4b8",
              "&:hover": { bgcolor: "#357f82" },
            }}
          >
            Registrarse
          </Button>
        </Box>

        <Snackbar
          open={!!successMessage}
          autoHideDuration={3000}
          onClose={() => setSuccessMessage(null)}
        >
          <Alert
            onClose={() => setSuccessMessage(null)}
            severity="success"
            sx={{ width: "100%" }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Register;
