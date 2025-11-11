import { Heart, MessageCircle, Share2, MoreHorizontal, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguageStyle } from '../../contexts/LanguageStyleContext';

interface Post {
  id: number;
  author: string;
  role: string;
  time: string;
  location: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
}

interface PostFeedProps {
  posts: Post[];
}

export const PostFeed = ({ posts }: PostFeedProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { fontClass, textSizeClass, inputFontSize } = useLanguageStyle();

  const isDark = theme === 'dark';

  return (
    <div className="space-y-4">
      {/* Create Post Section */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border-2 sticky top-0 z-10 ${fontClass}`}>
        <div className="p-4">
       <div className="flex items-center space-x-3 ">
  {/* Profile Image */}
  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex-shrink-0 border-2 border-white shadow-sm"></div>
  
  {/* Search Bar - Full Width */}
  <div className="flex-1">
    <input
      type="text"
      placeholder={t('dashboard.shareThoughts')}
      className={`w-full ${isDark ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900 placeholder-gray-500'} rounded-full px-4 py-3 ${inputFontSize} focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-300 dark:border-gray-600`}
    />
  </div>
</div>
          {/* Search Bar */}
         
        </div>
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <div key={post.id} className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border-2 ${fontClass}`}>
          <div className="p-5">
            {/* User Info and Time */}
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0 border-2 border-white shadow-sm"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`font-bold truncate ${textSizeClass}`}>{post.author}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                        {post.role}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{post.time}</span>
                      <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>•</span>
                      <MapPin className="w-3 h-3" />
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{post.location}</span>
                    </div>
                  </div>
                  <button className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} flex-shrink-0`}>
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4 ${textSizeClass} leading-relaxed`}>
              {post.content}
            </p>

            {/* Post Image */}
            {post.image && (
              <div className="mb-4 w-full h-52  rounded-lg overflow-hidden border border-gray-300 bg-gray-100 dark:border-gray-600">
                {/* <img 
                  src={post.image} 
                  // alt="Post content" 
                  className="w-full h-auto object-cover"
                /> */}
              </div>
            )}

            {/* Horizontal Line */}
            <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} my-4`}></div>

            {/* Interaction Icons */}
            <div className={`flex w-1/3 items-center justify-between pt-2`}>
              <button className={`flex items-center space-x-2 ${isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'} transition-colors`}>
                <Heart className="w-5 h-5" />
                <span className={textSizeClass}>{post.likes}</span>
              </button>
              <button className={`flex items-center space-x-2 ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-500'} transition-colors`}>
                <MessageCircle className="w-5 h-5" />
                <span className={textSizeClass}>{post.comments}</span>
              </button>
              <button className={`flex items-center space-x-2 ${isDark ? 'text-gray-400 hover:text-green-400' : 'text-gray-500 hover:text-green-500'} transition-colors`}>
                <Share2 className="w-5 h-5" />
                <span className={textSizeClass}>{post.shares}</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};