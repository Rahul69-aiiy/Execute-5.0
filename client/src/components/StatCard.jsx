import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, unit, change, trend, icon: Icon, color }) => {
  const isPositive = trend === 'up';
  
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300">
      
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white shadow-md`}>
          <Icon size={24} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {change}%
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-slate-800 tracking-tight">{value}</span>
          {unit && <span className="text-sm text-slate-400 font-medium">{unit}</span>}
        </div>
      </div>

       <div className={`absolute -bottom-6 -right-6 p-4 opacity-5 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${color} bg-clip-text text-transparent transform rotate-12`}>
        <Icon size={100} />
      </div>

    </div>
  );
};

export default StatCard;
