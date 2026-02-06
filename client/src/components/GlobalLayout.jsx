import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import { Menu, Bell, User, Settings, LogOut, ChevronDown, AlertCircle, AlertTriangle, Info, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const GlobalLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const userInitial = userData.firstName ? userData.firstName[0].toUpperCase() : 'A';

  // Notifications state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'Grid Overload Warning',
      message: 'Campus electricity load approaching 95% capacity. Immediate action required.',
      time: '2 mins ago',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      id: 2,
      type: 'urgent',
      title: 'Water Leak Detected',
      message: 'High probability leak in Zone C. Inspection recommended.',
      time: '15 mins ago',
      icon: AlertCircle,
      color: 'orange'
    },
    {
      id: 3,
      type: 'warning',
      title: 'HVAC Anomaly',
      message: 'Unusual spike detected in Block B HVAC system.',
      time: '1 hour ago',
      icon: AlertTriangle,
      color: 'amber'
    },
    {
      id: 4,
      type: 'info',
      title: 'Solar Peak Coming',
      message: 'Peak solar generation predicted at 2:30 PM today.',
      time: '2 hours ago',
      icon: Info,
      color: 'blue'
    },
    {
      id: 5,
      type: 'success',
      title: 'System Optimized',
      message: 'Load balancing successfully completed.',
      time: '3 hours ago',
      icon: CheckCircle,
      color: 'green'
    }
  ]);

  const urgentNotifs = notifications.filter(n => n.type === 'critical' || n.type === 'urgent').length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const markAsRead = (notifId) => {
    setNotifications(prevNotifs => prevNotifs.filter(n => n.id !== notifId));
  };

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

          <div className="flex items-center gap-4 ml-auto">
            {/* Notifications Dropdown */}
            <div className="relative" ref={notifRef}>
              <div
                className="relative cursor-pointer group p-2 hover:bg-slate-50 rounded-full transition-colors"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
                {urgentNotifs > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                )}
              </div>

              {/* Notifications Dropdown Panel */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50"
                  >
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 flex items-center justify-between">
                      <h3 className="font-bold text-white">Notifications</h3>
                      <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {notifications.length} New
                      </span>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                          <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                          <p className="text-slate-600 font-medium">All caught up!</p>
                          <p className="text-xs text-slate-400 mt-1">No new notifications</p>
                        </div>
                      ) : (
                        notifications.map((notif) => {
                          const Icon = notif.icon;
                          const colorClasses = {
                            red: 'bg-red-50 border-red-200 text-red-600',
                            orange: 'bg-orange-50 border-orange-200 text-orange-600',
                            amber: 'bg-amber-50 border-amber-200 text-amber-600',
                            blue: 'bg-blue-50 border-blue-200 text-blue-600',
                            green: 'bg-green-50 border-green-200 text-green-600'
                          };

                          return (
                            <div
                              key={notif.id}
                              className="p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors relative group"
                            >
                              <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg border ${colorClasses[notif.color]}`}>
                                  <Icon size={16} />
                                </div>
                                <div className="flex-1 min-w-0 pr-8">
                                  <h4 className="font-semibold text-sm text-slate-800 mb-1">
                                    {notif.title}
                                  </h4>
                                  <p className="text-xs text-slate-600 mb-2 line-clamp-2">
                                    {notif.message}
                                  </p>
                                  <span className="text-xs text-slate-400">{notif.time}</span>
                                </div>
                                {/* Mark as Read Button - appears on hover */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notif.id);
                                  }}
                                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-slate-200 rounded-full"
                                  title="Mark as read"
                                >
                                  <X size={14} className="text-slate-500" />
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    <div className="p-3 bg-slate-50 border-t border-slate-200">
                      <button className="w-full text-center text-sm font-semibold text-green-600 hover:text-green-700 transition-colors">
                        View All Notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-8 w-px bg-slate-200 mx-2"></div>

            {/* User Profile Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <div
                className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-bold text-green-700 border border-green-200">
                  {userInitial}
                </div>
                <div className="hidden md:block text-right">
                  <p className="text-sm font-semibold text-slate-800 leading-none">
                    {userData.firstName || 'Admin'} {userData.lastName || ''}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{userData.role || 'Facility Manager'}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </div>

              {/* User Menu Dropdown */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50"
                  >
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-lg font-bold text-green-700 border-2 border-green-200">
                          {userInitial}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-slate-800">
                            {userData.firstName || 'Admin'} {userData.lastName || 'User'}
                          </p>
                          <p className="text-xs text-slate-600">{userData.email || 'admin@greengrid.ai'}</p>
                          <p className="text-xs text-green-600 font-semibold mt-1">
                            {userData.role || 'Facility Manager'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          navigate('/settings');
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <Settings className="w-4 h-4 text-slate-500" />
                        <span className="font-medium">Settings</span>
                      </button>

                      <div className="my-1 h-px bg-slate-200"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
