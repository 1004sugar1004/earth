
import React from 'react';

interface SunAltitudeSimProps {
  altitude: number;
}

const SunAltitudeSim: React.FC<SunAltitudeSimProps> = ({ altitude }) => {
  const maxAltitude = 77; // Corresponds to summer solstice
  const pathRadius = 50;
  const angle = (altitude / maxAltitude) * 180;
  const rads = (180 - angle) * (Math.PI / 180);
  const sunX = pathRadius + pathRadius * Math.cos(rads);
  const sunY = pathRadius - pathRadius * Math.sin(rads);

  return (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex flex-col items-center justify-center aspect-square">
      <h3 className="font-bold text-lg text-yellow-300 mb-2">태양 고도</h3>
      <div className="w-full max-w-[120px] aspect-square relative">
        <svg viewBox="0 0 100 55" className="w-full h-auto">
          {/* Horizon */}
          <line x1="0" y1="52" x2="100" y2="52" stroke="#63B3ED" strokeWidth="2" />
          {/* Sun path */}
          <path d="M 0 52 A 50 50 0 0 1 100 52" fill="none" stroke="#F6E05E" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 2" />
          
          {/* Sun */}
          <circle cx={sunX} cy={sunY} r="6" fill="#FBBF24" className="transition-all duration-200 ease-out" />
        </svg>
        <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 text-cyan-400 text-3xl">🏠</div>
      </div>
      <p className="mt-2 text-center text-white font-semibold">
        {altitude.toFixed(1)}°
      </p>
    </div>
  );
};

export default SunAltitudeSim;
