"use client";

import React, { useState, useEffect } from 'react';
import { Layout, CheckCircle2, Settings, Plus, Search, Bell } from 'lucide-react';
import Image from 'next/image'; // Import the Image component
import ProjectCard from './ProjectCard';

// --- DEMO DATA ---
const DEMO_PROJECTS = [
  { 
    id: 101, 
    title: 'Recruit-IQ Platform Launch', 
    type: 'Development', 
    status: 'On Track', 
    currentPhase: 2, 
    nextTask: 'Stripe Integration', 
    deadline: '2 Weeks',
    phases: [
      { id: 1, name: 'Planning', tasks: [{id:1, text:'Define User Personas', completed:true}] },
      { id: 2, name: 'Execution', tasks: [] }
    ]
  },
  { 
    id: 102, 
    title: 'Q3 Marketing Blitz', 
    type: 'Marketing', 
    status: 'At Risk', 
    currentPhase: 3, 
    nextTask: 'Finalize Ad Spend', 
    deadline: 'Overdue',
    phases: []
  }
];

export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('planner_iq_projects');
    if (!saved) {
      setProjects(DEMO_PROJECTS);
      localStorage.setItem('planner_iq_projects', JSON.stringify(DEMO_PROJECTS));
    } else {
      setProjects(JSON.parse(saved));
    }
  }, []);

  const resetDemo = () => {
    setProjects(DEMO_PROJECTS);
    localStorage.setItem('planner_iq_projects', JSON.stringify(DEMO_PROJECTS));
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* SIDEBAR WITH PERSISTENT LOGO */}
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col fixed h-full hidden lg:flex border-r border-slate-800 shadow-2xl z-20">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          
          {/* THE LOGO COMPONENT */}
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/20 shrink-0">
             {/* This tries to load the logo. If missing, it shows the 'P' behind it. */}
             <Image 
               src="/logo.png" 
               alt="Logo" 
               fill 
               className="object-cover"
               onError={(e) => e.currentTarget.style.display = 'none'} 
             />
             <span className="absolute z-0 text-lg">P</span>
          </div>

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
          </div>
        </nav>

        {/* Reset Utility */}
        <div className="p-4 mt-auto">
          <button onClick={resetDemo} className="w-full text-xs text-slate-600 hover:text-blue-400 text-center py-2">
            Reset Data
          </button>
        </div>

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
        <header className="sticky top-0 z-30 bg-slate-50/80 backdrop-blur-xl border-b border-slate-200/50 px-8 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Overview</h2>
            <p className="text-sm text-slate-500">Track your active workflows.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white pl-4 pr-5 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
              <Plus size={18} /> New Project
            </button>
          </div>
        </header>

        <div className="p-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
