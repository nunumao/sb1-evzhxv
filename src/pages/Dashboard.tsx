import React from 'react';
import { BarChart, CheckCircle, Clock, Users } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow flex items-center transition-all duration-300 hover:shadow-lg hover:scale-105">
    <div className="mr-4">
      <Icon size={24} className="text-blue-500" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const ProjectProgress = ({ projects }) => (
  <div className="space-y-4">
    {projects.map((project) => (
      <div key={project.id} className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold text-gray-800 mb-2">{project.title}</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">进度: {project.progress}%</p>
      </div>
    ))}
  </div>
);

const TeamWorkload = ({ tasks }) => {
  const teamWorkload = tasks.reduce((acc, task) => {
    acc[task.assignee] = (acc[task.assignee] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {Object.entries(teamWorkload).map(([member, taskCount]) => (
        <div key={member} className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-gray-800 mb-2">{member}</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
            <div
              className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min((taskCount / 10) * 100, 100)}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">任务数: {taskCount}</p>
        </div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const { tasks, projects } = useAppContext();

  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const ongoingProjects = projects.filter(project => project.progress < 100).length;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">仪表板</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="总任务数" value={tasks.length} icon={CheckCircle} />
        <StatCard title="进行中的项目" value={ongoingProjects} icon={Clock} />
        <StatCard title="已完成任务" value={completedTasks} icon={BarChart} />
        <StatCard title="团队成员" value={Object.keys(tasks.reduce((acc, task) => {
          acc[task.assignee] = true;
          return acc;
        }, {})).length} icon={Users} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">项目进度</h2>
          <ProjectProgress projects={projects} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">团队工作负载</h2>
          <TeamWorkload tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;