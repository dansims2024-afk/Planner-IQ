const ADMIN_SAMPLES = [
  {
    id: 301,
    title: "Project Everest: Q1 Board Review",
    type: "Board Meeting",
    status: "On Track",
    deadline: "Feb 20",
    lastUpdated: "10:15 AM",
    currentPhase: 2,
    nextTask: "Finalize Executive Catering",
    phases: [
      { id: 1, name: "Preparation", tasks: [
        { id: 3011, text: "Collate Dept. Executive Summaries", completed: true },
        { id: 3012, text: "Audit Q4 Financial Statements", completed: true },
        { id: 3013, text: "Draft Board Deck v1 (Design Team)", completed: true },
        { id: 3014, text: "Legal Review of Governance Docs", completed: true }
      ]},
      { id: 2, name: "Logistics", tasks: [
        { id: 3015, text: "Confirm Director Travel & Hotel Blocks", completed: true },
        { id: 3016, text: "Finalize Executive Catering Menu", completed: false },
        { id: 3017, text: "Secure On-site AV Support (Hybrid setup)", completed: false },
        { id: 3018, text: "Print & Bind Physical Board Books", completed: false }
      ]}
    ]
  },
  {
    id: 302,
    title: "Global Leadership Offsite (Kyoto)",
    type: "Event Planning",
    status: "At Risk",
    deadline: "Mar 15",
    lastUpdated: "Yesterday",
    currentPhase: 1,
    nextTask: "Venue Deposit & Contract",
    phases: [
      { id: 1, name: "Strategic Planning", tasks: [
        { id: 3021, text: "Venue Site Selection & RFP", completed: true },
        { id: 3022, text: "Define Key Learning Objectives", completed: true },
        { id: 3023, text: "Submit Initial Budget ($120k)", completed: false },
        { id: 3024, text: "Secure Keynote Speaker (Negotiation phase)", completed: false }
      ]}
    ]
  },
  {
    id: 303,
    title: "HQ2 Relocation & IT Setup",
    type: "Facilities",
    status: "On Track",
    deadline: "Feb 18",
    lastUpdated: "2 mins ago",
    currentPhase: 4,
    nextTask: "Staff Badge Activation",
    phases: [
      { id: 1, name: "Planning", tasks: [{ id: 3031, text: "Floor Plan Approval", completed: true }] },
      { id: 2, name: "Execution", tasks: [{ id: 3032, text: "Furniture Installation", completed: true }] },
      { id: 3, name: "Review", tasks: [{ id: 3033, text: "Fire Marshall Inspection", completed: true }] },
      { id: 4, name: "Launch", tasks: [
        { id: 3034, text: "Network Stress Test", completed: true },
        { id: 3035, text: "Staff Keycard/Badge Activation", completed: false },
        { id: 3036, text: "Welcome Gift Kits on Desks", completed: false }
      ]}
    ]
  }
];

// Inside your Dashboard component, update the initial load:
useEffect(() => {
  const saved = localStorage.getItem('planner_iq_projects');
  if (!saved || JSON.parse(saved).length < 2) {
    localStorage.setItem('planner_iq_projects', JSON.stringify(ADMIN_SAMPLES));
    setProjects(ADMIN_SAMPLES);
  } else {
    setProjects(JSON.parse(saved));
  }
}, []);
