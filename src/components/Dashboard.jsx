"use client";

import React, { useState, useEffect } from 'react';
import { Layout, CheckCircle2, Settings, Plus, Search, Bell, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import ProjectCard from './ProjectCard';

const RECRUITING_DEMO = [
  { 
    id: 101, 
    title: 'Executive Search: Senior Architect', 
    type: 'Recruiting', 
    status: 'On Track', 
    deadline: 'Feb 28',
    phases: [
      { 
        id: 1, name: 'Sourcing', 
        tasks: [
          { id: 1, text: 'Identify Top 20 Candidates', completed: true },
          { id: 2, text: 'Initial Outreach Sent', completed: true },
          { id: 3, text: 'Portfolio Review', completed: true }
        ] 
      },
      { 
        id: 2, name: 'Interviewing', 
        tasks: [
          { id: 4, text: 'Technical Assessment', completed: true },
          { id: 5, text: 'Cultural Fit Interview', completed: false },
          { id: 6, text: 'Reference Checks', completed: false }
        ] 
      },
      { id: 3, name: 'Offer', tasks: [{ id: 7, text: 'Salary Negotiation', completed: false }] },
      { id: 4, name: 'Onboarding', tasks: [{ id: 8, text: 'Equipment Setup', completed: false }] }
    ]
  },
  { 
    id: 102, 
    title: 'Recruit-IQ Web Launch', 
    type: 'Development', 
    status: 'At Risk', 
    deadline: 'Overdue',
    phases: [
      { id: 1, name: 'Planning', tasks: [{ id: 9, text: 'Schema Design', completed: true }] },
      { id: 2, name: 'Execution', tasks: [{ id: 10, text: 'API Integration', completed: false }] },
      { id: 3, name: 'Review', tasks: [] },
      { id: 4, name: 'Launch', tasks: [] }
    ]
  }
];

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('planner_iq_projects');
    if (!saved) {
      setProjects(RECRUITING_DEMO);
      localStorage.setItem('planner_iq_projects', JSON.stringify(RECRUITING_DEMO));
    } else {
      setProjects(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col fixed h-full hidden lg:flex border-r border-slate-800 shadow-2xl z-20">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
             <Image src="/logo.png" alt="Logo" fill className="object-cover z-10" onLoad={() => setLogoLoaded(true)} onError={() => setLogoLoaded(false)} />
             {!logoLoaded && <span className="text-lg">P</span>}
          </div>
          <div>
            <h1 className="font-bold text-white leading-none">Planner-IQ</h1>
            <span className="text-[10px] uppercase font-bold text-slate-500">Workspace</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <div className="flex items-center gap-3 bg-white/10 text-white px-4 py-3 rounded-xl font-medium border border-white/5 shadow-lg shadow-blue-900/20">
            <Layout size={20} /> <span>Satellite View</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-400 hover:text-white transition-all cursor-pointer group">
            <CheckCircle2 size={20} className="group-hover:text-blue-400" /> <span>My Tasks</span>
          </div>
        </nav>
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 border border-white/20" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">Dan Sims</div>
              <div className="text-[10px] text-slate-500">Lead Recruiter</div>
            </div>
            <Settings size={16} className="text-slate-500 hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>
      </aside>

      <main className="flex-1 lg:ml-72 relative">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Satellite View</h2>
            <p className="text-sm text-slate-500">Live monitoring of all divisions</p>
          </div>
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95">
            <Plus size={18} /> New Workflow
          </button>
        </header>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}
