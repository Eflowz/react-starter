import React, { useState, lazy, Suspense } from 'react';
import { Home, Book, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';

const TodayView = lazy(() => import('../views/TodaysAttend'));
// const EntriesView = lazy(() => import('./views/EntriesView')); 
const PreviousEntriesView = lazy(() => import('../views/PreviousAttend'));

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Today');
  const { theme } = useTheme();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div
      className={`flex flex-col md:flex-row h-screen font-inter transition-colors duration-300
        ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}
    >
      {/* Mobile Header */}
      <div
        className={`md:hidden p-4 flex justify-between items-center shadow-sm border-b 
        ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
      >
        <span className="text-sm font-semibold text-blue-800 bg-blue-100 px-2 py-1 rounded-full">
          ADMIN PANEL
        </span>
        <button onClick={toggleSidebar} className="p-2 rounded-md focus:outline-none cursor-pointer ">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 w-64 flex flex-col justify-between py-6 px-4 shadow-md z-50 md:z-auto transition-transform duration-300
        ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-8 mt-8 md:mt-0">
          <span className="text-xs font-semibold text-blue-800 bg-blue-100 px-2 py-1 rounded-full">
            ADMIN PANEL
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-grow">
          {[
            { name: 'Today', icon: Home },
            { name: 'Previous Entries', icon: Book },
          ].map((item) => (
            <div
              key={item.name}
              onClick={() => {
                setActiveTab(item.name);
                if (window.innerWidth < 768) setIsSidebarOpen(false);
              }}
              className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors
              ${
                activeTab === item.name
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="space-y-2 text-sm">
          <div
            onClick={handleLogout}
            className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors
              ${theme === 'dark' ? 'hover:bg-blue-100 hover:text-blue-600 text-gray-400' : 'hover:bg-blue-600 hover:text-gray-100 text-gray-500'}`}
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Log Out</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <Suspense fallback={<div>Loading...</div>}>
          {activeTab === 'Today' && <TodayView />}
          {activeTab === 'Previous Entries' && <PreviousEntriesView />}
        </Suspense>
      </main>
    </div>
  );
};

export default Dashboard;
