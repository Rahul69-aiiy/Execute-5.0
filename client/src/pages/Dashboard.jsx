import React, { useEffect, useState } from 'react';
import { Droplets, Zap, Activity, Leaf, Globe } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import axios from 'axios';
import StatCard from '../components/StatCard';
import SimulationControl from '../components/SimulationControl';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [stats, setStats] = useState({ water: 0, electricity: 0 });
  
  useEffect(() => {
    // Fetch stats from backend
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard/stats');
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
        // Fallback or maintain 0
      }
    };
    fetchStats();
  }, []);

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Water (Liters)',
        data: [1200, 1900, 1500, 2100, 1800, 2400, 2000],
        borderColor: '#0ea5e9', // Sky blue
        backgroundColor: 'rgba(14, 165, 233, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Electricity (kWh)',
        data: [450, 520, 480, 550, 600, 580, 620],
        borderColor: '#fbbf24', // Amber
        backgroundColor: 'rgba(251, 191, 36, 0.2)',
        tension: 0.4,
        fill: true,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: '#1B2A4E' } },
    },
    scales: {
      y: { grid: { color: 'rgba(0, 0, 0, 0.05)' }, ticks: { color: '#64748B' } },
      x: { grid: { display: false }, ticks: { color: '#64748B' } }
    }
  };

  return (
    <div className="animate-fade-in pb-10 pt-4 pr-6">
      {/* Hero Banner - Modern Floating */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-10 h-[280px] group">
         <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-cyan-500"></div>
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay opacity-40 group-hover:scale-105 transition-transform duration-[2s]"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent"></div>
         
         <div className="relative z-10 h-full flex flex-col justify-center px-12 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-fit mb-4">
               <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
               <span className="text-xs font-bold tracking-wider uppercase">Live Operations</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 leading-tight">Zone A <br/> <span className="text-cyan-200">Command Center</span></h1>
            <p className="text-white/80 text-lg max-w-xl">
              Real-time resource allocation and anomaly detection for critical infrastructure.
            </p>
         </div>
      </div>

      <div className="container mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-brand-navy mb-2">System Overview</h2>
            <p className="text-slate-500 font-medium">Monitoring active nodes and resource flows.</p>
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-2 rounded-xl bg-white text-brand-navy border border-slate-200 font-bold hover:bg-slate-50 shadow-sm transition-all">
                Export Report
             </button>
             <button className="px-4 py-2 rounded-xl bg-brand-navy text-white font-bold hover:bg-brand-blue shadow-lg hover:shadow-blue-500/30 transition-all">
                System Health
             </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Water Consumed" 
            value={stats.water.toLocaleString()} 
            unit="L" 
            change="12" 
            trend="down"
            icon={Droplets} 
            color="from-cyan-500 to-blue-600"
          />
          <StatCard 
            title="Total Energy Used" 
            value={stats.electricity.toLocaleString()} 
            unit="kWh" 
            change="8" 
            trend="up"
            icon={Zap} 
            color="from-amber-400 to-orange-500"
          />
          <StatCard 
            title="Active Alerts" 
            value="3" 
            unit="Critical" 
            icon={Activity} 
            color="from-red-500 to-pink-600"
          />
           <StatCard 
            title="Sustainability Score" 
            value="87" 
            unit="/100" 
            change="2.4" 
            trend="up" // Positive trend for score is up
            icon={Leaf} 
            color="from-emerald-400 to-green-600"
          />
        </div>

        {/* Simulation Control */}
        <div className="mb-10">
          <SimulationControl />
        </div>

        {/* Main Chart */}
        <div className="bg-white/80 backdrop-blur-xl p-8 shadow-xl border border-white/20 rounded-3xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl -z-10"></div>
          <div className="flex justify-between items-center mb-8">
             <h3 className="text-xl font-bold text-brand-navy">Consumption Trends</h3>
             <select className="px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm font-medium text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-blue/20">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
             </select>
          </div>
          <div className="h-[400px] w-full">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
