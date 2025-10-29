
import React from 'react';
import { formatDate } from '../utils/simulation';

interface DateSelectorProps {
  dayOfYear: number;
  setDayOfYear: (day: number) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ dayOfYear, setDayOfYear }) => {
  const quickSelectDates = [
    { label: '춘분', day: 80 },
    { label: '하지', day: 172 },
    { label: '추분', day: 264 },
    { label: '동지', day: 355 },
  ];

  return (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
      <div className="flex justify-between items-center mb-3">
        <label htmlFor="date-slider" className="font-bold text-lg text-cyan-300">날짜 선택</label>
        <span className="text-lg font-semibold text-yellow-300 tabular-nums">
          {formatDate(dayOfYear)}
        </span>
      </div>
      <input
        id="date-slider"
        type="range"
        min="1"
        max="365"
        value={dayOfYear}
        onChange={(e) => setDayOfYear(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
      />
      <div className="flex justify-between mt-3 gap-2">
        {quickSelectDates.map(({ label, day }) => (
          <button
            key={label}
            onClick={() => setDayOfYear(day)}
            className={`w-full py-1.5 px-2 text-sm font-semibold rounded-md transition-all duration-200 ${
              dayOfYear === day
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-cyan-600/50 hover:bg-cyan-500/70 text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DateSelector;
