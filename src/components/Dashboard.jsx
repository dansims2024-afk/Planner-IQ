"use client";

import React, { useState, useEffect } from 'react';
import { 
  Layout, CheckCircle2, Plus, X, Search, Bell, Edit3, 
  ExternalLink, Settings, Archive, Trash2, ChevronRight, Filter
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
        { id: 3021, text: "Venue Site Selection & RFP", completed: true, resources: [{id: 4, type: 'link', value: 'https://kyoto-conventions.jp/rfp'}] },
        { id: 3022, text: "Define Key Learning Objectives", completed: true, resources: [] },
        { id: 3023, text: "Secure Keynote Speaker", completed: false, resources: [] }
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
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDivision, setNewDivision] = useState("Executive");
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('planner_iq_projects');
    if (!saved || !saved.includes('resources')) {
      localStorage.setItem('planner_iq_projects', JSON.stringify(ELITE_SAMPLES));
      setProjects(ELITE_SAMPLES);
    } else {
      const sorted = JSON.parse(saved).sort((a, b) => (a.order || 0) - (b.order || 0));
      setProjects(sorted);
    }
  }, []);

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }
    const results = [];
    projects.forEach(project => {
      project.phases.forEach(phase => {
        phase.tasks.forEach(task => {
          const matchTask = task.text.toLowerCase().includes(searchQuery.toLowerCase());
          const matchRes = task.resources?.some(r => r.value.toLowerCase().includes(searchQuery.toLowerCase()));
          if (matchTask || matchRes) {
            results.push({ projectId: project.id, projectTitle: project.title, taskText: task.text });
          }
        });
      });
    });
    setSearchResults(results.slice(0, 5));
  }, [searchQuery, projects]);

  const saveAll = (list) => {
    setProjects(list);
    localStorage.setItem('planner_iq_projects', JSON.stringify(list));
  };

  const handleCreate = () => {
    if (!newTitle) return;
    const newProject = {
      id: Date.now(),
      title: newTitle,
      division: newDivision,
      status: "On Track",
      lastUpdated: "Just now",
      archived: false,
      order: projects.length + 1,
      phases: [{ id: 1, name: "Phase 1", tasks: [] }]
    };
    saveAll([...projects, newProject]);
    setIsModalOpen(false);
    setNewTitle("");
  };

  const updateOrder = (id, val) => {
    const updated = projects.map(p => p.id === id ? {...p, order: parseInt(val)} : p)
      .sort((a, b) => a.order - b.order);
    saveAll(updated);
  };

  const deleteProject = (id) => saveAll(projects.filter(p => p.id !== id));
  const toggleArchive = (id) => saveAll(projects.map(p => p.id === id ? {...p, archived: !p.archived} : p));

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeDivision === "Archived") return p.archived && matchesSearch;
    const matchesDiv = (activeDivision === "All" || p.division === activeDivision);
    return !p.archived && matchesDiv && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* QUICK ADD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-8 border border-slate-100 animate-in zoom-in-95">
            <h3 className="font-bold text-2xl mb-6 tracking-tight">New Workflow</h3>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 mb-2 block tracking-widest">Project Name</label>
                <input autoFocus value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="e.g. Kyoto Offsite" className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 mb-2 block tracking-widest">Division</label>
                <select value={newDivision} onChange={(e)=>setNewDivision(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none font-medium">
                  {DIVISIONS.filter(d => d !== "All" && d !== "Archived").map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <button onClick={handleCreate} className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95">Initialize Workflow</button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
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
           <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer"><Bell size={20}/> Notifications</div>
        </nav>

        {/* OUTLOOK-STYLE SHORTCUT TASK LIST */}
        <div className="mt-auto p-6 border-t border-white/5 bg-slate-950/50">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Shortcut Tasks</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {projects.flatMap(p => p.phases.flatMap(ph => ph.tasks.filter(t => !t.completed).slice(0,1))).map(task => (
              <div key={task.id} className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/50 transition-all cursor-default">
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

      {/* MAIN AREA */}
      <main className="flex-1 lg:ml-80 p-10">
        <header className="flex flex-col gap-8 mb-12">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-extrabold tracking-tight">Satellite View</h2>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder="Deep Search..." className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm w-64 shadow-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" />
                {searchResults.length > 0 && (
                  <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[50]">
                    {searchResults.map((res, i) => (
                      <Link key={i} href={`/project/${res.projectId}`} className="block p-4 hover:bg-slate-50 border-b last:border-0">
                        <span className="text-[10px] font-bold text-blue-600 block mb-1 uppercase">{res.projectTitle}</span>
                        <p className="text-xs font-medium text-slate-700">{res.taskText}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={()=>setIsModalOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-105 transition-all"><Plus size={20}/> New Project</button>
            </div>
          </div>

          <div className="flex gap-2 p-1 bg-white border border-slate-200 rounded-2xl shadow-sm w-fit overflow-x-auto no-scrollbar">
            {DIVISIONS.map(div => (
              <button key={div} onClick={() => setActiveDivision(div)} className={`px-6 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeDivision === div ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}>
                {div === "Archived" && <Archive size={14} />} {div}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((p, index) => (
            <div key={p.id} className="relative group h-full">
              <ProjectCard project={p} isEditMode={isEditMode} onDelete={deleteProject} onArchive={toggleArchive} />
              {isEditMode && (
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm rounded-[2.5rem] z-30 flex flex-col items-center justify-center p-6 animate-in fade-in">
                  <label className="text-white text-xs font-bold mb-2 uppercase">Position (1-20)</label>
                  <input type="number" value={p.order || index + 1} onChange={(e) => updateOrder(p.id, e.target.value)} className="w-20 p-3 bg-white rounded-xl text-center font-bold text-xl outline-none" />
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
