"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Plus, ArrowLeft, Send, Clock, ChevronRight } from 'lucide-react';

export default function ProjectDetail({ params }) {
  const [project, setProject] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [activeInput, setActiveInput] = useState(null);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!isMounted) return;
    const all = JSON.parse(localStorage.getItem('planner_iq_projects') || '[]');
    const current = all.find(p => p.id.toString() === params.id);
    setProject(current);
  }, [params.id, isMounted]);

  const updateProject = (updatedProject) => {
    // Add Timestamp
    const now = new Date();
    updatedProject.lastUpdated = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setProject(updatedProject);
    const all = JSON.parse(localStorage.getItem('planner_iq_projects'));
    localStorage.setItem('planner_iq_projects', JSON.stringify(all.map(p => p.id === project.id ? updatedProject : p)));
  };

  const toggleTask = (phaseId, taskId) => {
    const updatedPhases = project.phases.map(p => p.id === phaseId ? {
      ...p, tasks: p.tasks.map(t => t.id === taskId ? {...t, completed: !t.completed} : t)
    } : p);
    updateProject({...project, phases: updatedPhases});
  };

  const handleAddTask = (phaseId) => {
    if (!taskText.trim()) return;
    const newTask = { id: Date.now(), text: taskText, completed: false };
    const updatedPhases = project.phases.map(p => p.id === phaseId ? {...p, tasks: [...p.tasks, newTask]} : p);
    updateProject({...project, phases: updatedPhases});
    setTaskText("");
    setActiveInput(null);
  };

  if (!isMounted || !project) return <div className="p-10 font-bold animate-pulse">Accessing Secure Workspace...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col fixed h-full hidden lg:flex">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-blue-600 flex items-center justify-center font-bold">
            <Image src="/logo.png" alt="Logo" fill className="object-cover z-10" onLoad={()=>setLogoLoaded(true)} onError={()=>setLogoLoaded(false)} />
            {!logoLoaded && "P"}
          </div>
          <h1 className="font-bold text-white leading-none">Planner-IQ</h1>
        </div>
        <nav className="p-4 mt-6">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all font-medium">
            <ArrowLeft size={20}/> Back to Satellite
          </Link>
        </nav>
      </aside>

      <main className="flex-1 lg:ml-72 p-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              <Link href="/" className="hover:text-blue-600">Satellite</Link>
              <ChevronRight size={12} />
              <span className="text-slate-900">{project.title}</span>
            </div>
            <div className="flex justify-between items-end">
              <h1 className="text-4xl font-extrabold tracking-tight">{project.title}</h1>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm">
                <Clock size={14} className="text-blue-600" /> Updated: {project.lastUpdated}
              </div>
            </div>
          </header>
          
          <div className="space-y-12">
            {project.phases.map(phase => (
              <section key={phase.id}>
                <div className="flex justify-between items-center mb-5 px-2">
                  <h3 className="font-bold text-slate-800 uppercase text-xs tracking-[0.2em]">{phase.name}</h3>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-md">{phase.tasks.filter(t=>t.completed).length} / {phase.tasks.length}</span>
                </div>
                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                  {phase.tasks.map(task => (
                    <div key={task.id} onClick={()=>toggleTask(phase.id, task.id)} className="flex items-center gap-4 p-6 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-all">
                      <div className={`w-6 h-6 rounded-xl border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-blue-600 border-blue-600' : 'border-slate-200 bg-slate-50'}`}>
                        {task.completed && <CheckCircle2 size={14} className="text-white"/>}
                      </div>
                      <span className={`text-sm font-semibold transition-all ${task.completed ? 'line-through text-slate-300' : 'text-slate-700'}`}>{task.text}</span>
                    </div>
                  ))}
                  <div className="p-4 bg-slate-50/50">
                    {activeInput === phase.id ? (
                      <div className="flex gap-2 p-1">
                        <input autoFocus value={taskText} onChange={(e)=>setTaskText(e.target.value)} onKeyDown={(e)=>e.key==='Enter' && handleAddTask(phase.id)} className="flex-1 p-3 bg-white border rounded-2xl outline-none focus:ring-2 focus:ring-blue-100" placeholder="New requirement..." />
                        <button onClick={()=>handleAddTask(phase.id)} className="bg-blue-600 text-white p-4 rounded-2xl"><Send size={18}/></button>
                      </div>
                    ) : (
                      <button onClick={()=>setActiveInput(phase.id)} className="text-[10px] font-bold text-slate-400 hover:text-blue-600 w-full py-2">+ Add Requirement</button>
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
