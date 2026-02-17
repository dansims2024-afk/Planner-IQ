"use client";

import React, { useState, useEffect } from 'react';
import { 
  Layout, CheckCircle2, Plus, X, Search, Bell, Edit3, 
  Settings, Archive, Trash2, Filter, ChevronRight
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

  // --- ANALYTICS ENGINE: DIVISION PROGRESS ---
  const getDivisionStats = (divName) => {
    const divProjects = projects.filter(p => p.division === divName && !p.archived);
    if (divProjects.length === 0) return 0;
    
    let totalTasks = 0;
    let completedTasks = 0;
    
    divProjects.forEach(p => {
      p.phases.forEach(ph => {
        totalTasks += ph.tasks?.length || 0;
        completedTasks += ph.tasks?.filter(t => t.completed).length || 0;
      });
    });
    
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeDivision === "Archived") return p.archived && matchesSearch;
    const matchesDiv = (activeDivision === "All" || p.division === activeDivision);
    return !p.archived && matchesDiv && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* MODAL (SAME AS PREVIOUS) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-8 border border-slate-100 animate-in zoom-in-95">
            <h3 className="font-bold text-2xl mb-6 tracking-tight">New Workflow</h3>
            <div className="space-y-6">
              <input value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="Project Name..." className="w-full p-4 bg-slate-50 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
              <select value={newDivision} onChange={(e)=>setNewDivision(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border outline-none font-medium">
                {DIVISIONS.filter(d => d !== "All" && d !== "Archived").map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <button onClick={() => {
                const newP = { id: Date.now(), title: newTitle, division: newDivision, status: "On Track", archived: false, order: projects.length+1, phases: [{id:1, name: "Planning", tasks: []}] };
                saveAll([...projects, newP]);
                setIsModalOpen(false);
                setNewTitle("");
              }} className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl">Initialize</button>
            </div>
          </div>
        </div>
      )}

      {/* ENHANCED SIDEBAR */}
      <aside className="w-80 bg-slate-900 text-slate-300 flex flex-col fixed h-full hidden lg:flex border-r border-slate-800 shadow-2xl z-20">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-blue-600 flex items-center justify-center font-bold shrink-0">
            <Image src="/logo.png" alt="Logo" fill className="object-cover z-10" onLoad={()=>setLogoLoaded(true)} onError={()=>setLogoLoaded(false)} unoptimized />
            {!logoLoaded && <span className="text-lg">P</span>}
          </div>
          <h1 className="font-bold text-white tracking-tighter">Planner-IQ</h1>
        </div>

        <nav className="p-4 space-y-2 mt-4">
           <div className="flex items-center gap-3 bg-blue-600/10 text-blue-400 px-4 py-3 rounded-xl font-semibold border border-blue-500/20"><Layout size={20}/> Satellite View</div>
        </nav>

        {/* --- NEW: DIVISION PROGRESS WIDGET --- */}
        <div className="p-6 space-y-6 mt-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Division Health</h3>
          {DIVISIONS.filter(d => d !== "All" && d !== "Archived").map(div => {
            const progress = getDivisionStats(div);
            return (
              <div key={div} className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-slate-400">{div}</span>
                  <span className="text-blue-400">{progress}%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${progress}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* SHORTCUT TASKS */}
        <div className="mt-auto p-6 border-t border-white/5 bg-slate-950/50">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Priority Tasks</h3>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {projects.flatMap(p => p.phases.flatMap(ph => ph.tasks.filter(t => !t.completed).slice(0,1))).map(task => (
              <div key={task.id} className="p-3 rounded-xl bg-white/5 border border-white/5">
                <p className="text-xs font-medium text-slate-300 truncate">{task.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-2 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500" />
            <div className="flex-1 text-sm font-semibold text-white">Dan Sims</div>
            <button onClick={() => setIsEditMode(!isEditMode)} className={`p-2 rounded-lg transition-colors ${isEditMode ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>
              <Edit3 size={16}/>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN SATELLITE AREA */}
      <main className="flex-1 lg:ml-80 p-10">
        <header className="flex flex-col gap-8 mb-12">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-extrabold tracking-tight">Satellite View</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder="Search..." className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm w-64 shadow-sm outline-none" />
              </div>
              <button onClick={()=>setIsModalOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg"><Plus size={20}/> New Project</button>
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
            <div key={p.id} className="relative group h-full">
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
