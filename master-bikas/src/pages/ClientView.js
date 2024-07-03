import React from 'react';
import { AppBar, Toolbar, Typography, Container, List, ListItem, ListItemText, Button } from '@mui/material';

const ClientView = () => {
  const cursos = ['Aritmética', 'Geometría', 'Álgebra'];

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Plataforma Educativa
          </Typography>
          <Button color="inherit">Mi Cuenta</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h4" gutterBottom>Cursos Disponibles</Typography>
        <List>
          {cursos.map((curso, index) => (
            <ListItem button key={index}>
              <ListItemText primary={curso} />
            </ListItem>
          ))}
        </List>
        {/* Aquí irían los problemas y opciones de pago */}
      </Container>
    </div>
  );
};

export default ClientView;
