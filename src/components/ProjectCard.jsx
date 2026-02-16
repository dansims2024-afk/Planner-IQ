import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import { PROJECT_PHASES, STATUS_COLORS } from '../lib/constants';

// Internal component for the Phase Tracker (The Subway Map)
const PhaseTracker = ({ currentPhase }) => {
  return (
    <div className="flex items-center w-full mt-4 mb-2">
      {PROJECT_PHASES.map((phase, index) => {
        const isActive = phase.id === currentPhase;
        const isCompleted = phase.id < currentPhase;
        
        return (
          <div key={phase.id} className="flex-1 flex flex-col items-center relative">
            {/* Connecting Line */}
            {index !== 0 && (
              <div className={`absolute top-2.5 right-[50%] w-full h-1 -z-10 
                ${isCompleted || isActive ? 'bg-slate-300' : 'bg-slate-100'}`} 
              />
            )}
            
            {/* The Dot */}
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2
              ${isActive ? 'bg-white border-blue-600 text-blue-600 scale-125 transition-transform' : ''}
              ${isCompleted ? 'bg-slate-300 border-slate-300' : ''}
              ${!isActive && !isCompleted ? 'bg-white border-slate-200' : ''}
            `}>
              {isCompleted && <CheckCircle size={12} className="text-white" />}
            </div>

            {/* Label */}
            <span className={`text-xs mt-2 font-medium ${isActive ? 'text-blue-700' : 'text-slate-400'}`}>
              {phase.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group">
      {/* "Status Stripe" */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${project.status === 'At Risk' ? 'bg-red-500' : 'bg-green-500'}`} />

      <div className="flex justify-between items-start mb-2 pl-2">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{project.type}</span>
          <h3 className="text-lg font-bold text-slate-800 leading-tight">{project.title}</h3>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${STATUS_COLORS[project.status]}`}>
          {project.status}
        </span>
      </div>

      <PhaseTracker currentPhase={project.currentPhase} />

      <div className="mt-4 bg-slate-50 rounded-lg p-3 border border-slate-100 flex justify-between items-center pl-4">
        <div>
          <div className="text-xs text-slate-400 font-medium mb-0.5">UP NEXT</div>
          <div className="text-sm font-semibold text-slate-700">{project.nextTask}</div>
        </div>
        
        <div className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-md
          ${project.deadline === 'Overdue' ? 'bg-red-50 text-red-600' : 'bg-white border border-slate-200 text-slate-500'}`}>
          <Clock size={14} />
          {project.deadline}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
