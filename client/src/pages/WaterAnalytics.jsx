import React, { useState, useEffect } from 'react';
import ForecastingChart from '../components/ForecastingChart';
import { Droplets, Activity, CloudRain, RotateCw } from 'lucide-react';
import axios from 'axios';

const WaterAnalytics = () => {
    const [waterData, setWaterData] = useState({
      weeklyData: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        actual: [5000, 5200, 4900, 5100, 5300, 6000, 5800],
        forecast: [5050, 5100, 4850, 5000, 5200, 5900, 5700]
      },
      pumpSchedule: [],
      rainwater: null,
      leakDetection: null,
      reuseStats: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchWaterData();
    }, []);

    const fetchWaterData = async () => {
      try {
        const [weeklyRes, analyticsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/dashboard/weekly-water'),
          axios.get('http://localhost:5000/api/dashboard/water-analytics')
        ]);

        if (weeklyRes.data.success) {
          setWaterData(prev => ({
            ...prev,
            weeklyData: weeklyRes.data.data
          }));
        }

        if (analyticsRes.data.success) {
          const { pumpSchedule, rainwater, leakDetection, reuseStats } = analyticsRes.data.data;
          setWaterData(prev => ({
            ...prev,
            pumpSchedule,
            rainwater,
            leakDetection,
            reuseStats
          }));
        }
      } catch (error) {
        console.error('Error fetching water analytics:', error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex items-center gap-4 mb-2">
        <div className="p-3 rounded-2xl bg-sky-100 text-sky-600">
          <Droplets className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Water <span className="text-slate-400">Analytics</span></h1>
          <p className="text-slate-500">Smart Pumping, Leak Detection & Reuse</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Forecasting Chart */}
         <div className="h-[350px] border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <ForecastingChart
            title="Daily Water Demand Forecast"
            labels={waterData.weeklyData.labels}
            historicalData={waterData.weeklyData.actual}
            forecastData={waterData.weeklyData.forecast}
            yAxisLabel="Volume (L)"
            color="#0ea5e9" // Sky Blue
            />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pump Scheduling */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Activity className="text-green-600" />
                        <h3 className="font-bold text-slate-800">Smart Schedule</h3>
                    </div>
                    <p className="text-sm text-slate-500">Optimized based on tank levels & demand.</p>
                </div>
                <div className="mt-4 space-y-2">
                     {waterData.pumpSchedule.length > 0 ? (
                       waterData.pumpSchedule.map((pump, idx) => (
                         <div key={idx} className="flex justify-between text-xs bg-slate-50 p-2 rounded border border-slate-100">
                            <span className="text-slate-600">{pump.name}</span>
                            <span className="text-green-600 font-mono font-bold">ON @ {pump.time}</span>
                         </div>
                       ))
                     ) : (
                       <>
                         <div className="flex justify-between text-xs bg-slate-50 p-2 rounded border border-slate-100">
                            <span className="text-slate-600">Main Tank Pump</span>
                            <span className="text-green-600 font-mono font-bold">ON @ 03:00 AM</span>
                         </div>
                         <div className="flex justify-between text-xs bg-slate-50 p-2 rounded border border-slate-100">
                            <span className="text-slate-600">Hostel B Pump</span>
                            <span className="text-green-600 font-mono font-bold">ON @ 05:30 AM</span>
                         </div>
                       </>
                     )}
                </div>
            </div>

            {/* Rainwater */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                 <div>
                    <div className="flex items-center gap-2 mb-2">
                        <CloudRain className="text-blue-500" />
                        <h3 className="font-bold text-slate-800">Rainwater</h3>
                    </div>
                    <p className="text-sm text-slate-500">
                      Predicted: <span className="text-slate-800 font-bold">
                        {waterData.rainwater?.predicted || 1200}{waterData.rainwater?.unit || 'L'}
                      </span>
                    </p>
                </div>
                <div className="w-full bg-slate-100 h-28 rounded-lg relative overflow-hidden mt-2">
                    <div
                      className="absolute bottom-0 left-0 w-full bg-blue-400/30 animate-pulse"
                      style={{ height: `${waterData.rainwater?.currentLevel || 60}%` }}
                    ></div>
                    <div className="absolute bottom-0 left-0 w-full border-t border-blue-500/50 flex justify-center text-[10px] text-blue-600 font-bold pt-1">
                        Current Level
                    </div>
                </div>
            </div>

            {/* Leak Detection */}
            <div className="bg-sky-50 p-5 rounded-2xl border border-sky-100 col-span-1 md:col-span-2 flex items-center justify-between">
                <div className="flex items-center gap-4">
                     <div className="p-2 bg-sky-100 rounded-full animate-bounce">
                         <Droplets className="text-sky-600 w-5 h-5" />
                     </div>
                     <div>
                         <h3 className="font-bold text-slate-800">Leak Probability Alert</h3>
                         <p className="text-xs text-slate-500">
                           {waterData.leakDetection?.description || 'Abnormal night-time flow detected'} in <b className="text-slate-800">{waterData.leakDetection?.zone || 'Zone C'}</b>.
                         </p>
                     </div>
                </div>
                <span className="text-2xl font-bold text-sky-600">
                  {waterData.leakDetection?.probability || 89}%
                </span>
            </div>
         </div>
      </div>

        {/* Reuse Strategies */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
           <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
               <RotateCw className="text-green-600" />
               Water Reuse Optimization
           </h3>
           <div className="flex items-center gap-8">
               <div className="flex-1 text-center border-r border-slate-100 last:border-0">
                    <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-bold">Greywater Recycled</p>
                    <p className="text-3xl font-bold text-slate-800">
                      {waterData.reuseStats?.recycled?.toLocaleString() || '15,000'} L
                    </p>
                    <span className="text-xs text-green-600 font-bold">
                      +{waterData.reuseStats?.recycledChange || 12}% vs last month
                    </span>
               </div>
               <div className="flex-1 text-center border-r border-slate-100 last:border-0">
                    <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-bold">Gardening Usage</p>
                    <p className="text-3xl font-bold text-slate-800">
                      {waterData.reuseStats?.gardeningUsage || 80}%
                    </p>
                    <span className="text-xs text-slate-500">From recycled sources</span>
               </div>
               <div className="flex-1 text-center border-r border-slate-100 last:border-0">
                    <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-bold">Total Savings</p>
                    <p className="text-3xl font-bold text-green-600">
                      ${waterData.reuseStats?.monthlySavings || 450}
                    </p>
                    <span className="text-xs text-slate-500">Estimated monthly</span>
               </div>
           </div>
      </div>

    </div>
  );
};

export default WaterAnalytics;
