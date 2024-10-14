import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Navbar from './Navbar';
import logo from '../assets/images/logo.jpeg';

import { Typography, TextField, Box, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Select, MenuItem, 
    Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import axios from 'axios';

const PreguntasPersonalizadas = () => {
    const [selectedOption, setSelectedOption] = useState('correo');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [amount, setAmount] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [editablePhone, setEditablePhone] = useState(false);
    const [openDialog, setOpenDialog] = useState(false); 
    const [paymentProof, setPaymentProof] = useState(null); 



    useEffect(() => {
        const token = localStorage.getItem('token'); 
        if (token) {
            const decodedToken = jwtDecode(token); 
            const userId = decodedToken.id; 

            console.log('Decoded Token:', decodedToken);

            const fetchUserData = async () => {
                try {
                    const perfilResponse = await axios.get(`http://localhost:5000/api/perfil/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    if (perfilResponse.data && perfilResponse.data.telefono) {
                        setUserPhone(perfilResponse.data.telefono); 
                        setEditablePhone(false); 
                    } else {
                        setEditablePhone(true);
                    }

                    const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    setUserEmail(userResponse.data.email);
                } catch (error) {
                    console.error('Error al obtener los datos del usuario:', error);
                    setEditablePhone(true);
                }
            };

            fetchUserData();
        }
    }, []);

    const handleSubmit = () => {
        // Al enviar, abre el diálogo
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // Cierra el diálogo
    };


    const handleFileChange = (e) => {
        setPaymentProof(e.target.files[0]); // Asigna la imagen cargada
    };

    return (
        <Box sx={{ bgcolor: '#FEFEFE', minHeight: '100vh' }}>
            <Navbar />
            {/* Título */}
            <Box sx={{ p: 5, mt: 2, mb: 5 }}>
                <Typography variant="h4" gutterBottom>
                    Envíanos tus preguntas
                </Typography>
                <Typography variant="body1" gutterBottom>
                    ¿No encontraste una pregunta similar a la que buscas? No te preocupes, envíanos tu ejercicio y te enviaremos la solución en menos de 1 hora.
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Por favor, completa la siguiente información:
                </Typography>
                <Typography variant="body1" gutterBottom>
                    ¿Dónde deseas que te enviemos la solución?
                </Typography>

                <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                <FormControl component="fieldset" sx={{ mb: 3 }}>
                    <FormLabel component="legend">Opciones de envío</FormLabel>
                    <RadioGroup
                        row
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <FormControlLabel value="correo" control={<Radio />} label="Correo" />
                        <FormControlLabel value="whatsapp" control={<Radio />} label="WhatsApp" />
                    </RadioGroup>
                </FormControl>

                {selectedOption === 'correo' && (
                    <TextField
                        label="Correo"
                        value={userEmail}
                        fullWidth
                        sx={{ mb: 3 }}
                        disabled
                    />
                )}

                {selectedOption === 'whatsapp' && (
                    <TextField
                        label="Número de WhatsApp"
                        value={userPhone}
                        onChange={(e) => {
                            setUserPhone(e.target.value);
                            setEditablePhone(true); // Si el usuario empieza a escribir, se habilita la edición
                        }}
                        fullWidth
                        sx={{ mb: 3 }}
                        disabled={!editablePhone && userPhone !== ""} // Solo deshabilita si ya tiene un número registrado
                    />
                )}


                <FormControl fullWidth sx={{ mb: 3 }}>
                    <Select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>
                            Selecciona el curso
                        </MenuItem>
                        <MenuItem value="matematicas">Matemáticas</MenuItem>
                        <MenuItem value="fisica">Física</MenuItem>
                        <MenuItem value="quimica">Química</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 3 }}>
                    <Select
                        value={selectedLevel}
                        onChange={(e) => {
                            const level = e.target.value;
                            setSelectedLevel(level);

                            // Asigna el monto basado en el nivel seleccionado
                            if (level === 'primaria') {
                                setAmount(2);
                            } else if (level === 'secundaria') {
                                setAmount(5);
                            } else if (level === 'universitario') {
                                setAmount(15);
                            }
                        }}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>
                            Selecciona el nivel de estudio
                        </MenuItem>
                        <MenuItem value="primaria">Colegio</MenuItem>
                        <MenuItem value="secundaria">Pre-universitario</MenuItem>
                        <MenuItem value="universitario">Universitario</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="Monto a pagar"
                    type="number"
                    value={amount}
                    fullWidth
                    sx={{ mb: 3 }}
                    disabled // El campo no será editable
                />


                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Enviar
                </Button>

                </Grid>

                <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                        <img
                            src={logo}
                            alt="Código QR de Yape"
                            style={{ maxWidth: '200px', marginBottom: '20px' }}
                        />
                        <Typography variant="body1" gutterBottom>
                            Escanea el código QR para realizar el pago
                        </Typography>

                        <Button variant="outlined" component="label" sx={{ mt: 2 }}>
                            Adjuntar comprobante de pago
                            <input type="file" hidden onChange={handleFileChange} />
                        </Button>

                        {paymentProof && (
                            <Typography variant="body2" sx={{ mt: 2 }}>
                                Comprobante seleccionado: {paymentProof.name}
                            </Typography>
                        )}
                    </Grid>
                </Grid>



                {/* Pop-up con la información */}
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>¡Master Bikas al rescate de tu nota!</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1" gutterBottom>
                            Se enviará la solución a tu {selectedOption === 'correo' ? `Correo: ${userEmail}` : `WhatsApp: ${userPhone}`} en el transcurso de 1 hora, una vez confirmado el pago. Si no recibes respuesta en el tiempo estimado, por favor comunícate al WhatsApp: 922740657.
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Si deseas enviar más preguntas, comunícate al número 922740657. Estaremos encantados de ayudarte a resolver esas dudas que te inquietan.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>

            </Box>
        </Box>
    );
};

export default PreguntasPersonalizadas;
