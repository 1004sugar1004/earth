
import React, { useState, useMemo } from 'react';
import RevolutionSim from './components/RevolutionSim';
import DateSelector from './components/DateSelector';
import InfoPanel from './components/InfoPanel';
import SunAltitudeSim from './components/SunAltitudeSim';
import DayNightClock from './components/DayNightClock';
import { getSeason, getDaylightHours, getSunAltitude } from './utils/simulation';
import { Season } from './types';

const App: React.FC = () => {
  const [dayOfYear, setDayOfYear] = useState<number>(172); // Start at Summer Solstice

  const simulationData = useMemo(() => {
    const season = getSeason(dayOfYear);
    const daylightHours = getDaylightHours(dayOfYear);
    const sunAltitude = getSunAltitude(dayOfYear);
    return { season, daylightHours, sunAltitude };
  }, [dayOfYear]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000010] to-[#1a1a2e] p-4 lg:p-6 flex flex-col font-sans">
      <header className="text-center mb-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-300 tracking-wider">
          🌍 지구의 운동과 계절 변화 시뮬레이션
        </h1>
        <p className="text-sm sm:text-base text-cyan-200 mt-2">
          날짜를 조절하여 지구의 위치, 태양의 높이, 그리고 낮과 밤의 길이가 어떻게 변하는지 관찰해보세요!
        </p>
      </header>
      
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Main Simulation Panel */}
        <div className="lg:col-span-2 bg-black/30 rounded-2xl p-4 flex items-center justify-center min-h-[400px] lg:min-h-0 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
          <RevolutionSim dayOfYear={dayOfYear} season={simulationData.season} />
        </div>

        {/* Control & Info Panel */}
        <div className="lg:col-span-1 bg-black/30 rounded-2xl p-4 sm:p-6 flex flex-col gap-4 border border-purple-500/20 shadow-2xl shadow-purple-500/10">
          <DateSelector dayOfYear={dayOfYear} setDayOfYear={setDayOfYear} />
          <InfoPanel 
            dayOfYear={dayOfYear} 
            season={simulationData.season} 
            daylightHours={simulationData.daylightHours}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
            <SunAltitudeSim altitude={simulationData.sunAltitude} />
            <DayNightClock daylightHours={simulationData.daylightHours} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
