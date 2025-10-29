import React from 'react';
import { getEarthPosition } from '../utils/simulation';
import { Season } from '../types';

interface RevolutionSimProps {
  dayOfYear: number;
  season: Season;
}

const Sun: React.FC = () => (
  <div className="absolute w-20 h-20 sm:w-24 sm:h-24 bg-yellow-400 rounded-full shadow-[0_0_50px_15px_rgba(252,211,77,0.7)]">
    <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full animate-pulse"></div>
  </div>
);

const Earth: React.FC<{ x: number; y: number; }> = ({ x, y }) => (
  <div
    className="absolute w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-100"
    style={{ transform: `translate(${x}px, ${y}px)` }}
  >
    <div
      className="w-full h-full bg-blue-500 rounded-full"
      style={{
        transform: 'rotate(-23.5deg)',
        background: 'radial-gradient(circle at 30% 30%, #60a5fa, #1e40af)',
        boxShadow: 'inset 5px 0 10px rgba(0,0,0,0.5)'
      }}
    >
      {/* Axis line */}
      <div className="absolute top-[-15%] left-[50%] w-px h-[130%] bg-red-400/70 transform -translate-x-1/2"></div>
    </div>
  </div>
);

const SeasonLabel: React.FC<{ position: 'top' | 'bottom' | 'left' | 'right'; name: Season; isActive: boolean }> = ({ position, name, isActive }) => {
  const positions = {
    top: 'top-0 -translate-y-full',
    bottom: 'bottom-0 translate-y-full',
    left: 'left-0 -translate-x-full',
    right: 'right-0 translate-x-full'
  };
  return (
    <div className={`absolute ${positions[position]} m-auto p-2 text-sm sm:text-base font-bold transition-all duration-300 ${isActive ? 'text-yellow-300 scale-110' : 'text-gray-400'}`}>
      {name}
    </div>
  );
};

const RevolutionSim: React.FC<RevolutionSimProps> = ({ dayOfYear, season }) => {
  const { x, y } = getEarthPosition(dayOfYear);

  return (
    <div className="w-full max-w-[600px] aspect-video relative flex items-center justify-center">
      {/* Orbit path */}
      <div className="absolute w-[560px] h-[280px] border-2 border-dashed border-cyan-400/20 rounded-full"></div>
      
      <SeasonLabel position="top" name={Season.Winter} isActive={season === Season.Winter}/>
      <SeasonLabel position="bottom" name={Season.Summer} isActive={season === Season.Summer}/>
      <SeasonLabel position="left" name={Season.Autumn} isActive={season === Season.Autumn}/>
      <SeasonLabel position="right" name={Season.Spring} isActive={season === Season.Spring}/>

      <Sun />
      <Earth x={x} y={y} />
    </div>
  );
};

export default RevolutionSim;