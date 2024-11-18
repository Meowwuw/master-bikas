import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Grid,
  Alert,
  Toolbar,
  AppBar,
  InputBase,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(
        "http://54.165.220.109:3000/api/testimonials"
      );
      setTestimonials(response.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  const handleLogout = () => {
    navigate('/');
};

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !position || !content) {
      setError("Por favor, complete todos los campos");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("position", position);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      if (editing) {
        await axios.put(
          `http://54.165.220.109:3000/api/testimonials/${editingId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data' // Asegura que se envía como form-data
            }
          }
        );
        setSuccessMessage("Testimonio actualizado exitosamente");
      } else {
        await axios.post("http://54.165.220.109:3000/api/testimonials", formData, {
          headers: {
            'Content-Type': 'multipart/form-data' // Asegura que se envía como form-data
          }
        });
        setSuccessMessage("Testimonio agregado exitosamente");
      }

      fetchTestimonials();
      resetForm();
    } catch (error) {
      console.error("Error saving testimonial:", error);
      setError("Hubo un problema al guardar el testimonio");
    }
  };



  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://54.165.220.109:3000/api/testimonials/${id}`);
      setSuccessMessage("Testimonio eliminado exitosamente");
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  const handleEdit = (testimonial) => {
    setName(testimonial.name);
    setPosition(testimonial.position);
    setContent(testimonial.content);
    setImage(null);
    setEditing(true);
    setEditingId(testimonial.id);
  };

  const resetForm = () => {
    setName("");
    setPosition("");
    setContent("");
    setImage(null);
    setEditing(false);
    setEditingId(null);
    setError("");
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <AppBar position="static" sx={{ backgroundColor: "#1E494F" }}>
        <Toolbar>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                color: "#FCFBFC",
                cursor: "pointer",
              }}
            >
              Admin Panel
            </Typography>
          </Link>

          <nav className="flex flex-row gap-5">
            <Button
              color="inherit"
              sx={{ fontWeight: "bold", color: "#FCFBFC" }}
            >
              Dashboard
            </Button>
          </nav>
          <Box sx={{ flexGrow: 1 }} />
          <InputBase
            placeholder="Buscar..."
            startAdornment={<SearchIcon sx={{ marginRight: 1 }} />}
            sx={{
              backgroundColor: "#FCFBFC",
              padding: "6px 8px",
              borderRadius: "4px",
              width: { sm: "300px", md: "200px", lg: "300px" },
            }}
          />
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon sx={{ color: "#FCFBFC" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <main className="flex-1 p-4 bg-[#FCFBFC]" style={{ marginTop: "50px" }}>
        <Container maxWidth="md" sx={{ mt: 5 }}>
          <Typography variant="h4" color="#63D9DE" gutterBottom>
            Administrar Testimonios
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          {/* Formulario para agregar o editar testimonios */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ p: 3, borderRadius: 1, boxShadow: 3, mb: 4 }}
          >
            <TextField
              fullWidth
              label="Nombre"
              margin="normal"
              variant="outlined"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Cargo"
              margin="normal"
              variant="outlined"
              required
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
            <TextField
              fullWidth
              label="Testimonio"
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button variant="contained" component="label" sx={{ mt: 2 }}>
              Cargar Imagen
              <input
                type="file"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Button>

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
              {editing ? "Actualizar Testimonio" : "Agregar Testimonio"}
            </Button>
          </Box>

          {/* Lista de testimonios */}
          <Grid container spacing={2}>
            {testimonials.map((testimonial) => (
              <Grid item xs={12} md={6} key={testimonial.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{testimonial.name}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {testimonial.position}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                      {testimonial.content}
                    </Typography>
                    {testimonial.image && (
                      <Box
                        component="img"
                        src={testimonial.image}
                        alt={testimonial.name}
                        sx={{ width: "100%", height: "auto", mb: 2 }}
                      />
                    )}
                    <IconButton
                      onClick={() => handleEdit(testimonial)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(testimonial.id)}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default TestimonialsAdmin;
