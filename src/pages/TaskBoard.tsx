import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import NewTaskForm from '../components/NewTaskForm';

const TaskCard = ({ task, onDragStart }) => (
  <div
    className="bg-white p-4 rounded shadow mb-3 cursor-move transition-all duration-300 hover:shadow-md"
    draggable
    onDragStart={(e) => onDragStart(e, task.id)}
  >
    <h3 className="font-semibold text-gray-800">{task.title}</h3>
    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
    <p className="text-xs text-gray-500 mt-2">截止日期: {task.dueDate}</p>
    <div className="mt-2 flex justify-between items-center">
      <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
        {task.priority}
      </span>
      <span className="text-xs text-gray-500">{task.estimatedHours}小时</span>
    </div>
    <p className="text-xs text-gray-500 mt-2">负责人: {task.assignee}</p>
  </div>
);

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'urgent': return 'bg-red-100 text-red-800';
    case 'high': return 'bg-orange-100 text-orange-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const TaskColumn = ({ title, tasks, status, onDrop }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="flex-shrink-0 w-72"
      onDrop={(e) => onDrop(e, status)}
      onDragOver={handleDragOver}
    >
      <h2 className="text-lg font-semibold mb-3 flex justify-between items-center">
        {title}
        <span className="text-sm font-normal text-gray-500">{tasks.length}</span>
      </h2>
      <div className="bg-gray-100 p-3 rounded-lg min-h-[300px]">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDragStart={(e, taskId) => e.dataTransfer.setData('text/plain', taskId)} />
        ))}
      </div>
    </div>
  );
};

const TaskBoard = () => {
  const { tasks, updateTask } = useAppContext();
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  const columns = [
    { title: '待办', status: 'todo' },
    { title: '进行中', status: 'inProgress' },
    { title: '审核中', status: 'review' },
    { title: '已完成', status: 'done' },
  ];

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    updateTask(taskId, { status: newStatus });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">任务看板</h1>
        <button
          onClick={() => setShowNewTaskForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 flex items-center"
        >
          <Plus size={20} className="mr-2" />
          新建任务
        </button>
      </div>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <TaskColumn
            key={column.status}
            title={column.title}
            tasks={tasks.filter((task) => task.status === column.status)}
            status={column.status}
            onDrop={handleDrop}
          />
        ))}
      </div>
      {showNewTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">新建任务</h2>
              <button onClick={() => setShowNewTaskForm(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <NewTaskForm onSubmit={() => setShowNewTaskForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;