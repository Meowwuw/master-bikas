import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Container,
  TextField,
  Box,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [editPaymentId, setEditPaymentId] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [editAmount, setEditAmount] = useState("");

  // Paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get("https://api.master-bikas.com/api/payments");
      setPayments(response.data);
    } catch (error) {
      console.error("Error al obtener los pagos:", error);
    }
  };

  const handleEditClick = (payment) => {
    setEditPaymentId(payment.id);
    setEditStatus(payment.status);
    setEditAmount(payment.amount);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este pago?")) {
      try {
        await axios.delete(`https://api.master-bikas.com/api/payments/${id}`);
        fetchPayments(); // Refrescar los datos
      } catch (error) {
        console.error("Error al eliminar el pago:", error);
      }
    }
  };

  const handleSaveClick = async (id) => {
    // Valores válidos según la base de datos
    if (!["PENDIENTE", "PAGADO", "CANCELADO", "DEVOLUCION"].includes(editStatus)) {
      alert(
        "Estado no válido. Solo se permite PENDIENTE, PAGADO, CANCELADO o DEVOLUCION."
      );
      return;
    }
  
    if (!editAmount || isNaN(editAmount) || parseFloat(editAmount) < 0) {
      alert("Monto inválido. Debe ser un número positivo.");
      return;
    }
  
    try {
      await axios.put(`https://api.master-bikas.com/api/payments/${id}`, {
        status: editStatus,
        amount: parseFloat(editAmount).toFixed(3),
      });
      fetchPayments(); // Refrescar los datos
      setEditPaymentId(null);
    } catch (error) {
      console.error("Error al guardar el pago:", error);
    }
  };  

  const handleCancelClick = () => {
    setEditPaymentId(null);
  };

  const handleLogout = () => {
    navigate("/");
  };

  // Cambiar la página actual
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Cambiar el número de filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Navbar />
      <main className="flex-1 p-4 bg-[#FCFBFC]" style={{ marginTop: "50px" }}>
        <Container>
          <Box
            display="grid"
            gridTemplateColumns={{ md: "1fr 1fr", lg: "1fr 1fr 1fr " }}
            gap={4}
          >
            <Card>
              <CardHeader
                title="Total de usuarios"
                avatar={<PeopleIcon />}
                sx={{
                  backgroundColor: "#fff",
                  padding: "16px",
                  textAlign: "center",
                }}
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
                sx={{
                  backgroundColor: "#fff",
                  padding: "16px",
                  textAlign: "center",
                }}
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
                sx={{
                  backgroundColor: "#fff",
                  padding: "16px",
                  textAlign: "center",
                }}
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
                    {payments
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((payment) => (
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
                                <option value="PENDIENTE">Pendiente</option>
                                <option value="PAGADO">Pagado</option>
                                <option value="CANCELADO">Cancelado</option>
                                <option value="DEVOLUCION">Devolución</option>
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
                            ) : payment.amount !== null &&
                              payment.amount !== undefined ? (
                              parseFloat(payment.amount).toFixed(2)
                            ) : (
                              "N/A"
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {editPaymentId === payment.id ? (
                              <>
                                <Button
                                  onClick={() => handleSaveClick(payment.id)}
                                >
                                  Guardar
                                </Button>
                                <Button onClick={handleCancelClick}>
                                  Cancelar
                                </Button>
                              </>
                            ) : (
                              <>
                                <IconButton
                                  size="small"
                                  onClick={() => handleEditClick(payment)}
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  onClick={() => handleDeleteClick(payment.id)}
                                >
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

              {/* Paginador */}
              <TablePagination
                component="div"
                count={payments.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 20, 30]}
              />
            </Card>
          </Box>
        </Container>
      </main>
    </div>
  );
};

export default AdminPanel;
