"use client";

import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, Trash2 } from 'lucide-react';

// --- SUBWAY MAP PROGRESS TRACKER ---
const PhaseTracker = ({ phases }) => {
  if (!phases || phases.length === 0) return null;
  
  const totalTasks = phases.reduce((acc, ph) => acc + (ph.tasks?.length || 0), 0);
  const completedTasks = phases.reduce((acc, ph) => acc + (ph.tasks?.filter(t => t.completed).length || 0), 0);
  const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="relative w-full mt-6 mb-8">
      <div className="absolute top-[9px] left-0 w-full h-[2px] bg-slate-100 rounded-full" />
      <div 
        className="absolute top-[9px] left-0 h-[2px] bg-blue-600 rounded-full transition-all duration-700 ease-out" 
        style={{ width: `${progressPercent}%` }}
      />
      <div className="flex justify-between items-start relative z-10">
        {phases.map((phase, index) => {
          const isCompleted = phase.tasks?.every(t => t.completed) && phase.tasks?.length > 0;
          const isInProgress = !isCompleted && phase.tasks?.some(t => t.completed);
          
          return (
            <div key={phase.id || index} className="flex flex-col items-center group/phase">
              <div className={`
                w-5 h-5 rounded-full border-[3px] transition-all duration-300 flex items-center justify-center bg-white
                ${isCompleted ? 'border-blue-600 bg-blue-600' : 
                  isInProgress ? 'border-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.1)]' : 'border-slate-200'}
              `}>
                {isCompleted && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function ProjectCard({ project, isEditMode, onDelete }) {
  return (
    <div className="relative h-full group">
      {/* DELETE BUTTON: Only visible in Edit Mode */}
      {isEditMode && (
        <button 
          onClick={(e) => {
            e.preventDefault();
            onDelete(project.id);
          }}
          className="absolute -top-3 -right-3 z-[40] bg-red-500 text-white p-3 rounded-2xl shadow-xl hover:bg-red-600 hover:scale-110 transition-all animate-in zoom-in"
        >
          <Trash2 size={18} />
        </button>
      )}

      <Link href={`/project/${project.id}`} className="block h-full">
        <div className={`bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm hover:shadow-2xl transition-all duration-500 h-full relative overflow-hidden ${isEditMode ? 'opacity-50 grayscale-[0.5] scale-[0.98]' : 'hover:-translate-y-1'}`}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100/50">
                  {project.division || "Executive"}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mt-2 leading-tight">
                {project.title}
              </h3>
            </div>
          </div>

          <PhaseTracker phases={project.phases} />

          <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <ArrowRight size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest">Last Updated</span>
                <span className="text-xs font-bold text-slate-700">{project.lastUpdated || 'Just now'}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
