"use client";

import React, { useState, useEffect } from 'react';
import { Layout, CheckCircle2, Plus, X, Search, Bell, ExternalLink, FileText, Globe } from 'lucide-react';
import Image from 'next/image';
import ProjectCard from './ProjectCard';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('planner_iq_projects');
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  // --- NEW: DEEP-SEARCH LOGIC ---
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    const results = [];
    projects.forEach(project => {
      project.phases.forEach(phase => {
        phase.tasks.forEach(task => {
          // Scan Task Text
          const matchTask = task.text.toLowerCase().includes(searchQuery.toLowerCase());
          // Scan Resources (Links/Files)
          const matchResource = task.resources?.some(r => r.value.toLowerCase().includes(searchQuery.toLowerCase()));

          if (matchTask || matchResource) {
            results.push({
              projectId: project.id,
              projectTitle: project.title,
              taskText: task.text,
              matchType: matchResource ? 'Resource' : 'Task'
            });
          }
        });
      });
    });
    setSearchResults(results.slice(0, 5)); // Limit to top 5 hits
  }, [searchQuery, projects]);

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
        {/* Sidebar Navigation... */}
      </aside>

      <main className="flex-1 lg:ml-80 p-10">
        <header className="sticky top-0 z-30 bg-slate-50/80 backdrop-blur-xl border-b border-slate-200/50 px-8 py-5 flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Satellite View</h2>
          </div>
          
          <div className="flex items-center gap-6">
            {/* --- DEEP SEARCH BAR --- */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all tasks..." 
                className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm w-80 shadow-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" 
              />
              
              {/* SEARCH DROPDOWN */}
              {searchResults.length > 0 && (
                <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="p-3 bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Hits</div>
                  {searchResults.map((res, i) => (
                    <a key={i} href={`/project/${res.projectId}`} className="flex flex-col p-4 hover:bg-blue-50 transition-colors border-b border-slate-50 last:border-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-blue-600 uppercase">{res.projectTitle}</span>
                        <ExternalLink size={10} className="text-slate-300"/>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 truncate">{res.taskText}</p>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <button onClick={()=>setIsModalOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-105 transition-all">
              <Plus size={20}/> New Project
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </main>
    </div>
  );
}
