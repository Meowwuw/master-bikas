import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link as MuiLink } from '@mui/material';
import { styled } from '@mui/system';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useNavigate } from 'react-router-dom';


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

  const handleLogout = () => {
    // Aquí puedes añadir la lógica para limpiar cualquier estado de autenticación, como tokens, etc.
    // Por ejemplo:
    // localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="flex flex-col h-full">
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
          <Button variant="outlined" size="small" sx={{ color: '#FCFBFC', borderColor: '#FCFBFC', marginRight: '8px' }}>
            Export to Excel
          </Button>
          <Button variant="outlined" size="small" sx={{ color: '#FCFBFC', borderColor: '#FCFBFC' }}>
            Export to CSV
          </Button>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon sx={{ color: '#FCFBFC' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main className="flex-1 overflow-auto p-6" style={{ marginTop: '50px' }}>
        <Container>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>School ID</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Question</TableCell>
                  <TableCell>Views</TableCell>
                  <TableCell>Has Video</TableCell>
                  <TableCell>Has Solution</TableCell>
                  <TableCell>Link</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>SC001</TableCell>
                  <TableCell>Math 101</TableCell>
                  <TableCell>What is the formula for the area of a circle?</TableCell>
                  <TableCell>1234</TableCell>
                  <TableCell>
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  </TableCell>
                  <TableCell>
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  </TableCell>
                  <TableCell>
                    <MuiLink href="#" underline="hover" color="primary">
                      View
                    </MuiLink>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" startIcon={<ReportProblemIcon />}>
                      Reportar
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SC002</TableCell>
                  <TableCell>English 201</TableCell>
                  <TableCell>What is the difference between "affect" and "effect"?</TableCell>
                  <TableCell>789</TableCell>
                  <TableCell>
                    <CancelIcon className="w-5 h-5 text-red-500" />
                  </TableCell>
                  <TableCell>
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  </TableCell>
                  <TableCell>
                    <MuiLink href="#" underline="hover" color="primary">
                      View
                    </MuiLink>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" startIcon={<ReportProblemIcon />}>
                      Reportar
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SC003</TableCell>
                  <TableCell>Biology 301</TableCell>
                  <TableCell>What is the process of photosynthesis?</TableCell>
                  <TableCell>2456</TableCell>
                  <TableCell>
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  </TableCell>
                  <TableCell>
                    <CancelIcon className="w-5 h-5 text-red-500" />
                  </TableCell>
                  <TableCell>
                    <MuiLink href="#" underline="hover" color="primary">
                      View
                    </MuiLink>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" startIcon={<ReportProblemIcon />}>
                      Reportar
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </main>
    </div>
  );
};

export default SupervisorPanel;
