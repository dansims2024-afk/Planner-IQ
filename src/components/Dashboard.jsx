"use client";

import React, { useState, useEffect } from 'react';
import { 
  Layout, CheckCircle2, Plus, X, Search, Bell, Edit3, 
  Settings, Archive, Trash2, Filter, Activity, Eraser
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ProjectCard from './ProjectCard';

const DIVISIONS = ["All", "Executive", "Facilities", "Internal", "Special Projects", "Archived"];

const ELITE_SAMPLES = [
  {
    id: 301,
    title: "Project Everest: Q1 Board Review",
    division: "Executive",
    status: "On Track",
    deadline: "Feb 20",
    lastUpdated: "10:15 AM",
    order: 1,
    archived: false,
    phases: [
      { id: 1, name: "Preparation", tasks: [
        { id: 3011, text: "Collate Dept. Executive Summaries", completed: true, resources: [{id: 1, type: 'file', value: 'CEO_Summary_V2.pdf'}] },
        { id: 3012, text: "Audit Q4 Financial Statements", completed: true, resources: [{id: 2, type: 'link', value: 'https://finance.portal/q4'}] },
        { id: 3013, text: "Draft Board Deck v1", completed: false, resources: [] }
      ]},
      { id: 2, name: "Logistics", tasks: [
        { id: 3014, text: "Confirm Director Travel & Hotel", completed: true, resources: [{id: 3, type: 'file', value: 'Travel_Manifest.xlsx'}] },
        { id: 3015, text: "Finalize Executive Catering Menu", completed: false, resources: [] }
      ]}
    ]
  },
  {
    id: 302,
    title: "Global Leadership Offsite (Kyoto)",
    division: "Executive",
    status: "At Risk",
    deadline: "Mar 15",
    lastUpdated: "Yesterday",
    order: 2,
    archived: false,
    phases: [
      { id: 1, name: "Strategic Planning", tasks: [
        { id: 3021, text: "Venue Site Selection & RFP", completed: true, resources: [{id: 4, type: 'link', value: 'https://kyoto.conventions.jp/rfp'}] },
        { id: 3022, text: "Define Key Learning Objectives", completed: true, resources: [] }
      ]}
    ]
  },
  {
    id: 303,
    title: "HQ2 Relocation & IT Setup",
    division: "Facilities",
    status: "On Track",
    deadline: "Feb 18",
    lastUpdated: "2 mins ago",
    order: 3,
    archived: false,
    phases: [
      { id: 1, name: "Planning", tasks: [{ id: 3031, text: "Floor Plan Approval", completed: true, resources: [{id: 5, type: 'file', value: 'Blueprints_Final.dwg'}] }] },
      { id: 2, name: "Network Setup", tasks: [
        { id: 3034, text: "Network Stress Test", completed: true, resources: [] },
        { id: 3035, text: "Staff Badge Activation", completed: false, resources: [] }
      ]}
    ]
  }
];

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [activeDivision, setActiveDivision] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDivision, setNewDivision] = useState("Executive");
  const [logoLoaded, setLogoLoaded] = useState(false);

  // --- DATA HYDRATION ENGINE ---
  useEffect(() => {
    const saved = localStorage.getItem('planner_iq_projects');
    // Force inject if empty or using old schema
    if (!saved || saved === "[]" || !saved.includes('resources')) {
      localStorage.setItem('planner_iq_projects', JSON.stringify(ELITE_SAMPLES));
      setProjects(ELITE_SAMPLES);
    } else {
      setProjects(JSON.parse(saved).sort((a, b) => (a.order || 0) - (b.order || 0)));
    }
  }, []);

  const saveAll = (list) => {
    setProjects(list);
    localStorage.setItem('planner_iq_projects', JSON.stringify(list));
  };

  const getCapacity = () => {
    const pending = projects.filter(p => !p.archived).reduce((acc, p) => 
      acc + p.phases.reduce((phAcc, ph) => phAcc + (ph.tasks?.filter(t => !t.completed).length || 0), 0), 0
    );
    return { percent: Math.min(Math.round((pending / 30) * 100), 100), count: pending };
  };

  const getDivHealth = (name) => {
    const divP = projects.filter(p => p.division === name && !p.archived);
    if (divP.length === 0) return 0;
    const total = divP.reduce((acc, p) => acc + p.phases.reduce((pa, ph) => pa + (ph.tasks?.length || 0), 0), 0);
    const done = divP.reduce((acc, p) => acc + p.phases.reduce((pa, ph) => pa + (ph.tasks?.filter(t => t.completed).length || 0), 0), 0);
    return total > 0 ? Math.round((done / total) * 100) : 0;
  };

  const filtered = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeDivision === "Archived") return p.archived && matchesSearch;
    return !p.archived && (activeDivision === "All" || p.division === activeDivision) && matchesSearch;
  });

  const capacity = getCapacity();

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* SIDEBAR */}
      <aside className="w-80 bg-slate-900 text-slate-300 flex flex-col fixed h-full hidden lg:flex border-r border-slate-800 shadow-2xl z-20">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-blue-600 flex items-center justify-center font-bold">
            <Image src="/logo.png" alt="Logo" fill className="object-cover z-10" onLoad={()=>setLogoLoaded(true)} onError={()=>setLogoLoaded(false)} unoptimized />
            {!logoLoaded && <span className="text-lg">P</span>}
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
              <span className="text-[10px] font-bold text-slate-500 mb-1">{capacity.count} Active Tasks</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-4">
              <div className={`h-full transition-all duration-1000 ${capacity.percent > 80 ? 'bg-red-500' : 'bg-blue-600'}`} style={{ width: `${capacity.percent}%` }} />
            </div>
            <button 
              onClick={() => { localStorage.clear(); window.location.reload(); }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-red-600 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
            >
              <Eraser size={14} /> Force Reset Workspace
            </button>
          </div>
        </div>

        <div className="px-6 space-y-4 mb-6">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Division Health</h3>
          {DIVISIONS.filter(d => d !== "All" && d !== "Archived").map(div => (
            <div key={div} className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-slate-400">{div}</span>
                <span className="text-blue-400">{getDivHealth(div)}%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600/50 transition-all duration-700" style={{ width: `${getDivHealth(div)}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto p-4 border-t border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600" />
          <div className="flex-1 text-sm font-semibold text-white">Dan Sims</div>
          <button onClick={() => setIsEditMode(!isEditMode)} className={`p-2 rounded-lg ${isEditMode ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>
            <Edit3 size={16}/>
          </button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-80 p-10">
        <header className="flex flex-col gap-8 mb-12">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-extrabold tracking-tight">Satellite View</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder="Deep Search..." className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm w-64 shadow-sm outline-none" />
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
          {filtered.map((p, index) => (
            <ProjectCard 
              key={p.id} 
              project={p} 
              isEditMode={isEditMode} 
              onDelete={(id) => saveAll(projects.filter(proj => proj.id !== id))} 
              onArchive={(id) => saveAll(projects.map(proj => proj.id === id ? {...proj, archived: !proj.archived} : proj))} 
            />
          ))}
        </div>
      </main>
    </div>
  );
}
