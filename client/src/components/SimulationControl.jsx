import React, { useState } from 'react';
import axios from 'axios';
import { Play, AlertTriangle, Activity } from 'lucide-react';

const SimulationControl = () => {
    const [activeScenario, setActiveScenario] = useState('normal');

    const triggerScenario = async (scenario) => {
        try {
            await axios.post('http://localhost:5000/api/dashboard/simulate', { scenario });
            setActiveScenario(scenario);
        } catch (err) {
            console.error("Sim Trigger Failed", err);
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-xl p-8 border border-white/20 shadow-xl rounded-3xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-brand-navy">
                <Activity className="text-brand-blue" />
                Digital Twin Simulation
            </h3>
            <p className="text-sm text-slate-500 mb-6">
                Control the backend physics engine to simulate "What-If" scenarios.
            </p>

            <div className="flex gap-4">
                <button 
                    onClick={() => triggerScenario('normal')}
                    className={`btn flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all font-bold ${activeScenario === 'normal' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                >
                    <Play size={18} /> Normal
                </button>
                <button 
                    onClick={() => triggerScenario('leak')}
                    className={`btn flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all font-bold ${activeScenario === 'leak' ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                >
                    <AlertTriangle size={18} /> Leak Event
                </button>
                <button 
                    onClick={() => triggerScenario('overload')}
                    className={`btn flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all font-bold ${activeScenario === 'overload' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                >
                    <Activity size={18} /> Overload
                </button>
            </div>
            
            <div className="mt-4 text-center">
                 <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                    Status: {activeScenario === 'normal' ? 'Running Optimal Profile' : 'Injecting Fault Anomaly'}
                 </span>
            </div>
        </div>
    );
};

export default SimulationControl;
