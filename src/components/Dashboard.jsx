"use client";

import React, { useState, useEffect } from 'react';
import { Layout, CheckCircle2, Plus, X, Clock, Settings, Search, Bell, Edit3, Link, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import ProjectCard from './ProjectCard';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('planner_iq_projects');
    if (saved) {
      // Sort projects by their 'order' property before setting state
      const sorted = JSON.parse(saved).sort((a, b) => (a.order || 0) - (b.order || 0));
      setProjects(sorted);
    }
  }, []);

  const updateProjectOrder = (id, newOrder) => {
    const updated = projects.map(p => p.id === id ? { ...p, order: parseInt(newOrder) } : p)
      .sort((a, b) => a.order - b.order);
    setProjects(updated);
    localStorage.setItem('planner_iq_projects', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      <aside className="w-80 bg-slate-900 text-slate-300 flex flex-col fixed h-full hidden lg:flex border-r border-slate-800 shadow-2xl z-20">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-blue-600 flex items-center justify-center font-bold">
            <Image src="/logo.png" alt="Logo" fill className="object-cover z-10" onLoad={()=>setLogoLoaded(true)} onError={()=>setLogoLoaded(false)} unoptimized />
            {!logoLoaded && <span className="text-lg">P</span>}
          </div>
          <h1 className="font-bold text-white leading-none">Planner-IQ</h1>
        </div>

        <nav className="p-4 space-y-2 mt-4">
           <div className="flex items-center gap-3 bg-blue-600/10 text-blue-400 px-4 py-3 rounded-xl font-semibold border border-blue-500/20"><Layout size={20}/> Satellite View</div>
           <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer"><Bell size={20}/> Notifications</div>
        </nav>

        {/* --- NEW: OUTLOOK-STYLE SHORTCUT TASK LIST --- */}
        <div className="mt-auto p-6 border-t border-white/5 bg-slate-950/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Shortcut Tasks</h3>
            <Settings size={14} className="text-slate-600 hover:text-white cursor-pointer"/>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {projects.flatMap(p => p.phases.flatMap(ph => ph.tasks.filter(t => !t.completed).slice(0,1))).map(task => (
              <div key={task.id} className="group flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/50 transition-all">
                <div className="w-4 h-4 rounded border border-slate-700 mt-0.5" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs font-medium text-slate-300 truncate">{task.text}</p>
                  <Link href={`/project/${projects.find(p => p.phases.some(ph => ph.tasks.includes(task)))?.id}`} className="text-[9px] text-blue-500 flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Jump to Task <ExternalLink size={8}/>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-white/5 bg-slate-900">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500" />
            <div className="flex-1 text-sm font-semibold text-white">Dan Sims</div>
            <button onClick={() => setIsEditMode(!isEditMode)} className={`p-2 rounded-lg transition-colors ${isEditMode ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-white/5'}`}>
              <Edit3 size={16}/>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 lg:ml-80 p-10">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Satellite View</h2>
            <p className="text-slate-500 text-sm">Organize up to 20 concurrent workflows</p>
          </div>
          <button onClick={()=>setIsModalOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-105 transition-all"><Plus size={20}/> New Project</button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((p, index) => (
            <div key={p.id} className="relative group">
              <ProjectCard project={p} />
              {isEditMode && (
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm rounded-[2rem] z-30 flex flex-col items-center justify-center p-6 animate-in fade-in">
                  <label className="text-white text-xs font-bold mb-2 uppercase">Position (1-20)</label>
                  <input 
                    type="number" 
                    min="1" max="20"
                    value={p.order || index + 1}
                    onChange={(e) => updateProjectOrder(p.id, e.target.value)}
                    className="w-20 p-3 bg-white rounded-xl text-center font-bold text-xl outline-none" 
                  />
                  <p className="text-slate-400 text-[10px] mt-4 text-center">Enter a number to reorder this project on the board</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
