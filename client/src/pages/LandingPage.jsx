import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Activity, Globe, ShieldCheck, Zap, Droplets 
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen font-sans text-brand-navy selection:bg-brand-blue selection:text-white bg-slate-50 overflow-x-hidden">
      
      {/* Abstract Background Shapes - Parallax */}
      <motion.div style={{ y: y2 }} className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px] animate-pulse-slow"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
         <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px]"></div>
      </motion.div>

      {/* Navigation - Glassmorphism */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/20 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
                <Activity className="text-white" size={24} />
             </div>
             <span className="text-2xl font-bold tracking-tight text-brand-navy">
               Execute<span className="text-brand-blue">5.0</span>
             </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 font-medium text-slate-500 text-sm">
             <a href="#features" className="hover:text-brand-blue transition-colors">Platform</a>
             <a href="#solutions" className="hover:text-brand-blue transition-colors">Solutions</a>
             <a href="#impact" className="hover:text-brand-blue transition-colors">Impact</a>
          </div>

          <Link to="/dashboard" className="px-6 py-2.5 rounded-full bg-brand-navy text-white font-semibold hover:bg-brand-blue transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 group">
             Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative w-full pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 z-10">
         <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Hero Text */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="space-y-8"
            >
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 text-brand-blue text-xs font-bold tracking-wide uppercase border border-blue-100 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  Project 5.0 Live
               </div>
               
               <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-brand-navy">
                  The OS for <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-400">
                     Earth's Resources
                  </span>
               </h1>
               
               <p className="text-lg text-slate-500 max-w-lg leading-relaxed font-light">
                  A unified digital twin for water, electricity, and infrastructure. predicting anomalies and optimizing efficiency in real-time.
               </p>
               
               <div className="flex flex-wrap gap-4 pt-4">
                  <Link to="/dashboard" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-blue to-cyan-500 text-white font-bold text-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 flex items-center gap-3">
                     Launch App <ArrowRight size={20} />
                  </Link>
                  <button className="px-8 py-4 rounded-2xl bg-white text-brand-navy border border-slate-200 font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                     Watch Demo
                  </button>
               </div>

               {/* Stats Strip */}
               <div className="pt-8 flex items-center gap-8 border-t border-slate-200/60">
                  <div>
                     <p className="text-3xl font-bold text-brand-navy">12+</p>
                     <p className="text-sm text-slate-500">Live Zones</p>
                  </div>
                  <div className="w-[1px] h-8 bg-slate-200"></div>
                  <div>
                     <p className="text-3xl font-bold text-brand-navy">1.4M</p>
                     <p className="text-sm text-slate-500">Events/Sec</p>
                  </div>
                  <div className="w-[1px] h-8 bg-slate-200"></div>
                  <div>
                     <p className="text-3xl font-bold text-brand-navy">99%</p>
                     <p className="text-sm text-slate-500">Accuracy</p>
                  </div>
               </div>
            </motion.div>

            {/* Hero Visual - With Parallax */}
            <motion.div 
               style={{ y: y }}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
               className="relative"
            >
               <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/50 bg-white">
                  <img 
                     src="https://images.unsplash.com/photo-1518005020951-ecc8e1218078?auto=format&fit=crop&q=80&w=1200" 
                     alt="Smart City Digital Twin" 
                     className="w-full h-[500px] object-cover scale-105 hover:scale-100 transition-transform duration-[2s]"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent"></div>
                  
                  {/* Floating Elements */}
                  <motion.div 
                     animate={{ y: [0, -10, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute bottom-8 left-8 p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 max-w-[200px]"
                  >
                     <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                           <ShieldCheck size={20} />
                        </div>
                        <span className="text-xs font-bold uppercase text-slate-500">System Status</span>
                     </div>
                     <p className="text-brand-navy font-bold">All Systems Operational</p>
                  </motion.div>

                  <motion.div 
                     animate={{ y: [0, 10, 0] }}
                     transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                     className="absolute top-8 right-8 p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-white/50"
                  >
                     <div className="flex items-center gap-4">
                        <div className="text-brand-blue">
                           <Activity size={28} />
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-brand-navy">84%</p>
                           <p className="text-xs text-slate-500 font-medium">Efficiency Score</p>
                        </div>
                     </div>
                  </motion.div>
               </div>

               {/* Background Decorative Rings */}
               <div className="absolute inset-0 border border-brand-blue/20 rounded-[3rem] transform translate-x-4 translate-y-4 -z-10"></div>
               <div className="absolute inset-0 border border-brand-blue/10 rounded-[3rem] transform translate-x-8 translate-y-8 -z-20"></div>
            </motion.div>
         </div>
      </header>

      {/* Features Bento Grid - Staggered Animation */}
      <section id="features" className="py-24 bg-white relative">
         <div className="container mx-auto px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={itemVariants}
              className="mb-16 text-center max-w-2xl mx-auto"
            >
               <h2 className="text-4xl font-bold text-brand-navy mb-4">Intelligence at Every Level</h2>
               <p className="text-slate-500 text-lg">
                  Unified command and control for complex urban infrastructure.
               </p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]"
            >
               {/* Large Feature Card */}
               <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2 rounded-3xl bg-slate-50 p-8 border border-slate-100 hover:border-brand-blue/20 transition-all group overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl -z-0"></div>
                  <div className="relative z-10 flex flex-col h-full justify-between">
                     <div>
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-blue mb-6">
                           <Globe size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-navy mb-2">Global Digital Twin</h3>
                        <p className="text-slate-500 max-w-sm">
                           Visualize entire city grids in real-time. Detect leaks, outages, and inefficiencies instantly with AI-powered overlays.
                        </p>
                     </div>
                     <div className="mt-8 rounded-2xl overflow-hidden shadow-lg border border-slate-200/60 bg-white">
                        <img 
                           src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
                           alt="Global Map" 
                           className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                     </div>
                  </div>
               </motion.div>

               {/* Small Feature Card 1 */}
               <motion.div variants={itemVariants} className="md:col-span-1 rounded-3xl bg-brand-navy p-8 border border-slate-800 text-white relative overflow-hidden group">
                  <div className="absolute inset-0 bg-brand-blue/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10">
                     <div className="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-xl flex items-center justify-center text-cyan-400 mb-6">
                        <Zap size={24} />
                     </div>
                     <h3 className="text-xl font-bold mb-2">Energy Grid</h3>
                     <p className="text-slate-400 text-sm">Peak load balancing and renewable integration.</p>
                  </div>
               </motion.div>

               {/* Small Feature Card 2 */}
               <motion.div variants={itemVariants} className="md:col-span-1 rounded-3xl bg-white p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                     <Droplets size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy mb-2">Smart Water</h3>
                  <p className="text-slate-500 text-sm">Leak detection and quality monitoring.</p>
               </motion.div>
            </motion.div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-navy relative overflow-hidden">
         <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
         >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393798-3828fb4090bb?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/90 to-brand-navy/50"></div>
         </motion.div>
         
         <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
            >
               Ready to optimize your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-400">infrastructure?</span>
            </motion.h2>
            <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-slate-400 text-lg max-w-2xl mx-auto mb-10"
            >
               Join leading cities and organizations using Execute 5.0 to reduce waste and improve operational efficiency.
            </motion.p>
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
            >
               <Link to="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-blue text-white font-bold text-lg hover:bg-white hover:text-brand-blue transition-all duration-300 shadow-lg hover:shadow-cyan-500/50">
                  Get Started Now <ArrowRight size={20} />
               </Link>
            </motion.div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
         <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
               <div className="flex items-center gap-2 mb-4 text-white">
                  <Activity className="text-brand-blue" />
                  <span className="font-bold text-xl">Execute 5.0</span>
               </div>
               <p className="text-sm max-w-xs">
                  Next-generation sustainability operating system for smarter, greener cities.
               </p>
            </div>
            <div>
               <h4 className="text-white font-bold mb-4">Platform</h4>
               <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-brand-blue">Dashboard</a></li>
                  <li><a href="#" className="hover:text-brand-blue">Analytics</a></li>
                  <li><a href="#" className="hover:text-brand-blue">Simulations</a></li>
               </ul>
            </div>
            <div>
               <h4 className="text-white font-bold mb-4">Legal</h4>
               <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-brand-blue">Privacy</a></li>
                  <li><a href="#" className="hover:text-brand-blue">Terms</a></li>
                  <li><a href="#" className="hover:text-brand-blue">Security</a></li>
               </ul>
            </div>
         </div>
         <div className="container mx-auto px-6 pt-8 mt-8 border-t border-slate-800 text-center text-xs">
            &copy; 2026 ASOS Inc. All rights reserved.
         </div>
      </footer>

    </div>
  );
};

export default LandingPage;
