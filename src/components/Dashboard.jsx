"use client";

import React, { useState, useEffect } from 'react';
import { Layout, CheckCircle2, Settings, Plus, Search, Bell, Command } from 'lucide-react';
import ProjectCard from './ProjectCard';

// --- DATA DEFINED HERE FOR SAFETY ---
const INITIAL_PROJECTS = [
  { 
    id: 101, 
    title: 'Recruit-IQ Integration', 
    type: 'Development', 
    status: 'On Track', 
    currentPhase: 2, 
    nextTask: 'API Mapping', 
    deadline: '3 days',
    phases: []
  },
  { 
    id: 102, 
    title: 'Staff-IQ Launch', 
    type: 'Marketing', 
    status: 'At Risk', 
    currentPhase: 3, 
    nextTask: 'Social Assets', 
    deadline: 'Overdue',
    phases: []
  },
  { 
    id: 103, 
    title: 'Q4 Hiring Blitz', 
    type: 'Recruiting', 
    status: 'On Track', 
    currentPhase: 1, 
    nextTask: 'Job Descriptions', 
    deadline: '2 weeks',
    phases: []
  }
];

export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Try to load saved data, otherwise use the constants above
    const saved = localStorage.getItem('planner_iq_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      setProjects(INITIAL_PROJECTS);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col fixed h-full hidden lg:flex border-r border-slate-800 shadow-2xl z-20">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/20">P</div>
          <div>
            <h1 className="font-bold text-white tracking-tight leading-none">Planner-IQ</h1>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Workspace</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <div className="flex items-center gap-3 bg-white/10 text-white px-4 py-3 rounded-xl font-medium cursor-pointer border border-white/5">
            <Layout size={20} /> <span>Satellite View</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium cursor-pointer hover:bg-white/5 hover:text-white transition-all text-slate-400 group">
            <CheckCircle2 size={20} /> <span>My Tasks</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium cursor-pointer hover:bg-white/5 hover:text-white transition-all text-slate-400 group">
            <Bell size={20} /> <span>Notifications</span>
            <span className="ml-auto bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
          </div>
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 border border-white/20" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">Dan Sims</div>
              <div className="text-[10px] text-slate-500">Lead Recruiter</div>
            </div>
            <Settings size={16} className="text-slate-500 hover:text-white" />
          </div>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 lg:ml-72 relative">
        {/* Sticky Header */}
        <header className="sticky top-0 z-30 bg-slate-50/80 backdrop-blur-xl border-b border-slate-200/50 px-8 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Overview</h2>
            <p className="text-sm text-slate-500">Track your active workflows.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-600 transition-colors" size={16} />
              <input type="text" placeholder="Search..." className="pl-10 pr-12 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none w-64 transition-all" />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-slate-100 rounded text-[10px] text-slate-500 font-bold border border-slate-200">⌘K</div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white pl-4 pr-5 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
              <Plus size={18} /> New Project
            </button>
          </div>
        </header>

        {/* Content Grid */}
        <div className="p-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
            
            {/* Empty State Card */}
            <button className="group border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-8 text-slate-400 hover:border-blue-400 hover:bg-blue-50/30 transition-all min-h-[200px]">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-all mb-3 group-hover:scale-110">
                <Plus size={24} />
              </div>
              <span className="font-bold text-slate-600 group-hover:text-blue-700 transition-colors">Start Workflow</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
