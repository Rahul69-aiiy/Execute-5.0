import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Zap, 
  Droplets, 
  Recycle, 
  ChevronLeft, 
  Menu,
  Globe2,
  Leaf
} from 'lucide-react';

const Sidebar = ({ isOpen, toggle }) => {
  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { path: '/digital-twin', icon: Globe2, label: 'Digital Twin', highlight: true },
    { path: '/electricity', icon: Zap, label: 'Energy' },
    { path: '/water', icon: Droplets, label: 'Water' },
    { path: '/waste', icon: Recycle, label: 'Waste & Ops' },
  ];

  return (
    <div className={`h-full flex flex-col py-6 transition-all duration-300 bg-white/50 backdrop-blur-xl border-r border-white/40 ${isOpen ? 'px-4' : 'px-2'}`}>
      {/* Brand */}
      <Link to="/" className={`flex items-center gap-3 mb-10 cursor-pointer hover:opacity-80 transition-opacity ${isOpen ? 'px-2' : 'justify-center'}`}>
        <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center shrink-0 shadow-lg shadow-green-600/20">
          <Leaf className="text-white w-6 h-6" />
        </div>
        {isOpen && (
          <div className="flex flex-col">
            <h1 className="font-bold text-xl tracking-tight text-slate-800">GreenGrid AI</h1>
            <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Powering Environment</span>
          </div>
        )}
      </Link>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              relative flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group
              ${isActive 
                ? 'bg-green-50 text-green-700 font-semibold shadow-sm' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-white/60'
              }
              ${!isOpen && 'justify-center'}
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-green-600' : 'text-slate-400 group-hover:text-green-600'}`} />
                
                {isOpen && (
                  <span className="whitespace-nowrap">{item.label}</span>
                )}
                
                {/* Active Indicator Color Strip */}
                {isActive && isOpen && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-green-500 rounded-l-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      
      {/* Bottom Actions */}
      <div className="mt-auto">
        <button 
          onClick={toggle}
          className={`w-full flex items-center gap-3 p-3 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-all ${!isOpen && 'justify-center'}`}
        >
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          {isOpen && <span className="font-medium text-sm">Collapse Panel</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
