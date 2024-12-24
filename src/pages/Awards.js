import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Divider,
  Container,
} from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AwardsDialog from "./AwardsDialog";
import axios from "axios";

const Awards = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogSuccess, setDialogSuccess] = useState(false);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await axios.get("https://api.master-bikas.com/api/prizes");
        setAwards(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prizes:", error);
        setLoading(false);
      }
    };
    fetchAwards();
  }, []);


  const handleClaim = (award) => {
    if (award.stock > 0) {
      setDialogSuccess(true);
    } else {
      setDialogSuccess(false);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box sx={{ bgcolor: "#FEFEFE", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ p: 5, mt: 2, mb: 5 }}>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Typography
            variant="h4"
            sx={{
              color: "#0cc0df",
              textAlign: "center",
              mb: 2,
            }}
          >
            PREMIOS
          </Typography>

          <Box sx={{ my: 4, p: 3, bgcolor: "#f9f9f9", borderRadius: "8px" }}>
            <Typography variant="h6" gutterBottom>
              Consideraciones Generales
            </Typography>
            <Typography variant="body2" gutterBottom>
              - El stock de los premios se ACTUALIZA la primera semana de cada
              mes.
            </Typography>
            <Typography variant="body2" gutterBottom>
              - Solo se puede reclamar 1 premio por USUARIO.
            </Typography>
            <Typography variant="body2" gutterBottom>
              - Los puntos del usuario SE REINICIAN la primera semana del mes
              siguiente.
            </Typography>
            <Typography variant="body2" gutterBottom>
              - No se permite plagio ni el uso de múltiples cuentas para
              participar.
            </Typography>
            <Typography variant="body2" gutterBottom>
              - Los PREMIOS serán entregados los días sábados o domingos en
              coordinación con el usuario GANADOR.
            </Typography>
            <Typography variant="body2" gutterBottom>
              - Si el usuario es menor de edad, deberá brindar un correo
              electrónico o número de teléfono de su padre, madre o tutor legal.
            </Typography>
            <Typography variant="body2" gutterBottom>
              - Se verificará la autenticidad de los datos proporcionados por el
              usuario GANADOR antes de proceder con la entrega del premio.
            </Typography>
          </Box>

          <Box sx={{ my: 4, p: 3, bgcolor: "#f9f9f9", borderRadius: "8px" }}>
            <Typography variant="h6" gutterBottom>
              Consideraciones para los videojuegos:
            </Typography>
            <Typography variant="body2" gutterBottom>
              - Principal/Primaria: Podrá jugar desde su usuario, con o sin
              conexión a internet.
            </Typography>
            <Typography variant="body2" gutterBottom>
              - Secundaria: Podrá jugar obligatoriamente en el usuario que
              nosotros le enviemos, con conexión a internet fija.
            </Typography>
          </Box>
        </Container>
        <Divider sx={{ my: 4 }} />

        {loading ? (
          <Typography>Cargando premios...</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell>
                    <strong>Img</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Nombre del premio</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Descripción</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Categoría</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Puntos requeridos</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Stock</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Acción</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {awards.map((award) => (
                  <TableRow key={award.id}>
                    <TableCell>{award.imageUrl}</TableCell>
                    <TableCell>{award.name}</TableCell>
                    <TableCell>{award.description}</TableCell>
                    <TableCell>{award.category}</TableCell>
                    <TableCell>{award.points}</TableCell>
                    <TableCell>
                      {award.stock > 0 ? award.stock : "Agotado"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={award.stock === 0}
                        onClick={() => handleClaim(award)}
                      >
                        Reclamar premio
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

      </Box>
      <Footer />
      <AwardsDialog 
        open={dialogOpen} 
        handleClose={handleCloseDialog} 
        success={dialogSuccess} 
      />
    </Box>
  );
};

export default Awards;
