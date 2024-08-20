import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link as MuiLink, TextField, Select, MenuItem, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { styled } from '@mui/system';
import { Input } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useNavigate } from 'react-router-dom';
import ExportButton from './ExportButton'; 



const HeaderLink = styled(MuiLink)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 16px',
  borderRadius: '8px',
  textDecoration: 'none',
  color: '#FCFBFC',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

const SupervisorPanel = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState('');
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    navigate('/');
  };

  const data = [
    { schoolId: 'SC001', school: 'Colegio nacional', course: 'Math 101', question: 'What is the formula for the area of a circle?', views: 1234, hasVideo: true, hasSolution: true },
    { schoolId: 'SC002', school: 'Colegio particular', course: 'English 201', question: 'What is the difference between "affect" and "effect"?', views: 789, hasVideo: false, hasSolution: true },
    { schoolId: 'SC003', school: 'Instituto', course: 'Biology 301', question: 'What is the process of photosynthesis?', views: 2456, hasVideo: true, hasSolution: false },
  ];

  const [filters, setFilters] = useState({
    id: '',
    school: '',
    course: '',
    hasVideo: '',
    hasSolution: ''
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const filteredData = data.filter((row) => {
    return (
      (filters.id === '' || row.schoolId.includes(filters.id)) &&
      (filters.school === '' || row.school.includes(filters.school)) &&
      (filters.course === '' || row.course.includes(filters.course)) &&
      (filters.hasVideo === '' || row.hasVideo === (filters.hasVideo === 'true')) &&
      (filters.hasSolution === '' || row.hasSolution === (filters.hasSolution === 'true'))
    );
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReportSubmit = () => {
    // Aquí puedes agregar la lógica para enviar el reporte
    console.log('Reporte enviado', selectedAdmin, message);
    handleClose();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Puedes guardar el archivo en el estado, subirlo a un servidor, etc.
      console.log("Imagen seleccionada:", file);
    }
  };

  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: '#1E494F' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#FCFBFC' }}>
            Supervisor Panel
          </Typography>
          <Box sx={{ display: 'flex', gap: '16px' }}>
            <HeaderLink href="#" underline="none">
              <VisibilityIcon />
              View Issues
            </HeaderLink>
            <HeaderLink href="#" underline="none">
              <VideoLibraryIcon />
              Video Status
            </HeaderLink>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <ExportButton data={filteredData} fileName="report" fileType="xlsx" />
          <ExportButton data={filteredData} fileName="report" fileType="csv" />
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon sx={{ color: '#FCFBFC' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ flex: '1 0 auto', overflow: 'auto', p: 6 }}>
        <Container>
          <Box sx={{ display: 'flex', gap: '16px', mb: 4 }}>
            <TextField
              label="ID"
              name="id"
              value={filters.id}
              onChange={handleFilterChange}
              variant="outlined"
              size="small"
            />
            <TextField
              label="Colegio"
              name="school"
              value={filters.school}
              onChange={handleFilterChange}
              variant="outlined"
              size="small"
            />
            <TextField
              label="Curso"
              name="course"
              value={filters.course}
              onChange={handleFilterChange}
              variant="outlined"
              size="small"
            />
            <FormControl variant="outlined" size="small" sx={{ minWidth: 100 }}>
              <InputLabel id="hasVideo-label">TE</InputLabel>
              <Select
                labelId="hasVideo-label"
                label="TE"
                name="hasVideo"
                value={filters.hasVideo}
                onChange={handleFilterChange}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 100 }}>
              <InputLabel id="hasSolution-label">TR</InputLabel>
              <Select
                labelId="hasSolution-label"
                label="TR"
                name="hasSolution"
                value={filters.hasSolution}
                onChange={handleFilterChange}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Niveles de Estudio</TableCell>
                  <TableCell>Curso</TableCell>
                  <TableCell>Pregunta</TableCell>
                  <TableCell>Vistas</TableCell>
                  <TableCell>TE</TableCell>
                  <TableCell>TR</TableCell>
                  <TableCell>Link</TableCell>
                  <TableCell>Accion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.schoolId}</TableCell>
                    <TableCell>{row.school}</TableCell>
                    <TableCell>{row.course}</TableCell>
                    <TableCell>{row.question}</TableCell>
                    <TableCell>{row.views}</TableCell>
                    <TableCell>
                      {row.hasVideo ? <CheckCircleIcon className="w-5 h-5 text-green-500" /> : <CancelIcon className="w-5 h-5 text-red-500" />}
                    </TableCell>
                    <TableCell>
                      {row.hasSolution ? <CheckCircleIcon className="w-5 h-5 text-green-500" /> : <CancelIcon className="w-5 h-5 text-red-500" />}
                    </TableCell>
                    <TableCell>
                      <MuiLink href="#" underline="hover" color="#1E494F">
                        View
                      </MuiLink>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        startIcon={<ReportProblemIcon />} 
                        sx={{ 
                          color: '#1E494F', 
                          borderColor: '#1E494F',
                          backgroundColor: '#FFFFFF',
                          '&:hover': {
                            backgroundColor: '#1E494F',
                            borderColor: '#FFFFFF',
                            color:'#FFFFFF',
                          },
                        }}
                        onClick={handleClickOpen}
                      >
                        Reportar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
      <Dialog open={open} onClose={handleClose}>
  <DialogTitle>REPORTE</DialogTitle>
  <DialogContent>
    <FormControl fullWidth>
      <InputLabel>Administrador</InputLabel>
      <Select
        value={selectedAdmin}
        onChange={(e) => setSelectedAdmin(e.target.value)}
        label="Administrador"
      >
        <MenuItem value="admin1">Nombre admin 1</MenuItem>
        <MenuItem value="admin2">Nombre admin 2</MenuItem>
        <MenuItem value="admin3">Nombre admin 3</MenuItem>
      </Select>
    </FormControl>
    <TextField
      autoFocus
      margin="dense"
      label="Mensaje"
      type="text"
      fullWidth
      variant="outlined"
      multiline
      rows={4}
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      sx={{ mt: 2 }}
    />

    {/* Botón para adjuntar imagen */}
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <Input
        accept="image/*"
        id="upload-image"
        type="file"
        style={{ display: 'none' }}
        onChange={handleImageUpload} // Función para manejar la imagen subida
      />
      <label htmlFor="upload-image">
        <IconButton color="primary" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      <Typography variant="body2" sx={{ ml: 1 }}>
        Adjuntar evidencia
      </Typography>
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="primary">
      Cancelar
    </Button>
    <Button onClick={handleReportSubmit} color="primary">
      Enviar
    </Button>
  </DialogActions>
</Dialog>

      <Box sx={{ bgcolor: '#1E494F', color: '#FEFEFE', textAlign: 'center', p: 2, mt: 'auto' }}>
        <Typography variant="body2">
          © 2024 MasterBikas. Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default SupervisorPanel;
