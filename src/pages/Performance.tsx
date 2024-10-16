import React, { useState } from 'react';
import { Star, TrendingUp, Award, Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const PerformanceCard = ({ title, description, icon: Icon, score }) => (
  <div className="bg-white p-6 rounded-lg shadow transition-all duration-300 hover:shadow-lg">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <Icon size={24} className="text-blue-500 mr-3" />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="text-2xl font-bold text-blue-500">{score}</div>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

const PerformanceChart = ({ data }) => (
  <div className="bg-white p-6 rounded-lg shadow mb-6">
    <h2 className="text-2xl font-semibold mb-4">绩效趋势</h2>
    <div className="h-64 bg-gray-100 flex items-end justify-between p-4">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className="bg-blue-500 w-8"
            style={{ height: `${item.score * 10}%` }}
          ></div>
          <span className="mt-2 text-sm">{item.month}</span>
        </div>
      ))}
    </div>
  </div>
);

const Performance = () => {
  const { tasks, projects } = useAppContext();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const calculateMonthlyPerformance = () => {
    const completedTasks = tasks.filter(task => 
      task.status === 'done' && 
      new Date(task.completedDate).getMonth() === selectedMonth
    );
    const totalTasks = tasks.filter(task => 
      new Date(task.createdDate).getMonth() === selectedMonth
    );
    const completionRate = totalTasks.length > 0 ? completedTasks.length / totalTasks.length : 0;
    return (completionRate * 5).toFixed(1);
  };

  const calculateYearlyKPI = () => {
    const completedProjects = projects.filter(project => project.progress === 100);
    const kpiScore = (completedProjects.length / projects.length) * 100;
    return kpiScore.toFixed(0) + '%';
  };

  const calculateSkillScore = () => {
    // 这里可以实现更复杂的技能评分逻辑
    const skillScores = ['A', 'B', 'C', 'D', 'F'];
    return skillScores[Math.floor(Math.random() * skillScores.length)];
  };

  const performanceData = [
    {
      title: '月度考核',
      description: '基于本月完成的任务和项目评估',
      icon: Star,
      score: calculateMonthlyPerformance() + '/5',
    },
    {
      title: '年度KPI',
      description: '年度关键绩效指标达成情况',
      icon: TrendingUp,
      score: calculateYearlyKPI(),
    },
    {
      title: '技能评估',
      description: '核心技能和能力评估结果',
      icon: Award,
      score: calculateSkillScore(),
    },
  ];

  const monthlyPerformanceData = [
    { month: '1月', score: 4.2 },
    { month: '2月', score: 4.5 },
    { month: '3月', score: 4.0 },
    { month: '4月', score: 4.8 },
    { month: '5月', score: 4.3 },
    { month: '6月', score: 4.6 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">绩效管理</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {performanceData.map((item, index) => (
          <PerformanceCard key={index} {...item} />
        ))}
      </div>
      <PerformanceChart data={monthlyPerformanceData} />
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">绩效目标</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>提高项目完成率至95%</li>
          <li>减少bug修复时间，平均修复时间不超过24小时</li>
          <li>参与至少2个跨部门项目，提升协作能力</li>
          <li>完成高级前端开发认证</li>
        </ul>
      </div>
    </div>
  );
};

export default Performance;