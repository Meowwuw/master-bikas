import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Checkbox,
} from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import logo from "../assets/images/logo.png";
import img1 from "../assets/images/login1.png";
import img2 from "../assets/images/login2.png";
import img3 from "../assets/images/login3.png";
import axios from "axios";

const images = [img1, img2, img3];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!acceptTerms || !acceptPrivacy) {
      setError("Debe aceptar los términos y la política de privacidad.");
      return;
    }

    try {
      const response = await axios.post(
        "http://54.165.220.109:3000/api/users/login",
        {
          email,
          password,
          recaptchaToken,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username); // Guardar el primer nombre
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
      }
    }
  };

  const onReCAPTCHAChange = (token) => {
    setRecaptchaToken(token);
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
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={images[currentImage]}
            alt={`Imagen ${currentImage + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              opacity: fade ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </Box>
      )}
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: isMobile ? "100%" : "50%",
          bgcolor: "#FEFEFE",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ marginBottom: 20, width: "125px", height: "125px" }}
        />
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            p: 4,
            borderRadius: 1,
            boxShadow: 3,
            width: "100%",
            maxWidth: 400,
            bgcolor: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%", 
            }}
          >
          <Typography variant="h4" color="#63D9DE" gutterBottom>
            Iniciar sesión
          </Typography></Box>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <TextField
            fullWidth
            label="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            type="password"
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <Typography component="span" sx={{ ml: 1 }}>
              Acepto los{" "}
              <Link
                component="a"
                href="/terms-and-conditions"
                target="_blank"
                sx={{
                  textDecoration: "underline",
                  color: "#7CD9DE",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                términos y condiciones
              </Link>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={acceptPrivacy}
              onChange={(e) => setAcceptPrivacy(e.target.checked)}
            />
            <Typography component="span" sx={{ ml: 1 }}>
              Acepto la{" "}
              <Link
                component="a"
                href="/privacy-policy"
                target="_blank"
                sx={{
                  textDecoration: "underline",
                  color: "#7CD9DE",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                política de privacidad
              </Link>
            </Typography>
          </Box>

          <ReCAPTCHA
            sitekey="6LfDMlYqAAAAAIL7d5D3kFZDhzW9_Ce-JRcF6LQB"
            onChange={onReCAPTCHAChange}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: "#63D9DE",
              "&:hover": { bgcolor: "#4bb4b8" },
            }}
            disabled={!recaptchaToken || !acceptTerms || !acceptPrivacy}
          >
            Iniciar sesión
          </Button>
        </Box>
        <Link href="/register" underline="hover" sx={{ mt: 2, color: "gray" }}>
          ¿No tienes cuenta? Regístrate
        </Link>
        <Link
          href="/forgot-password"
          underline="hover"
          sx={{ mt: 2, color: "gray" }}
        >
          Olvidé mi contraseña
        </Link>
      </Container>
    </Box>
  );
};

export default Login;
