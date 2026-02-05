import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import WaterAnalytics from './pages/WaterAnalytics';
import ElectricityAnalytics from './pages/ElectricityAnalytics';

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-72 p-8 transition-all duration-300">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/water" element={<WaterAnalytics />} />
            <Route path="/electricity" element={<ElectricityAnalytics />} />
            <Route path="/analytics" element={<div className='glass-panel p-10 mt-10 text-center text-xl'>Deep Analytics Module - Coming in v2</div>} />
            <Route path="/settings" element={<div className='glass-panel p-10 mt-10 text-center text-xl'>System Configurations</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
