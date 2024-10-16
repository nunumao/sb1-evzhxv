import React, { createContext, useContext, useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'todo' | 'inProgress' | 'review' | 'done';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  estimatedHours: number;
  assignee: string;
  completedDate?: string;
  createdDate: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  team: string;
  dueDate: string;
  startDate: string;
}

interface AppContextType {
  tasks: Task[];
  projects: Project[];
  addTask: (task: Omit<Task, 'id' | 'createdDate'>) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // 初始化一些示例数据
    setTasks([
      {
        id: '1',
        title: '完成登录页面',
        description: '实现用户登录功能，包括表单验证和API集成',
        dueDate: '2023-06-30',
        status: 'inProgress',
        priority: 'high',
        estimatedHours: 8,
        assignee: '张三',
        createdDate: '2023-06-01',
      },
      {
        id: '2',
        title: '优化首页性能',
        description: '分析并优化首页加载速度，目标是将加载时间减少50%',
        dueDate: '2023-07-15',
        status: 'todo',
        priority: 'medium',
        estimatedHours: 16,
        assignee: '李四',
        createdDate: '2023-06-05',
      },
      {
        id: '3',
        title: '修复购物车Bug',
        description: '解决用户反馈的购物车商品数量无法更新的问题',
        dueDate: '2023-06-25',
        status: 'done',
        priority: 'urgent',
        estimatedHours: 4,
        assignee: '王五',
        createdDate: '2023-06-10',
        completedDate: '2023-06-20',
      },
    ]);

    setProjects([
      {
        id: '1',
        title: '电商平台改版',
        description: '对现有电商平台进行全面改版，提升用户体验和转化率',
        progress: 60,
        team: '前端团队A',
        startDate: '2023-04-01',
        dueDate: '2023-09-30',
      },
      {
        id: '2',
        title: '移动端App开发',
        description: '开发公司产品的移动端App，支持iOS和Android平台',
        progress: 30,
        team: '移动开发团队',
        startDate: '2023-05-15',
        dueDate: '2023-11-30',
      },
    ]);
  }, []);

  const addTask = (task: Omit<Task, 'id' | 'createdDate'>) => {
    const newTask = { ...task, id: Date.now().toString(), createdDate: new Date().toISOString() };
    setTasks([...tasks, newTask]);
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() };
    setProjects([...projects, newProject]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updates } : task));
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(projects.map(project => project.id === id ? { ...project, ...updates } : project));
  };

  return (
    <AppContext.Provider value={{ tasks, projects, addTask, addProject, updateTask, updateProject }}>
      {children}
    </AppContext.Provider>
  );
};