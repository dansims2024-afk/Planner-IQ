"use client";

import React, { useState, useEffect } from 'react';
import { Layout, CheckCircle2, Plus, X, Clock, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import ProjectCard from './ProjectCard';

const TEMPLATE_DATABASE = {
  "Board Meeting": [
    { id: 1, name: "Preparation", tasks: [
      { id: 101, text: "Collate Executive Summaries", completed: true },
      { id: 102, text: "Draft Board Deck (v1)", completed: false },
      { id: 103, text: "Review Financials", completed: false }
    ]},
    { id: 2, name: "Logistics", tasks: [
      { id: 104, text: "Director Travel/Hotel", completed: true },
      { id: 105, text: "Executive Catering", completed: false }
    ]}
  ],
  "Company Offsite": [
    { id: 1, name: "Strategic Planning", tasks: [
      { id: 201, text: "Venue Site Selection", completed: true },
      { id: 202, text: "Budget Approval", completed: true }
    ]},
    { id: 2, name: "Coordination", tasks: [
      { id: 203, text: "Send Calendar Invites", completed: false },
      { id: 204, text: "Order Merchandise", completed: false }
    ]}
  ]
};

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("Board Meeting");
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('planner_iq_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      const demo = [{
        id: 100, 
        title: "Q1 Board Review", 
        type: "Board Meeting", 
        status: "On Track", 
        lastUpdated: "Just now",
        phases: TEMPLATE_DATABASE["Board Meeting"]
      }];
      setProjects(demo);
      localStorage.setItem('planner_iq_projects', JSON.stringify(demo));
    }
  }, []);

  const handleCreate = () => {
    const newProject = {
      id: Date.now(),
      title: newTitle || "New Workflow",
      type: selectedTemplate,
      status: "On Track",
      lastUpdated: "Created now",
      phases: TEMPLATE_DATABASE[selectedTemplate] || [{id: 1, name: "General", tasks: []}]
    };
    const updated = [...projects, newProject];
    setProjects(updated);
    localStorage.setItem('planner_iq_projects', JSON.stringify(updated));
    setIsModalOpen(false);
    setNewTitle("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* QUICK ADD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-8 border border-slate-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-2xl tracking-tight">Add Workflow</h3>
              <button onClick={() => setIsModalOpen(false)} className="bg-slate-100 p-2 rounded-full"><X size={20}/></button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 mb-2 block">Project Name</label>
                <input value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="e.g. Quarterly Offsite" className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100 focus:border-blue-500 transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 mb-2 block">Template Type</label>
                <select value={selectedTemplate} onChange={(e)=>setSelectedTemplate(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100 appearance-none">
                  <option value="Board Meeting">Board Meeting Prep</option>
                  <option value="Company Offsite">Company Offsite</option>
                </select>
              </div>
              <button onClick={handleCreate} className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">Create Project</button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col fixed h-full hidden lg:flex">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-blue-600 flex items-center justify-center font-bold">
            <Image src="/logo.png" alt="Logo" fill className="object-cover z-10" onLoad={()=>setLogoLoaded(true)} onError={()=>setLogoLoaded(false)} />
            {!logoLoaded && "P"}
          </div>
          <div>
            <h1 className="font-bold text-white leading-none">Planner-IQ</h1>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Admin Hub</span>
          </div>
        </div>
        <nav className="p-4 mt-6 space-y-2">
           <div className="flex items-center gap-3 bg-white/10 text-white px-4 py-3 rounded-xl font-semibold"><Layout size={20}/> Satellite View</div>
           <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer"><AlertCircle size={20}/> Critical Tasks</div>
        </nav>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 lg:ml-72 p-10">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Satellite View</h2>
            <p className="text-slate-500 text-sm">Real-time orchestration dashboard</p>
          </div>
          <button onClick={()=>setIsModalOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-105 transition-all"><Plus size={20}/> New Project</button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </main>
    </div>
  );
}
