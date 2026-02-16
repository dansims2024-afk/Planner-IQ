"use client";

import React from 'react';
import Link from 'next/link'; // This makes the card clickable
import { Clock, ArrowRight } from 'lucide-react';
import { PROJECT_PHASES, STATUS_COLORS } from '../lib/constants';

// --- The Refined "Subway Map" Visual ---
const PhaseTracker = ({ currentPhase }) => {
  return (
    <div className="relative w-full mt-6 mb-6">
      {/* Background Track */}
      <div className="absolute top-[9px] left-0 w-full h-[2px] bg-slate-100 rounded-full" />
      
      <div className="flex justify-between items-start relative z-10">
        {PROJECT_PHASES.map((phase) => {
          const isActive = phase.id === currentPhase;
          const isCompleted = phase.id < currentPhase;
          
          return (
            <div key={phase.id} className="flex flex-col items-center group/phase cursor-default">
              {/* The Dot */}
              <div className={`
                w-5 h-5 rounded-full border-[3px] transition-all duration-300 flex items-center justify-center bg-white
                ${isActive 
                  ? 'border-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.1)] scale-110' 
                  : isCompleted 
                    ? 'border-blue-600 bg-blue-600' 
                    : 'border-slate-200'
                }
              `}>
                {isCompleted && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
              </div>

              {/* The Label - Only shows on hover or active to reduce clutter */}
              <span className={`
                absolute top-7 text-[10px] font-bold uppercase tracking-wider transition-opacity duration-300 whitespace-nowrap
                ${isActive ? 'opacity-100 text-blue-700' : 'opacity-0 group-hover/phase:opacity-100 text-slate-400'}
              `}>
                {phase.name}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Active Phase Progress Bar */}
      <div 
        className="absolute top-[9px] left-0 h-[2px] bg-blue-600 rounded-full transition-all duration-500" 
        style={{ width: `${((currentPhase - 1) / (PROJECT_PHASES.length - 1)) * 100}%` }}
      />
    </div>
  );
};

export default function ProjectCard({ project }) {
  const isOverdue = project.deadline === 'Overdue';

  return (
    <Link href={`/project/${project.id}`} className="block">
      <div className="group bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden h-full">
        
        {/* 1. Header: Clean & Minimal */}
        <div className="flex justify-between items-start mb-1">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
              {project.type}
            </span>
            <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">
              {project.title}
            </h3>
          </div>
          
          {/* Pro Badge: Subtle background, dark text */}
          <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${STATUS_COLORS[project.status].replace('bg-', 'bg-opacity-50 ')}`}>
            {project.status}
          </div>
        </div>

        {/* 2. The Visualization */}
        <PhaseTracker currentPhase={project.currentPhase} />

        {/* 3. The Footer: Actionable Data */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-4">
          
          {/* Next Step (The "Action") */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              <ArrowRight size={14} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400">Up Next</span>
              <span className="text-xs font-semibold text-slate-700 line-clamp-1">
                {project.nextTask}
              </span>
            </div>
          </div>

          {/* Deadline (The "Urgency") */}
          {project.deadline && (
            <div className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-colors
              ${isOverdue 
                ? 'bg-red-50 text-red-700 border-red-100' 
                : 'bg-white text-slate-500 border-slate-200 group-hover:border-slate-300'
              }
            `}>
              <Clock size={12} className={isOverdue ? "text-red-500" : "text-slate-400"} />
              {project.deadline}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
