import { Bell, Search, ChevronDown } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-background-box border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="text-xl font-bold text-color-indigo">AgriPlatform</span>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <a href="#" className="text-color-indigo hover:text-primary transition-colors">My Home</a>
            <a href="#" className="text-color-lightgray hover:text-primary transition-colors">Recent Posts</a>
            <a href="#" className="text-color-lightgray hover:text-primary transition-colors">Your Blogs</a>
            <a href="#" className="text-color-lightgray hover:text-primary transition-colors">Over the Wall</a>
            <a href="#" className="text-color-lightgray hover:text-primary transition-colors">Your Agriculture</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-color-lightgray" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button className="relative p-2 hover:bg-background rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-color-indigo" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="flex items-center gap-2 hover:bg-background rounded-lg px-3 py-2 transition-colors">
            <div className="w-8 h-8 bg-primary rounded-full"></div>
            <ChevronDown className="w-4 h-4 text-color-indigo" />
          </button>
        </div>
      </div>
    </header>
  );
};
