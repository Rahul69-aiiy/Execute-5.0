import React from 'react';
import ForecastingChart from '../components/ForecastingChart';
import { Zap, BatteryCharging, Fan, Sun, AlertTriangle } from 'lucide-react';

const ElectricityAnalytics = () => {
  const labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'];
  const historicalLoad = [120, 100, 250, 480, 500, 350, 200];
  const forecastLoad = [120, 100, 250, 480, 450, 320, 180];

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex items-center gap-4 mb-2">
        <div className="p-3 rounded-2xl bg-orange-100 text-orange-600">
          <Zap className="w-8 h-8" />
        </div>
        <div>
          <div className="flex items-center gap-2">
             <h1 className="text-3xl font-bold text-slate-800">Electricity <span className="text-slate-400">Analytics</span></h1>
             <a href="/dashboard" className="text-xs text-slate-400 hover:text-green-600 border border-slate-200 px-2 py-1 rounded-md ml-4 transition-colors">Back to Dashboard</a>
          </div>
          <p className="text-slate-500">Smart Grid Optimization & HVAC Control</p>
        </div>
      </div>

      {/* Strategies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Strategy 1: Smart HVAC */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Fan size={100} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Smart HVAC Control</h3>
          <p className="text-sm text-slate-500 mb-4">Occupancy-based setpoint adjustments.</p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-mono text-green-600 font-bold">24°C</span>
            <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded font-bold">Optimized</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-2/3"></div>
          </div>
          <p className="text-xs text-slate-400 mt-2">Saving 15% energy vs fixed 18°C</p>
        </div>

        {/* Strategy 2: Load Shifting */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
           <div className="absolute top-0 right-0 p-4 opacity-5">
            <BatteryCharging size={100} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Load Shifting</h3>
          <p className="text-sm text-slate-500 mb-4">Peak to Off-Peak scheduling.</p>
          <div className="flex flex-col gap-2">
             <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-50">
                <span className="text-slate-600">Heavy Machinery</span>
                <span className="text-purple-600 font-bold">22:00 PM</span>
             </div>
             <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-50">
                <span className="text-slate-600">Water Pumps</span>
                <span className="text-purple-600 font-bold">03:00 AM</span>
             </div>
          </div>
        </div>

        {/* Strategy 3: Renewable */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
           <div className="absolute top-0 right-0 p-4 opacity-5">
            <Sun size={100} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Renewable Integration</h3>
          <p className="text-sm text-slate-500 mb-4">Solar usage prediction.</p>
          <div className="flex items-end gap-2 text-amber-500 mb-2">
            <span className="text-3xl font-bold">45%</span>
            <span className="text-sm pb-1 font-medium text-amber-600">of load on Solar</span>
          </div>
           <p className="text-xs text-slate-400">Reducing grid dependency 12PM - 4PM</p>
        </div>
      </div>

      {/* Main Chart */}
      <div className="h-[400px] border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <ForecastingChart 
          title="Electricity Demand Forecast" 
          labels={labels}
          historicalData={historicalLoad}
          forecastData={forecastLoad}
          yAxisLabel="Power (kW)"
          color="#f97316" // Orange
        />
      </div>

       {/* Anomaly Detection Strip */}
       <div className="bg-white p-4 rounded-xl border-l-4 border-l-rose-500 border border-slate-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
             <div className="p-2 bg-rose-50 rounded-lg text-rose-500 animate-pulse">
                <AlertTriangle />
             </div>
             <div>
                <h4 className="font-bold text-slate-800">Anomaly Detected: Hostel Block B</h4>
                <p className="text-sm text-slate-500">Sudden spike of 200kW detected at 14:30. Possible HVAC malfunction.</p>
             </div>
          </div>
          <button className="px-4 py-2 rounded-lg bg-rose-50 text-rose-600 font-bold hover:bg-rose-100 transition-colors">
             Investigate
          </button>
       </div>

    </div>
  );
};

export default ElectricityAnalytics;
