"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  CheckCircle2, Plus, ArrowLeft, Send, Link as LinkIcon, 
  Paperclip, FileText, Download, Share2, Trash2, Globe, File, ChevronRight
} from 'lucide-react';

export default function ProjectDetail({ params }) {
  const [project, setProject] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [taskText, setTaskText] = useState("");
  const [logoLoaded, setLogoLoaded] = useState(false);
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
    const now = new Date();
    updated.lastUpdated = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setProject(updated);
    const all = JSON.parse(localStorage.getItem('planner_iq_projects'));
    localStorage.setItem('planner_iq_projects', JSON.stringify(all.map(p => p.id === updated.id ? updated : p)));
  };

  const generatePDF = () => {
    const printWindow = window.open('', '_blank');
    const content = `<html><body style="font-family:sans-serif;padding:40px;"><h1>${project.title} Report</h1><p>Status: ${project.status} | Updated: ${project.lastUpdated}</p>${project.phases.map(ph => `<h3>${ph.name}</h3>${ph.tasks.map(t => `<div>[${t.completed ? 'X' : ' '}] ${t.text}</div>`).join('')}`).join('')}</body></html>`;
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };

  if (!isMounted || !project) return <div className="p-10 font-bold animate-pulse text-slate-400">Loading Workspace...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {resourceModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm p-8">
            <h3 className="font-bold text-xl mb-6">Add {resourceModal.type}</h3>
            <input value={resourceValue} onChange={(e)=>setResourceValue(e.target.value)} className="w-full p-4 bg-slate-50 border rounded-2xl mb-6" placeholder="Resource Value..."/>
            <div className="flex gap-3">
              <button onClick={()=>setResourceModal({isOpen:false})} className="flex-1 py-3 font-bold text-slate-400">Cancel</button>
              <button onClick={() => {
                const updatedPhases = project.phases.map(ph => ph.id === resourceModal.phaseId ? { ...ph, tasks: ph.tasks.map(t => t.id === resourceModal.taskId ? { ...t, resources: [...(t.resources || []), { id: Date.now(), type: resourceModal.type, value: resourceValue }] } : t) } : ph);
                save({ ...project, phases: updatedPhases });
                setResourceValue("");
                setResourceModal({ isOpen: false });
              }} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold">Add</button>
            </div>
          </div>
        </div>
      )}

      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col fixed h-full hidden lg:flex border-r border-slate-800">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-blue-600 flex items-center justify-center font-bold">
            <Image src="/logo.png" alt="Logo" fill className="object-cover z-10" onLoad={()=>setLogoLoaded(true)} onError={()=>setLogoLoaded(false)} unoptimized />
            {!logoLoaded && "P"}
          </div>
          <h1 className="font-bold text-white">Planner-IQ</h1>
        </div>
        <nav className="p-4 mt-6">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-all font-medium"><ArrowLeft size={20}/> Back to Satellite</Link>
        </nav>
      </aside>

      <main className="flex-1 lg:ml-72 p-12 max-w-5xl mx-auto">
        <header className="flex justify-between items-start mb-12">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              <Link href="/" className="hover:text-blue-600 transition-colors">Satellite</Link>
              <ChevronRight size={12}/>
              <span className="text-slate-900">{project.title}</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter">{project.title}</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={generatePDF} className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 flex items-center gap-2 text-xs font-bold shadow-sm">
              <FileText size={16}/> Print Report
            </button>
            <button className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2 text-xs font-bold shadow-lg"><Share2 size={16}/> Share</button>
          </div>
        </header>

        <div className="space-y-12">
          {project.phases.map((phase) => (
            <section key={phase.id}>
              <div className="flex justify-between items-center mb-5 px-2">
                <input defaultValue={phase.name} onBlur={(e) => save({...project, phases: project.phases.map(ph => ph.id === phase.id ? {...ph, name: e.target.value} : ph)})} className="bg-transparent font-bold text-slate-400 uppercase tracking-widest text-xs outline-none focus:text-blue-600" />
              </div>
              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                {phase.tasks.map((task) => (
                  <div key={task.id} className="p-6 border-b border-slate-50 last:border-0 group/task">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div onClick={() => save({...project, phases: project.phases.map(ph => ph.id === phase.id ? {...ph, tasks: ph.tasks.map(t => t.id === task.id ? {...t, completed: !t.completed} : t)} : ph)})} className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center cursor-pointer ${task.completed ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200'}`}>{task.completed && <CheckCircle2 size={14}/>}</div>
                        <span className={`text-sm font-semibold ${task.completed ? 'text-slate-300 line-through' : 'text-slate-700'}`}>{task.text}</span>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover/task:opacity-100 transition-opacity">
                        <button onClick={()=>setResourceModal({isOpen:true, taskId:task.id, phaseId:phase.id, type:'link'})} className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-blue-600"><LinkIcon size={14}/></button>
                        <button onClick={()=>setResourceModal({isOpen:true, taskId:task.id, phaseId:phase.id, type:'file'})} className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-purple-600"><Paperclip size={14}/></button>
                      </div>
                    </div>
                    {task.resources?.length > 0 && <div className="mt-3 ml-10 flex flex-wrap gap-2">{task.resources.map(res => <div key={res.id} className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 border border-slate-200 flex items-center gap-2">{res.type === 'link' ? <Globe size={10}/> : <File size={10}/>} {res.value}</div>)}</div>}
                  </div>
                ))}
                <div className="p-4 bg-slate-50/50">
                  {activeInput === phase.id ? (
                    <div className="flex gap-2 p-1"><input autoFocus value={taskText} onChange={(e)=>setTaskText(e.target.value)} onKeyDown={(e)=>e.key==='Enter' && handleAddTask(phase.id)} className="flex-1 p-3 bg-white border rounded-xl" placeholder="Task..."/><button onClick={() => { save({...project, phases: project.phases.map(ph => ph.id === phase.id ? {...ph, tasks: [...ph.tasks, { id: Date.now(), text: taskText, completed: false, resources: [] }]} : ph)}); setTaskText(""); setActiveInput(null); }} className="bg-blue-600 text-white p-3 rounded-xl"><Send size={18}/></button></div>
                  ) : ( <button onClick={()=>setActiveInput(phase.id)} className="w-full text-center text-xs font-bold text-slate-400 hover:text-blue-600 py-2">+ Add Task</button> )}
                </div>
              </div>
            </section>
          ))}
          <button onClick={() => save({...project, phases: [...project.phases, {id: Date.now(), name: "New Phase", tasks: []}]})} className="w-full py-6 border-2 border-dashed border-slate-200 rounded-[2.5rem] font-bold text-slate-400 hover:border-blue-300 hover:text-blue-600">+ Add Phase</button>
        </div>
      </main>
    </div>
  );
}
