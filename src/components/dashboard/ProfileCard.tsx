import { Calendar, User, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguageStyle } from "../../contexts/LanguageStyleContext";

interface ProfileCardProps {
  upcomingEvents: Array<{ name: string; date: string }>;
}

export const ProfileCard = ({ upcomingEvents }: ProfileCardProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { fontClass, textSizeClass } = useLanguageStyle();

  const isDark = theme === "dark";
  const completionPercentage = 25;

  const CircularProgressBar = ({
    percentage = 0,
    size = 100,
    strokeWidth = 8,
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={isDark ? "#374151" : "#e5e7eb"}
            strokeWidth={strokeWidth}
            fill="none"
            className="transition-colors"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
        {/* Percentage text in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {percentage}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Profile Section */}
      <div
        className={`${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } rounded-lg border-2 ${fontClass}`}
      >
        <div className="p-5">
          {/* Profile Header */}
          <div className="flex flex-col items-center space-x-3 mb-4">
            <div className="w-16 h-16 rounded-full mb-2 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center border-2 border-white shadow-sm">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className={`font-bold truncate ${textSizeClass}`}>
                  John Farmer
                </h3>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              {/* <p className={`${textSizeClass} ${isDark ? 'text-gray-400' : 'text-gray-500'} truncate`}>
                Agricultural Expert
              </p> */}
            </div>
          </div>

          {/* Profile Completion */}
          <div className="mb-4">
            {/* <div className="flex justify-between items-center mb-2">
              {/* <span className={`${textSizeClass} ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('dashboard.profileCompletion')}
              </span> */}
            {/* <span className={`${textSizeClass} font-bold text-green-500`}>25%</span> */}
            {/* </div>  */}
            <div className="flex justify-center mb-4">
              <CircularProgressBar percentage={completionPercentage} />
            </div>
            {/* <div className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2.5`}>
              <div className="bg-gradient-to-r from-green-400 to-green-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
            </div> */}
          </div>

          {/* Profile Stats */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span
                className={`${textSizeClass} ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {t("dashboard.profileViews")}
              </span>
              <span className={`${textSizeClass} font-semibold`}>24</span>
            </div>
            <div className="flex justify-between items-center">
              <span
                className={`${textSizeClass} ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {t("dashboard.connections")}
              </span>
              <span className={`${textSizeClass} font-semibold`}>12</span>
            </div>
          </div>

          {/* Complete Profile Button */}
          <button
            className={`w-full ${
              isDark
                ? "bg-white text-gray-900 hover:bg-gray-100"
                : "bg-gray-900 text-white hover:bg-gray-800"
            } py-3 rounded-lg ${textSizeClass} font-semibold transition-colors shadow-sm`}
          >
            {t("dashboard.completeProfile")}
          </button>
        </div>
      </div>

      {/* Upcoming Events */}
      <div
        className={`${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } rounded-lg border-2 ${fontClass}`}
      >
        <div className="p-5">
          <h3 className={`font-bold mb-4 ${textSizeClass}`}>
            {t("dashboard.upcomingEvents")}
          </h3>
          <div className="space-y-3">
            {upcomingEvents.map((event, idx) => (
              <div
                key={idx}
                className={`flex items-center space-x-3 p-3 ${
                  isDark ? "bg-gray-700" : "bg-gray-50"
                } rounded-lg border border-gray-300 dark:border-gray-600`}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-semibold truncate ${textSizeClass}`}>
                    {event.name}
                  </h4>
                  <p
                    className={`${textSizeClass} ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {event.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
