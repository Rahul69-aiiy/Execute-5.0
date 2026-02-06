import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlobalLayout from './components/GlobalLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import DigitalTwin from './pages/DigitalTwin';
import ElectricityAnalytics from './pages/ElectricityAnalytics';
import WaterAnalytics from './pages/WaterAnalytics';
import WasteOperations from './pages/WasteOperations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/*"
          element={
            <GlobalLayout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/digital-twin" element={<DigitalTwin />} />
                <Route path="/electricity" element={<ElectricityAnalytics />} />
                <Route path="/water" element={<WaterAnalytics />} />
                <Route path="/waste" element={<WasteOperations />} />
                {/* Fallback to Dashboard */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </GlobalLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
