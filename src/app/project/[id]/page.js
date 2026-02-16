"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Plus, ArrowLeft, ChevronRight, Send, Calendar } from 'lucide-react';

export default function ProjectDetail({ params }) {
  const [project, setProject] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [activeInput, setActiveInput] = useState(null);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!isMounted) return;
    const allProjects = JSON.parse(localStorage.getItem('planner_iq_projects') || '[]');
    const current = allProjects.find(p => p.id.toString() === params.id);
    setProject(current);
  }, [params.id, isMounted]);

  if (!isMounted || !project) return <div className="p-10 text-slate-400 font-bold">Loading Workspace...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col fixed h-full hidden lg:flex">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-blue-600 flex items-center justify-center text-white font-bold">
             <Image src="/logo.png" alt="Logo" fill className="object-cover" unoptimized onError={(e) => e.currentTarget.style.display = 'none'} />
             <span className="absolute z-0">P</span>
          </div>
          <h1 className="font-bold text-white">Planner-IQ</h1>
        </div>
        <nav className="p-4 mt-4">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-all">
            <ArrowLeft size={20} /> Back to Dashboard
          </Link>
        </nav>
      </aside>

      <main className="flex-1 lg:ml-72 p-10">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                <Link href="/" className="hover:text-blue-600">Overview</Link>
                <ChevronRight size={12} />
                <span className="text-slate-900">{project.title}</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight">{project.title}</h1>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
              <Calendar size={16} className="text-blue-600" />
              <span className="text-xs font-bold">{project.deadline}</span>
            </div>
          </header>

          <div className="space-y-8">
            {project.phases.map((phase) => (
              <section key={phase.id}>
                <h3 className="font-bold text-slate-700 uppercase tracking-wide text-sm mb-4">{phase.name} Phase</h3>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  {phase.tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-4 p-4 border-b border-slate-50 last:border-0">
                      <CheckCircle2 size={18} className={task.completed ? "text-blue-600" : "text-slate-200"} />
                      <span className={`text-sm ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{task.text}</span>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
