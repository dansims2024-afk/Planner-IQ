"use client";

import React, { useState, useEffect } from 'react';
import { Layout, CheckCircle2, Settings, Plus, Search, Bell } from 'lucide-react';
import Image from 'next/image';
import ProjectCard from './ProjectCard';

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
      { 
        id: 1, 
        name: 'Planning', 
        tasks: [
          { id: 1, text: 'Define User Personas', completed: true },
          { id: 2, text: 'System Architecture', completed: true },
          { id: 3, text: 'Tech Stack Selection', completed: true }
        ] 
      },
      { 
        id: 2, 
        name: 'Execution', 
        tasks: [
          { id: 4, text: 'Auth Setup', completed: true },
          { id: 5, text: 'Stripe Integration', completed: false },
          { id: 6, text: 'Dashboard UI', completed: false }
        ] 
      },
      { id: 3, name: 'Review', tasks: [] },
      { id: 4, name: 'Launch', tasks: [] }
    ]
  },
  { 
    id: 102, 
    title: 'Q3 Marketing Blitz', 
    type: 'Marketing', 
    status: 'At Risk', 
    currentPhase: 3, 
    nextTask: 'Ad Spend Approval', 
    deadline: 'Overdue',
    phases: [
      { id: 1, name: 'Planning', tasks: [{id:1, text:'Budgeting', completed:true}] },
      { id: 2, name: 'Execution', tasks: [{id:2, text:'Asset Creation', completed:true}] },
      { id: 3, name: 'Review', tasks: [{id:3, text:'Legal Sign-off', completed:false}] }
    ]
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

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col fixed h-full hidden lg:flex border-r border-slate-800 shadow-2xl z-20">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-blue-600 flex items-center justify-center text-white font-bold">
             <Image 
               src="/logo.png" 
               alt="Planner-IQ" 
               fill 
               className="object-cover"
               unoptimized 
               onError={(e) => e.currentTarget.style.display = 'none'} 
             />
             <span className="absolute z-0">P</span>
          </div>
          <div>
            <h1 className="font-bold text-white leading-none">Planner-IQ</h1>
            <span className="text-[10px] uppercase font-bold text-slate-500">Workspace</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <div className="flex items-center gap-3 bg-white/10 text-white px-4 py-3 rounded-xl font-medium border border-white/5">
            <Layout size={20} /> <span>Satellite View</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-400 hover:text-white transition-all">
            <CheckCircle2 size={20} /> <span>My Tasks</span>
          </div>
        </nav>
      </aside>

      <main className="flex-1 lg:ml-72 relative">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Overview</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-all">
            <Plus size={18} /> New Project
          </button>
        </header>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}
