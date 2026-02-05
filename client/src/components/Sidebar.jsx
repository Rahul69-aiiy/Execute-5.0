import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Droplets, Zap, Settings, BarChart2 } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Droplets, label: 'Water Intelligence', path: '/water' },
    { icon: Zap, label: 'Electricity Control', path: '/electricity' },
    { icon: BarChart2, label: 'Deep Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="h-screen w-64 glass-panel flex flex-col fixed left-0 top-0 z-50 border-r border-white/10 m-4 ml-4 my-4 rounded-2xl">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-text tracking-wider">ASOS</h1>
      </div>

      <nav className="flex-1 px-4 mt-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-blue-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 m-4 rounded-xl bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-white/5">
        <div className="text-xs text-blue-300 mb-1">System Status</div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-sm text-emerald-400 font-medium">Optimal</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
