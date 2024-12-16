import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box, InputBase, IconButton, Card, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const PublicidadConfig = () => {
    const navigate = useNavigate();

    const [ads, setAds] = useState([
        {
            title: "Demian the Rat",
            description: "Se presenta en shows que mezclan humor y anécdotas...",
            image: "phoneImage"
        },
        {
            title: "Wendy Ramos",
            description: "Wendy Ramos es una actriz, clown y conferencista peruana...",
            image: "phoneImage2"
        }
    ]);

    const handleLogout = () => {
        navigate('/');
    };

    const handleAdChange = (index, field, value) => {
        const newAds = [...ads];
        newAds[index][field] = value;
        setAds(newAds);
    };

    const handleSave = (index) => {
        localStorage.setItem('ads', JSON.stringify(ads));
        alert(`Cambios en Publicidad ${index + 1} guardados exitosamente`);
    };

    return (
        <div className="flex flex-col w-full min-h-screen">
            <AppBar position="static" sx={{ backgroundColor: '#0cc0df' }}>
                <Toolbar>
                    <Link to="/admin" style={{ textDecoration: 'none' }}>
                        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#FCFBFC', cursor: 'pointer' }}>
                            Admin Panel
                        </Typography>
                    </Link>

                    <nav className="flex flex-row gap-5">
                        <Button color="inherit" sx={{ fontWeight: 'bold', color: '#FCFBFC' }}>Dashboard</Button>
                    </nav>
                    <Box sx={{ flexGrow: 1 }} />
                    <InputBase
                        placeholder="Buscar..."
                        startAdornment={<SearchIcon sx={{ marginRight: 1 }} />}
                        sx={{
                            backgroundColor: '#FCFBFC',
                            padding: '6px 8px',
                            borderRadius: '4px',
                            width: { sm: '300px', md: '200px', lg: '300px' },
                        }}
                    />
                    <IconButton color="inherit" onClick={handleLogout}>
                        <LogoutIcon sx={{ color: '#FCFBFC' }} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <main className="flex-1 p-4 bg-[#FCFBFC]" style={{ marginTop: '50px' }}>
                <Container>
                    <Box>
                        {ads.map((ad, index) => (
                            <Card key={index} sx={{ mb: 2, p: 2 }}>
                                <Typography variant="h6">Editar Publicidad {index + 1}</Typography>
                                <TextField
                                    label="Título"
                                    value={ad.title}
                                    onChange={(e) => handleAdChange(index, 'title', e.target.value)}
                                    fullWidth
                                    sx={{ my: 1 }}
                                />
                                <TextField
                                    label="Descripción"
                                    value={ad.description}
                                    onChange={(e) => handleAdChange(index, 'description', e.target.value)}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    sx={{ my: 1 }}
                                />
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                    >
                                        Subir Imagen
                                        <input
                                            type="file"
                                            hidden
                                            onChange={(e) => handleAdChange(index, 'image', URL.createObjectURL(e.target.files[0]))}
                                        />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleSave(index)}
                                        sx={{ ml: 2 }}  // Margen izquierdo de 2 unidades
                                    >
                                        Guardar Cambios
                                    </Button>
                                </Box>
                            </Card>
                        ))}
                    </Box>
                </Container>
            </main>
        </div>
    );
};

export default PublicidadConfig;
