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
          "https://api.master-bikas.com/api/testimonials"
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
          sx={{ mb: 4, textAlign: "center", color: "#0cc0df" }}
        >
          TESTIMONIOS
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} md={4} key={testimonial.TESTIMONIAL_ID}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, fontWeight: "bold", color: "#0cc0df" }}
                  >
                    {testimonial.user_name}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 2, color: "#666" }}>
                    {testimonial.CONTENT}
                  </Typography>
                </CardContent>
                <Box sx={{ mt: 2, textAlign: "center", pb: 2 }}>
                  <Rating
                    name="rating"
                    value={testimonial.RATING}
                    readOnly
                    precision={0.5}
                  />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Testimonials;
