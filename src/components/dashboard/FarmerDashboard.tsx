import React, { useState } from 'react';
import { TrendingUp, Calendar, User, Heart, MessageCircle, Share2, MoreHorizontal, Search, CheckCircle } from 'lucide-react';

const AgriThreadDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('allPosts');
  const [selectedRegion, setSelectedRegion] = useState('allRegions');

  const categories = [
    { id: 'allPosts', label: 'All Posts' },
    { id: 'farming', label: 'Farming' },
    { id: 'business', label: 'Business' },
    { id: 'research', label: 'Research' }
  ];

  const regions = [
    { id: 'allRegions', label: 'All Regions' },
    { id: 'north', label: 'North' },
    { id: 'south', label: 'South' },
    { id: 'east', label: 'East' },
    { id: 'west', label: 'West' }
  ];

  const trendingTopics = [
    '#SustainableFarming',
    '#OrganicProduce',
    '#SmartIrrigation',
    '#CropRotation',
    '#SoilHealth',
    '#ClimateAction',
  ];

  const posts = [
    {
      id: 1,
      author: 'Ralph Lauren',
      role: 'Farmer',
      time: '8 hours ago',
      location: 'Portugal',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed porttitor lacus. Donec aliquam dignissim tellus et ultrices. Suspendisse eget dignissim ligula velit at elit. Fusce sed viverra eros. Morbi in quam et nisi fringilla luctus.',
      image: true,
      likes: 134,
      comments: 8,
      shares: 5
    },
    {
      id: 2,
      author: 'AgTech Network',
      role: 'Business - Maharashtra',
      time: '6 hours ago',
      location: 'India',
      content: 'Launching our latest smart irrigation system that reduces water usage by 40%. Early field testings show excellent results for wheat farming in semi-arid regions.',
      image: false,
      likes: 345,
      comments: 12,
      shares: 8
    },
    {
      id: 3,
      author: 'Dr. Priya Sharma',
      role: 'Researcher',
      time: '4 hours ago',
      location: 'India',
      content: 'New study on crop rotation patterns shows significant improvement in soil health. Would love to get input from the farming community on these findings.',
      image: false,
      likes: 189,
      comments: 24,
      shares: 15
    }
  ];

  const upcomingEvents = [
    { name: 'Organic Farming Summit', date: 'Oct 15, 2025' },
    { name: 'AgTech Expo 2025', date: 'Nov 3, 2025' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">AGRITHREAD</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">English</span>
            <span className="text-sm text-gray-600">Feed</span>
            <span className="text-sm text-gray-600">Network</span>
            <span className="text-sm text-gray-600">Messages</span>
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 p-5 sticky top-20">
              <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>

              {/* Categories */}
              <div className="mb-5">
                <h4 className="font-medium text-gray-500 mb-3">Categories</h4>
                <hr className="mb-3 border-gray-200" />
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center space-x-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCategory === cat.id}
                        onChange={() => setSelectedCategory(cat.id)}
                        className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900">
                        {cat.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Regions */}
              <div className="mb-5">
                <h4 className="font-medium text-gray-500 mb-3">Region</h4>
                <hr className="mb-3 border-gray-200" />
                <div className="space-y-2">
                  {regions.map((reg) => (
                    <label key={reg.id} className="flex items-center space-x-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedRegion === reg.id}
                        onChange={() => setSelectedRegion(reg.id)}
                        className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900">
                        {reg.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Trending Topics */}
              <div>
                <h4 className="font-medium text-gray-500 mb-3">Trending Topics</h4>
                <hr className="mb-3 border-gray-200" />
                <div className="space-y-2">
                  {trendingTopics.map((topic, idx) => (
                    <button
                      key={idx}
                      className="text-sm text-gray-600 hover:text-green-600 flex items-center space-x-1 transition-colors w-full text-left"
                    >
                      <TrendingUp className="w-3 h-3" />
                      <span>{topic}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Center Content - Feed */}
          <div className="col-span-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex-shrink-0"></div>
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Share your thoughts..."
                      className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Posts */}
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg border border-gray-200 p-5">
                  {/* Post Header */}
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-gray-900 text-sm">{post.author}</h4>
                            <span className="text-gray-500">•</span>
                            <p className="text-xs text-gray-500">{post.role}</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            {post.time} • {post.location}
                          </p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                    {post.content}
                  </p>

                  {/* Post Image */}
                  {post.image && (
                    <div className="mb-3">
                      <div className="w-full h-64 bg-gradient-to-br from-green-200 to-green-400 rounded-lg"></div>
                    </div>
                  )}

                  {/* Post Actions */}
                  <hr className="mb-3 border-gray-200" />
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-1.5 text-gray-500 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1.5 text-gray-500 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1.5 text-gray-500 hover:text-green-500 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">{post.shares}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Profile & Events */}
          <div className="col-span-3">
            <div className="space-y-4 sticky top-20">
              {/* Profile Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-3">
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">Your Profile</h3>
                  <p className="text-xs text-gray-500 mb-3">Farmer</p>
                  <button className="px-5 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-xs font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-sm">
                    Follow
                  </button>
                </div>

                {/* Profile Completion */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-600">Profile Completion</span>
                    <span className="text-xs font-semibold text-green-500">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 h-1.5 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-2.5 mb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-gray-600">Verified Badge</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Profile Views</span>
                    <span className="text-xs font-semibold text-gray-900">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Connections</span>
                    <span className="text-xs font-semibold text-gray-900">12</span>
                  </div>
                </div>

                <button className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
                  Complete Profile
                </button>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 text-sm mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                  {upcomingEvents.map((event, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 truncate">{event.name}</h4>
                        <p className="text-xs text-gray-500">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgriThreadDashboard;