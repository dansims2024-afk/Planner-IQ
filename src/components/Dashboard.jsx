"use client";

import React, { useState, useEffect } from 'react';
import { Layout, CheckCircle2, Settings, Plus, X, Calendar } from 'lucide-react';
import Image from 'next/image';
import ProjectCard from './ProjectCard';

// --- PM & ADMIN TEMPLATE LIBRARY ---
const TEMPLATE_DATABASE = {
  "Board Meeting": [
    { id: 1, name: "Phase 1: Preparation", tasks: [
      { id: 101, text: "Collate Executive Summaries", completed: true },
      { id: 102, text: "Draft Board Deck (v1)", completed: false },
      { id: 103, text: "Review Financial Statements", completed: false }
    ]},
    { id: 2, name: "Phase 2: Logistics", tasks: [
      { id: 104, text: "Confirm Director Travel/Hotel", completed: true },
      { id: 105, text: "Order Executive Catering", completed: false }
    ]}
  ],
  "Company Offsite": [
    { id: 1, name: "Planning", tasks: [
      { id: 201, text: "Venue Site Selection", completed: true },
      { id: 202, text: "Define Key Learning Objectives", completed: true }
    ]},
    { id: 2, name: "Execution", tasks: [
      { id: 203, text: "Send Calendar Invites", completed: false },
      { id: 204, text: "Distribute Pre-read Materials", completed: false }
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
      // Load initial demo if empty
      const demo = [{
        id: 100, title: "Q1 Strategic Review", type: "Board Meeting", status: "On Track", deadline: "Feb 20",
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
      deadline: "TBD",
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
      
      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl">New Admin Workflow</h3>
              <button onClick={() => setIsModalOpen(false)}><X/></button>
            </div>
            <div className="space-y-4">
              <input value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="Project Name..." className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100 focus:border-blue-500" />
              <select value={selectedTemplate} onChange={(e)=>setSelectedTemplate(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100">
                <option value="Board Meeting">Board Meeting Prep</option>
                <option value="Company Offsite">Company Offsite</option>
              </select>
              <button onClick={handleCreate} className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl">Create Workflow</button>
            </div>
          </div>
        </div>
      )}

      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col fixed h-full hidden lg:flex">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-blue-600 flex items-center justify-center font-bold">
            <Image src="/logo.png" alt="Logo" fill className="object-cover z-10" onLoad={()=>setLogoLoaded(true)} onError={()=>setLogoLoaded(false)} />
            {!logoLoaded && "P"}
          </div>
          <h1 className="font-bold text-white leading-none">Planner-IQ</h1>
        </div>
        <nav className="p-4 mt-4 space-y-2">
           <div className="flex items-center gap-3 bg-white/10 text-white px-4 py-3 rounded-xl"><Layout size={20}/> Satellite View</div>
        </nav>
      </aside>

      <main className="flex-1 lg:ml-72 p-8">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold">Overview</h2>
          <button onClick={()=>setIsModalOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20"><Plus size={18}/> New Project</button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </main>
    </div>
  );
}
