import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TaskBoard from './pages/TaskBoard';
import Projects from './pages/Projects';
import Reports from './pages/Reports';
import Performance from './pages/Performance';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 overflow-x-hidden overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<TaskBoard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/performance" element={<Performance />} />
              {/* 添加其他路由 */}
            </Routes>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;