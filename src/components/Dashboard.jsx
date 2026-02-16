import React, { useState } from 'react';
import { Layout, CheckCircle, Settings, Plus } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { INITIAL_PROJECTS } from '../lib/constants';

const Dashboard = () => {
  const [projects] = useState(INITIAL_PROJECTS);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* Sidebar Navigation */}
      <div className="w-64 bg-slate-900 text-white flex flex-col fixed h-full">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-tight">Planner-IQ</h1>
          <p className="text-xs text-slate-400 mt-1">Workspace: Creative</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <div className="flex items-center gap-3 bg-blue-600 text-white p-3 rounded-lg font-medium cursor-pointer">
            <Layout size={20} /> Dashboard
          </div>
          <div className="flex items-center gap-3 text-slate-400 hover:text-white p-3 rounded-lg font-medium cursor-pointer transition-colors">
            <CheckCircle size={20} /> My Tasks
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 text-slate-400 hover:text-white cursor-pointer">
            <Settings size={20} /> Settings
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Satellite View</h2>
            <p className="text-slate-500">Overview of all active workflows.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95">
            <Plus size={18} /> New Project
          </button>
        </header>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
          
          {/* Add New Placeholder */}
          <div className="border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-10 text-slate-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all cursor-pointer min-h-[200px]">
            <Plus size={32} className="mb-2" />
            <span className="font-semibold">Create New Project</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
