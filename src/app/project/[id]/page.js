"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, Plus, ArrowLeft, ChevronRight, Send 
} from 'lucide-react';

// --- DATA DEFINED LOCALLY TO PREVENT IMPORT ERRORS ---
const DEFAULT_PROJECTS = [
  { 
    id: 101, 
    title: 'Recruit-IQ Integration', 
    type: 'Development', 
    status: 'On Track', 
    deadline: '3 days',
    phases: [
      { id: 1, name: 'Planning', tasks: [{ id: 1, text: 'Scope API', completed: true }, { id: 2, text: 'DB Schema', completed: true }] },
      { id: 2, name: 'Execution', tasks: [{ id: 3, text: 'Build Auth', completed: false }] },
      { id: 3, name: 'Review', tasks: [] },
      { id: 4, name: 'Launch', tasks: [] }
    ]
  },
  { 
    id: 102, 
    title: 'Staff-IQ Launch', 
    type: 'Marketing', 
    status: 'At Risk', 
    deadline: 'Overdue',
    phases: [
      { id: 1, name: 'Planning', tasks: [{ id: 1, text: 'Define Audience', completed: true }] },
      { id: 2, name: 'Execution', tasks: [{ id: 2, text: 'Social Assets', completed: false }] },
      { id: 3, name: 'Review', tasks: [] },
      { id: 4, name: 'Launch', tasks: [] }
    ]
  }
];

export default function ProjectDetail({ params }) {
  const [project, setProject] = useState(null);
  const [activeInput, setActiveInput] = useState(null); 
  const [taskText, setTaskText] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // 1. Mount Check (Prevents Hydration Errors)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 2. Load Data (Safe Mode)
  useEffect(() => {
    if (!isMounted) return;

    // Try to get data from browser storage
    const localData = localStorage.getItem('planner_iq_projects');
    
    // If storage is empty, use the DEFAULT_PROJECTS defined above
    const allProjects = localData ? JSON.parse(localData) : DEFAULT_PROJECTS;
    
    // Handle specific ID lookup safely
    const projectId = parseInt(params.id); 
    const current = allProjects.find(p => p.id === projectId);

    if (current) {
      setProject(current);
    } else {
      // Fallback if ID not found (prevents crash)
      console.warn(`Project ID ${projectId} not found. Loading default.`);
      setProject(DEFAULT_PROJECTS[0]); 
    }
  }, [params.id, isMounted]);

  // 3. Save Function
  const saveProject = (updatedProject) => {
    setProject(updatedProject);
    const localData = localStorage.getItem('planner_iq_projects');
    const allProjects = localData ? JSON.parse(localData) : DEFAULT_PROJECTS;
    
    const newList = allProjects.map(p => 
      p.id === updatedProject.id ? updatedProject : p
    );
      
    localStorage.setItem('planner_iq_projects', JSON.stringify(newList));
  };

  // 4. Task Handlers
  const handleAddTask = (phaseId) => {
    if (!taskText.trim() || !project) return;

    const newTask = {
      id: Date.now(), 
      text: taskText,
      completed: false
    };

    const updatedPhases = project.phases.map(phase => {
      if (phase.id !== phaseId) return phase;
      return { ...phase, tasks: [...(phase.tasks || []), newTask] };
    });

    saveProject({ ...project, phases: updatedPhases });
    setTaskText("");
    setActiveInput(null);
  };

  const toggleTask = (phaseId, taskId) => {
    if (!project) return;
    const updatedPhases = project.phases.map(phase => {
      if (phase.id !== phaseId) return phase;
      return {
        ...phase,
        tasks: phase.tasks.map(task => 
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      };
    });
    saveProject({ ...project, phases: updatedPhases });
  };

  // 5. Loading State
  if (!isMounted || !project) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-400 font-bold animate-pulse">Loading Workspace...</div>
      </div>
    );
  }

  // 6. Main Render
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col fixed h-full hidden lg:flex">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">P</div>
          <h1 className="font-bold text-white tracking-tight">Planner-IQ</h1>
        </div>
        <nav className="p-4 mt-4">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-all font-medium">
            <ArrowLeft size={20} /> Back to Dashboard
          </Link>
        </nav>
      </aside>

      <main className="flex-1 lg:ml-72 relative p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              <Link href="/" className="hover:text-blue-600 transition-colors">Overview</Link>
              <ChevronRight size={12} />
              <span className="text-slate-900">{project.title}</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">{project.title}</h1>
          </header>

          <div className="space-y-10 pb-20">
            {(project.phases || []).map((phase) => (
              <section key={phase.id} className="group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${phase.tasks?.every(t => t.completed) && phase.tasks?.length > 0 ? 'bg-blue-500' : 'bg-slate-300'}`} />
                    <h3 className="font-bold text-slate-800 uppercase tracking-wide text-sm">{phase.name}</h3>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                    {phase.tasks?.filter(t => t.completed).length || 0} / {phase.tasks?.length || 0} DONE
                  </span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  {(phase.tasks || []).map((task) => (
                    <div 
                      key={task.id} 
                      onClick={() => toggleTask(phase.id, task.id)}
                      className="flex items-center gap-4 p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                        {task.completed && <CheckCircle2 size={12} className="text-white" />}
                      </div>
                      <span className={`text-sm font-medium transition-all ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{task.text}</span>
                    </div>
                  ))}

                  <div className="p-2 bg-slate-50/50">
                    {activeInput === phase.id ? (
                      <div className="flex items-center gap-2 p-1">
                        <input 
                          autoFocus
                          type="text" 
                          value={taskText}
                          onChange={(e) => setTaskText(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddTask(phase.id)}
                          placeholder="What needs to be done?"
                          className="flex-1 bg-white border border-blue-200 rounded-lg px-3 py-2 text-sm outline-none shadow-sm"
                        />
                        <button 
                          onClick={() => handleAddTask(phase.id)}
                          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Send size={16} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => { setActiveInput(phase.id); setTaskText(""); }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-slate-400 text-sm font-semibold hover:text-blue-600 transition-colors"
                      >
                        <Plus size={16} /> Add Task
                      </button>
                    )}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
