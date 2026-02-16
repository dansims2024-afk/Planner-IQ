"use client";

import React, { useState, useEffect } from 'react';
import { Layout, CheckCircle2, Settings, Plus, Search, Bell } from 'lucide-react';
import ProjectCard from './ProjectCard';

// --- THE "DEMO" DATA SET ---
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
          { id: 1, text: 'Define User Personas (Recruiters vs Candidates)', completed: true },
          { id: 2, text: 'System Architecture Diagram', completed: true },
          { id: 3, text: 'API Swagger Documentation', completed: true },
          { id: 4, text: 'Select Tech Stack (Next.js + Supabase)', completed: true }
        ] 
      },
      { 
        id: 2, 
        name: 'Execution', 
        tasks: [
          { id: 5, text: 'Initialize Repo & CI/CD Pipeline', completed: true },
          { id: 6, text: 'Authentication Setup (Clerk)', completed: true },
          { id: 7, text: 'Candidate Dashboard UI', completed: true },
          { id: 8, text: 'Stripe Payments Integration', completed: false },
          { id: 9, text: 'Email Notification Service', completed: false }
        ] 
      },
      { 
        id: 3, 
        name: 'Review', 
        tasks: [
          { id: 10, text: 'Internal QA Testing', completed: false },
          { id: 11, text: 'UAT with Beta Users', completed: false }
        ] 
      },
      { 
        id: 4, 
        name: 'Launch', 
        tasks: [
          { id: 12, text: 'Production Deployment', completed: false },
          { id: 13, text: 'Go-Live Announcement', completed: false }
        ] 
      }
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
    phases: [
      { id: 1, name: 'Planning', tasks: [{id:1, text:'Budget Approval', completed:true}] },
      { id: 2, name: 'Execution', tasks: [{id:2, text:'Create Assets', completed:true}] },
      { id: 3, name: 'Review', tasks: [{id:3, text:'Legal Review', completed:false}] },
      { id: 4, name: 'Launch', tasks: [] }
    ]
  }
];

export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // 1. Check if we already have data
    const saved = localStorage.getItem('planner_iq_projects');
    
    // 2. If NO data exists, load the DEMO set immediately
    if (!saved) {
      setProjects(DEMO_PROJECTS);
      localStorage.setItem('planner_iq_projects', JSON.stringify(DEMO_PROJECTS));
    } else {
      // 3. If data exists, use it
      setProjects(JSON.parse(saved));
    }
  }, []);

  // FORCE RESET FUNCTION (For testing)
  const resetDemo = () => {
    setProjects(DEMO_PROJECTS);
    localStorage.setItem('planner_iq_projects', JSON.stringify(DEMO_PROJECTS));
    window.location.reload();
  };

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
          </div>
        </nav>

        {/* RESET DEMO BUTTON (Hidden Utility) */}
        <div className="p-4">
          <button onClick={resetDemo} className="w-full text-xs text-slate-600 hover:text-blue-400 text-center py-2">
            Reset to Demo Data
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
