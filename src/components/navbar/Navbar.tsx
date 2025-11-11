import {Sun, Moon, User, MessageCircle, Users,  } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguageStyle } from '../../contexts/LanguageStyleContext';
import { LanguageSelector } from '../ui/LanguageSelector';

interface NavbarProps {
  onNavigate?: (section: string) => void;
}

export const Navbar = ({ onNavigate }: NavbarProps) => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { fontClass, direction } = useLanguageStyle();
  
  const isDark = theme === 'dark';

  const navItems = [
    { key: 'feed', icon: MessageCircle, label: t('dashboard.feed', 'Feed') },
    { key: 'network', icon: Users, label: t('dashboard.network', 'Network') },
    { key: 'messages', icon: MessageCircle, label: t('dashboard.messages', 'Messages') },
    // { key: 'profile', icon: UserCircle, label: t('dashboard.profile', 'Profile') },
  ];

  const handleNavClick = (key: string) => {
    if (onNavigate) {
      onNavigate(key);
    }
  };

  return (
    <header 
      className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b ${fontClass}`}
      dir={direction}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-14">
          {/* Left side - App title */}
          <div className="flex items-center">
            <h1 className="text-lg font-bold tracking-wide">
              {t('dashboard.title')}
            </h1>
          </div>

          {/* Right side - Navigation items and controls */}
          <div className="flex items-center space-x-4">
             <div className="hidden sm:block">
              <LanguageSelector />
            </div>

            {/* Navigation Items */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.key)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isDark 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    title={item.label}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search */}
            {/* <button 
              className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              title={t('nav.search')}
            >
              <Search className="w-4 h-4" />
            </button> */}

            {/* Notifications */}
            {/* <button 
              className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              title={t('nav.notifications')}
            >
              <Bell className="w-4 h-4" />
            </button> */}

            {/* Theme Toggle */}
            

            {/* Language Selector */}
           
            {/* User Profile */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center cursor-pointer">
              <User className="w-5 h-5 text-white" />
            </div>
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              title={t('nav.theme')}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Only show on small screens */}
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
          <div className="flex justify-around items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`flex flex-col items-center space-y-1 px-2 py-1 rounded-lg text-xs transition-colors ${
                    isDark 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};