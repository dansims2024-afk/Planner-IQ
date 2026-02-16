"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Plus, ArrowLeft, ChevronRight, Send, Calendar, Clock } from 'lucide-react';

export default function ProjectDetail({ params }) {
  const [project, setProject] = useState(null);
  const [activeInput, setActiveInput] = useState(null); 
  const [taskText, setTaskText] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!isMounted) return;
    const allProjects = JSON.parse(localStorage.getItem('planner_iq_projects') || '[]');
    const current = allProjects.find(p => p.id.toString() === params.id);
    setProject(current);
  }, [params.id, isMounted]);

  const saveProject = (updatedProject) => {
    setProject(updatedProject);
    const allProjects = JSON.parse(localStorage.getItem('planner_iq_projects') || '[]');
    const newList = allProjects.map(p => p.id === updatedProject.id ? updatedProject : p);
    localStorage.setItem('planner_iq_projects', JSON.stringify(newList));
  };

  const handleAddTask = (phaseId) => {
    if (!taskText.trim() || !project) return;
    const newTask = { id: Date.now(), text: taskText, completed: false };
    const updatedPhases = project.phases.map(p => p.id === phaseId ? { ...p, tasks: [...(p.tasks || []), newTask] } : p);
    saveProject({ ...project, phases: updatedPhases });
    setTaskText("");
    setActiveInput(null);
  };

  const toggleTask = (phaseId, taskId) => {
    const updatedPhases = project.phases.map(p => p.id === phaseId ? { 
      ...p, tasks: p.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t) 
    } : p);
    saveProject({ ...project, phases: updatedPhases });
  };

  if (!isMounted || !project) return <div className="p-10 text-slate-400 font-bold animate-pulse">Loading Workspace...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col fixed h-full hidden lg:flex border-r border-slate-800">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-blue-600 flex items-center justify-center text-white font-bold">
             <Image src="/logo.png" alt="Logo" fill className="object-cover z-10" onLoad={() => setLogoLoaded(true)} onError={() => setLogoLoaded(false)} />
             {!logoLoaded && <span className="text-lg">P</span>}
          </div>
          <h1 className="font-bold text-white">Planner-IQ</h1>
        </div>
        <nav className="p-4 mt-4">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-all font-medium border border-transparent hover:border-white/5">
            <ArrowLeft size={20} /> Back to Dashboard
          </Link>
        </nav>
      </aside>

      <main className="flex-1 lg:ml-72 relative p-10 bg-slate-50/50">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10 flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                <Link href="/" className="hover:text-blue-600">Workspace</Link>
                <ChevronRight size={12} />
                <span className="text-slate-900">{project.title}</span>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{project.title}</h1>
            </div>
            <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
               <Clock size={18} className="text-blue-600" />
               <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Est. Completion</div>
                  <div className="text-sm font-bold text-slate-800">{project.deadline}</div>
               </div>
            </div>
          </header>

          <div className="space-y-12 pb-20">
            {project.phases.map((phase) => (
              <section key={phase.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 uppercase tracking-widest text-xs flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${phase.tasks?.every(t => t.completed) && phase.tasks.length > 0 ? 'bg-blue-600' : 'bg-slate-300'}`} />
                    {phase.name} Phase
                  </h3>
                  <span className="text-xs font-bold text-slate-400 bg-white border border-slate-100 px-3 py-1 rounded-full shadow-sm">
                    {phase.tasks?.filter(t => t.completed).length || 0} of {phase.tasks?.length || 0}
                  </span>
                </div>
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                  {phase.tasks.map((task) => (
                    <div key={task.id} onClick={() => toggleTask(phase.id, task.id)} className="flex items-center gap-4 p-5 border-b border-slate-50 last:border-0 hover:bg-slate-50 cursor-pointer group transition-all">
                      <div className={`w-6 h-6 rounded-xl border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-blue-600 border-blue-600' : 'border-slate-200 bg-slate-50 group-hover:border-blue-300'}`}>
                        {task.completed && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <span className={`text-sm font-medium transition-all ${task.completed ? 'text-slate-300 line-through' : 'text-slate-700'}`}>{task.text}</span>
                    </div>
                  ))}
                  <div className="p-4 bg-slate-50/50">
                    {activeInput === phase.id ? (
                      <div className="flex gap-2">
                        <input autoFocus type="text" value={taskText} onChange={(e) => setTaskText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddTask(phase.id)} className="flex-1 bg-white border border-blue-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-4 focus:ring-blue-500/10" placeholder="New requirement..." />
                        <button onClick={() => handleAddTask(phase.id)} className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20"><Send size={18} /></button>
                      </div>
                    ) : (
                      <button onClick={() => { setActiveInput(phase.id); setTaskText(""); }} className="w-full flex items-center justify-center gap-2 text-slate-400 text-xs font-bold hover:text-blue-600 transition-colors"><Plus size={14} /> Add Step</button>
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
