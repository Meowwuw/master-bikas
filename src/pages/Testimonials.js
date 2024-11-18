import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Rating,
} from "@mui/material";
import axios from "axios";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          "http://54.165.220.109:3000/api/testimonials"
        );
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error al obtener los testimonios:", error);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ p: 0 }}>
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h4"
          sx={{ mb: 4, textAlign: "center", color: "#1E494F" }}
        >
          Testimonios
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} md={4} key={testimonial.TESTIMONIAL_ID}>
              <Card>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, fontWeight: "bold", color: "#1E494F" }}
                  >
                    {testimonial.user_name}{" "}
                    {/* Muestra el nombre del usuario */}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 2, color: "#666" }}>
                    {testimonial.CONTENT}
                  </Typography>
                  <Box sx={{ mt: 2, textAlign: "center" }}>
                    <Rating
                      name="rating"
                      value={testimonial.RATING}
                      readOnly
                      precision={0.5}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Testimonials;
