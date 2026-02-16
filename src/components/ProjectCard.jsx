"use client";

import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { PROJECT_PHASES, STATUS_COLORS } from '../lib/constants';

const PhaseTracker = ({ currentPhase }) => {
  return (
    <div className="relative w-full mt-6 mb-6">
      <div className="absolute top-[9px] left-0 w-full h-[2px] bg-slate-100 rounded-full" />
      <div className="flex justify-between items-start relative z-10">
        {PROJECT_PHASES.map((phase) => {
          const isActive = phase.id === currentPhase;
          const isCompleted = phase.id < currentPhase;
          
          return (
            <div key={phase.id} className="flex flex-col items-center group/phase">
              <div className={`
                w-5 h-5 rounded-full border-[3px] transition-all duration-300 flex items-center justify-center bg-white
                ${isActive ? 'border-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.1)] scale-110' : 
                  isCompleted ? 'border-blue-600 bg-blue-600' : 'border-slate-200'}
              `}>
                {isCompleted && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
              <span className={`absolute top-7 text-[10px] font-bold uppercase tracking-wider transition-opacity duration-300 whitespace-nowrap
                ${isActive ? 'opacity-100 text-blue-700' : 'opacity-0 group-hover/phase:opacity-100 text-slate-400'}`}>
                {phase.name}
              </span>
            </div>
          );
        })}
      </div>
      <div 
        className="absolute top-[9px] left-0 h-[2px] bg-blue-600 rounded-full transition-all duration-500" 
        style={{ width: `${((currentPhase - 1) / (PROJECT_PHASES.length - 1)) * 100}%` }}
      />
    </div>
  );
};

export default function ProjectCard({ project }) {
  // --- SMART LOGIC: Calculate Current Phase ---
  // If all tasks in a phase are done, move to the next one automatically.
  const calculateCurrentPhase = () => {
    if (!project.phases) return 1;
    
    let activePhaseId = 1;
    for (const phase of project.phases) {
      const isPhaseDone = phase.tasks.length > 0 && phase.tasks.every(t => t.completed);
      if (isPhaseDone && phase.id < 4) {
        activePhaseId = phase.id + 1;
      } else if (!isPhaseDone) {
        activePhaseId = phase.id;
        break;
      } else {
        activePhaseId = 4; // All done
      }
    }
    return activePhaseId;
  };

  const currentPhase = calculateCurrentPhase();
  const isOverdue = project.deadline === 'Overdue';

  return (
    <Link href={`/project/${project.id}`} className="block">
      <div className="group bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
        <div className="flex justify-between items-start mb-1">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">{project.type}</span>
            <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">{project.title}</h3>
          </div>
          <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${STATUS_COLORS[project.status]?.replace('bg-', 'bg-opacity-50 ') || 'bg-slate-100'}`}>
            {project.status}
          </div>
        </div>

        <PhaseTracker currentPhase={currentPhase} />

        <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              <ArrowRight size={14} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400">Status</span>
              <span className="text-xs font-semibold text-slate-700">
                {currentPhase === 4 && project.phases[3].tasks.every(t => t.completed) ? 'Project Completed' : `In ${PROJECT_PHASES[currentPhase - 1].name}`}
              </span>
            </div>
          </div>
          {project.deadline && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border ${isOverdue ? 'bg-red-50 text-red-700 border-red-100' : 'bg-white text-slate-500 border-slate-200'}`}>
              <Clock size={12} />
              {project.deadline}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
