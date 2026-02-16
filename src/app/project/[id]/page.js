"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image
import { CheckCircle2, Plus, ArrowLeft, ChevronRight, Send, Calendar, Settings, Layout, Bell } from 'lucide-react';

// --- MIRRORED DEMO DATA ---
const DEMO_PROJECTS = [
  { 
    id: 101, 
    title: 'Recruit-IQ Platform Launch', 
    type: 'Development', 
    status: 'On Track', 
    deadline: '2 Weeks',
    phases: [
      { id: 1, name: 'Planning', tasks: [{id:1, text:'Define User Personas', completed:true}, {id:2, text:'API Docs', completed:true}] },
      { id: 2, name: 'Execution', tasks: [{id:3, text:'Stripe Integration', completed:false}] }
    ]
  },
  { 
    id: 102, 
    title: 'Q3 Marketing Blitz', 
    type: 'Marketing', 
    status: 'At Risk', 
    deadline: 'Overdue',
    phases: [{ id: 1, name: 'Planning', tasks: [] }]
  }
];

export default function ProjectDetail({ params }) {
  const [project, setProject] = useState(null);
  const [activeInput, setActiveInput] = useState(null); 
  const [taskText, setTaskText] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!isMounted) return;
    const localData = localStorage.getItem('planner_iq_projects');
    const allProjects = localData ? JSON.parse(localData) : DEMO_PROJECTS;
    
    const projectId = parseInt(params.id) || 101; 
    let current = allProjects.find(p => p.id === projectId);
    setProject(current || DEMO_PROJECTS[0]);
  }, [params.id, isMounted]);

  const saveProject = (updatedProject) => {
    setProject(updatedProject);
    const localData = localStorage.getItem('planner_iq_projects');
    const allProjects = localData ? JSON.parse(localData) : DEMO_PROJECTS;
    
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

  if (!isMounted || !project) return <div className="p-10 text-slate-400 font-bold">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* SIDEBAR WITH PERSISTENT LOGO */}
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col fixed h-full hidden lg:flex border-r border-slate-800 shadow-2xl z-20">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          
          {/* THE LOGO COMPONENT */}
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/20 shrink-0">
             <Image 
               src="/logo.png" 
               alt="Logo" 
               fill 
               className="object-cover"
               onError={(e) => e.currentTarget.style.display = 'none'} 
             />
             <span className="absolute z-0 text-lg">P</span>
          </div>

          <div>
            <h1 className="font-bold text-white tracking-tight leading-none">Planner-IQ</h1>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Workspace</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium cursor-pointer hover:bg-white/10 text-slate-400 hover:text-white transition-all">
            <ArrowLeft size={20} /> <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-3 bg-white/10 text-white px-4 py-3 rounded-xl font-medium cursor-pointer border border-white/5">
            <Layout size={20} /> <span>Active Project</span>
          </div>
        </nav>

        <div className="p-4 border-t border-white/5 mt-auto">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 border border-white/20" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">Dan Sims</div>
              <div className="text-[10px] text-slate-500">Lead Recruiter</div>
            </div>
            <Settings size={16} className="text-slate-500 hover:text-white" />
          </div>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 lg:ml-72 relative p-10 bg-slate-50/50">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              <Link href="/" className="hover:text-blue-600 transition-colors">Overview</Link>
              <ChevronRight size={12} />
              <span className="text-slate-900">{project.title}</span>
            </div>
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{project.title}</h1>
              <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                 <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md"><Calendar size={18} /></div>
                 <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Deadline</div>
                    <div className="text-xs font-bold text-slate-800">{project.deadline || 'No Date'}</div>
                 </div>
              </div>
            </div>
          </header>

          <div className="space-y-8 pb-20">
            {(project.phases || []).map((phase) => (
              <section key={phase.id} className="group">
                <div className="flex items-center justify-between mb-4 px-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${phase.tasks?.every(t => t.completed) && phase.tasks?.length > 0 ? 'bg-blue-500 shadow-lg shadow-blue-500/30' : 'bg-slate-300'}`} />
                    <h3 className="font-bold text-slate-700 uppercase tracking-wide text-sm">{phase.name} Phase</h3>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded shadow-sm">
                    {phase.tasks?.filter(t => t.completed).length || 0} / {phase.tasks?.length || 0}
                  </span>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-500">
                  {(phase.tasks || []).map((task) => (
                    <div key={task.id} onClick={() => toggleTask(phase.id, task.id)} className="flex items-center gap-4 p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer group/task transition-all">
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${task.completed ? 'bg-blue-600 border-blue-600 scale-105' : 'border-slate-200 bg-slate-50 group-hover/task:border-blue-400'}`}>
                        {task.completed && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <span className={`text-sm font-medium transition-all duration-300 ${task.completed ? 'text-slate-400 line-through decoration-slate-300' : 'text-slate-700'}`}>{task.text}</span>
                    </div>
                  ))}
                  <div className="p-3 bg-slate-50/50">
                    {activeInput === phase.id ? (
                      <div className="flex items-center gap-2 p-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        <input autoFocus type="text" value={taskText} onChange={(e) => setTaskText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddTask(phase.id)} className="flex-1 bg-white border border-blue-200 rounded-xl px-4 py-2.5 text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-100" placeholder="Type new task..." />
                        <button onClick={() => handleAddTask(phase.id)} className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20 hover:scale-105 transition-transform"><Send size={16} /></button>
                      </div>
                    ) : (
                      <button onClick={() => { setActiveInput(phase.id); setTaskText(""); }} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-slate-400 text-sm font-semibold hover:text-blue-600 hover:bg-white rounded-xl transition-all"><Plus size={16} /> Add New Task</button>
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
