"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Layout, CheckCircle2, Settings, Bell, Search, 
  ChevronRight, Calendar, User, Plus, Paperclip, 
  MoreHorizontal, ArrowLeft, Clock
} from 'lucide-react';

// --- MOCK DATA FOR THIS SPECIFIC PROJECT ---
const PROJECT_DATA = {
  id: 101,
  title: "Q3 Marketing Campaign",
  status: "On Track",
  deadline: "Oct 24, 2025",
  description: "Launch the new autumn product line across social and email channels.",
  team: ["Dan Sims", "Sarah J.", "Mike R."],
  phases: [
    {
      id: 1,
      name: "Planning",
      status: "completed",
      tasks: [
        { id: 1, text: "Define campaign goals", completed: true },
        { id: 2, text: "Approve budget ($15k)", completed: true },
        { id: 3, text: "Select agency partners", completed: true },
      ]
    },
    {
      id: 2,
      name: "Execution",
      status: "active",
      tasks: [
        { id: 4, text: "Draft social media copy", completed: false },
        { id: 5, text: "Design ad creatives", completed: true },
        { id: 6, text: "Setup tracking pixels", completed: false },
      ]
    },
    {
      id: 3,
      name: "Review",
      status: "pending",
      tasks: [
        { id: 7, text: "Legal compliance check", completed: false },
        { id: 8, text: "Final stakeholder demo", completed: false },
      ]
    },
    {
      id: 4,
      name: "Launch",
      status: "pending",
      tasks: [
        { id: 9, text: "Go-live on Instagram/LinkedIn", completed: false },
        { id: 10, text: "Send email blast", completed: false },
      ]
    }
  ]
};

export default function ProjectDetail({ params }) {
  // In a real app, we would fetch data using params.id
  const [project, setProject] = useState(PROJECT_DATA);

  // Toggle Task Logic
  const toggleTask = (phaseId, taskId) => {
    const updatedPhases = project.phases.map(phase => {
      if (phase.id !== phaseId) return phase;
      return {
        ...phase,
        tasks: phase.tasks.map(task => 
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      };
    });
    setProject({ ...project, phases: updatedPhases });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 selection:bg-blue-100">
      
      {/* --- SIDEBAR (Persisted) --- */}
      <aside className="w-72 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 flex flex-col fixed h-full shadow-2xl border-r border-slate-800 z-40 hidden lg:flex">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">P</div>
             <h1 className="font-bold text-white tracking-tight">Planner-IQ</h1>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium cursor-pointer hover:bg-white/10 text-slate-400 hover:text-white transition-all">
            <ArrowLeft size={20} /> 
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-3 bg-white/10 text-white px-4 py-3 rounded-xl font-medium cursor-pointer shadow-sm border border-white/5">
            <Layout size={20} /> 
            <span>Active Project</span>
          </div>
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 lg:ml-72 relative">
        
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-8 py-5 flex justify-between items-center shadow-sm/50 backdrop-blur-xl bg-white/90">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <ChevronRight size={14} />
            <span className="font-semibold text-slate-900">{project.title}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full uppercase tracking-wider">
              {project.status}
            </span>
            <button className="text-slate-400 hover:text-slate-600 p-2">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
          
          {/* Project Meta Banner */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8 shadow-sm">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{project.title}</h1>
            <p className="text-slate-500 mb-6 max-w-2xl text-lg leading-relaxed">{project.description}</p>
            
            <div className="flex items-center gap-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Calendar size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Due Date</div>
                  <div className="text-sm font-semibold text-slate-700">{project.deadline}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <User size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Team Lead</div>
                  <div className="text-sm font-semibold text-slate-700">Dan Sims</div>
                </div>
              </div>
            </div>
          </div>

          {/* THE WORKFLOW ENGINE (Tasks grouped by Phase) */}
          <div className="space-y-8">
            {project.phases.map((phase) => (
              <div key={phase.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Phase Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full ${phase.status === 'completed' ? 'bg-blue-500' : phase.status === 'active' ? 'bg-amber-500 animate-pulse' : 'bg-slate-300'}`} />
                  <h3 className="text-lg font-bold text-slate-800">{phase.name}</h3>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{phase.tasks.filter(t => t.completed).length} / {phase.tasks.length}</span>
                </div>

                {/* Task List */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  {phase.tasks.map((task, index) => (
                    <div 
                      key={task.id} 
                      onClick={() => toggleTask(phase.id, task.id)}
                      className={`
                        group flex items-center gap-4 p-4 cursor-pointer transition-all border-b border-slate-50 last:border-0 hover:bg-slate-50
                        ${task.completed ? 'bg-slate-50/50' : 'bg-white'}
                      `}
                    >
                      {/* Custom Checkbox */}
                      <div className={`
                        w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200
                        ${task.completed ? 'bg-blue-600 border-blue-600' : 'border-slate-300 group-hover:border-blue-400 bg-white'}
                      `}>
                        {task.completed && <CheckCircle2 size={14} className="text-white" />}
                      </div>

                      {/* Task Text */}
                      <span className={`flex-1 font-medium transition-all ${task.completed ? 'text-slate-400 line-through decoration-slate-300' : 'text-slate-700'}`}>
                        {task.text}
                      </span>

                      {/* Assignee Avatar (Visual only) */}
                      <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-500">
                        DS
                      </div>
                    </div>
                  ))}

                  {/* "Add Task" Ghost Button */}
                  <div className="p-3 bg-slate-50 text-slate-400 text-sm font-medium flex items-center gap-2 cursor-pointer hover:bg-slate-100 hover:text-slate-600 transition-colors">
                    <Plus size={16} />
                    <span>Add task to {phase.name}...</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
