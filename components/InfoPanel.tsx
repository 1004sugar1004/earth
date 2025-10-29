import React from 'react';
import { Season } from '../types';
import { formatHours } from '../utils/simulation';

interface InfoPanelProps {
  dayOfYear: number;
  season: Season;
  daylightHours: number;
}

const InfoItem: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div className="bg-gray-800/50 p-3 rounded-lg flex justify-between items-baseline border-l-4" style={{ borderColor: color }}>
    <span className="text-gray-300 text-sm">{label}</span>
    <span className="font-bold text-lg" style={{ color: color }}>{value}</span>
  </div>
);

const InfoPanel: React.FC<InfoPanelProps> = ({ dayOfYear, season, daylightHours }) => {
  const nightHours = 24 - daylightHours;

  const seasonInfo: { [key in Season]: { color: string; emoji: string } } = {
    [Season.Spring]: { color: '#68D391', emoji: '🌸' },
    [Season.Summer]: { color: '#F6E05E', emoji: '☀️' },
    [Season.Autumn]: { color: '#F6AD55', emoji: '🍂' },
    [Season.Winter]: { color: '#63B3ED', emoji: '❄️' },
  };

  return (
    <div className="space-y-3">
      <InfoItem 
        label="현재 계절" 
        value={`${seasonInfo[season].emoji} ${season}`}
        color={seasonInfo[season].color}
      />
      <InfoItem 
        label="☀️ 낮의 길이" 
        value={formatHours(daylightHours)}
        color="#F6E05E"
      />
      <InfoItem 
        label="🌙 밤의 길이" 
        value={formatHours(nightHours)}
        color="#63B3ED"
      />
    </div>
  );
};

export default InfoPanel;
