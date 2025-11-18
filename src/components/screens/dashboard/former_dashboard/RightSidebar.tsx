import {  Search,  PlusCircle, Calendar } from 'lucide-react';
// import { useDashboard } from '../../../../contexts/DashboardContext';

export const RightSidebar = () => {
  return (
    <div className="w-80 bg-background-box overflow-y-auto border-l border-gray-200">
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-xs font-semibold text-color-indigo mb-4 uppercase tracking-wide">
            Find Connections
          </h3>
          <div className="flex items-center gap-2 bg-background rounded-lg px-3 py-2 mb-4">
            <Search className="w-4 h-4 text-color-lightgray" />
            <input
              type="text"
              placeholder="Search farmers, experts..."
              className="flex-1 bg-transparent text-sm outline-none"
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-primary-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  NF
                </div>
                <div>
                  <div className="text-sm font-medium text-color-indigo">Nearby Farmers</div>
                  <div className="text-xs text-color-lightgray">2 km away</div>
                </div>
              </div>
              <button className="text-primary hover:bg-primary/10 p-2 rounded-lg">
                <PlusCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-primary-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-color-green rounded-full flex items-center justify-center text-white text-sm font-bold">
                  AE
                </div>
                <div>
                  <div className="text-sm font-medium text-color-indigo">Agri Experts</div>
                  <div className="text-xs text-color-lightgray">Expert consultants</div>
                </div>
              </div>
              <button className="text-primary hover:bg-primary/10 p-2 rounded-lg">
                <PlusCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-primary-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-color-yellow rounded-full flex items-center justify-center text-white text-sm font-bold">
                  AC
                </div>
                <div>
                  <div className="text-sm font-medium text-color-indigo">Agri Companies</div>
                  <div className="text-xs text-color-lightgray">Agricultural partners</div>
                </div>
              </div>
              <button className="text-primary hover:bg-primary/10 p-2 rounded-lg">
                <PlusCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-primary-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  LS
                </div>
                <div>
                  <div className="text-sm font-medium text-color-indigo">Local Services</div>
                  <div className="text-xs text-color-lightgray">Service providers</div>
                </div>
              </div>
              <button className="text-primary hover:bg-primary/10 p-2 rounded-lg">
                <PlusCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-color-indigo mb-4 uppercase tracking-wide">
            My Activity
          </h3>
          <div className="space-y-3">
            <div className="p-4 bg-background rounded-lg hover:bg-primary-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-color-indigo">Posts</div>
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">27</span>
              </div>
              <div className="text-xs text-color-lightgray">You have shared 27 posts</div>
            </div>
            <div className="p-4 bg-background rounded-lg hover:bg-primary-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-color-indigo">Inquiries</div>
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">5</span>
              </div>
              <div className="text-xs text-color-lightgray">Pending buyer inquiries</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-color-indigo mb-4 uppercase tracking-wide">
            Crop Futures
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div>
                <div className="text-sm font-medium text-color-indigo">Wheat</div>
                <div className="text-xs text-color-lightgray">MCX Futures</div>
              </div>
              <span className="text-xs text-color-green font-semibold">+12%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div>
                <div className="text-sm font-medium text-color-indigo">Rice</div>
                <div className="text-xs text-color-lightgray">MCX Futures</div>
              </div>
              <span className="text-xs text-red-500 font-semibold">-3%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div>
                <div className="text-sm font-medium text-color-indigo">Corn</div>
                <div className="text-xs text-color-lightgray">CBOT Futures</div>
              </div>
              <span className="text-xs text-color-green font-semibold">+8%</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-color-indigo uppercase tracking-wide">
              Upcoming Events
            </h3>
            <button className="text-primary hover:bg-primary/10 p-1 rounded">
              <PlusCircle className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-color-green hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-color-green flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-color-indigo">November</div>
                  <div className="text-xs text-color-lightgray mt-1">Harvest Season Begins</div>
                  <div className="text-xs text-color-lightgray mt-2">9 days away</div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-color-indigo">December</div>
                  <div className="text-xs text-color-lightgray mt-1">Winter Seeding Week</div>
                  <div className="text-xs text-color-lightgray mt-2">35 days away</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
