"use client";

import React, { useState, useEffect } from 'react';
import { Layout, CheckCircle2, Plus, X, Clock, Settings, Search, Bell } from 'lucide-react';
import Image from 'next/image';
import ProjectCard from './ProjectCard';

const ADMIN_SAMPLES = [
  {
    id: 301,
    title: "Project Everest: Q1 Board Review",
    type: "Board Meeting",
    status: "On Track",
    deadline: "Feb 20",
    lastUpdated: "10:15 AM",
    currentPhase: 2,
    nextTask: "Finalize Executive Catering",
    phases: [
      { id: 1, name: "Preparation", tasks: [
        { id: 3011, text: "Collate Dept. Executive Summaries", completed: true },
        { id: 3012, text: "Audit Q4 Financial Statements", completed: true },
        { id: 3013, text: "Draft Board Deck v1", completed: true }
      ]},
      { id: 2, name: "Logistics", tasks: [
        { id: 3014, text: "Confirm Director Travel & Hotel", completed: true },
        { id: 3015, text: "Finalize Executive Catering Menu", completed: false },
        { id: 3016, text: "Secure On-site AV Support", completed: false }
      ]}
    ]
  },
  {
    id: 302,
    title: "Global Leadership Offsite (Kyoto)",
    type: "Event Planning",
    status: "At Risk",
    deadline: "Mar 15",
    lastUpdated: "Yesterday",
    currentPhase: 1,
    nextTask: "Venue Deposit & Contract",
    phases: [
      { id: 1, name: "Strategic Planning", tasks: [
        { id: 3021, text: "Venue Site Selection & RFP", completed: true },
        { id: 3022, text: "Define Key Learning Objectives", completed: true },
        { id: 3023, text: "Secure Keynote Speaker", completed: false }
      ]}
    ]
  },
  {
    id: 303,
    title: "HQ2 Relocation & IT Setup",
    type: "Facilities",
    status: "On Track",
    deadline: "Feb 18",
    lastUpdated: "2 mins ago",
    currentPhase: 4,
    nextTask: "Staff Badge Activation",
    phases: [
      { id: 1, name: "Planning", tasks: [{ id: 3031, text: "Floor Plan Approval", completed: true }] },
      { id: 2, name: "Execution", tasks: [{ id: 3032, text: "Furniture Installation", completed: true }] },
      { id: 3, name: "Review", tasks: [{ id: 3033, text: "Fire Marshall Inspection", completed: true }] },
      { id: 4, name: "Launch", tasks: [
        { id: 3034, text: "Network Stress Test", completed: true },
        { id: 3035, text: "Staff Keycard Activation", completed: false }
      ]}
    ]
  }
];

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('planner_iq_projects');
    if (!saved || JSON.parse(saved).length < 2) {
      localStorage.setItem('planner_iq_projects', JSON.stringify(ADMIN_SAMPLES));
      setProjects(ADMIN_SAMPLES);
    } else {
      setProjects(JSON.parse(saved));
    }
  }, []);

  const handleCreate = () => {
    if (!newTitle) return;
    const newProject = {
      id: Date.now(),
      title: newTitle,
      type: "General",
      status: "On Track",
      lastUpdated: "Just now",
      phases: [{ id: 1, name: "Planning", tasks: [] }, { id: 2, name: "Execution", tasks: [] }]
    };
    const updated = [...projects, newProject];
    setProjects(updated);
    localStorage.setItem('planner_iq_projects', JSON.stringify(updated));
    setIsModalOpen(false);
    setNewTitle("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-8 border border-slate-100 animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-2xl tracking-tight text-slate-800">New Workflow</h3>
              <button onClick={() => setIsModalOpen(false)} className="bg-slate-100 p-2 rounded-full"><X size={20}/></button>
            </div>
            <div className="space-y-6">
              <input value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="Project Name..." className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100 focus:ring-2 focus:ring-blue-500 transition-all" />
              <button onClick={handleCreate} className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">Create Project</button>
            </div>
          </div>
        </div>
      )}

      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col fixed h-full hidden lg:flex border-r border-slate-800 shadow-2xl z-20">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-blue-600 flex items-center justify-center font-bold">
            <Image src="/logo.png" alt="Logo" fill className="object-cover z-10" onLoad={()=>setLogoLoaded(true)} onError={()=>setLogoLoaded(false)} unoptimized />
            {!logoLoaded && <span className="text-lg">P</span>}
          </div>
          <div>
            <h1 className="font-bold text-white leading-none">Planner-IQ</h1>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Admin Hub</span>
          </div>
        </div>
        <nav className="p-4 mt-6 space-y-2">
           <div className="flex items-center gap-3 bg-white/10 text-white px-4 py-3 rounded-xl font-semibold"><Layout size={20}/> Satellite View</div>
           <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer"><Bell size={20}/> Notifications</div>
        </nav>
      </aside>

      <main className="flex-1 lg:ml-72 p-10">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Satellite View</h2>
            <p className="text-slate-500 text-sm">Real-time project orchestration</p>
          </div>
          <button onClick={()=>setIsModalOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20"><Plus size={20}/> New Project</button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </main>
    </div>
  );
}
