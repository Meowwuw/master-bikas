import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import SupervisorPanel from './pages/SupervisorPanel';
import ClientView from './pages/ClientView';
import LandingPage from './pages/LandingPage'; // Importa la nueva landing page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Ruta para la landing page */}
        <Route path="/login" element={<Login />} /> {/* Ruta para el login */}
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/supervisor" element={<SupervisorPanel />} />
        <Route path="/client" element={<ClientView />} />
      </Routes>
    </Router>
  );
};

export default App;
