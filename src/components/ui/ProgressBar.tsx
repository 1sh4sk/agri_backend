import React from "react";

interface ProgressBarProps {
  value: number; // value between 0–100
  height?: string; // tailwind height (optional)
  showLabel?: boolean; // show percent text inside bar
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value = 0,
  height = "h-2",
  showLabel = false,
}) => {
  return (
    <div className="w-full">
      {showLabel && (
        <p className="text-sm text-primary italic text-end mb-1 font-semibold">
          {value}% Completed
        </p>
      )}
      <div
        className={`w-full bg-primary-100 rounded-full overflow-hidden ${height}`}
      >
        <div
          className={` bg-primary transition-all duration-500 rounded-full ${height}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
