import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Paper,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Check as CheckIcon,
  WhatsApp as WhatsAppIcon,
  Email as EmailIcon,
  Close as CloseIcon,
  AccessTime as AccessTimeIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Estilos personalizados
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 16,
    maxWidth: 600,
    width: "100%",
  },
}));

const InfoCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
}));

const TicketDialog = ({
  open,
  onClose,
  ticketId,
  userEmail,
  userPhone,
  selectedOption,
}) => {
  return (
    <StyledDialog open={open} onClose={onClose} fullWidth>
      {/* Header */}
      <DialogTitle
        sx={{
          bgcolor: "primary.main",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", 
          alignItems: "center",
          textAlign: "center", 
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            ¡Master Bikas al rescate de tu nota!
          </Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: "white",
            position: "absolute", 
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {/* Mensaje de éxito */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            Tu pregunta ha sido recibida con éxito y será resuelta por uno de
            nuestros expertos. ¡No te preocupes, aquí no te estafamos, solo te
            salvamos de las tareas difíciles!
          </Typography>
        </Box>

        {/* Número de ticket */}
        <InfoCard elevation={0}>
          <Typography variant="h6" component="div">
            Número de ticket:{" "}
            <Box component="span" fontWeight="bold">
              {ticketId}
            </Box>
          </Typography>
        </InfoCard>

        {/* Información de entrega */}
        <Box sx={{ my: 2 }}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            {selectedOption === "correo" ? (
              <EmailIcon color="primary" />
            ) : (
              <WhatsAppIcon color="primary" />
            )}
            <Typography>
              La solución será enviada a{" "}
              <Box component="span" fontWeight="bold">
                {selectedOption === "correo"
                  ? userEmail || "correo registrado"
                  : userPhone || "número registrado"}
              </Box>
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <AccessTimeIcon color="primary" />
            <Typography>
              En el transcurso del día, una vez confirmado el pago.
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Información de contacto */}
        <Paper
          sx={{
            p: 2,
            bgcolor: "info.light",
            color: "info.contrastText",
          }}
        >
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <InfoIcon />
            <Typography variant="subtitle1">
              ¿No has recibido respuesta?
            </Typography>
          </Box>
          <Typography>
            Comunícate con nosotros al WhatsApp:{" "}
            <Link
              href="https://wa.me/+51921346549"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontWeight: "bold",
                color: "info.dark",
                textDecoration: "underline",
              }}
            >
              +51 921346549
            </Link>{" "}
            indicando tu número de ticket para darle seguimiento.
          </Typography>
        </Paper>

        {/* Mensaje adicional */}
        <Typography
          sx={{ mt: 2, fontStyle: "italic", color: "text.secondary" }}
        >
          Si tienes más preguntas o te persiguen más dudas que el profesor en un
          examen sorpresa, envíalas sin miedo. ¡Estaremos encantados de ayudarte
          a despejar cada incógnita y asegurar que aprendas como debe ser!
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          size="large"
        >
          Cerrar
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default TicketDialog;
