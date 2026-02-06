import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Droplets, Thermometer, Sun, Play, RefreshCw, AlertTriangle } from 'lucide-react';

const DigitalTwin = () => {
  const [activeLayer, setActiveLayer] = useState('energy'); 
  const [simulationActive, setSimulationActive] = useState(false);
  const [temperature, setTemperature] = useState(24);
  const [occupancy, setOccupancy] = useState(75);

  const toggleSimulation = () => {
    setSimulationActive(!simulationActive);
  };

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">Campus Digital Twin</h1>
          <p className="text-slate-500 mt-1">Real-time simulation and "What-If" scenario planning.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={toggleSimulation}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg
              ${simulationActive 
                ? 'bg-amber-500 text-white shadow-amber-500/30' 
                : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
          >
            {simulationActive ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            {simulationActive ? 'SIMULATION RUNNING' : 'RUN SIMULATION'}
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        
        {/* Main 3D Visualization Area (Mocked with Light CSS) */}
        <div className="col-span-12 lg:col-span-9 relative bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-1000 grayscale-[20%]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent"></div>
          
          {/* Overlay Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(22,163,74,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(22,163,74,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [perspective:1000px] [transform:rotateX(60deg)_translateY(-100px)] pointer-events-none"></div>

          {/* Floating Data Points */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-1/4 left-1/4"
          >
            <div className="bg-white/90 backdrop-blur-md p-3 rounded-lg border-l-4 border-l-green-500 shadow-xl">
              <span className="text-xs text-slate-500 font-bold tracking-wider">BUILDING A</span>
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <Zap className="w-4 h-4 text-green-500" />
                <span>450 kW</span>
              </div>
              <span className="text-[10px] text-green-600 font-bold bg-green-50 px-1 rounded">Optimal</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-1/3 right-1/3"
          >
             <div className="bg-white/90 backdrop-blur-md p-3 rounded-lg border-l-4 border-l-rose-500 shadow-xl">
              <span className="text-xs text-slate-500 font-bold tracking-wider">HOSTEL BLOCK C</span>
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <Droplets className="w-4 h-4 text-rose-500" />
                <span>Leak Detected</span>
              </div>
              <span className="text-[10px] text-rose-500 font-bold animate-pulse">Action Required</span>
            </div>
          </motion.div>

          {/* Layer Controls */}
          <div className="absolute bottom-6 left-6 flex gap-2">
            {['energy', 'water', 'waste', 'occupancy'].map(layer => (
              <button
                key={layer}
                onClick={() => setActiveLayer(layer)}
                className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all shadow-sm
                  ${activeLayer === layer 
                    ? 'bg-white text-green-600 shadow-md ring-2 ring-green-500' 
                    : 'bg-white/80 text-slate-500 hover:bg-white hover:text-slate-800'
                  }`}
              >
                {layer}
              </button>
            ))}
          </div>
        </div>

        {/* Right Control Panel */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
          
          {/* Stats Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Thermometer size={80} className="text-orange-500" />
            </div>
            <h3 className="text-slate-500 text-sm font-bold uppercase mb-1">Grid Load</h3>
            <p className="text-4xl font-extrabold text-slate-800 flex items-end gap-2">
              87% <span className="text-sm text-rose-500 font-bold mb-1">▲ Peak</span>
            </p>
          </div>

           {/* Simulation Controls */}
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex-1 flex flex-col gap-6">
            <h3 className="font-bold text-lg text-slate-800 border-b border-slate-100 pb-4 flex items-center gap-2">
               <Sun className="w-5 h-5 text-amber-500" />
               Scenario Controls
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-600">Global Temp Setpoint</span>
                  <span className="text-green-600 font-mono font-bold bg-green-50 px-2 rounded">{temperature}°C</span>
                </div>
                <input 
                  type="range" 
                  min="18" 
                  max="30" 
                  value={temperature} 
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-600">Occupancy Load</span>
                  <span className="text-purple-600 font-mono font-bold bg-purple-50 px-2 rounded">{occupancy}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={occupancy} 
                  onChange={(e) => setOccupancy(e.target.value)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

               <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Impact Forecast</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Increasing temp by 2°C saves approx <span className="text-green-600 font-bold">12% Energy</span> but reduces comfort score by <span className="text-rose-500 font-bold">5%</span>.
                      </p>
                    </div>
                  </div>
               </div>
            </div>

            <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl mt-auto hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
              Apply Changes
            </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default DigitalTwin;
