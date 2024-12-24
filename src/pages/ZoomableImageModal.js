import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

const ZoomableImageModal = ({ isModalOpen, handleCloseModal, currentImage }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleImageClick = (e) => {
    e.stopPropagation();

    const rect = e.target.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    if (isZoomed) {
      setPosition({ x: 50, y: 50 }); // Reset to center
      setIsZoomed(false);
    } else {
      setPosition({ x: clickX, y: clickY }); // Zoom to clicked position
      setIsZoomed(true);
    }
  };

  const handleMouseMove = (e) => {
    if (isZoomed) {
      const rect = e.target.getBoundingClientRect();
      const moveX = ((e.clientX - rect.left) / rect.width) * 100;
      const moveY = ((e.clientY - rect.top) / rect.height) * 100;

      setPosition({ x: moveX, y: moveY });
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
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
          cursor: "pointer",
        }}
        onClick={handleCloseModal}
      >
        {currentImage && (
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              width: "auto",
              height: "80%",
            }}
          >
            <img
              src={currentImage}
              alt="Zoomed Image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                transition: "transform 0.3s ease",
                transform: isZoomed
                  ? `scale(2) translate(${50 - position.x}%, ${50 - position.y}%)`
                  : "scale(1) translate(0, 0)",
                cursor: isZoomed ? "zoom-out" : "zoom-in",
              }}
              onClick={handleImageClick}
              onMouseMove={handleMouseMove}
            />
            <Box
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                borderRadius: "50%",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              {isZoomed ? <ZoomOutIcon /> : <ZoomInIcon />}
            </Box>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default ZoomableImageModal;
