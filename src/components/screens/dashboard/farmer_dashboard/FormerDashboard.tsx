import { DashboardProvider } from '../../../../contexts/DashboardContext';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { FeedSection } from './FeedSection';
import { RightSidebar } from './RightSidebar';

function FormerDashboard() {
  console.log('formar dashboard ')
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <FeedSection />
          <RightSidebar />
        </div>
      </div>
    </DashboardProvider>
  );
}

export default FormerDashboard;
