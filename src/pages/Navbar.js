import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
} from "@mui/material";
import logo from "../assets/images/logo.png";
import osoIcon from "../assets/images/oso.png";
import axios from "axios";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [points, setPoints] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");

    if (storedUsername) {
      setUsername(storedUsername);
    }

    const fetchPoints = async () => {
      try {
        const response = await axios.get(
          "https://api.master-bikas.com/api/points",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        setPoints(response.data.points);
      } catch (error) {
        console.error("Error al obtener los puntos:", error);
      }
    };

    if (storedToken) {
      fetchPoints();
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "https://api.master-bikas.com/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDropdownOpen = (event) => {
    setDropdownAnchorEl(event.currentTarget);
    setDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#0cc0df" }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: "none" }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              marginRight: 20,
              width: "50px",
              height: "50px",
              cursor: "pointer",
            }}
          />
        </Link>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: "bold", color: "#ffffff" }}
        ></Typography>
        <nav>
          <Button
            color="inherit"
            sx={{ fontWeight: "bold", color: "#ffffff" }}
            component={Link}
            to="/"
          >
            Inicio
          </Button>
          <Button
            color="inherit"
            sx={{ fontWeight: "bold", color: "#ffffff" }}
            component={Link}
            to="/services"
          >
            Servicios
          </Button>

          <Box
            onMouseEnter={handleDropdownOpen}
            onMouseLeave={handleDropdownClose}
            sx={{ display: "inline-block", position: "relative" }}
          >
            <Button
              color="inherit"
              sx={{
                color: "#ffffff",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/preguntas-personalizadas")}
              ref={(node) => {
                if (node && !dropdownAnchorEl) {
                  setDropdownAnchorEl(node);
                }
              }}
            >
              Preguntas personalizadas
            </Button>
            <Popper
              open={dropdownOpen}
              anchorEl={dropdownAnchorEl}
              placement="bottom-start"
              transition
              sx={{ zIndex: 1300 }}
            >
              {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                  <Paper
                    sx={{
                      bgcolor: "#0cc0df",
                      mt: 0.5,
                      boxShadow: 3,
                    }}
                  >
                    <ClickAwayListener onClickAway={handleDropdownClose}>
                      <MenuItem
                        onClick={() => {
                          navigate("/preguntas-semanales");
                          handleDropdownClose();
                        }}
                        sx={{
                          color: "#ffffff",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          "&:hover": {
                            bgcolor: "#3FD5EC",
                          },
                          minWidth: "200px",
                        }}
                      >
                        Preguntas semanales
                      </MenuItem>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Box>

          <Button
            color="inherit"
            sx={{ fontWeight: "bold", color: "#ffffff" }}
            component={Link}
            to="/about"
          >
            Sobre Nosotros
          </Button>
          <Button
            color="inherit"
            sx={{ fontWeight: "bold", color: "#ffffff" }}
            component={Link}
            to="/contact"
          >
            Contacto
          </Button>
        </nav>

        {username ? (
          <>
            <Typography
              sx={{ color: "#ffffff", fontWeight: "bold", marginRight: "10px" }}
            >
              Hola, {username}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={handleMenuClick}>
                <Avatar src={osoIcon} alt="Oso" />
              </IconButton>
              <Typography
                sx={{ color: "#ffffff", fontWeight: "bold", marginLeft: "8px" }}
              >
                {points} pts
              </Typography>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => navigate("/user-profile")}>
                Mi Perfil
              </MenuItem>
              <MenuItem onClick={() => navigate("/awards")}>
                Premios
              </MenuItem>
              <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            color="inherit"
            component={Link}
            to="/login"
            sx={{ color: "#FEFEFE" }}
          >
            INICIAR SESIÓN
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
