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
        <div className="glass-panel p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Activity className="text-blue-400" />
                Digital Twin Simulation
            </h3>
            <p className="text-sm text-gray-400 mb-6">
                Control the backend physics engine to simulate "What-If" scenarios.
            </p>

            <div className="flex gap-4">
                <button 
                    onClick={() => triggerScenario('normal')}
                    className={`btn flex-1 flex items-center justify-center gap-2 ${activeScenario === 'normal' ? 'bg-emerald-600' : 'bg-gray-700'}`}
                >
                    <Play size={16} /> Normal Ops
                </button>
                <button 
                    onClick={() => triggerScenario('leak')}
                    className={`btn flex-1 flex items-center justify-center gap-2 ${activeScenario === 'leak' ? 'bg-red-600' : 'bg-gray-700'}`}
                >
                    <AlertTriangle size={16} /> Burst Pipe
                </button>
                <button 
                    onClick={() => triggerScenario('overload')}
                    className={`btn flex-1 flex items-center justify-center gap-2 ${activeScenario === 'overload' ? 'bg-amber-600' : 'bg-gray-700'}`}
                >
                    <Activity size={16} /> Grid Overload
                </button>
            </div>
            
            <div className="mt-4 text-center">
                 <span className="text-xs text-gray-500 uppercase tracking-widest">
                    Status: {activeScenario === 'normal' ? 'Running Optimal Profile' : 'Injecting Fault Anomaly'}
                 </span>
            </div>
        </div>
    );
};

export default SimulationControl;
