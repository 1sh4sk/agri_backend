import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
// import { useAuth } from '../contexts/AuthContext';
import { Navbar } from '../components/navbar/Navbar';
import { FilterSidebar } from '../components/navbar/FilterSidebar';
import { PostFeed } from '../components/dashboard/PostFeed';
import { ProfileCard } from '../components/dashboard/ProfileCard';

export const RoleBasedDashboard = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  // const { role } = useAuth();
  
  const [selectedCategory, setSelectedCategory] = useState('allPosts');
  const [selectedRegion, setSelectedRegion] = useState('allRegions');

  const isDark = theme === 'dark';

  // Mock data with images
  const posts = [
    {
      id: 1,
      author: 'Rajesh Kumar',
      role: t('dashboard.partner'),
      time: '2 hrs ago',
      location: 'Bangalore, Karnataka',
      content: 'Just harvested 250 quintals of wheat using sustainable farming methods. Happy to share that health has improved by 30% this season!',
      image: '/api/placeholder/600/300',
      likes: 124,
      comments: 18,
      shares: 5,
    },
    {
      id: 2,
      author: 'Apoorv Sharma',
      role: t('dashboard.architect'),
      time: '4 hrs ago',
      location: 'Mumbai, Maharashtra',
      content: 'Launching our new smart irrigation system that reduces water usage by 45%. Early beta testers needed! Available for farmers. 🌾',
      likes: 89,
      comments: 12,
      shares: 8,
    },
    {
      id: 3,
      author: 'Dr. Priya Sharma',
      role: t('dashboard.professor'),
      time: '6 hrs ago',
      location: 'Delhi',
      content: 'New research shows that crop rotation with legumes can increase soil nitrogen by 25%. Read the full paper here. Link in bio below.',
      image: '/api/placeholder/600/300',
      likes: 156,
      comments: 24,
      shares: 15,
    },
  ];

  const events = [
    { name: t('dashboard.organicFarming'), date: 'Jun 15, 2025' },
    { name: t('dashboard.agriTechExpo'), date: 'Dec 5, 2025' },
  ];

  // const renderRoleSpecificContent = () => {
  //   switch (role) {
  //     case 'farmer':
  //       return (
  //         // <div className={`mb-4 p-4 rounded-lg border-2 ${isDark ? 'bg-green-900/20 border-green-700 text-green-300' : 'bg-green-50 border-green-200 text-green-800'}`}>
  //         //   <h3 className="font-semibold">👨‍🌾 Farmer Dashboard Features</h3>
  //         //   <p className="text-sm">Access to crop management tools, market prices, and farming communities</p>
  //         // </div>
  //         <></>
  //       );
  //     case 'business':
  //       return (
  //         <div className={`mb-4 p-4 rounded-lg border-2 ${isDark ? 'bg-blue-900/20 border-blue-700 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-800'}`}>
  //           <h3 className="font-semibold">🏢 Business Dashboard Features</h3>
  //           <p className="text-sm">Connect with suppliers, manage inventory, and track business analytics</p>
  //         </div>
  //       );
  //     case 'professional':
  //       return (
  //         <div className={`mb-4 p-4 rounded-lg border-2 ${isDark ? 'bg-purple-900/20 border-purple-700 text-purple-300' : 'bg-purple-50 border-purple-200 text-purple-800'}`}>
  //           <h3 className="font-semibold">👨‍🔬 Professional Dashboard Features</h3>
  //           <p className="text-sm">Access research tools, consultation platforms, and professional networks</p>
  //         </div>
  //       );
  //     case 'government':
  //       return (
  //         <div className={`mb-4 p-4 rounded-lg border-2 ${isDark ? 'bg-orange-900/20 border-orange-700 text-orange-300' : 'bg-orange-50 border-orange-200 text-orange-800'}`}>
  //           <h3 className="font-semibold">🏛️ Government Dashboard Features</h3>
  //           <p className="text-sm">Monitor schemes, track beneficiaries, and manage agricultural policies</p>
  //         </div>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className={`h-screen flex flex-col ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />
      
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid grid-cols-12 gap-6 h-full px-6 py-4">
            {/* Left Sidebar - Filters */}
            <div className="col-span-3 overflow-y-auto pr-2 scrollbar-hide" style={{maxHeight: 'calc(100vh - 80px)'}}>
              <FilterSidebar
                selectedCategory={selectedCategory}
                selectedRegion={selectedRegion}
                onCategoryChange={setSelectedCategory}
                onRegionChange={setSelectedRegion}
              />
            </div>

            {/* Center Feed - Posts */}
            <div className="col-span-6 overflow-y-auto scrollbar-hide" style={{maxHeight: 'calc(100vh - 80px)'}}>
              {/* {renderRoleSpecificContent()} */}
              <PostFeed posts={posts} />
            </div>

            {/* Right Sidebar - Profile & Events */}
            <div className="col-span-3 overflow-y-auto scrollbar-hide" style={{maxHeight: 'calc(100vh - 80px)'}}>
              <ProfileCard upcomingEvents={events} />
            </div>
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};