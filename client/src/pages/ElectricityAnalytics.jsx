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
    <div className="container animate-fade-in pb-10 pt-4 pr-6">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-brand-navy mb-2">Electricity Control</h2>
            <p className="text-slate-500 font-medium">Peak load management and efficiency tracking</p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-orange-50 text-orange-600 font-bold text-sm border border-orange-100 flex items-center gap-2">
             <Zap size={16} /> Grid Active
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
            <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-xl">
                 <h3 className="text-xl font-bold mb-6 text-brand-navy">Load Distribution Heatmap</h3>
                 <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                    <HeatmapMap data={mockData} type="electricity" />
                 </div>
            </div>
            <div className="bg-white/80 backdrop-blur-xl p-6 border border-white/20 shadow-xl rounded-3xl h-fit">
                <h3 className="text-xl font-bold mb-6 text-brand-navy">High Consumption Units</h3>
                <div className="space-y-4">
                    {mockData.sort((a,b) => b.value - a.value).map((zone, idx) => (
                        <div key={zone.id} className="flex items-center justify-between p-4 rounded-xl bg-white/50 hover:bg-white transition-all border border-slate-100 shadow-sm hover:shadow-md hover:-translate-x-1 duration-300">
                            <div className="flex items-center gap-4 flex-1">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${idx < 3 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                                    0{idx+1}
                                </span>
                                <div className="w-full mr-4">
                                    <h4 className="font-bold text-brand-navy">{zone.zone}</h4>
                                    <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden shadow-inner">
                                        <div 
                                            className={`h-full rounded-full ${zone.value > 80 ? 'bg-gradient-to-r from-red-500 to-rose-500' : 'bg-gradient-to-r from-emerald-400 to-emerald-500'}`} 
                                            style={{ width: `${zone.value}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right min-w-[60px]">
                                <div className="text-lg font-bold text-brand-navy">{zone.value}</div>
                                <span className="text-[10px] uppercase font-bold text-slate-400">kW Load</span>
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
