import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Activity, Globe, Zap, Droplets, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="min-h-screen font-sans text-slate-800 bg-white selection:bg-primary selection:text-white relative overflow-x-hidden">
      
      {/* Background Image - Nature Theme */}
      <div className="absolute inset-0 z-0">
        <img 
            src="https://images.unsplash.com/photo-1617194369222-af8a7e682365?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Green Landscape" 
            className="w-full h-full object-cover object-bottom opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/40 to-white/10 h-[70vh]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          
          <Link to="/" className="flex items-center gap-2 group">
             <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white shadow-lg shadow-green-600/20 group-hover:scale-105 transition-transform">
                <Leaf size={24} />
             </div>
             <div className="flex flex-col leading-none">
                 <span className="text-xl font-bold text-slate-900 tracking-tight">GreenGrid<span className="text-green-600">AI</span></span>
                 <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Sustainability OS</span>
             </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600 text-sm">
             <Link to="/about#features" className="hover:text-green-600 transition-colors">Platform</Link>
             <Link to="/about#technology" className="hover:text-green-600 transition-colors">Technology</Link>
             <Link to="/about#impact" className="hover:text-green-600 transition-colors">Impact</Link>
          </div>

          <Link to="/dashboard" className="px-6 py-2.5 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 flex items-center gap-2 transform hover:-translate-y-0.5">
             Launch Dashboard <ArrowRight size={18} />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative z-10 w-full pt-40 pb-24 px-6">
          <div className="container mx-auto text-center max-w-5xl">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
            >
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-xs font-bold tracking-wide uppercase border border-green-100 mb-8 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  The OS for Earth's Resources
               </div>
               
               <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
                  Sustainable Intelligence <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                     For a Better Planet
                  </span>
               </h1>
               
               <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                  A unified digital twin for water, electricity, and waste operations. 
                  Predict anomalies and optimize efficiency with real-time AI.
               </p>
               
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/dashboard" className="px-8 py-4 rounded-xl bg-slate-900 text-white font-bold text-lg hover:bg-slate-800 hover:shadow-xl transition-all flex items-center justify-center gap-3">
                     View Live Dashboard <Activity size={20} />
                  </Link>
                  <Link to="/about" className="px-8 py-4 rounded-xl bg-white text-slate-700 border border-slate-200 font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-md">
                     Learn More <ArrowRight size={20} />
                  </Link>
               </div>
            </motion.div>
          </div>
      </header>

      {/* Features Preview */}
      <section className="relative z-10 py-20 bg-white/80 backdrop-blur-md border-t border-slate-100">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               
               {/* Feature 1 */}
               <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/50 transition-all group">
                  <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                     <Zap size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Energy AI</h3>
                  <p className="text-slate-500 leading-relaxed">
                     Predict peak loads and automate HVAC systems based on real-time occupancy and weather data.
                  </p>
               </div>

               {/* Feature 2 */}
               <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/50 transition-all group">
                  <div className="w-14 h-14 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 mb-6 group-hover:scale-110 transition-transform">
                     <Droplets size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Water Intelligence</h3>
                  <p className="text-slate-500 leading-relaxed">
                     Detect leaks instantly and optimize pump schedules to reduce wastage and overflow.
                  </p>
               </div>

               {/* Feature 3 */}
               <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/50 transition-all group">
                  <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                     <Leaf size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Waste & Ops</h3>
                  <p className="text-slate-500 leading-relaxed">
                     Forecast waste generation and optimize collection routes for a cleaner campus environment.
                  </p>
               </div>

            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12 relative z-10">
         <div className="container mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
               <Leaf className="text-green-600" />
               <span className="font-bold text-slate-700">GreenGrid AI</span>
            </div>
            <p className="text-slate-400 text-sm">
               &copy; 2026 GreenGrid AI. All rights reserved.
            </p>
         </div>
      </footer>

    </div>
  );
};

export default LandingPage;
