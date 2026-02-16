"use client";

import React, { useState } from 'react';
import { Layout, CheckCircle2, Settings, Plus, Search, Bell, X } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { INITIAL_PROJECTS } from '../lib/constants';
import Image from 'next/image'; // Import for the logo

export default function Dashboard() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the popup

  // The "New Project" Modal Component
  const NewProjectModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-lg text-slate-800">Create New Project</h3>
          <button 
            onClick={() => setIsModalOpen(false)}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-all"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Project Name</label>
            <input type="text" placeholder="e.g. Q4 Marketing Sprint" className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-800" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Workflow Type</label>
            <select className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-800 bg-white">
              <option>Marketing</option>
              <option>Development</option>
              <option>HR / Recruiting</option>
            </select>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 mt-2">
            Create Project
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 selection:bg-blue-100">
      
      {/* --- RENDER MODAL IF OPEN --- */}
      {isModalOpen && <NewProjectModal />}

      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 flex flex-col fixed h-full shadow-2xl border-r border-slate-800 z-40">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3 cursor-pointer group">
            {/* LOGO LOGIC: Tries to load image, falls back to "P" if missing */}
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-transform duration-300 bg-blue-600 flex items-center justify-center text-white font-bold">
               {/* Ensure logo.png is in your public folder! */}
               <Image 
                 src="/logo.png" 
                 alt="Planner-IQ Logo" 
                 fill 
                 className="object-cover"
                 onError={(e) => { e.target.style.display = 'none'; }} // Hides image if broken, showing the blue background
               />
               <span className="absolute z-[-1]">P</span> {/* Fallback letter */}
            </div>
            <div>
              <h1 className="font-bold text-white tracking-tight leading-none group-hover:text-blue-400 transition-colors">Planner-IQ</h1>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Workspace</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <div className="flex items-center gap-3 bg-white/10 text-white px-4 py-3 rounded-xl font-medium cursor-pointer shadow-sm border border-white/5 transition-all hover:bg-white/15">
            <Layout size={20} /> 
            <span>Satellite View</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium cursor-pointer hover:bg-white/5 hover:text-white transition-all text-slate-400 group">
            <CheckCircle2 size={20} className="group-hover:text-blue-400 transition-colors" /> 
            <span>My Tasks</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium cursor-pointer hover:bg-white/5 hover:text-white transition-all text-slate-400 group">
            <Bell size={20} className="group-hover:text-blue-400 transition-colors" /> 
            <span>Notifications</span>
          </div>
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 border border-white/20" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">Dan Sims</div>
              <div className="text-[10px] text-slate-500">Lead Recruiter</div>
            </div>
            <Settings size={16} className="text-slate-500 hover:text-white transition-colors" />
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 ml-72 relative">
        <header className="sticky top-0 z-30 bg-slate-50/80 backdrop-blur-xl border-b border-slate-200/50 px-10 py-6 flex justify-between items-center transition-all duration-300">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h2>
            <p className="text-sm text-slate-500 font-medium">All active projects</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-600 transition-colors" size={16} />
              <input type="text" placeholder="Search..." className="pl-10 pr-12 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all w-72 shadow-sm outline-none placeholder:text-slate-400" />
            </div>

            {/* BUTTON NOW HAS AN ONCLICK EVENT */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white pl-4 pr-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all active:scale-95 border border-blue-500"
            >
              <Plus size={18} strokeWidth={3} /> 
              <span>New Project</span>
            </button>
          </div>
        </header>

        <div className="p-10 pt-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
            
            {/* The "Empty State" Button - Also opens Modal */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-8 text-slate-400 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 min-h-[250px]"
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-all mb-3 group-hover:scale-110">
                <Plus size={24} />
              </div>
              <span className="font-bold text-slate-600 group-hover:text-blue-700 transition-colors">Create Workflow</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
