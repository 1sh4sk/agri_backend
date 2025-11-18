import { createContext, useContext, ReactNode } from 'react';

interface WeatherData {
  temp: number;
  condition: string;
  high: number;
  low: number;
}

interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

interface FarmStats {
  crops: number;
  animals: number;
  events: number;
  watchlist: number;
}

interface Post {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
}

interface Marketplace {
  id: string;
  title: string;
  location: string;
  rating: number;
  image: string;
}

interface DashboardContextType {
  weather: WeatherData;
  tasks: Task[];
  farmStats: FarmStats;
  posts: Post[];
  marketplace: Marketplace[];
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const value: DashboardContextType = {
    weather: {
      temp: 32,
      condition: 'Sunny',
      high: 36,
      low: 28,
    },
    tasks: [
      { id: '1', title: 'Complete Report', status: 'pending', priority: 'high' },
      { id: '2', title: 'Check Irrigation', status: 'in-progress', priority: 'medium' },
      { id: '3', title: 'Feed Animals', status: 'completed', priority: 'low' },
    ],
    farmStats: {
      crops: 12,
      animals: 8,
      events: 3,
      watchlist: 5,
    },
    posts: [
      {
        id: '1',
        author: 'Ashwini Kumar',
        avatar: '',
        timestamp: '2 hours ago',
        content: "India's Agriculture Exports Surge by 7% This Quarter. The agricultural sector has shown remarkable growth...",
        likes: 245,
        comments: 32,
        shares: 18,
      },
      {
        id: '2',
        author: 'Farm Tech India',
        avatar: '',
        timestamp: '5 hours ago',
        content: 'New irrigation techniques are revolutionizing farming practices across the country.',
        images: ['https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg', 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg'],
        likes: 412,
        comments: 56,
        shares: 34,
      },
    ],
    marketplace: [
      {
        id: '1',
        title: 'Wheat Daily Baseline',
        location: 'Haryana, Karnal',
        rating: 4.5,
        image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg',
      },
      {
        id: '2',
        title: 'Organic Seeds',
        location: 'Punjab, Ludhiana',
        rating: 4.8,
        image: 'https://images.pexels.com/photos/257840/pexels-photo-257840.jpeg',
      },
    ],
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
