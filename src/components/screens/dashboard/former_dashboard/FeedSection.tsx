import { Heart, MessageCircle, Share2, MoreHorizontal, Image as ImageIcon, Send, Tag, AlertCircle } from 'lucide-react';
import { useDashboard } from '../../../../contexts/DashboardContext';

export const FeedSection = () => {
  const { posts } = useDashboard();

  return (
    <div className="flex-1 overflow-y-auto bg-background border-r border-gray-200">
      <div className="max-w-2xl mx-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4 bg-background-box rounded-2xl p-6 shadow-custom">
            <div className="w-10 h-10 bg-primary rounded-full flex-shrink-0"></div>
            <div className="flex-1">
              <textarea
                placeholder="What's on your mind? Share your farming journey, tips, or questions..."
                className="w-full p-3 bg-background border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                rows={3}
              ></textarea>
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 text-color-lightgray hover:text-primary transition-colors text-sm">
                    <ImageIcon className="w-4 h-4" />
                    Photo
                  </button>
                  <button className="flex items-center gap-2 text-color-lightgray hover:text-primary transition-colors text-sm">
                    <Tag className="w-4 h-4" />
                    Tag
                  </button>
                </div>
                <button className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary-600 transition-colors">
                  <Send className="w-4 h-4" />
                  Post
                </button>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 border-l-4 border-primary space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-color-indigo">India's Agriculture Exports Surge by 7% This Quarter</h3>
                <p className="text-sm text-color-indigo mt-2">The agricultural sector has shown remarkable growth in exports, driven by increased demand for organic products and modern farming techniques.</p>
              </div>
            </div>
            <button className="text-primary text-sm font-semibold">Read full article →</button>
          </div>

          <div className="bg-background-box rounded-2xl p-6 shadow-custom space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex-shrink-0"></div>
              <div>
                <div className="font-semibold text-color-indigo">Ashwini Kumar</div>
                <div className="text-xs text-color-lightgray">2 hours ago</div>
              </div>
              <button className="ml-auto text-color-lightgray hover:text-color-indigo">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-color-indigo">
              India's Agriculture Exports Surge by 7% This Quarter. The agricultural sector has shown remarkable growth. Considering sustainable practices in our farm has helped improve yield.
            </p>

            <div className="flex items-center gap-6 pt-4 border-t border-gray-100 text-sm">
              <button className="flex items-center gap-2 text-color-lightgray hover:text-primary transition-colors group">
                <Heart className="w-5 h-5 group-hover:fill-current" />
                <span>245</span>
              </button>
              <button className="flex items-center gap-2 text-color-lightgray hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>32</span>
              </button>
              <button className="flex items-center gap-2 text-color-lightgray hover:text-primary transition-colors">
                <Share2 className="w-5 h-5" />
                <span>18</span>
              </button>
            </div>
          </div>

          <div className="bg-primary rounded-2xl p-6 text-white shadow-custom">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold mb-2">Seasonal Quality Guide Available</h3>
                <p className="text-sm opacity-90">Learn best practices for this harvest season with expert recommendations and community tips.</p>
              </div>
              <button className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-50 transition-colors flex-shrink-0">
                Guide
              </button>
            </div>
          </div>

          {posts.map((post) => (
            <div key={post.id} className="bg-background-box rounded-2xl p-6 shadow-custom space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-color-green rounded-full flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-color-indigo">{post.author}</div>
                  <div className="text-xs text-color-lightgray">{post.timestamp}</div>
                </div>
                <button className="ml-auto text-color-lightgray hover:text-color-indigo">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-color-indigo">{post.content}</p>

              {post.images && post.images.length > 0 && (
                <div className={`grid gap-3 ${post.images.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {post.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt=""
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              <div className="flex items-center gap-6 pt-4 border-t border-gray-100 text-sm">
                <button className="flex items-center gap-2 text-color-lightgray hover:text-primary transition-colors group">
                  <Heart className="w-5 h-5 group-hover:fill-current" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-color-lightgray hover:text-primary transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-color-lightgray hover:text-primary transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>{post.shares}</span>
                </button>
              </div>
            </div>
          ))}

          <div className="bg-background-box rounded-2xl p-6 shadow-custom space-y-4">
            <h3 className="font-semibold text-color-indigo">Marketplace Highlights</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <img
                  src="https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg"
                  alt=""
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="font-medium text-color-indigo">Wheat Daily Baseline</div>
                  <div className="text-xs text-color-lightgray mt-1">Haryana, Karnal</div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs text-color-lightgray">⭐ 4.5</span>
                    <button className="ml-auto bg-primary text-white px-3 py-1 rounded text-xs hover:bg-primary-600 transition-colors">
                      Check
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <img
                  src="https://images.pexels.com/photos/257840/pexels-photo-257840.jpeg"
                  alt=""
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="font-medium text-color-indigo">Organic Seeds</div>
                  <div className="text-xs text-color-lightgray mt-1">Punjab, Ludhiana</div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs text-color-lightgray">⭐ 4.8</span>
                    <button className="ml-auto bg-primary text-white px-3 py-1 rounded text-xs hover:bg-primary-600 transition-colors">
                      Check
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
