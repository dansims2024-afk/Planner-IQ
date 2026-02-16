"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layout, CheckCircle2, Settings, Plus, Search, Bell, X, ArrowRight, Clock } from 'lucide-react';
import Image from 'next/image';

// --- DATA DEFINED LOCALLY (SAFETY FIX) ---
const INITIAL_PROJECTS = [
  { 
    id: 101, 
    title: 'Recruit-IQ Integration', 
    type: 'Development', 
    status: 'On Track', 
    currentPhase: 2, 
    nextTask: 'API Mapping', 
    deadline: '3 days',
    phases: [
      { id: 1, name: 'Planning', tasks: [{id:1, text:'Scope', completed:true}] },
      { id: 2, name: 'Execution', tasks: [] }
    ]
  },
  { 
    id: 102, 
    title: 'Staff-IQ Launch', 
    type: 'Marketing', 
    status: 'At Risk', 
    currentPhase: 3, 
    nextTask: 'Social Media Assets', 
    deadline: 'Overdue',
    phases: []
  }
];

// --- INTERNAL CARD COMPONENT (To ensure no import errors) ---
const ProjectCard = ({ project }) => (
  <Link href={`/project/${project.id}`} className="block group">
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{project.type}</span>
          <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{project.title}</h3>
        </div>
        <div className={`px-2 py-1 rounded text-[10px] font-bold border ${project.status === 'On Track' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
          {project.status}
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-500 mt-4 border-t border-slate-50 pt-4">
        <Clock size={14} />
        <span>Due: {project.deadline}</span>
        <ArrowRight size={14} className="ml-auto" />
      </div>
    </div>
  </Link>
);

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load from local storage OR use local constant
    const saved = localStorage.getItem('planner_iq_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      setProjects(INITIAL_PROJECTS);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col fixed h-full hidden lg:flex border-r border-slate-800">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">P</div>
          <h1 className="font-bold text-white">Planner-IQ</h1>
        </div>
        <nav className="p-4 mt-4 space-y-2">
          <div className="flex items-center gap-3 bg-white/10 text-white px-4 py-3 rounded-xl font-medium"><Layout size={20} /> <span>Satellite View</span></div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer"><CheckCircle2 size={20} /> <span>My Tasks</span></div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 relative">
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">Satellite View</h2>
          <div className="flex gap-4">
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm shadow-sm transition-all">
              <Plus size={16} /> New Project
            </button>
          </div>
        </header>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </main>
    </div>
  );
}
