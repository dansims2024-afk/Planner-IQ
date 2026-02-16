"use client";

import React from 'react';
import { Clock, CheckCircle2, Circle } from 'lucide-react';
import { PROJECT_PHASES, STATUS_COLORS } from '../lib/constants';

const PhaseTracker = ({ currentPhase }) => {
  return (
    <div className="flex items-center w-full my-6">
      {PROJECT_PHASES.map((phase, index) => {
        const isActive = phase.id === currentPhase;
        const isCompleted = phase.id < currentPhase;
        
        return (
          <div key={phase.id} className="flex-1 flex flex-col items-center relative">
            {/* Connecting Line */}
            {index !== 0 && (
              <div className={`absolute top-2.5 right-[50%] w-full h-0.5 -z-10 
                ${isCompleted || isActive ? 'bg-blue-500' : 'bg-slate-100'}`} 
              />
            )}
            
            {/* The Dot/Icon */}
            <div className={`transition-all duration-300`}>
              {isCompleted ? (
                <CheckCircle2 size={20} className="text-blue-500 fill-blue-50" />
              ) : isActive ? (
                <div className="w-5 h-5 rounded-full bg-blue-600 ring-4 ring-blue-100" />
              ) : (
                <Circle size={20} className="text-slate-200" />
              )}
            </div>

            <span className={`text-[10px] mt-2 font-bold uppercase tracking-tighter ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
              {phase.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] transition-all cursor-pointer group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-widest leading-none">
            {project.type}
          </span>
          <h3 className="text-xl font-bold text-slate-800 mt-2 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
        </div>
        <div className={`text-[11px] font-bold px-3 py-1 rounded-full border ${STATUS_COLORS[project.status]}`}>
          {project.status}
        </div>
      </div>

      <PhaseTracker currentPhase={project.currentPhase} />

      <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Active Task</span>
          <span className="text-sm font-semibold text-slate-700">{project.nextTask}</span>
        </div>
        
        <div className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl
          ${project.deadline === 'Overdue' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-500'}`}>
          <Clock size={14} />
          {project.deadline}
        </div>
      </div>
    </div>
  );
}
