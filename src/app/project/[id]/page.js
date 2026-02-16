"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, Plus, ArrowLeft, ChevronRight, Send 
} from 'lucide-react';

// --- SAFETY NET: DEFINING THE DATA LOCALLY ---
// We name this "INITIAL_PROJECTS" so if any old code is lurking, it finds this variable.
const INITIAL_PROJECTS = [
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

  // 1. Mount Check
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 2. Load Data (Using the Safety Net Variable)
  useEffect(() => {
    if (!isMounted) return;

    const localData = localStorage.getItem('planner_iq_projects');
    // We explicitly use INITIAL_PROJECTS here
    const allProjects = localData ? JSON.parse(localData) : INITIAL_PROJECTS;
    
    // Safely parse ID
    const projectId = parseInt(params.id) || 101; 
    let current = allProjects.find(p => p.id === projectId);

    // Ultimate Fallback: If nothing found, just load the first project
    if (!current) {
      console.warn('Project not found, loading default.');
      current = INITIAL_PROJECTS[0];
    }
    setProject(current);
  }, [params.id, isMounted]);

  const saveProject = (updatedProject) => {
    setProject(updatedProject);
    const localData = localStorage.getItem('planner_iq_projects');
    const allProjects = localData ? JSON.parse(localData) : INITIAL_PROJECTS;
    
    const newList = allProjects.map(p => 
      p.id === updatedProject.id ? updatedProject : p
    );
    localStorage.setItem('planner_iq_projects', JSON.stringify(newList));
  };

  const handleAddTask = (phaseId) => {
    if (!taskText.trim() || !project) return;
    const newTask = { id: Date.now(), text: taskText, completed: false };
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

  if (!isMounted || !project) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center p-10 text-slate-400 font-bold">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* DEBUG BANNER: If you don't see this, the code didn't update! */}
      <div className="fixed top-0 left-0 w-full bg-red-600 text-white text-[10px] font-bold text-center z-[9999] py-0.5">
        DEBUG MODE ACTIVE: V5 LOADED
      </div>

      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col fixed h-full hidden lg:flex">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">P</div>
          <h1 className="font-bold text-white">Planner-IQ</h1>
        </div>
        <nav className="p-4 mt-4">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-all font-medium">
            <ArrowLeft size={20} /> Back to Dashboard
          </Link>
        </nav>
      </aside>

      <main className="flex-1 lg:ml-72 relative p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10 pt-4">
            <h1 className="text-4xl font-extrabold text-slate-900">{project.title}</h1>
          </header>

          <div className="space-y-10 pb-20">
            {(project.phases || []).map((phase) => (
              <section key={phase.id} className="group">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 uppercase tracking-wide text-sm">{phase.name}</h3>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  {(phase.tasks || []).map((task) => (
                    <div key={task.id} onClick={() => toggleTask(phase.id, task.id)} className="flex items-center gap-4 p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer">
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${task.completed ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                        {task.completed && <CheckCircle2 size={12} className="text-white" />}
                      </div>
                      <span className={`text-sm font-medium ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{task.text}</span>
                    </div>
                  ))}
                  <div className="p-2 bg-slate-50/50">
                    {activeInput === phase.id ? (
                      <div className="flex items-center gap-2 p-1">
                        <input autoFocus type="text" value={taskText} onChange={(e) => setTaskText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddTask(phase.id)} className="flex-1 bg-white border border-blue-200 rounded-lg px-3 py-2 text-sm" placeholder="Add task..." />
                        <button onClick={() => handleAddTask(phase.id)} className="p-2 bg-blue-600 text-white rounded-lg"><Send size={16} /></button>
                      </div>
                    ) : (
                      <button onClick={() => { setActiveInput(phase.id); setTaskText(""); }} className="w-full flex items-center gap-2 px-4 py-2 text-slate-400 text-sm font-semibold hover:text-blue-600"><Plus size={16} /> Add Task</button>
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
