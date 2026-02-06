import React from 'react';
import ForecastingChart from '../components/ForecastingChart';
import { Recycle, Truck, Users, BrainCircuit, Check, X } from 'lucide-react';

const WasteOperations = () => {
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const wasteGen = [120, 110, 130, 115, 140, 180, 160];
    const wasteForecast = [118, 112, 128, 120, 145, 175, 155];

    return (
        <div className="flex flex-col gap-6 pb-10">
            <div className="flex items-center gap-4 mb-2">
                <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-600">
                    <Recycle className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Waste & <span className="text-slate-400">Operations</span></h1>
                    <p className="text-slate-500">Generation Forecasting & AI Decision Support</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Waste Chart */}
                <div className="lg:col-span-2 h-[400px] bg-white rounded-2xl border border-slate-200 shadow-sm p-2">
                    <ForecastingChart 
                        title="Solid Waste Generation Forecast (kg)"
                        labels={labels}
                        historicalData={wasteGen}
                        forecastData={wasteForecast}
                        yAxisLabel="Weight (kg)"
                        color="#10b981" // Emerald
                    />
                </div>

                {/* Collection Optimization */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Truck className="text-green-600" />
                        Collection Logic
                    </h3>
                    
                    <div className="space-y-4">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm text-slate-600">Mess Hall A</span>
                                <span className="text-[10px] bg-rose-100 text-rose-600 px-2 py-0.5 rounded font-bold uppercase">High Vol</span>
                            </div>
                            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                <div className="h-full bg-rose-500 w-[85%]"></div>
                            </div>
                            <p className="text-xs text-right text-slate-400 mt-1 font-bold">Bin at 85%</p>
                        </div>

                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm text-slate-600">Hostel Block C</span>
                                <span className="text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded font-bold uppercase">Normal</span>
                            </div>
                            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[30%]"></div>
                            </div>
                            <p className="text-xs text-right text-slate-400 mt-1 font-bold">Bin at 30%</p>
                        </div>

                        <div className="mt-auto pt-4 border-t border-slate-100">
                            <p className="text-sm text-green-600 font-bold">Recommended Action:</p>
                            <p className="text-xs text-slate-500 mt-1">
                                Route Truck #2 to Mess Hall A immediately. Delay Hostel C collection.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Decision Support & Awareness */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* AI Decision Support */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 text-slate-50">
                        <BrainCircuit size={150} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 relative z-10">
                        <BrainCircuit className="text-purple-600" />
                        AI Strategic Recommendations
                    </h3>

                    <div className="space-y-3 relative z-10">
                        <div className="flex gap-3 items-start p-3 bg-purple-50 rounded-xl border border-purple-100">
                            <div className="mt-1">
                                <div className="w-2 h-2 rounded-full bg-purple-600 animate-ping"></div>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-800">Grid Stress Predicted Tomorrow</h4>
                                <p className="text-xs text-slate-500 mt-1">
                                    High probability of peak load exceeding threshold at 2 PM.
                                </p>
                                <div className="flex gap-2 mt-2">
                                    <button className="px-3 py-1 rounded-md bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition-colors">
                                        Auto-Schedule Load Shedding
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="mt-1">
                                <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-700">Water Conservation Mode</h4>
                                <p className="text-xs text-slate-500 mt-1">
                                    Rainwater tanks are full. Switch landscape irrigation source?
                                </p>
                                <div className="flex gap-2 mt-2">
                                    <button className="flex items-center gap-1 px-3 py-1 rounded bg-green-100 text-green-700 text-xs font-bold hover:bg-green-200">
                                        <Check size={12} /> Approve
                                    </button>
                                    <button className="flex items-center gap-1 px-3 py-1 rounded bg-rose-100 text-rose-700 text-xs font-bold hover:bg-rose-200">
                                        <X size={12} /> Ignore
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Student Awareness */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Users className="text-green-600" />
                        Community Awareness
                    </h3>
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                        <h2 className="text-5xl font-bold text-green-600 mb-2">A+</h2>
                        <p className="text-slate-800 font-bold">Sustainability Score</p>
                        <p className="text-xs text-slate-500 mt-2">
                            Top performing building: <span className="text-green-600 font-bold">Library Block</span>
                        </p>
                        <div className="mt-6 flex justify-center gap-2">
                            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Campus Ranking</span>
                        </div>
                        <div className="flex items-end justify-center gap-2 h-16 mt-2">
                            <div className="w-8 bg-slate-200 h-[60%] rounded-t-sm"></div>
                            <div className="w-8 bg-gradient-to-t from-green-500 to-emerald-400 h-[100%] rounded-t-sm shadow-lg relative">
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-green-600 whitespace-nowrap">YOU</span>
                            </div>
                            <div className="w-8 bg-slate-200 h-[80%] rounded-t-sm"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WasteOperations;
