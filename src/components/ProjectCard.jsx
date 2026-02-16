"use client";

import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

// --- VISUALIZATION COMPONENT ---
const PhaseTracker = ({ currentPhase }) => {
  const phases = ['Planning', 'Execution', 'Review', 'Launch'];
  return (
    <div className="relative w-full mt-6 mb-6">
      {/* Grey Track */}
      <div className="absolute top-[9px] left-0 w-full h-[2px] bg-slate-100 rounded-full" />
      
      {/* Blue Progress Bar */}
      <div 
        className="absolute top-[9px] left-0 h-[2px] bg-blue-600 rounded-full transition-all duration-500" 
        style={{ width: `${((currentPhase - 1) / (phases.length - 1)) * 100}%` }}
      />

      {/* The Dots */}
      <div className="flex justify-between items-start relative z-10">
        {phases.map((phase, index) => {
          const id = index + 1;
          const isActive = id === currentPhase;
          const isCompleted = id < currentPhase;
          
          return (
            <div key={id} className="flex flex-col items-center group/phase">
              <div className={`
                w-5 h-5 rounded-full border-[3px] transition-all duration-300 flex items-center justify-center bg-white
                ${isActive ? 'border-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.1)] scale-110' : 
                  isCompleted ? 'border-blue-600 bg-blue-600' : 'border-slate-200'}
              `}>
                {isCompleted && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
              <span className={`absolute top-7 text-[10px] font-bold uppercase tracking-wider transition-opacity duration-300 whitespace-nowrap
                ${isActive ? 'opacity-100 text-blue-700' : 'opacity-0 group-hover/phase:opacity-100 text-slate-400'}`}>
                {phase}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function ProjectCard({ project }) {
  // Safe Fallback for data
  const status = project.status || 'Active';
  const phase = project.currentPhase || 1;

  return (
    <Link href={`/project/${project.id}`} className="block h-full">
      <div className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full relative overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{project.type}</span>
            <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors mt-1">{project.title}</h3>
          </div>
          <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border 
            ${status === 'On Track' ? 'bg-green-50 text-green-700 border-green-200' : 
              status === 'At Risk' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
            {status}
          </div>
        </div>

        {/* Visual Map */}
        <PhaseTracker currentPhase={phase} />

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              <ArrowRight size={14} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400">Next Step</span>
              <span className="text-xs font-semibold text-slate-700">{project.nextTask || 'Plan Workflow'}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            <Clock size={12} />
            {project.deadline}
          </div>
        </div>
      </div>
    </Link>
  );
}
