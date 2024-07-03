import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, InputBase, IconButton, Card, CardHeader, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes añadir la lógica para limpiar cualquier estado de autenticación, como tokens, etc.
    // Por ejemplo:
    // localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <AppBar position="static" sx={{ backgroundColor: '#5BE2E6' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#FCFBFC' }}>
            Admin Panel
          </Typography>
          <nav className="flex flex-row gap-5">
            <Button color="inherit" sx={{ fontWeight: 'bold', color: '#FCFBFC' }}>Dashboard</Button>
            <Button color="inherit" sx={{ color: '#FCFBFC' }}>Colegios</Button>
            <Button color="inherit" sx={{ color: '#FCFBFC' }}>Cursos</Button>
            <Button color="inherit" sx={{ color: '#FCFBFC' }}>Temas</Button>
            <Button color="inherit" sx={{ color: '#FCFBFC' }}>Supervisores</Button>
            <Button color="inherit" sx={{ color: '#FCFBFC' }}>Problemas</Button>
          </nav>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ position: 'relative' }}>
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
          </Box>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon sx={{ color: '#FCFBFC' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main className="flex-1 p-4 bg-[#FCFBFC]" style={{ marginTop: '50px' }}>
        <Container>
          <Box display="grid" gridTemplateColumns={{ md: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }} gap={4}>
            <Card>
              <CardHeader
                title="Total de usuarios"
                avatar={<PeopleIcon />}
                sx={{ backgroundColor: '#fff', padding: '16px', textAlign: 'center' }}
              />
              <CardContent>
                <Typography variant="h4" component="div">
                  1,234
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  +5.2% desde el mes pasado
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="Cursos mas visitados"
                avatar={<InventoryIcon />}
                sx={{ backgroundColor: '#fff', padding: '16px', textAlign: 'center' }}
              />
              <CardContent>
                <Typography variant="h4" component="div">
                  789
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  +3.1% desde el mes pasado
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="Cursos mas comprado"
                avatar={<ShoppingCartIcon />}
                sx={{ backgroundColor: '#fff', padding: '16px', textAlign: 'center' }}
              />
              <CardContent>
                <Typography variant="h4" component="div">
                  45
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  -2.4% desde el mes pasado
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="Ingresos totales"
                avatar={<AttachMoneyIcon />}
                sx={{ backgroundColor: '#fff', padding: '16px', textAlign: 'center' }}
              />
              <CardContent>
                <Typography variant="h4" component="div">
                  $125,678.90
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  +8.9% desde el mes pasado
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box mt={4}>
            <Card>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Rol</TableCell>
                      <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>John Doe</TableCell>
                      <TableCell>john@example.com</TableCell>
                      <TableCell>Admin</TableCell>
                      <TableCell align="right">
                        <IconButton size="small">
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>jane@example.com</TableCell>
                      <TableCell>User</TableCell>
                      <TableCell align="right">
                        <IconButton size="small">
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell>Bob Johnson</TableCell>
                      <TableCell>bob@example.com</TableCell>
                      <TableCell>User</TableCell>
                      <TableCell align="right">
                        <IconButton size="small">
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Box>
        </Container>
      </main>
    </div>
  );
};

export default AdminPanel;
