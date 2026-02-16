"use client";

import React, { useState } from 'react';
import { Layout, CheckCircle, Settings, Plus, Search } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { INITIAL_PROJECTS } from '../lib/constants';

export default function Dashboard() {
  const [projects] = useState(INITIAL_PROJECTS);

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex font-sans text-slate-900">
      <aside className="w-64 bg-[#1A1A1A] text-white flex flex-col fixed h-full shadow-xl">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-lg">P</div>
            <h1 className="text-xl font-bold tracking-tight">Planner-IQ</h1>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <div className="flex items-center gap-3 bg-white/10 text-white p-3 rounded-lg font-medium cursor-pointer">
            <Layout size={18} /> Dashboard
          </div>
          <div className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-white/5 p-3 rounded-lg font-medium transition-all cursor-pointer">
            <CheckCircle size={18} /> My Tasks
          </div>
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 text-slate-400 hover:text-white cursor-pointer p-2">
            <Settings size={18} /> Settings
          </div>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Satellite View</h2>
            <p className="text-slate-500 mt-1">Unified view of all projects.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm outline-none"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95">
              <Plus size={18} /> New Project
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <button className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-12 text-slate-400 hover:border-blue-400 hover:bg-blue-50/50 transition-all min-h-[250px]">
            <Plus size={24} className="mb-2" />
            <span className="font-bold">New Workflow</span>
          </button>
        </div>
      </main>
    </div>
  );
}
