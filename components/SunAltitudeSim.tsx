import React from 'react';

interface SunAltitudeSimProps {
  altitude: number;
}

const SunAltitudeSim: React.FC<SunAltitudeSimProps> = ({ altitude }) => {
  // Constants for mapping altitude to a visual angle on the arc
  const minAltitude = 29; // Approximate for winter solstice
  const maxAltitude = 76; // Approximate for summer solstice

  // Normalize altitude to a 0-1 range, clamped for safety
  const normalizedAltitude = Math.max(0, Math.min(1, (altitude - minAltitude) / (maxAltitude - minAltitude)));
  
  // Map normalized altitude to an angle from 150deg (low on the right) to 90deg (top-center)
  // This makes the sun appear to climb higher as summer approaches
  const displayAngleDegrees = 150 - normalizedAltitude * 60;
  const displayAngleRads = displayAngleDegrees * (Math.PI / 180);

  // SVG path constants
  const pathCenterX = 50;
  const pathCenterY = 52;
  const pathRadius = 50;

  // Calculate sun's position on the arc based on the angle
  // Formula for a circle where angle 0 is on the right: X = centerX + R*cos(angle), Y = centerY - R*sin(angle)
  // Our arc is drawn left-to-right, so we use a variation.
  const sunX = pathCenterX - pathRadius * Math.cos(displayAngleRads);
  const sunY = pathCenterY - pathRadius * Math.sin(displayAngleRads);

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