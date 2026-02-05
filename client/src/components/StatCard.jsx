import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, unit, change, trend = 'neutral', icon: Icon, color }) => {
  return (
    <div className="glass-panel p-6 relative overflow-hidden group hover:bg-white/[0.07] transition-all">
      <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
        <Icon size={64} />
      </div>
      
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} bg-opacity-20 text-white`}>
          <Icon size={24} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-red-400' : 'text-emerald-400'}`}>
            {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            <span>{change}%</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">{value}</span>
          <span className="text-gray-500 text-sm">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
