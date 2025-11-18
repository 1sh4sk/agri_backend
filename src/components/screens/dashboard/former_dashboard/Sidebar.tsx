import { Wind, Droplets, Edit2, TrendingUp } from 'lucide-react';
import { useDashboard } from '../../../../contexts/DashboardContext';

export const Sidebar = () => {
  const { weather } = useDashboard();

  return (
    <div className="w-96 bg-background-box overflow-y-auto border-r border-gray-200">
      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-br from-primary to-primary-700 rounded-2xl p-6 text-white">
          <h3 className="text-sm opacity-90 mb-4">Become A Premium User</h3>
          <p className="text-xs opacity-75 mb-4">Unlock exclusive features</p>
          <button className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition-colors">
            Explore Plans →
          </button>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-color-indigo mb-4 uppercase tracking-wide">
            Weather & Alerts
          </h3>
          <div className="bg-primary-100 rounded-2xl p-6 mb-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-5xl font-bold text-primary">{weather.temp}°C</div>
                <div className="text-sm text-primary mt-2">{weather.condition}</div>
              </div>
              <div className="text-5xl">☀️</div>
            </div>
            <div className="flex gap-6 mt-4 text-sm">
              <div className="flex items-center gap-1">
                <Wind className="w-4 h-4 text-primary" />
                <span>Wind: 12 km/h</span>
              </div>
              <div className="flex items-center gap-1">
                <Droplets className="w-4 h-4 text-primary" />
                <span>Humidity: 65%</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-color-yellow rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  ⚠️
                </div>
                <div>
                  <div className="text-sm font-semibold text-color-indigo">Low Pest Risk</div>
                  <div className="text-xs text-color-indigo mt-1">Current conditions favorable</div>
                </div>
              </div>
            </div>

            <div className="bg-red-100 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  💧
                </div>
                <div>
                  <div className="text-sm font-semibold text-color-indigo">Irrigation Needed</div>
                  <div className="text-xs text-color-indigo mt-1">Soil moisture below optimal</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-color-indigo uppercase tracking-wide">
              My Crops
            </h3>
            <button className="text-xs text-primary flex items-center gap-1">
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-color-yellow rounded-full flex items-center justify-center text-sm">
                    🌾
                  </div>
                  <span className="text-sm font-medium">Wheat</span>
                </div>
                <span className="text-sm font-semibold">20 kgs</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-color-lightgray">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-color-yellow h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <span>35 days</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center text-sm">
                    🌽
                  </div>
                  <span className="text-sm font-medium">Corn</span>
                </div>
                <span className="text-sm font-semibold">15 kgs</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-color-lightgray">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-red-400 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <span>5 days</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-color-indigo mb-4 uppercase tracking-wide">
            Mandi Prices
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm">🌾 Wheat</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold">₹38 /kg</div>
                <div className="text-xs text-color-green">-3% from last week</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm">🌽 Corn</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold">₹22 /kg</div>
                <div className="text-xs text-color-green">+5% from last week</div>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors">
          Download Mobile App
        </button>

        <div className="bg-primary rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-sm opacity-90 mb-1">Become Premium</h3>
              <div className="text-3xl font-bold">₹500/month</div>
            </div>
            <TrendingUp className="w-6 h-6 opacity-50" />
          </div>
          <p className="text-xs opacity-80 mb-4">
            Get exclusive access to market insights and premium features
          </p>
          <button className="w-full bg-white text-primary px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-50 transition-colors">
            Get 7 Days Free
          </button>
        </div>
      </div>
    </div>
  );
};
