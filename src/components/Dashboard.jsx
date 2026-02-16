"use client";

import React, { useState, useEffect } from 'react';
// ... (keep all your existing imports)

export default function Dashboard() {
  const [projects, setProjects] = useState([]); // Start with empty array
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load data from browser memory on startup
  useEffect(() => {
    const savedProjects = localStorage.getItem('planner_iq_projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(INITIAL_PROJECTS); // Fallback to your constants
    }
  }, []);

  // Function to save project list
  const saveToLocal = (updatedList) => {
    setProjects(updatedList);
    localStorage.setItem('planner_iq_projects', JSON.stringify(updatedList));
  };

  // Add this inside your Modal's "Create Project" button:
  const handleCreate = (newProj) => {
    const newList = [...projects, newProj];
    saveToLocal(newList);
    setIsModalOpen(false);
  };

  // ... (rest of your render code remains the same)
}
