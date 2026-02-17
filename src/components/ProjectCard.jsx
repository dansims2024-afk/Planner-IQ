"use client";

import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, Trash2, Archive } from 'lucide-react';

const PhaseTracker = ({ phases }) => {
  if (!phases || phases.length === 0) return null;
  const total = phases.reduce((acc, ph) => acc + (ph.tasks?.length || 0), 0);
  const done = phases.reduce((acc, ph) => acc + (ph.tasks?.filter(t => t.completed).length || 0), 0);
  const pct = total > 0 ? (done / total) * 100 : 0;

  return (
    <div className="relative w-full mt-6 mb-8">
      <div className="absolute top-[9px] left-0 w-full h-[2px] bg-slate-100 rounded-full" />
      <div className="absolute top-[9px] left-0 h-[2px] bg-blue-600 rounded-full transition-all duration-700 ease-out" style={{ width: `${pct}%` }} />
      <div className="flex justify-between items-start relative z-10">
        {phases.map((phase, index) => (
          <div key={phase.id || index} className="w-5 h-5 rounded-full border-[3px] bg-white border-slate-200" />
        ))}
      </div>
    </div>
  );
};

export default function ProjectCard({ project, isEditMode, onDelete, onArchive }) {
  return (
    <div className="relative h-full">
      {/* EDIT OVERLAYS */}
      {isEditMode && (
        <div className="absolute -top-3 -right-3 z-[40] flex gap-2 animate-in zoom-in">
          <button onClick={(e) => { e.preventDefault(); onArchive(project.id); }} className="bg-amber-500 text-white p-3 rounded-2xl shadow-xl hover:bg-amber-600 transition-all">
            <Archive size={18} />
          </button>
          <button onClick={(e) => { e.preventDefault(); onDelete(project.id); }} className="bg-red-500 text-white p-3 rounded-2xl shadow-xl hover:bg-red-600 transition-all">
            <Trash2 size={18} />
          </button>
        </div>
      )}

      <Link href={`/project/${project.id}`} className="block h-full">
        <div className={`bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm hover:shadow-2xl transition-all duration-500 h-full relative overflow-hidden flex flex-col ${isEditMode ? 'opacity-40 grayscale-[0.5]' : 'hover:-translate-y-1'}`}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100/50 w-fit">
                {project.division || "General"}
              </span>
              <h3 className="text-xl font-bold text-slate-800 mt-2 leading-tight">{project.title}</h3>
            </div>
          </div>

          <PhaseTracker phases={project.phases} />

          <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <ArrowRight size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest leading-none">Status</span>
                <span className="text-xs font-bold text-slate-700">{project.status}</span>
              </div>
            </div>
            <div className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
               {project.deadline || 'TBD'}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
