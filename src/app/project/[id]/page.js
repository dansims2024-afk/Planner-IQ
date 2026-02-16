"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Layout, CheckCircle2, Plus, ArrowLeft, ChevronRight, 
  Calendar, User, MoreHorizontal, Clock, Send 
} from 'lucide-react';

export default function ProjectDetail({ params }) {
  const [project, setProject] = useState(null);
  const [activeInput, setActiveInput] = useState(null); // Track which phase is being edited
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    const allProjects = JSON.parse(localStorage.getItem('planner_iq_projects') || '[]');
    const current = allProjects.find(p => p.id.toString() === params.id);
    setProject(current);
  }, [params.id]);

  const saveProject = (updatedProject) => {
    setProject(updatedProject);
    const allProjects = JSON.parse(localStorage.getItem('planner_iq_projects') || '[]');
    const newList = allProjects.map(p => p.id === updatedProject.id ? updatedProject : p);
    localStorage.setItem('planner_iq_projects', JSON.stringify(newList));
  };

  const handleAddTask = (phaseId) => {
    if (!taskText.trim()) return;

    const newTask = {
      id: Date.now(), // Unique ID based on timestamp
      text: taskText,
      completed: false
    };

    const updatedPhases = project.phases.map(phase => {
      if (phase.id !== phaseId) return phase;
      return { ...phase, tasks: [...phase.tasks, newTask] };
    });

    saveProject({ ...project, phases: updatedPhases });
    setTaskText("");
    setActiveInput(null);
  };

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
    saveProject({ ...project, phases: updatedPhases });
  };

  if (!project) return <div className="p-10 text-slate-400 font-bold">Loading Project...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col fixed h-full hidden lg:flex">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">P</div>
          <h1 className="font-bold text-white">Planner-IQ</h1>
        </div>
        <nav className="p-4 mt-4">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all">
            <ArrowLeft size={20} /> Back to Dashboard
          </Link>
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 lg:ml-72 relative p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10 flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                <Link href="/" className="hover:text-blue-600">Overview</Link>
                <ChevronRight size={12} />
                <span className="text-slate-900">{project.title}</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">{project.title}</h1>
            </div>
          </header>

          <div className="space-y-10">
            {project.phases.map((phase) => (
              <section key={phase.id} className="group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${phase.tasks.every(t => t.completed) && phase.tasks.length > 0 ? 'bg-blue-500' : 'bg-slate-300'}`} />
                    <h3 className="font-bold text-slate-800 uppercase tracking-wide text-sm">{phase.name}</h3>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                    {phase.tasks.filter(t => t.completed).length} / {phase.tasks.length} DONE
                  </span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  {phase.tasks.map((task) => (
                    <div 
                      key={task.id} 
                      onClick={() => toggleTask(phase.id, task.id)}
                      className="flex items-center gap-4 p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                        {task.completed && <CheckCircle2 size={12} className="text-white" />}
                      </div>
                      <span className={`text-sm font-medium ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{task.text}</span>
                    </div>
                  ))}

                  {/* DYNAMIC ADD TASK INPUT */}
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
                          className="flex-1 bg-white border border-blue-200 rounded-lg px-3 py-2 text-sm outline-none ring-2 ring-blue-500/10"
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
