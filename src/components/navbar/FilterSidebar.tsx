import { TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguageStyle } from '../../contexts/LanguageStyleContext';

interface FilterSidebarProps {
  selectedCategory: string;
  selectedRegion: string;
  onCategoryChange: (category: string) => void;
  onRegionChange: (region: string) => void;
}

const trendingTopics = [
  '#SustainableFarming',
  '#OrganicProduce',
  '#SmartIrrigation',
  '#CropRotation',
  '#SoilHealth',
  '#ClimateAction',
];

export const FilterSidebar = ({
  selectedCategory,
  selectedRegion,
  onCategoryChange,
  onRegionChange,
}: FilterSidebarProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { fontClass, textSizeClass } = useLanguageStyle();

  const isDark = theme === 'dark';

  const categories = [
    { id: 'allPosts', label: t('dashboard.allPosts') },
    { id: 'farming', label: t('dashboard.farming') },
    { id: 'business', label: t('dashboard.business') },
    { id: 'research', label: t('dashboard.research') }
  ];

  const regions = [
    { id: 'allRegions', label: t('dashboard.allRegions') },
    { id: 'north', label: t('dashboard.north') },
    { id: 'south', label: t('dashboard.south') },
    { id: 'east', label: t('dashboard.east') },
    { id: 'west', label: t('dashboard.west') }
  ];

  return (
    <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border-2 ${fontClass}`}>
      {/* Filters Heading */}
      <div className="p-5 border-b border-gray-300 dark:border-gray-600">
        <h3 className={`font-bold ${textSizeClass}`}>
          {t('dashboard.filters')}
        </h3>
      </div>

      {/* Categories Section */}
      <div className="p-5 border-b border-gray-300 dark:border-gray-600">
        <h4 className={`font-semibold mb-3 ${textSizeClass} ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {t('dashboard.categories')}
        </h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategory === cat.id}
                onChange={() => onCategoryChange(cat.id)}
                className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              <span className={`${textSizeClass} ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`}>
                {cat.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Regions Section */}
      <div className="p-5 border-b border-gray-300 dark:border-gray-600">
        <h4 className={`font-semibold mb-3 ${textSizeClass} ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {t('dashboard.regions')}
        </h4>
        <div className="space-y-2">
          {regions.map((reg) => (
            <label key={reg.id} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedRegion === reg.id}
                onChange={() => onRegionChange(reg.id)}
                className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              <span className={`${textSizeClass} ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`}>
                {reg.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Trending Topics Section */}
      <div className="p-5">
        <div className="border-b border-gray-300 dark:border-gray-600 mb-3">
          <h4 className={`font-semibold pb-2 ${textSizeClass} ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('dashboard.trending')}
          </h4>
        </div>
        <div className="space-y-2">
          {trendingTopics.map((topic, idx) => (
            <button
              key={idx}
              className={`${textSizeClass} ${isDark ? 'text-gray-300 hover:text-green-400' : 'text-gray-600 hover:text-green-600'} flex items-center space-x-1 transition-colors w-full text-left`}
            >
              <TrendingUp className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{topic}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};