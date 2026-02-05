import React from 'react';
import HeatmapMap from '../components/HeatmapMap';
import StatCard from '../components/StatCard';
import { Zap, BatteryCharging, AlertOctagon } from 'lucide-react';

const ElectricityAnalytics = () => {
    // Mock Geo Data for Electricity
    const mockData = [
        { id: 1, lat: 28.6139, lng: 77.2090, value: 40, zone: 'Zone A (Hostel)' },
        { id: 2, lat: 28.6200, lng: 77.2100, value: 85, zone: 'Zone B (Admin)' }, // High Load
        { id: 3, lat: 28.6100, lng: 77.2000, value: 30, zone: 'Zone C (Sports)' },
        { id: 4, lat: 28.6150, lng: 77.2200, value: 95, zone: 'Zone D (Server Room)' }, // Very High
        { id: 5, lat: 28.6250, lng: 77.2050, value: 50, zone: 'Zone E (Cafeteria)' },
    ];

  return (
    <div className="container animate-fade-in">
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">Electricity Control</h2>
          <p className="text-gray-400">Peak load management and efficiency tracking</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
            <StatCard 
                title="Current Load" 
                value="850" 
                unit="kW"
                change="5"
                trend="up"
                icon={Zap} 
                color="from-amber-400 to-orange-500"
            />
            <StatCard 
                title="Grid Stability" 
                value="98.5%" 
                unit="Uptime" 
                icon={BatteryCharging} 
                color="from-blue-500 to-indigo-600"
            />
            <StatCard 
                title="Peak Warning" 
                value="Zone D" 
                unit="Critical" 
                icon={AlertOctagon} 
                color="from-red-500 to-rose-600"
            />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                 <h3 className="text-xl font-bold mb-4 text-white">Load Distribution Heatmap</h3>
                 <HeatmapMap data={mockData} type="electricity" />
            </div>
            <div className="glass-panel p-6">
                <h3 className="text-xl font-bold mb-4 text-white">High Consumption Units</h3>
                <div className="space-y-4">
                    {mockData.sort((a,b) => b.value - a.value).map((zone, idx) => (
                        <div key={zone.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 font-mono">0{idx+1}</span>
                                <div>
                                    <h4 className="font-medium text-gray-200">{zone.zone}</h4>
                                    <div className="w-24 h-1.5 bg-gray-700 rounded-full mt-1 overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full ${zone.value > 80 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                                            style={{ width: `${zone.value}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-bold text-white">{zone.value} kW</div>
                                <span className="text-xs text-gray-500">Usage</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ElectricityAnalytics;
