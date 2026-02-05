import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import WaterAnalytics from './pages/WaterAnalytics';
import ElectricityAnalytics from './pages/ElectricityAnalytics';

import LandingPage from './pages/LandingPage';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div className="flex min-h-screen">
      {!isLanding && <Sidebar />}
      <main className={`flex-1 transition-all duration-300 bg-brand-light min-h-screen ${!isLanding ? 'ml-64 p-0' : 'ml-0'}`}>
        {children}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/water" element={<WaterAnalytics />} />
          <Route path="/electricity" element={<ElectricityAnalytics />} />
          <Route path="/analytics" element={<div className='glass-panel p-10 mt-10 text-center text-xl'>Deep Analytics Module - Coming in v2</div>} />
          <Route path="/settings" element={<div className='glass-panel p-10 mt-10 text-center text-xl'>System Configurations</div>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
