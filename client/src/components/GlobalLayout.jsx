import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu, Search, Bell, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GlobalLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-bg text-neutral-text relative">
       {/* Background - Nature Image with Overlay */}
       <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2674&auto=format&fit=crop" 
            alt="Nature Background" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 to-white/90 backdrop-blur-[2px]"></div>
       </div>
       
       {/* Sidebar Container */}
       <div className={`relative z-20 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} shadow-xl`}>
        <Sidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-neutral-border bg-white/80 backdrop-blur-md sticky top-0 z-30">
          
          <button 
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg mr-4"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="w-6 h-6 text-primary" />
          </button>

          <div className="flex-1 max-w-md hidden md:flex items-center relative group">
            <Search className="absolute left-3 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search data, strategies..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="relative cursor-pointer group p-2 hover:bg-slate-50 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            
            <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-bold text-green-700 border border-green-200">
                A
              </div>
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-slate-800 leading-none">Admin</p>
                <p className="text-xs text-slate-500 mt-1">Facility Manager</p>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <AnimatePresence mode="wait">
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.3 }}
               className="h-full max-w-7xl mx-auto"
             >
               {children}
             </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default GlobalLayout;
