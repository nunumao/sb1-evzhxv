import React from 'react';
import { Calendar, Users, BarChart2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import NewProjectForm from '../components/NewProjectForm';

const ProjectCard = ({ project }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
    <p className="text-gray-600 mb-4">{project.description}</p>
    <div className="mb-4">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${project.progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-1">进度: {project.progress}%</p>
    </div>
    <div className="flex items-center text-sm text-gray-600 mb-2">
      <Users size={16} className="mr-2" />
      <span>{project.team}</span>
    </div>
    <div className="flex items-center text-sm text-gray-600">
      <Calendar size={16} className="mr-2" />
      <span>截止日期: {project.dueDate}</span>
    </div>
  </div>
);

const Projects = () => {
  const { projects } = useAppContext();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">项目管理</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <div className="mt-8">
        <NewProjectForm />
      </div>
    </div>
  );
};

export default Projects;