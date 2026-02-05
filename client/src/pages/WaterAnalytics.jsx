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
    <div className="container animate-fade-in">
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">Water Intelligence</h2>
          <p className="text-gray-400">Spatial analysis and leakage detection system</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
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
            <div className="lg:col-span-2">
                 <h3 className="text-xl font-bold mb-4 text-white">Live Usage Heatmap</h3>
                 <HeatmapMap data={mockData} type="water" />
            </div>
            <div className="glass-panel p-6">
                <h3 className="text-xl font-bold mb-4 text-white">Zone Analysis</h3>
                <div className="space-y-4">
                    {mockData.sort((a,b) => b.value - a.value).map((zone, idx) => (
                        <div key={zone.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 font-mono">0{idx+1}</span>
                                <div>
                                    <h4 className="font-medium text-gray-200">{zone.zone}</h4>
                                    <span className="text-xs text-gray-500">Lat: {zone.lat.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-bold ${
                                zone.value > 80 ? 'bg-red-500/20 text-red-400' : 
                                zone.value > 50 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
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
