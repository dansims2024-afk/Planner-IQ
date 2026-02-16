"use client";

import React, { useState } from 'react';
import { Layout, CheckCircle2, Settings, Plus, Search, Bell, ChevronDown, Command } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { INITIAL_PROJECTS } from '../lib/constants';

export default function Dashboard() {
  const [projects] = useState(INITIAL_PROJECTS);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 selection:bg-blue-100">
      
      {/* --- PRO SIDEBAR --- */}
      <aside className="w-72 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 flex flex-col fixed h-full shadow-2xl border-r border-slate-800 z-50">
        
        {/* Logo Area */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-transform duration-300">
              <span className="font-bold text-lg">P</span>
            </div>
            <div>
              <h1 className="font-bold text-white tracking-tight leading-none group-hover:text-blue-400 transition-colors">Planner-IQ</h1>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Workspace</span>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
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
            <span className="ml-auto bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
          </div>
        </nav>

        {/* User Profile (Bottom) */}
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

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 ml-72 relative">
        
        {/* Sticky Glass Header */}
        <header className="sticky top-0 z-40 bg-slate-50/80 backdrop-blur-xl border-b border-slate-200/50 px-10 py-6 flex justify-between items-center transition-all duration-300">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h2>
            <p className="text-sm text-slate-500 font-medium">All active projects</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* "Command Center" Search Input */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-600 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-12 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all w-72 shadow-sm outline-none placeholder:text-slate-400"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-slate-200 bg-slate-50 px-1.5 font-mono text-[10px] font-medium text-slate-500">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </div>

            {/* Primary Action Button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white pl-4 pr-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all active:scale-95 border border-blue-500">
              <Plus size={18} strokeWidth={3} /> 
              <span>New Project</span>
            </button>
          </div>
        </header>

        {/* Scrollable Project Grid */}
        <div className="p-10 pt-8">
          
          {/* Filter Bar (Optional for future, but good for visuals) */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
             <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold cursor-pointer">All Projects</span>
             <span className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 cursor-pointer transition-colors">Marketing</span>
             <span className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 cursor-pointer transition-colors">Development</span>
             <span className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 cursor-pointer transition-colors">HR</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-20">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
            
            {/* The "Empty State" Card */}
            <button className="group border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-8 text-slate-400 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 min-h-[250px]">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-all mb-3 group-hover:scale-110">
                <Plus size={24} />
              </div>
              <span className="font-bold text-slate-600 group-hover:text-blue-700 transition-colors">Create Workflow</span>
              <span className="text-xs text-slate-400 mt-1">Start a new project from template</span>
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
