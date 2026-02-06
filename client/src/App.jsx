import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlobalLayout from './components/GlobalLayout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DigitalTwin from './pages/DigitalTwin';
import ElectricityAnalytics from './pages/ElectricityAnalytics';
import WaterAnalytics from './pages/WaterAnalytics';
import WasteOperations from './pages/WasteOperations';
import Settings from './pages/Settings';
import About from './pages/About';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <GlobalLayout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/digital-twin" element={<DigitalTwin />} />
                  <Route path="/electricity" element={<ElectricityAnalytics />} />
                  <Route path="/water" element={<WaterAnalytics />} />
                  <Route path="/waste" element={<WasteOperations />} />
                  <Route path="/settings" element={<Settings />} />
                  {/* Fallback to Dashboard */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </GlobalLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
