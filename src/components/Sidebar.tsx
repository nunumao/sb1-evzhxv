import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Folder, FileText, BarChart2, Users, Settings, Lock } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="bg-white w-64 h-full shadow-lg">
      <div className="p-5">
        <h1 className="text-2xl font-bold text-gray-800">智能目标管理</h1>
      </div>
      <nav className="mt-5">
        <Link to="/" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
          <LayoutDashboard className="mr-3" />
          仪表板
        </Link>
        <Link to="/tasks" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
          <CheckSquare className="mr-3" />
          任务看板
        </Link>
        <Link to="/projects" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
          <Folder className="mr-3" />
          项目管理
        </Link>
        <Link to="/reports" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
          <FileText className="mr-3" />
          报告管理
        </Link>
        <Link to="/performance" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
          <BarChart2 className="mr-3" />
          绩效管理
        </Link>
        <Link to="/team" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
          <Users className="mr-3" />
          开发团队
        </Link>
        <Link to="/settings" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
          <Settings className="mr-3" />
          系统设置
        </Link>
        <Link to="/auth" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
          <Lock className="mr-3" />
          身份验证
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;