import React, { useState } from 'react';
import { FileText, Users, BarChart2, Calendar, Download } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ReportCard = ({ title, description, icon: Icon, onGenerate }) => (
  <div className="bg-white p-6 rounded-lg shadow transition-all duration-300 hover:shadow-lg">
    <div className="flex items-center mb-4">
      <Icon size={24} className="text-blue-500 mr-3" />
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <button
      onClick={onGenerate}
      className="text-blue-500 hover:text-blue-600 flex items-center transition-colors duration-300"
    >
      <Download size={16} className="mr-2" />
      生成报告
    </button>
  </div>
);

const WeeklyReport = ({ tasks, startDate, endDate }) => {
  const completedTasks = tasks.filter(
    task => task.status === 'done' && new Date(task.completedDate) >= startDate && new Date(task.completedDate) <= endDate
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-2xl font-bold mb-4">周报 ({startDate.toLocaleDateString()} - {endDate.toLocaleDateString()})</h2>
      <p className="mb-4">本周完成任务数: {completedTasks.length}</p>
      <h3 className="text-xl font-semibold mb-2">完成的任务:</h3>
      <ul className="list-disc pl-5">
        {completedTasks.map(task => (
          <li key={task.id}>{task.title} - {task.assignee}</li>
        ))}
      </ul>
    </div>
  );
};

const Reports = () => {
  const { tasks, projects } = useAppContext();
  const [showWeeklyReport, setShowWeeklyReport] = useState(false);
  const [weeklyReportDate, setWeeklyReportDate] = useState(new Date());

  const generateWeeklyReport = () => {
    setShowWeeklyReport(true);
  };

  const generatePerformanceReport = () => {
    // 这里可以实现生成绩效报告的逻辑
    console.log("生成绩效报告");
  };

  const generateProjectReport = () => {
    // 这里可以实现生成项目报告的逻辑
    console.log("生成项目报告");
  };

  const getWeekDates = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return { start, end };
  };

  const { start: weekStart, end: weekEnd } = getWeekDates(weeklyReportDate);

  const reports = [
    {
      title: '周报系统',
      description: '生成本周工作总结和计划',
      icon: Calendar,
      onGenerate: generateWeeklyReport,
    },
    {
      title: '绩效报告',
      description: '生成个人和团队的绩效分析报告',
      icon: BarChart2,
      onGenerate: generatePerformanceReport,
    },
    {
      title: '项目报告',
      description: '生成项目进度和状态报告',
      icon: FileText,
      onGenerate: generateProjectReport,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">报告管理</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {reports.map((report, index) => (
          <ReportCard key={index} {...report} />
        ))}
      </div>
      {showWeeklyReport && (
        <WeeklyReport tasks={tasks} startDate={weekStart} endDate={weekEnd} />
      )}
    </div>
  );
};

export default Reports;