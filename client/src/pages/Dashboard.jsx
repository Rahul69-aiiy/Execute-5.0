import React, { useEffect, useState } from 'react';
import { Droplets, Zap, Activity, Leaf } from 'lucide-react';
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
      legend: { position: 'top', labels: { color: '#94a3b8' } },
    },
    scales: {
      y: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#94a3b8' } },
      x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
    }
  };

  return (
    <div className="container animate-fade-in">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
          <p className="text-gray-400">Real-time sustainability metrics for Zone A</p>
        </div>
        <div className="text-right flex flex-col items-end gap-2">
             <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm border border-blue-500/30">Live Monitoring</span>
             <span className="text-xs text-emerald-400 animate-pulse">● Twin Connected</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
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
      <div className="mb-8">
        <SimulationControl />
      </div>

      {/* Main Chart */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-bold mb-6">Consumption Trends</h3>
        <div className="h-[400px] w-full">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
