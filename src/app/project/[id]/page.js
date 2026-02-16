"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, Plus, ArrowLeft, ChevronRight, Send } from 'lucide-react';

// --- DATA DEFINED LOCALLY (SAFETY FIX) ---
const INITIAL_PROJECTS = [
  { 
    id: 101, title: 'Recruit-IQ Integration', type: 'Development', status: 'On Track', deadline: '3 days',
    phases: [{ id: 1, name: 'Planning', tasks: [{id:1, text:'Scope API', completed:true}] }]
  },
  { 
    id: 102, title: 'Staff-IQ Launch', type: 'Marketing', status: 'At Risk', deadline: 'Overdue',
    phases: [{ id: 1, name: 'Planning', tasks: [] }]
  }
];

export default function ProjectDetail({ params }) {
  const [project, setProject] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [taskText, setTaskText] = useState("");

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!isMounted) return;
    const localData = localStorage.getItem('planner_iq_projects');
    const allProjects = localData ? JSON.parse(localData) : INITIAL_PROJECTS;
    
    // Safety check for ID
    const targetId = parseInt(params.id);
    const found = allProjects.find(p => p.id === targetId);
    setProject(found || INITIAL_PROJECTS[0]);
  }, [isMounted, params.id]);

  if (!isMounted || !project) return <div className="p-10 font-bold text-slate-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      <main className="max-w-4xl mx-auto p-10 w-full">
        <Link href="/" className="flex items-center gap-2 text-slate-500 mb-6 hover:text-blue-600 font-bold text-sm"><ArrowLeft size={16} /> Back to Dashboard</Link>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">{project.title}</h1>
        
        <div className="space-y-6">
          {(project.phases || []).map(phase => (
            <div key={phase.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 uppercase tracking-wide text-xs mb-4">{phase.name}</h3>
              <div className="space-y-3">
                {(phase.tasks || []).map(task => (
                  <div key={task.id} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 size={16} className={task.completed ? "text-blue-600" : "text-slate-300"} />
                    <span className={task.completed ? "line-through text-slate-400" : "text-slate-700"}>{task.text}</span>
                  </div>
                ))}
                {phase.tasks?.length === 0 && <div className="text-slate-400 text-sm italic">No tasks yet.</div>}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
