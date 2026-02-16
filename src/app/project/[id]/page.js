"use client";

import React, { useState, useEffect } from 'react';
// ... (keep imports)

export default function ProjectDetail({ params }) {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const allProjects = JSON.parse(localStorage.getItem('planner_iq_projects') || '[]');
    const current = allProjects.find(p => p.id.toString() === params.id);
    setProject(current || PROJECT_DATA);
  }, [params.id]);

  const toggleTask = (phaseId, taskId) => {
    const updatedPhases = project.phases.map(phase => {
      if (phase.id !== phaseId) return phase;
      return {
        ...phase,
        tasks: phase.tasks.map(task => 
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      };
    });

    const updatedProject = { ...project, phases: updatedPhases };
    setProject(updatedProject);

    // Save back to the main list
    const allProjects = JSON.parse(localStorage.getItem('planner_iq_projects') || '[]');
    const newList = allProjects.map(p => p.id === project.id ? updatedProject : p);
    localStorage.setItem('planner_iq_projects', JSON.stringify(newList));
  };

  if (!project) return <div className="p-10 text-slate-400">Loading project...</div>;

  // ... (rest of your render code)
}
