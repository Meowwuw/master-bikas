import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const UserProfileCard = () => {
  const [profile, setProfile] = useState({
    NAMES: "",
    LAST_NAME: "",
    EMAIL: "",
    TELEPHONE: "",
    BIRTHDATE: "",
    GENDER: "",
    NICKNAME: "",
    COUNTRY_CODE: "+51",
    SCHOOL_NAME: "",
    DEPARTMENT: "",
    PROVINCE: "",
    DISTRICT: "",
    ADDRESS_ID: null,
  });

  const [departments, setDepartments] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://54.165.220.109:3000/api/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userProfile = {
          ...response.data,
          BIRTHDATE: response.data.BIRTHDATE || "", // Asigna una cadena vacía si no hay fecha
          NICKNAME: response.data.NICKNAME || "",
          SCHOOL_NAME: response.data.SCHOOL_NAME || "",
          DEPARTMENT: response.data.DEPARTMENT || "",
          PROVINCE: response.data.PROVINCE || "",
          DISTRICT: response.data.DISTRICT || "",
        };

        setProfile(userProfile);

        // Si hay un DEPARTMENT, carga las provincias
        if (response.data.DEPARTMENT) {
          const provincesResponse = await axios.get(
            `http://54.165.220.109:3000/api/provinces/${response.data.DEPARTMENT}`
          );
          setProvinces(provincesResponse.data);
        }

        // Si hay una PROVINCE, carga los distritos
        if (response.data.PROVINCE) {
          const districtsResponse = await axios.get(
            `http://54.165.220.109:3000/api/districts/${response.data.PROVINCE}`
          );
          setDistricts(districtsResponse.data);
        }
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
        setError("No se pudo cargar la información del perfil.");
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://54.165.220.109:3000/api/departments"
        );
        setDepartments(response.data);
      } catch (error) {
        console.error("Error al obtener los departamentos:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleDepartmentChange = async (value) => {
    handleChange("DEPARTMENT", value);
    try {
      const response = await axios.get(
        `http://54.165.220.109:3000/api/provinces/${value}`
      );
      setProvinces(response.data);
      setDistricts([]);
    } catch (error) {
      console.error("Error al obtener provincias:", error);
    }
  };

  const handleProvinceChange = async (value) => {
    handleChange("PROVINCE", value);
    try {
      const response = await axios.get(
        `http://54.165.220.109:3000/api/districts/${value}`
      );
      setDistricts(response.data);
    } catch (error) {
      console.error("Error al obtener distritos:", error);
    }
  };

  const handleDistrictChange = async (value) => {
    handleChange("DISTRICT", value);
    try {
      const response = await axios.get("http://54.165.220.109:3000/api/address-id", {
        params: {
          department: profile.DEPARTMENT,
          province: profile.PROVINCE,
          district: value,
        },
      });
      handleChange("ADDRESS_ID", response.data.addressId); 
    } catch (error) {
      console.error("Error al obtener ADDRESS_ID:", error);
    }
  };

  const handleChange = (field, value) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value || "", 
    }));
    setIsEditing(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return ""; 
    const date = new Date(dateString);
    return !isNaN(date.getTime())
      ? date.toISOString().split("T")[0] 
      : ""; 
  };

  const handleUpdateProfile = async () => {
    if (!profile.ADDRESS_ID) {
      setError("Por favor selecciona un Departamento, Provincia y Distrito.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://54.165.220.109:3000/api/perfil",
        { ...profile },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const allFieldsComplete =
        profile.NAMES &&
        profile.LAST_NAME &&
        profile.EMAIL &&
        profile.TELEPHONE &&
        profile.BIRTHDATE &&
        profile.GENDER &&
        profile.SCHOOL_NAME &&
        profile.ADDRESS_ID;

      if (allFieldsComplete) {
        await axios.put(
          "http://54.165.220.109:3000/api/perfil/add-points",
          { points: 10 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setSuccess("Perfil actualizado correctamente.");
      setError("");
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      setError("No se pudo actualizar el perfil.");
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#FEFEFE' }}>
      <Navbar />
      <Container maxWidth="sm">
        <Card elevation={3} sx={{ p: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom align="center">
              Información del Perfil
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <TextField
                  label="Nombres"
                  fullWidth
                  value={profile.NAMES || ""} // Valor por defecto en caso de undefined
                  onChange={(e) => handleChange("NAMES", e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Apellidos"
                  fullWidth
                  value={profile.LAST_NAME}
                  onChange={(e) => handleChange("LAST_NAME", e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Correo Electrónico"
                  fullWidth
                  value={profile.EMAIL}
                  onChange={(e) => handleChange("EMAIL", e.target.value)}
                  disabled 
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Teléfono"
                  fullWidth
                  value={profile.TELEPHONE}
                  onChange={(e) => handleChange("TELEPHONE", e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Fecha de Nacimiento"
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formatDate(profile.BIRTHDATE)}
                  onChange={(e) => handleChange("BIRTHDATE", e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Género"
                  fullWidth
                  value={profile.GENDER}
                  onChange={(e) => handleChange("GENDER", e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Apodo (Nickname)"
                  fullWidth
                  value={profile.NICKNAME}
                  onChange={(e) => handleChange("NICKNAME", e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Institución"
                  fullWidth
                  value={profile.SCHOOL_NAME}
                  onChange={(e) => handleChange("SCHOOL_NAME", e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Departamento</InputLabel>
                  <Select
                    value={profile.DEPARTMENT || ""}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept.DEPARTMENT} value={dept.DEPARTMENT}>
                        {dept.DEPARTMENT}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Provincia</InputLabel>
                  <Select
                    value={profile.PROVINCE || ""}
                    onChange={(e) => handleProvinceChange(e.target.value)}
                    disabled={!profile.DEPARTMENT}
                  >
                    {provinces.map((prov) => (
                      <MenuItem key={prov.PROVINCE} value={prov.PROVINCE}>
                        {prov.PROVINCE}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Distrito</InputLabel>
                  <Select
                    value={profile.DISTRICT || ""}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    disabled={!profile.PROVINCE}
                  >
                    {districts.map((dist) => (
                      <MenuItem key={dist.DISTRICT} value={dist.DISTRICT}>
                        {dist.DISTRICT}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleUpdateProfile}
                  disabled={!isEditing}
                >
                  {isEditing ? "Actualizar Perfil" : "Editar Perfil"}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default UserProfileCard;
