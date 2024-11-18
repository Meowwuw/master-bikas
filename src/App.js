import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import SupervisorPanel from './pages/SupervisorPanel';
import ClientView from './pages/ClientView';
import LandingPage from './pages/LandingPage';
import Services from './pages/Services';
import PreguntasPersonalizadas from './pages/PreguntasPersonalizadas';
import CourseTopics from './pages/CourseTopics';
import TopicQuestions from './pages/TopicQuestions';
import QuestionDetail from './pages/QuestionDetail';
import Register from './pages/Register';
import SobreNosotros from './pages/SobreNosotros';
import Contacto from './pages/Contacto';
import PublicidadConfig from './pages/PublicidadConfig';
import TestimonialsAdmin from './pages/TestimonialsAdmin';
import PagoYape from './pages/PagoYape';
import VerifyEmail from './pages/VerifyEmail';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import UserProfile from './pages/UserProfile';
import Podium from './pages/Podium';
import CoursePanel from './pages/CoursePanel';
import PreguntasSemanales from './pages/PreguntasSemanales';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/supervisor" element={<SupervisorPanel />} />
        <Route path="/client" element={<ClientView />} />
        <Route path="/services" element={<Services />} />
        <Route path="/preguntas-personalizadas" element={<PreguntasPersonalizadas />} />
        <Route path="/preguntas-semanales" element={<PreguntasSemanales/>} />
        <Route path="/course/:courseName" element={<CourseTopics />} />
        <Route path="/course/:courseId/topics" element={<TopicQuestions />} />
        <Route path="/course/:courseId/topic/:topicId/questions/:questionId" element={<QuestionDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<SobreNosotros />} />
        <Route path="/contact" element={<Contacto />} />
        <Route path="/admin/publicidad" element={<PublicidadConfig />} />
        <Route path="/admin/testimonios" element={<TestimonialsAdmin />} />
        <Route path="/pago" element={<PagoYape />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/podium" element={<Podium />} />
        <Route path="/admin/coursePanel" element={<CoursePanel />} />
      </Routes>
    </Router>
  );
};

export default App;
