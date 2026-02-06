import React from 'react';
import { Droplets, Zap, Activity, Leaf, AlertTriangle, TrendingUp, Sun, ArrowRight } from 'lucide-react';
import StatCard from '../components/StatCard';
import ForecastingChart from '../components/ForecastingChart';

const Dashboard = () => {
  // Mock Data
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const energyData = [450, 520, 480, 550, 600, 580, 620];
  const energyForecast = [460, 530, 490, 540, 590, 570, 610];

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Hero Welcome Section */}
      <div className="relative rounded-3xl overflow-hidden min-h-[200px] flex items-center px-10 border border-slate-200 shadow-xl shadow-slate-200/50 bg-white">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
         <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
         
         <div className="relative z-10 w-full max-w-2xl">
            <div className="flex items-center gap-2 text-green-600 mb-2">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               <span className="text-xs font-bold uppercase tracking-widest">System Operational</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-800 mb-3 leading-tight">
               GreenGrid AI <span className="text-green-600">Hub</span>
            </h1>
            <p className="text-slate-500 text-lg">
               Real-time AI monitoring of Consumption, Waste, and Resources.
            </p>
         </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Avg Energy Usage" 
          value="542" 
          unit="kWh" 
          change="12" 
          trend="down"
          icon={Zap} 
          color="from-orange-400 to-amber-500"
        />
        <StatCard 
          title="Water Flow Rate" 
          value="1,240" 
          unit="L/hr" 
          change="5" 
          trend="up"
          icon={Droplets} 
          color="from-cyan-400 to-blue-500"
        />
        <StatCard 
          title="Sustainability Score" 
          value="87" 
          unit="/100" 
          change="3" 
          trend="up" 
          icon={Leaf} 
          color="from-green-400 to-emerald-600"
        />
        <StatCard 
          title="Pending Alerts" 
          value="2" 
          unit="Critical" 
          icon={AlertTriangle} 
          color="from-rose-400 to-red-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[400px]">
         
         {/* Main Chart */}
         <div className="lg:col-span-2 h-full bg-white rounded-2xl border border-slate-100 shadow-sm p-2">
            <ForecastingChart 
               title="Campus Energy Energy Demand"
               labels={labels}
               historicalData={energyData}
               forecastData={energyForecast}
               yAxisLabel="Load (kWh)"
               color="#16a34a"
            />
         </div>

         {/* Right Sidebar / Alerts */}
         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-slate-50 pb-4">
               <h3 className="font-bold text-lg text-slate-800">Live Intelligence</h3>
               <Activity className="text-green-600 w-5 h-5" />
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
               {/* Alert Item */}
               <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 flex gap-4 items-start">
                  <div className="mt-1 p-1 bg-rose-500 rounded-full animate-pulse"></div>
                  <div>
                     <h4 className="font-bold text-sm text-slate-800">Anomaly Detected</h4>
                     <p className="text-xs text-slate-500 mt-1">Unusual spike in HVAC consumption in Block B.</p>
                     <p className="text-[10px] text-rose-500 mt-2 font-mono font-bold">14 MINS AGO</p>
                  </div>
               </div>

                {/* Insight Item */}
               <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex gap-4 items-start">
                  <div className="mt-1">
                     <Sun className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                     <h4 className="font-bold text-sm text-slate-800">Solar Optimization</h4>
                     <p className="text-xs text-slate-500 mt-1">High generation period. Suggest shifting pump operations.</p>
                     <button className="mt-2 text-[10px] px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-bold hover:bg-amber-200 transition-colors">
                        Auto-Apply
                     </button>
                  </div>
               </div>

               {/* Standard Log */}
               <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex gap-4 items-start">
                   <div className="mt-1 text-green-600">
                     <Leaf size={16} />
                   </div>
                  <div>
                     <h4 className="font-bold text-sm text-slate-800">Daily Report Ready</h4>
                     <p className="text-xs text-slate-500 mt-1">Yesterday's carbon footprint report is available.</p>
                  </div>
               </div>
            </div>
            
            <button className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                View All Alerts <ArrowRight size={16} />
            </button>
         </div>

      </div>
    </div>
  );
};

export default Dashboard;
