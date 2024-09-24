import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, TextField, Box, InputBase, IconButton, Card, CardHeader, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [editPaymentId, setEditPaymentId] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editAmount, setEditAmount] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/payments');
      setPayments(response.data);
    } catch (error) {
      console.error('Error al obtener los pagos:', error);
    }
  };

  const handleEditClick = (payment) => {
    setEditPaymentId(payment.id);
    setEditStatus(payment.status);
    setEditAmount(payment.amount);
  };

  const handleSaveClick = async (id) => {
    try {
      await axios.post('http://localhost:5000/api/admin/update-payment', {
        id,
        status: editStatus,
        amount: editAmount
      });
      setEditPaymentId(null);
      fetchPayments();  // Refresh payments after update
    } catch (error) {
      console.error('Error al actualizar el pago:', error);
    }
  };

  const handleCancelClick = () => {
    setEditPaymentId(null);
  };

  const handleLogout = () => {
    // Lógica para limpiar cualquier estado de autenticación, como tokens, etc.

    navigate('/');
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <AppBar position="static" sx={{ backgroundColor: '#1E494F' }}>
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
            <Button color="inherit" sx={{ color: '#FCFBFC' }} onClick={() => navigate('/admin/publicidad')}>Publicidad</Button>
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
                      <TableCell>Email</TableCell>
                      <TableCell>Estado</TableCell>
                      <TableCell>Monto</TableCell>
                      <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.id}</TableCell>
                        <TableCell>{payment.email}</TableCell>
                        <TableCell>
                          {editPaymentId === payment.id ? (
                            <TextField
                              value={editStatus}
                              onChange={(e) => setEditStatus(e.target.value)}
                              select
                              SelectProps={{ native: true }}
                            >
                              <option value="pendiente">Pendiente</option>
                              <option value="confirmado">Confirmado</option>
                            </TextField>
                          ) : (
                            payment.status
                          )}
                        </TableCell>
                        <TableCell>
                          {editPaymentId === payment.id ? (
                            <TextField
                              value={editAmount}
                              onChange={(e) => setEditAmount(e.target.value)}
                              type="number"
                            />
                          ) : (
                            payment.amount !== null && payment.amount !== undefined
                              ? parseFloat(payment.amount).toFixed(2)
                              : 'N/A' // o cualquier mensaje predeterminado que quieras mostrar si el monto no está definido
                          )}
                        </TableCell>

                        <TableCell align="right">
                          {editPaymentId === payment.id ? (
                            <>
                              <Button onClick={() => handleSaveClick(payment.id)}>Guardar</Button>
                              <Button onClick={handleCancelClick}>Cancelar</Button>
                            </>
                          ) : (
                            <>
                              <IconButton size="small" onClick={() => handleEditClick(payment)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton size="small">
                                <DeleteIcon />
                              </IconButton>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
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
