import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ForecastingChart = ({ 
  title, 
  historicalData, 
  forecastData, 
  labels, 
  yAxisLabel = 'Value',
  color = '#16a34a' 
}) => {
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#64748b', // Slate-500
          font: { family: 'Inter', size: 12 }
        }
      },
      title: {
        display: !!title,
        text: title,
        color: '#1e293b', // Slate-800
        font: { family: 'Inter', size: 16, weight: '600' },
        padding: { bottom: 20 }
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#1e293b',
        bodyColor: '#64748b',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        titleFont: { size: 13, weight: 'bold' },
        boxPadding: 4,
        usePointStyle: true,
      }
    },
    scales: {
      x: {
        grid: { color: '#f1f5f9' },
        ticks: { color: '#94a3b8' }
      },
      y: {
        grid: { color: '#f1f5f9' },
        ticks: { color: '#94a3b8' },
        title: {
          display: true,
          text: yAxisLabel,
          color: '#94a3b8'
        },
        beginAtZero: false,
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Historical / Actual',
        data: historicalData,
        borderColor: color,
        backgroundColor: `${color}15`, // Low opacity fill
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 6,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'AI Forecast',
        data: forecastData,
        borderColor: '#8b5cf6', // Indigo/Purple for forecast
        backgroundColor: 'rgba(139, 92, 246, 0.05)',
        borderDash: [5, 5],
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  return (
    <div className="w-full h-full min-h-[300px] p-6 bg-white rounded-2xl relative">
      <Line options={options} data={data} />
    </div>
  );
};

export default ForecastingChart;
