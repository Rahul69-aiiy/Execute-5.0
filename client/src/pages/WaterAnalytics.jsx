import React from 'react';
import HeatmapMap from '../components/HeatmapMap';
import StatCard from '../components/StatCard';
import { Droplets, AlertTriangle, CheckCircle } from 'lucide-react';

const WaterAnalytics = () => {
    // Mock Geo Data
    const mockData = [
        { id: 1, lat: 28.6139, lng: 77.2090, value: 90, zone: 'Zone A (Hostel)' },
        { id: 2, lat: 28.6200, lng: 77.2100, value: 40, zone: 'Zone B (Admin)' },
        { id: 3, lat: 28.6100, lng: 77.2000, value: 65, zone: 'Zone C (Sports)' },
        { id: 4, lat: 28.6150, lng: 77.2200, value: 20, zone: 'Zone D (Library)' },
        { id: 5, lat: 28.6250, lng: 77.2050, value: 85, zone: 'Zone E (Cafeteria)' },
    ];

  return (
    <div className="container animate-fade-in pb-10 pt-4 pr-6">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-brand-navy mb-2">Water Intelligence</h2>
            <p className="text-slate-500 font-medium">Spatial analysis and leakage detection system</p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-blue-50 text-brand-blue font-bold text-sm border border-blue-100">
             Live Sensor Data
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard 
                title="Current Flow Rate" 
                value="4,230" 
                unit="L/hr"
                icon={Droplets} 
                color="from-cyan-500 to-blue-600"
            />
            <StatCard 
                title="Leakage Probability" 
                value="High" 
                unit="Detector" 
                trend="up"
                icon={AlertTriangle} 
                color="from-red-500 to-orange-600"
            />
            <StatCard 
                title="System Efficiency" 
                value="92%" 
                unit="Operational" 
                icon={CheckCircle} 
                color="from-emerald-500 to-teal-600"
            />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-xl">
                 <h3 className="text-xl font-bold mb-6 text-brand-navy">Live Usage Heatmap</h3>
                 <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                    <HeatmapMap data={mockData} type="water" />
                 </div>
            </div>
            <div className="bg-white/80 backdrop-blur-xl p-6 border border-white/20 shadow-xl rounded-3xl h-fit">
                <h3 className="text-xl font-bold mb-6 text-brand-navy">Zone Analysis</h3>
                <div className="space-y-4">
                    {mockData.sort((a,b) => b.value - a.value).map((zone, idx) => (
                        <div key={zone.id} className="flex items-center justify-between p-4 rounded-xl bg-white/50 hover:bg-white transition-all border border-slate-100 shadow-sm hover:shadow-md hover:-translate-x-1 duration-300">
                            <div className="flex items-center gap-4">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${idx < 3 ? 'bg-brand-navy text-white' : 'bg-slate-100 text-slate-500'}`}>
                                    {idx+1}
                                </span>
                                <div>
                                    <h4 className="font-bold text-brand-navy">{zone.zone}</h4>
                                    <span className="text-xs text-slate-400 font-mono">Lat: {zone.lat.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                                zone.value > 80 ? 'bg-red-50 border-red-100 text-red-600' : 
                                zone.value > 50 ? 'bg-amber-50 border-amber-100 text-amber-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'
                            }`}>
                                {zone.value} L
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default WaterAnalytics;
