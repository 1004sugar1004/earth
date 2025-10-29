
import React from 'react';
import { formatHours } from '../utils/simulation';

interface DayNightClockProps {
  daylightHours: number;
}

const DayNightClock: React.FC<DayNightClockProps> = ({ daylightHours }) => {
  const dayPercent = (daylightHours / 24) * 100;
  
  const conicGradientStyle = {
    background: `conic-gradient(#F6E05E 0% ${dayPercent}%, #63B3ED ${dayPercent}% 100%)`,
  };

  return (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex flex-col items-center justify-center aspect-square">
      <h3 className="font-bold text-lg text-cyan-300 mb-2">낮과 밤의 길이</h3>
      <div className="w-full max-w-[120px] aspect-square relative">
        <div
          className="w-full h-full rounded-full transition-all duration-200 ease-in-out"
          style={conicGradientStyle}
        >
          <div className="absolute inset-[10%] bg-gray-800 rounded-full flex flex-col items-center justify-center text-center">
            <div className="text-yellow-300">
              <span className="text-xs">☀️</span>
              <span className="font-bold text-sm block -mt-1">{formatHours(daylightHours).split('시')[0]}<span className="text-xs">시간</span></span>
            </div>
            <div className="w-4/5 h-px bg-gray-500 my-1"></div>
            <div className="text-blue-300">
              <span className="text-xs">🌙</span>
              <span className="font-bold text-sm block -mt-1">{formatHours(24 - daylightHours).split('시')[0]}<span className="text-xs">시간</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayNightClock;
