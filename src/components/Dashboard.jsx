"use client";

import React, { useState, useEffect } from 'react';
import { Layout, CheckCircle2, Plus, X, Search, Bell, Filter, Briefcase, Building, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import ProjectCard from './ProjectCard';

const DIVISIONS = ["All", "Executive", "Facilities", "Internal", "Special Projects"];

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [activeDivision, setActiveDivision] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDivision, setNewDivision] = useState("Executive");
  const [searchQuery, setSearchQuery] = useState("");
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('planner_iq_projects');
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  const handleCreate = () => {
    if (!newTitle) return;
    const newProject = {
      id: Date.now(),
      title: newTitle,
      division: newDivision, // Assign the selected division
      status: "On Track",
      lastUpdated: "Just now",
      phases: [{ id: 1, name: "Planning", tasks: [] }]
    };
    const updated = [...projects, newProject];
    setProjects(updated);
    localStorage.setItem('planner_iq_projects', JSON.stringify(updated));
    setIsModalOpen(false);
    setNewTitle("");
  };

  // Filter logic for the Satellite View
  const filteredProjects = projects.filter(p => {
    const matchesDivision = activeDivision === "All" || p.division === activeDivision;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDivision && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* MODAL WITH DIVISION SELECTOR */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-8 border border-slate-100 animate-in zoom-in-95">
            <h3 className="font-bold text-2xl mb-6">New Workflow</h3>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 mb-2 block">Project Name</label>
                <input value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="e.g. Office Expansion" className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 mb-2 block">Division</label>
                <select value={newDivision} onChange={(e)=>setNewDivision(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none">
                  {DIVISIONS.filter(d => d !== "All").map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <button onClick={handleCreate} className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20">Initialize</button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col fixed h-full hidden lg:flex border-r border-slate-800 shadow-2xl z-20">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-blue-600 flex items-center justify-center font-bold">
            <Image src="/logo.png" alt="Logo" fill className="object-cover z-10" onLoad={()=>setLogoLoaded(true)} onError={()=>setLogoLoaded(false)} unoptimized />
            {!logoLoaded && <span className="text-lg">P</span>}
          </div>
          <h1 className="font-bold text-white leading-none">Planner-IQ</h1>
        </div>
        <nav className="p-4 mt-6 space-y-2">
           <div className="flex items-center gap-3 bg-white/10 text-white px-4 py-3 rounded-xl font-semibold"><Layout size={20}/> Satellite View</div>
        </nav>
      </aside>

      <main className="flex-1 lg:ml-72 p-10">
        <header className="mb-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight">Satellite View</h2>
            <button onClick={()=>setIsModalOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20"><Plus size={20}/> New Project</button>
          </div>

          {/* --- DIVISION FILTER BAR --- */}
          <div className="flex gap-2 p-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto no-scrollbar">
            {DIVISIONS.map(div => (
              <button 
                key={div}
                onClick={() => setActiveDivision(div)}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeDivision === div ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                {div}
              </button>
            ))}
          </div>
        </header>

        {/* GRID FILTERED BY DIVISION */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </main>
    </div>
  );
}
