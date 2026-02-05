import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Droplets, Zap, Settings, BarChart2 } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Droplets, label: 'Water Intelligence', path: '/water' },
    { icon: Zap, label: 'Electricity Control', path: '/electricity' },
    { icon: BarChart2, label: 'Deep Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="h-screen w-64 bg-brand-navy/95 backdrop-blur-xl flex flex-col fixed left-0 top-0 z-50 text-white shadow-2xl border-r border-white/5">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-bold text-xl">A</span>
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-wide text-white">AI SUSTAINABILITY</h1>
          <p className="text-[10px] text-brand-blue font-semibold tracking-widest uppercase">PRO OS <span className="text-white/40">v5.0</span></p>
        </div>
      </div>

      <nav className="flex-1 px-4 mt-8 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium group ${
                isActive
                  ? 'bg-brand-blue text-white shadow-lg shadow-blue-500/25 translate-x-1'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-1'
              }`
            }
          >
            <item.icon size={20} className="group-hover:scale-110 transition-transform duration-300" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-white/10">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-brand-blue/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <div className="text-xs text-brand-blue mb-2 font-bold tracking-wider">SYSTEM STATUS</div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-sm text-slate-200 font-medium">Monitoring Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
