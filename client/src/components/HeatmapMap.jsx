import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip as LeafletTooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const HeatmapMap = ({ data, type = 'water' }) => {
  const getColor = (value) => {
    // Thresholds
    if (value > 80) return '#ef4444'; // Red (High)
    if (value > 50) return '#f59e0b'; // Amber (Medium)
    return '#10b981'; // Green (Low)
  };

  const center = [28.6139, 77.2090]; // Default New Delhi (Example)

  return (
    <div className="h-[500px] w-full rounded-2xl overflow-hidden glass-panel border border-white/10 relative z-0">
      <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            {data.map((point) => (
                <CircleMarker
                    key={point.id}
                    center={[point.lat, point.lng]}
                    radius={20}
                    pathOptions={{ 
                        color: getColor(point.value),
                        fillColor: getColor(point.value),
                        fillOpacity: 0.6,
                        weight: 0 
                    }}
                >
                    <LeafletTooltip direction="top" offset={[0, -20]} opacity={1}>
                        <div className="text-center">
                            <h4 className="font-bold text-gray-800">{point.zone}</h4>
                            <p className="text-sm font-semibold text-gray-600">
                                {type === 'water' ? 'Usage: ' + point.value + ' L' : 'Load: ' + point.value + ' kWh'}
                            </p>
                        </div>
                    </LeafletTooltip>
                </CircleMarker>
            ))}
      </MapContainer>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-gray-900/80 backdrop-blur-md p-4 rounded-xl border border-white/10 z-[1000]">
        <h4 className="text-white text-xs font-bold mb-2 uppercase tracking-wider">Intensity Level</h4>
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="text-xs text-gray-300">High (&gt;80) - Critical</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="text-xs text-gray-300">Medium (50-80) - Warning</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="text-xs text-gray-300">Low (&lt;50) - Optimal</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapMap;
