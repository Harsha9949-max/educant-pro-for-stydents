
import React from 'react';

interface ProgressBarProps {
  progress: number;
  colorClass?: string;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  colorClass = 'bg-primary',
  className = 'h-2',
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${className}`}>
      <div
        className={`${colorClass} h-full rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${clampedProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
