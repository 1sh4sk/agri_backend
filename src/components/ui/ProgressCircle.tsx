interface ProgressCircleProps {
  percentage?: number;
  size?: number;
  strokeWidth?: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  percentage = 40, // default for now
  size = 120,
  strokeWidth = 10,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center bg-white rounded-full p-1 border-2 border-[#E5E7EB]">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90 overflow-visible"
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB" // Tailwind gray-200
          strokeWidth={strokeWidth}
          fill="white"
        />

        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#155E41"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          // strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Percentage Text */}
      <div className="absolute flex items-center justify-center">
        <span className="text-xl font-medium text-gray-700">{percentage}%</span>
      </div>
    </div>
  );
};

export default ProgressCircle;
