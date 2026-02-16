export const PROJECT_PHASES = [
  { id: 1, name: 'Planning', color: 'bg-blue-100 text-blue-700' },
  { id: 2, name: 'Execution', color: 'bg-amber-100 text-amber-700' },
  { id: 3, name: 'Review', color: 'bg-purple-100 text-purple-700' },
  { id: 4, name: 'Launch', color: 'bg-emerald-100 text-emerald-700' }
];

export const STATUS_COLORS = {
  'On Track': 'bg-green-100 text-green-800 border-green-200',
  'At Risk': 'bg-red-100 text-red-800 border-red-200',
  'On Hold': 'bg-gray-100 text-gray-800 border-gray-200'
};

export const INITIAL_PROJECTS = [
  { 
    id: 101, 
    title: 'Recruit-IQ Integration', 
    type: 'Development', 
    status: 'On Track', 
    currentPhase: 2, 
    nextTask: 'API Mapping', 
    deadline: '3 days' 
  },
  { 
    id: 102, 
    title: 'Staff-IQ Launch', 
    type: 'Marketing', 
    status: 'At Risk', 
    currentPhase: 3, 
    nextTask: 'Social Media Assets', 
    deadline: 'Overdue' 
  }
];
