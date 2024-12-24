import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import axios from "axios";

const AwardsDialog = ({ open, handleClose, success, prizeId, userId }) => {
  const [userPoints, setUserPoints] = useState(0);
  const [prizePointsRequired, setPrizePointsRequired] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      const fetchPoints = async () => {
        try {
          // Obtener puntos del usuario
          const userResponse = await axios.get("https://api.master-bikas.com/api/points", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          setUserPoints(userResponse.data.points);

          // Obtener información del premio
          const prizeResponse = await axios.get("https://api.master-bikas.com/api/prizes");
          const prize = prizeResponse.data.find((prize) => prize.id === prizeId);
          setPrizePointsRequired(prize ? prize.pointsRequired : 0);

          setLoading(false);
        } catch (error) {
          console.error("Error al obtener datos:", error);
          setLoading(false);
        }
      };

      fetchPoints();
    }
  }, [open, prizeId]);

  const message = success
    ? "FELICIDADES, Tu premio será entregado el día sábado o domingo vía whatsapp o correo."
    : userPoints >= prizePointsRequired
    ? "FELICIDADES, Tu premio será entregado el día sábado o domingo vía whatsapp o correo."
    : "BIKEASTE, no tienes los suficientes puntos para reclamar este premio.";

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{success ? "FELICIDADES" : "BIKEASTE"}</DialogTitle>
      <DialogContent>
        {loading ? (
          <DialogContentText>Cargando información...</DialogContentText>
        ) : (
          <DialogContentText>{message}</DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AwardsDialog;
