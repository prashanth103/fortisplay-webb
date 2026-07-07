import { Outlet } from 'react-router-dom';
import TopBar from '../components/common/TopBar';
import Sidebar from '../components/common/Sidebar';
import BottomNav from '../components/common/BottomNav';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-textPrimary">
      <TopBar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 pb-20 lg:pb-0">
          <Outlet />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
