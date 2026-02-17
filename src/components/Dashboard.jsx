"use client";

import React, { useState, useEffect } from 'react';
import { 
  Layout, CheckCircle2, Plus, X, Search, Bell, Edit3, 
  Settings, Archive, Trash2, Filter, Zap, Activity, Eraser
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ProjectCard from './ProjectCard';

const DIVISIONS = ["All", "Executive", "Facilities", "Internal", "Special Projects", "Archived"];

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [activeDivision, setActiveDivision] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDivision, setNewDivision] = useState("Executive");
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('planner_iq_projects');
    if (saved) {
      setProjects(JSON.parse(saved).sort((a, b) => (a.order || 0) - (b.order || 0)));
    }
  }, []);

  const saveAll = (list) => {
    setProjects(list);
    localStorage.setItem('planner_iq_projects', JSON.stringify(list));
  };

  // --- NEW: BULK ARCHIVE LOGIC ---
  const archiveCompletedProjects = () => {
    const updated = projects.map(p => {
      // Check if project is 100% complete and not already archived
      const allDone = p.phases.every(ph => ph.tasks.every(t => t.completed)) && p.phases.length > 0;
      if (allDone && !p.archived) {
        return { ...p, archived: true, lastUpdated: "Archived via Bulk" };
      }
      return p;
    });
    saveAll(updated);
  };

  const getCapacityStats = () => {
    const activeProjects = projects.filter(p => !p.archived);
    const totalPendingTasks = activeProjects.reduce((acc, p) => 
      acc + p.phases.reduce((phAcc, ph) => phAcc + (ph.tasks?.filter(t => !t.completed).length || 0), 0), 0
    );
    const capacityLevel = Math.min((totalPendingTasks / 30) * 100, 100);
    return { percent: Math.round(capacityLevel), count: totalPendingTasks };
  };

  const getDivisionStats = (divName) => {
    const divProjects = projects.filter(p => p.division === divName && !p.archived);
    if (divProjects.length === 0) return 0;
    const total = divProjects.reduce((acc, p) => acc + p.phases.reduce((phA, ph) => phA + (ph.tasks?.length || 0), 0), 0);
    const done = divProjects.reduce((acc, p) => acc + p.phases.reduce((phA, ph) => phA + (ph.tasks?.filter(t => t.completed).length || 0), 0), 0);
    return total > 0 ? Math.round((done / total) * 100) : 0;
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeDivision === "Archived") return p.archived && matchesSearch;
    return !p.archived && (activeDivision === "All" || p.division === activeDivision) && matchesSearch;
  });

  const capacity = getCapacityStats();

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      <aside className="w-80 bg-slate-900 text-slate-300 flex flex-col fixed h-full hidden lg:flex border-r border-slate-800 shadow-2xl z-20">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-blue-600 flex items-center justify-center font-bold shrink-0">
            <Image src="/logo.png" alt="Logo" fill className="object-cover z-10" onLoad={()=>setLogoLoaded(true)} onError={()=>setLogoLoaded(false)} unoptimized />
            {!logoLoaded && <span className="text-lg text-white">P</span>}
          </div>
          <h1 className="font-bold text-white tracking-tighter">Planner-IQ</h1>
        </div>

        <div className="p-6 mt-4">
          <div className="bg-white/5 rounded-3xl p-5 border border-white/5 shadow-inner">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Capacity Gauge</h3>
              <Activity size={14} className={capacity.percent > 80 ? "text-red-500 animate-pulse" : "text-blue-500"} />
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-black text-white">{capacity.percent}%</span>
              <span className="text-[10px] font-bold text-slate-500 mb-1">{capacity.count} Active</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-1000 ${capacity.percent > 80 ? 'bg-red-500' : 'bg-blue-600'}`} style={{ width: `${capacity.percent}%` }} />
            </div>
            
            {/* BULK ACTION BUTTON */}
            <button 
              onClick={archiveCompletedProjects}
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-blue-600 hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border border-white/5 hover:border-blue-400"
            >
              <Eraser size={14} /> Quick Archive Done
            </button>
          </div>
        </div>

        <div className="px-6 space-y-4 mb-6 overflow-y-auto no-scrollbar">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Division Health</h3>
          {DIVISIONS.filter(d => d !== "All" && d !== "Archived").map(div => (
            <div key={div} className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-slate-400">{div}</span>
                <span className="text-blue-400">{getDivisionStats(div)}%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600/50 transition-all duration-700" style={{ width: `${getDivisionStats(div)}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-2 bg-white/5 rounded-2xl">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600" />
            <div className="flex-1 text-sm font-semibold text-white">Dan Sims</div>
            <button onClick={() => setIsEditMode(!isEditMode)} className={`p-2 rounded-lg transition-all ${isEditMode ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>
              <Edit3 size={16}/>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 lg:ml-80 p-10">
        <header className="flex flex-col gap-8 mb-12">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-extrabold tracking-tight">Satellite View</h2>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder="Deep Search..." className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm w-64 shadow-sm outline-none focus:ring-4 focus:ring-blue-500/10" />
              </div>
              <button onClick={()=>setIsModalOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-105 transition-all"><Plus size={20}/> New Project</button>
            </div>
          </div>

          <div className="flex gap-2 p-1 bg-white border border-slate-200 rounded-2xl shadow-sm w-fit">
            {DIVISIONS.map(div => (
              <button key={div} onClick={() => setActiveDivision(div)} className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeDivision === div ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}>
                {div}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((p, index) => (
            <div key={p.id} className="relative h-full">
              <ProjectCard 
                project={p} 
                isEditMode={isEditMode} 
                onDelete={(id) => saveAll(projects.filter(proj => proj.id !== id))} 
                onArchive={(id) => saveAll(projects.map(proj => proj.id === id ? {...proj, archived: !proj.archived} : proj))} 
              />
              {isEditMode && (
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm rounded-[2.5rem] z-30 flex flex-col items-center justify-center p-6 animate-in fade-in">
                  <label className="text-white text-xs font-bold mb-2 uppercase">Order</label>
                  <input type="number" value={p.order || index + 1} onChange={(e) => {
                    const val = parseInt(e.target.value);
                    saveAll(projects.map(proj => proj.id === p.id ? {...proj, order: val} : proj).sort((a,b)=>a.order-b.order));
                  }} className="w-20 p-3 bg-white rounded-xl text-center font-bold text-xl outline-none" />
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
