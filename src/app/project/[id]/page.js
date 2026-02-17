"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  CheckCircle2, Plus, ArrowLeft, Send, Link as LinkIcon, 
  Paperclip, FileText, Download, Share2, Trash2, X, Globe, File
} from 'lucide-react';

export default function ProjectDetail({ params }) {
  const [project, setProject] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [taskText, setTaskText] = useState("");
  
  // States for the new Resource Handlers
  const [resourceModal, setResourceModal] = useState({ isOpen: false, taskId: null, phaseId: null, type: 'link' });
  const [resourceValue, setResourceValue] = useState("");

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!isMounted) return;
    const all = JSON.parse(localStorage.getItem('planner_iq_projects') || '[]');
    const current = all.find(p => p.id.toString() === params.id);
    setProject(current);
  }, [params.id, isMounted]);

  const save = (updated) => {
    setProject(updated);
    const all = JSON.parse(localStorage.getItem('planner_iq_projects'));
    localStorage.setItem('planner_iq_projects', JSON.stringify(all.map(p => p.id === updated.id ? updated : p)));
  };

  // --- NEW: ADD RESOURCE (LINK OR FILE REFERENCE) ---
  const handleAddResource = () => {
    if (!resourceValue.trim()) return;

    const updatedPhases = project.phases.map(phase => {
      if (phase.id !== resourceModal.phaseId) return phase;
      return {
        ...phase,
        tasks: phase.tasks.map(task => {
          if (task.id !== resourceModal.taskId) return task;
          const resources = task.resources || [];
          return { 
            ...task, 
            resources: [...resources, { id: Date.now(), type: resourceModal.type, value: resourceValue }] 
          };
        })
      };
    });

    save({ ...project, phases: updatedPhases });
    setResourceValue("");
    setResourceModal({ ...resourceModal, isOpen: false });
  };

  if (!isMounted || !project) return <div className="p-10 font-bold">Loading Workspace...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* RESOURCE MODAL */}
      {resourceModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm p-8 border border-slate-100">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-slate-800">
              {resourceModal.type === 'link' ? <Globe size={20} className="text-blue-500"/> : <File size={20} className="text-purple-500"/>}
              Add {resourceModal.type === 'link' ? 'Web Link' : 'File Name'}
            </h3>
            <input 
              autoFocus
              value={resourceValue}
              onChange={(e) => setResourceValue(e.target.value)}
              placeholder={resourceModal.type === 'link' ? "https://..." : "e.g. Budget_Sheet.xlsx"}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-6 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-3">
              <button onClick={() => setResourceModal({ ...resourceModal, isOpen: false })} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold text-slate-500">Cancel</button>
              <button onClick={handleAddResource} className="flex-1 py-3 bg-blue-600 rounded-xl font-bold text-white shadow-lg shadow-blue-500/20">Add to Task</button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 p-12 max-w-5xl mx-auto">
        <header className="flex justify-between items-start mb-12">
          <div>
            <Link href="/" className="text-blue-600 flex items-center gap-2 font-bold text-xs mb-4 hover:underline">
              <ArrowLeft size={14}/> Back to Satellite
            </Link>
            <h1 className="text-5xl font-black tracking-tighter">{project.title}</h1>
          </div>
          <button className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2 text-xs font-bold shadow-lg shadow-blue-500/20">
            <Share2 size={16}/> Share
          </button>
        </header>

        <div className="space-y-12">
          {project.phases.map((phase) => (
            <section key={phase.id}>
              <h3 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">{phase.name}</h3>

              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                {phase.tasks.map((task) => (
                  <div key={task.id} className="p-6 border-b border-slate-50 last:border-0 group/task">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div 
                          onClick={() => {
                            const updated = { ...project, phases: project.phases.map(ph => ph.id === phase.id ? {...ph, tasks: ph.tasks.map(t => t.id === task.id ? {...t, completed: !t.completed} : t)} : ph)};
                            save(updated);
                          }}
                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${task.completed ? 'bg-blue-600 border-blue-600' : 'border-slate-200 bg-slate-50'}`}
                        >
                          {task.completed && <CheckCircle2 size={16} className="text-white"/>}
                        </div>
                        <span className={`font-semibold transition-all ${task.completed ? 'text-slate-300 line-through' : 'text-slate-700'}`}>{task.text}</span>
                      </div>
                      
                      {/* RESOURCE ICONS */}
                      <div className="flex gap-2 opacity-0 group-hover/task:opacity-100 transition-opacity">
                        <button 
                          onClick={() => setResourceModal({ isOpen: true, taskId: task.id, phaseId: phase.id, type: 'link' })}
                          className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-blue-600 hover:bg-blue-50"
                        >
                          <LinkIcon size={14}/>
                        </button>
                        <button 
                          onClick={() => setResourceModal({ isOpen: true, taskId: task.id, phaseId: phase.id, type: 'file' })}
                          className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-purple-600 hover:bg-purple-50"
                        >
                          <Paperclip size={14}/>
                        </button>
                      </div>
                    </div>

                    {/* RENDERED RESOURCES */}
                    {task.resources && task.resources.length > 0 && (
                      <div className="mt-3 ml-10 flex flex-wrap gap-2">
                        {task.resources.map(res => (
                          <div key={res.id} className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 border border-slate-200">
                            {res.type === 'link' ? <Globe size={10}/> : <FileText size={10}/>}
                            <span className="max-w-[150px] truncate">{res.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
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
                        placeholder="Task Name..."
                      />
                      <button onClick={() => {
                        const newTask = { id: Date.now(), text: taskText, completed: false, resources: [] };
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
        </div>
      </main>
    </div>
  );
}
