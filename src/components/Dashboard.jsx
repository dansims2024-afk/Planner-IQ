"use client";

import React, { useState, useEffect } from 'react';
import { Layout, CheckCircle2, Settings, Plus, Search, Bell, X, briefcase, Calendar } from 'lucide-react';
import Image from 'next/image';
import ProjectCard from './ProjectCard';

const TEMPLATES = {
  "Board Meeting": [
    { name: "Preparation", tasks: [{text: "Draft Agenda", completed: false}, {text: "Executive Summaries", completed: false}] },
    { name: "Logistics", tasks: [{text: "Catering", completed: false}, {text: "Room Tech Check", completed: false}] }
  ],
  "Project Kickoff": [
    { name: "Alignment", tasks: [{text: "Define Success Metrics", completed: false}, {text: "Stakeholder List", completed: false}] },
    { name: "Setup", tasks: [{text: "Shared Drive Folder", completed: false}, {text: "Communication Channel", completed: false}] }
  ]
};

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("Blank");
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
      type: selectedTemplate === "Blank" ? "General" : "Template",
      status: "On Track",
      deadline: "TBD",
      phases: TEMPLATES[selectedTemplate] || [
        { id: 1, name: "Planning", tasks: [] },
        { id: 2, name: "Execution", tasks: [] }
      ]
    };

    const updated = [...projects, newProject];
    setProjects(updated);
    localStorage.setItem('planner_iq_projects', JSON.stringify(updated));
    setIsModalOpen(false);
    setNewTitle("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* --- QUICK ADD MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-xl text-slate-800">New Workflow</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-2">Project Name</label>
                <input 
                  autoFocus
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Q1 Board Review" 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-2">Select Template</label>
                <select 
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium appearance-none"
                >
                  <option value="Blank">Blank Project</option>
                  <option value="Board Meeting">Board Meeting Prep</option>
                  <option value="Project Kickoff">Standard Project Kickoff</option>
                </select>
              </div>
              <button 
                onClick={handleCreate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
              >
                Create Workflow
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col fixed h-full hidden lg:flex border-r border-slate-800 shadow-2xl z-20">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
             <Image src="/logo.png" alt="Logo" fill className="object-cover z-10" onLoad={() => setLogoLoaded(true)} onError={() => setLogoLoaded(false)} />
             {!logoLoaded && <span className="text-lg">P</span>}
          </div>
          <div>
            <h1 className="font-bold text-white leading-none">Planner-IQ</h1>
            <span className="text-[10px] uppercase font-bold text-slate-500">Admin Workspace</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <div className="flex items-center gap-3 bg-white/10 text-white px-4 py-3 rounded-xl font-medium border border-white/5 shadow-lg shadow-blue-900/20">
            <Layout size={20} /> <span>Satellite View</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-400 hover:text-white transition-all cursor-pointer">
            <CheckCircle2 size={20} /> <span>My Tasks</span>
          </div>
        </nav>
      </aside>

      {/* --- MAIN AREA --- */}
      <main className="flex-1 lg:ml-72 relative">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Satellite View</h2>
            <p className="text-sm text-slate-500">High-level project orchestration</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
          >
            <Plus size={18} /> New Project
          </button>
        </header>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
          
          {/* Create Button (Empty State) */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-slate-400 hover:border-blue-400 hover:bg-blue-50/30 transition-all min-h-[200px]"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-all mb-3 group-hover:scale-110">
              <Plus size={24} />
            </div>
            <span className="font-bold text-slate-600 group-hover:text-blue-700">Add Project</span>
          </button>
        </div>
      </main>
    </div>
  );
}
