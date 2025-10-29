import React from 'react';

interface PieChartProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

const CustomPieChart: React.FC<PieChartProps> = ({
  progress,
  size = 140,
  strokeWidth = 16,
  primaryColor = '#4F46E5',
  secondaryColor = '#E5E7EB',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Ensure progress doesn't exceed 100 for visual correctness
  const clampedProgress = Math.max(0, Math.min(100, progress));
  const offset = circumference - (clampedProgress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={secondaryColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={primaryColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }}
        />
      </svg>
      <span className="absolute text-2xl font-bold text-text-primary dark:text-text-primary-dark">
        {`${Math.round(progress)}%`}
      </span>
    </div>
  );
};

export default CustomPieChart;
