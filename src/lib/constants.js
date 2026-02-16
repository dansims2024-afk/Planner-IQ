export const PROJECT_PHASES = [
  { id: 1, name: 'Planning', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 2, name: 'Execution', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { id: 3, name: 'Review', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 4, name: 'Launch', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' }
];

export const STATUS_COLORS = {
  'On Track': 'bg-green-100 text-green-800',
  'At Risk': 'bg-red-100 text-red-800',
  'On Hold': 'bg-gray-100 text-gray-800'
};

export const INITIAL_PROJECTS = [
  { 
    id: 101, 
    title: 'Q3 Marketing Campaign', 
    type: 'Marketing', 
    status: 'On Track', 
    currentPhase: 2, 
    progress: 45, 
    nextTask: 'Finalize Ad Copy', 
    deadline: '2 days' 
  },
  { 
    id: 102, 
    title: 'Website Redesign', 
    type: 'Development', 
    status: 'At Risk', 
    currentPhase: 3, 
    progress: 10, 
    nextTask: 'QA Testing', 
    deadline: 'Overdue' 
  },
  { 
    id: 103, 
    title: 'New Hire Onboarding', 
    type: 'HR', 
    status: 'On Track', 
    currentPhase: 1, 
    progress: 80, 
    nextTask: 'Draft Offer Letter', 
    deadline: '5 days' 
  },
];
