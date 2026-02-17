"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Plus, ArrowLeft, Send, Link as LinkIcon, Paperclip, FileText, Download, Share2, Trash2 } from 'lucide-react';

export default function ProjectDetail({ params }) {
  const [project, setProject] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [taskText, setTaskText] = useState("");

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!isMounted) return;
    const all = JSON.parse(localStorage.getItem('planner_iq_projects') || '[]');
    const current = all.find(p => p.id.toString() === params.id);
    setProject(current);
  }, [params.id, isMounted]);

  const addPhase = () => {
    const newPhase = { id: Date.now(), name: "New Phase", tasks: [] };
    const updated = { ...project, phases: [...project.phases, newPhase] };
    save(updated);
  };

  const save = (updated) => {
    setProject(updated);
    const all = JSON.parse(localStorage.getItem('planner_iq_projects'));
    localStorage.setItem('planner_iq_projects', JSON.stringify(all.map(p => p.id === updated.id ? updated : p)));
  };

  const downloadSummary = () => {
    const data = JSON.stringify(project, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title}-Summary.json`;
    a.click();
    // In a real prod environment, we would trigger a PDF generation service here.
  };

  if (!isMounted || !project) return <div className="p-10 font-bold">Loading Workspace...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      <main className="flex-1 p-12 max-w-5xl mx-auto">
        <header className="flex justify-between items-start mb-12">
          <div>
            <Link href="/" className="text-blue-600 flex items-center gap-2 font-bold text-xs mb-4 hover:underline"><ArrowLeft size={14}/> Back to Satellite</Link>
            <h1 className="text-5xl font-black tracking-tighter">{project.title}</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={downloadSummary} className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 flex items-center gap-2 text-xs font-bold shadow-sm">
              <Download size={16}/> Download PDF
            </button>
            <button className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2 text-xs font-bold shadow-lg shadow-blue-500/20">
              <Share2 size={16}/> Share with Team
            </button>
          </div>
        </header>

        <div className="space-y-12">
          {project.phases.map((phase) => (
            <section key={phase.id} className="relative group">
              <div className="flex items-center gap-4 mb-4">
                <input 
                  defaultValue={phase.name} 
                  onBlur={(e) => {
                    const updated = {...project, phases: project.phases.map(ph => ph.id === phase.id ? {...ph, name: e.target.value} : ph)};
                    save(updated);
                  }}
                  className="bg-transparent font-bold text-slate-400 uppercase tracking-widest text-xs outline-none focus:text-blue-600 w-full"
                />
                <button onClick={() => {
                  const updated = {...project, phases: project.phases.filter(ph => ph.id !== phase.id)};
                  save(updated);
                }} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-opacity"><Trash2 size={14}/></button>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                {phase.tasks.map((task) => (
                  <div key={task.id} className="p-6 border-b border-slate-50 last:border-0 flex items-center justify-between group/task">
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-lg border-2 border-slate-200 flex items-center justify-center text-white hover:border-blue-500 cursor-pointer">
                        {task.completed && <CheckCircle2 size={16} className="text-blue-600"/>}
                      </div>
                      <span className="font-semibold text-slate-700">{task.text}</span>
                    </div>
                    {/* --- NEW: HYPERLINK & MEDIA SHORTCUTS --- */}
                    <div className="flex gap-2 opacity-0 group-hover/task:opacity-100 transition-opacity">
                      <button title="Add Link" className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-blue-600 hover:bg-blue-50"><LinkIcon size={14}/></button>
                      <button title="Upload Media" className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-blue-600 hover:bg-blue-50"><Paperclip size={14}/></button>
                    </div>
                  </div>
                ))}

                <div className="p-4 bg-slate-50/50">
                  {activeInput === phase.id ? (
                    <div className="flex gap-2">
                      <input 
                        autoFocus 
                        value={taskText} 
                        onChange={(e)=>setTaskText(e.target.value)} 
                        className="flex-1 p-4 bg-white border border-blue-100 rounded-2xl outline-none" 
                        placeholder="New Task Name..."
                      />
                      <button onClick={() => {
                        const newTask = { id: Date.now(), text: taskText, completed: false };
                        const updated = {...project, phases: project.phases.map(ph => ph.id === phase.id ? {...ph, tasks: [...ph.tasks, newTask]} : ph)};
                        save(updated);
                        setTaskText("");
                        setActiveInput(null);
                      }} className="bg-blue-600 text-white p-4 rounded-2xl"><Send size={18}/></button>
                    </div>
                  ) : (
                    <button onClick={()=>setActiveInput(phase.id)} className="w-full text-center text-xs font-bold text-slate-400 hover:text-blue-600 py-2">+ Add Task</button>
                  )}
                </div>
              </div>
            </section>
          ))}
          
          <button 
            onClick={addPhase}
            className="w-full py-8 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex items-center justify-center gap-3 text-slate-400 font-bold hover:bg-white hover:border-blue-400 hover:text-blue-600 transition-all"
          >
            <Plus size={20}/> Add Phase
          </button>
        </div>
      </main>
    </div>
  );
}
