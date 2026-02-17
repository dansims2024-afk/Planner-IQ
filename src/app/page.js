"use client";
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Calendar, Globe, BrainCircuit, TrendingUp, Settings, 
  Menu, Bell, Zap, ListTodo, ShieldCheck, CheckSquare, Square,
  Users, ArrowLeft, Clock, CheckCircle2, AlertTriangle, X, Mail, Phone, 
  ChevronRight, Search, Filter, MoreVertical, Plus, ExternalLink, Download
} from 'lucide-react';

// --- ELITE DATA STORE: PM & EA OPERATIONS ---
const DATA = {
  stats: [
    { id: 'projects', label: "Active Projects", value: "8", icon: TrendingUp, color: "#3b82f6", linkTo: 'ProjectList' },
    { id: 'tasks', label: "Pending Tasks", value: "24", icon: ListTodo, color: "#8b5cf6", linkTo: 'AutomationView' },
    { id: 'team', label: "Team Utilization", value: "78%", icon: Users, color: "#ec4899", linkTo: 'ResourceList' },
    { id: 'health', label: "System Health", value: "98%", icon: ShieldCheck, color: "#10b981", linkTo: 'SystemHealth' }
  ],
  projects: [
    { 
      id: 1, name: "Skilled Trades: NJ Rollout", status: "Active", progress: 85, region: "North NJ", lead: "Dan Sims", budget: "$1.2M",
      tasks: [
        { id: 101, title: "Finalize Newark Hub Lease", assignee: "Dan Sims", due: "Feb 20", status: "Pending", priority: "High" },
        { id: 102, title: "Hire 3 Senior Recruiters", assignee: "Mike R.", due: "Feb 25", status: "Done", priority: "Medium" },
        { id: 103, title: "Setup Regional KPI Dashboard", assignee: "Sarah J.", due: "Feb 28", status: "Pending", priority: "High" },
        { id: 104, title: "Field Safety Audit: Jersey City", assignee: "Kareen S.", due: "Mar 02", status: "Pending", priority: "Low" }
      ]
    },
    { 
      id: 2, name: "East Windsor Logistics Hub", status: "Planning", progress: 30, region: "Central NJ", lead: "Ops Team", budget: "$450k",
      tasks: [
        { id: 201, title: "Zoning Permit Review", assignee: "Legal", due: "Mar 05", status: "Pending", priority: "High" },
        { id: 202, title: "Site Safety Inspection", assignee: "Mike R.", due: "Mar 12", status: "Pending", priority: "Medium" },
        { id: 203, title: "HVAC System Selection", assignee: "Sarah J.", due: "Mar 18", status: "Pending", priority: "Low" }
      ]
    },
    { id: 3, name: "Recruit-IQ Integration", status: "Delayed", progress: 45, region: "Corporate", lead: "Tech Div", budget: "$200k", tasks: [] },
    { id: 4, name: "Q1 Executive Hiring", status: "Complete", progress: 100, region: "Metro", lead: "Dan Sims", budget: "N/A", tasks: [] },
    { id: 5, name: "Mid-Atlantic Vendor Sync", status: "Active", progress: 60, region: "Mid-Atlantic", lead: "Sarah J.", budget: "$75k", tasks: [] },
    { id: 6, name: "Compliance Audit 2026", status: "Active", progress: 15, region: "Corporate", lead: "Legal", budget: "$50k", tasks: [] },
    { id: 7, name: "Field Office Expansion", status: "Planning", progress: 5, region: "South NJ", lead: "Mike R.", budget: "$300k", tasks: [] },
    { id: 8, name: "Planner-IQ V2 Launch", status: "Active", progress: 92, region: "Remote", lead: "Dev Team", budget: "$150k", tasks: [] }
  ],
  resources: [
    { id: 101, name: "Kareen S.", role: "Senior Analyst", utilization: 92, status: "Overloaded", currentTask: "Financial Modeling", location: "East Windsor", contact: "kareen@planner-iq.com" },
    { id: 102, name: "Mike R.", role: "Field Recruiter", utilization: 65, status: "Available", currentTask: "Candidate Screening", location: "Remote", contact: "mike@planner-iq.com" },
    { id: 103, name: "Sarah J.", role: "Compliance Officer", utilization: 40, status: "Available", currentTask: "Audit Prep", location: "Corporate", contact: "sarah@planner-iq.com" }
  ],
  eaTasks: [
    { id: 't1', time: "09:00 AM", task: "Review Mid-Atlantic KPI Report", type: "Urgent", status: "Pending" },
    { id: 't2', time: "11:30 AM", task: "Skilled Trades Budget Approval", type: "Standard", status: "Pending" },
    { id: 't3', time: "02:15 PM", task: "Vercel Deployment Sync", type: "Tech", status: "In Progress" },
    { id: 't4', time: "04:00 PM", task: "Executive Summary Write-up", type: "Standard", status: "Pending" }
  ]
};

export default function PlannerIQEliteFinal() {
  const [view, setView] = useState('Dashboard');
  const [selectedItem, setSelectedItem] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(3);
  const [isSimulating, setIsSimulating] = useState(false);

  // --- NAVIGATION LOGIC ---
  const navigate = (targetView, itemData = null) => {
    setSelectedItem(itemData);
    setView(targetView);
  };

  // --- VIEW COMPONENTS ---

  const DashboardView = () => (
    <div className="animate-fade-in">
      {/* STAT CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {DATA.stats.map((stat, i) => (
          <div key={i} onClick={() => navigate(stat.linkTo)} style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: '1px solid transparent', transition: '0.2s' }} onMouseOver={(e) => e.currentTarget.style.borderColor = stat.color} onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}>
            <div>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '4px' }}>{stat.label}</p>
              <h3 style={{ fontSize: '2rem', margin: 0, color: '#0f172a' }}>{stat.value}</h3>
              <span style={{ fontSize: '0.75rem', color: stat.color, fontWeight: '600' }}>Explore analytics →</span>
            </div>
            <div style={{ color: stat.color, backgroundColor: `${stat.color}15`, padding: '12px', borderRadius: '12px' }}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr', gap: '24px' }}>
        {/* ROADMAP PREVIEW */}
        <div style={{ backgroundColor: 'white', padding: '28px', borderRadius: '24px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Active Roadmap (Mid-Atlantic)</h3>
            <button onClick={() => navigate('ProjectList')} style={{ color: '#3b82f6', background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>View Full Operations</button>
          </div>
          {DATA.projects.slice(0, 4).map((p) => (
            <div key={p.id} onClick={() => navigate('ProjectDetail', p)} style={{ marginBottom: '14px', padding: '16px', border: '1px solid #f1f5f9', borderRadius: '16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: '0.2s' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: '700', fontSize: '1rem', color: '#1e293b', display: 'block' }}>{p.name}</span>
                <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Region: {p.region}</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Lead: {p.lead}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', minWidth: '100px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#0f172a' }}>{p.progress}%</span>
                <div style={{ width: '80px', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px', marginTop: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${p.progress}%`, height: '100%', backgroundColor: '#3b82f6' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* EXECUTIVE PULSE: EA OVERVIEW */}
        <div style={{ backgroundColor: '#0f172a', padding: '28px', borderRadius: '24px', color: 'white', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <Calendar size={20} color="#3b82f6" />
            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Executive Pulse</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
            <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '12px' }}><Clock color="#10b981" size={20} /></div>
            <div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Next High-Stake Sync</p>
              <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.1rem' }}>3:00 PM EST (15m)</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
            <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '12px' }}><Mail color="#3b82f6" size={20} /></div>
            <div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Priority Unread</p>
              <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.1rem' }}>12 Urgent Alerts</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
            <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '12px' }}><Phone color="#8b5cf6" size={20} /></div>
            <div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Callback Queue</p>
              <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.1rem' }}>2 Strategic Leads</p>
            </div>
          </div>
          <div style={{ padding: '20px', backgroundColor: '#1e293b', borderRadius: '16px', borderLeft: '4px solid #3b82f6' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <BrainCircuit size={16} color="#3b82f6" />
                <span style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase' }}>EA Automation Suggestion</span>
             </div>
             <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.5', color: '#e2e8f0' }}>"Clear 4:00 PM - 5:00 PM. North NJ expansion logistics require a deep-dive before tomorrow's board sync."</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ProjectDetailView = ({ project }) => (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <button onClick={() => navigate('ProjectList')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontWeight: '600' }}>
          <ArrowLeft size={18} /> Back to Master Operations
        </button>
        <div style={{ display: 'flex', gap: '12px' }}>
           <button style={{ padding: '8px 16px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Download size={16} /> Export Report</button>
           <button style={{ padding: '8px 16px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>Update Roadmap</button>
        </div>
      </div>
      
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3b82f6', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '8px' }}>
              <Zap size={14} fill="#3b82f6" /> Project ID: #PIQ-{project.id}00
            </div>
            <h1 style={{ fontSize: '2.8rem', margin: '0 0 8px 0', color: '#0f172a', letterSpacing: '-1px' }}>{project.name}</h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Executive Lead: {project.lead} | Geography: {project.region}</p>
          </div>
          <span style={{ padding: '10px 24px', borderRadius: '30px', backgroundColor: project.status === 'Active' ? '#dcfce7' : project.status === 'Delayed' ? '#fee2e2' : '#fef3c7', color: project.status === 'Active' ? '#166534' : project.status === 'Delayed' ? '#991b1b' : '#92400e', fontWeight: '800', fontSize: '0.9rem' }}>
            {project.status.toUpperCase()}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
          {[
            { label: "BUDGET ALLOCATED", value: project.budget || "TBD", icon: TrendingUp },
            { label: "GEOGRAPHIC SCOPE", value: project.region, icon: Globe },
            { label: "COMPLETION RATE", value: `${project.progress}%`, icon: ShieldCheck },
            { label: "TEAM CAPACITY", value: "High", icon: Users }
          ].map((item, idx) => (
            <div key={idx} style={{ padding: '24px', backgroundColor: '#f8fafc', borderRadius: '18px', border: '1px solid #f1f5f9' }}>
               <p style={{ margin: 0, color: '#64748b', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.5px' }}>{item.label}</p>
               <p style={{ margin: '8px 0 0', fontSize: '1.4rem', fontWeight: '900', color: '#1e293b' }}>{item.value}</p>
            </div>
          ))}
        </div>

        <div>
           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', color: '#475569' }}>Operational Phase Progression</h3>
              <span style={{ fontWeight: 'bold', color: '#0f172a' }}>{project.progress}% Complete</span>
           </div>
           <div style={{ width: '100%', height: '14px', backgroundColor: '#f1f5f9', borderRadius: '7px', overflow: 'hidden' }}>
              <div style={{ width: `${project.progress}%`, height: '100%', backgroundColor: '#3b82f6', transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
           </div>
        </div>
      </div>

      {/* DETAILED TASK MODULE (EA GRADE) */}
      <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
           <div>
             <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#0f172a' }}>Strategic Task List</h3>
             <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>Granular milestones for division rollout.</p>
           </div>
           <button style={{ padding: '12px 24px', backgroundColor: '#f1f5f9', color: '#0f172a', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
             <Plus size={18} /> Add Action Item
           </button>
        </div>
        
        {project.tasks && project.tasks.length > 0 ? (
          project.tasks.map((task) => (
            <div key={task.id} style={{ display: 'flex', alignItems: 'center', padding: '24px', borderBottom: '1px solid #f1f5f9', gap: '20px', transition: '0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fcfdfe'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
               <div style={{ cursor: 'pointer', color: task.status === 'Done' ? '#10b981' : '#cbd5e1' }}>
                 {task.status === 'Done' ? <CheckSquare size={26} /> : <Square size={26} />}
               </div>
               <div style={{ flex: 1 }}>
                 <span style={{ display: 'block', fontSize: '1.15rem', fontWeight: '600', textDecoration: task.status === 'Done' ? 'line-through' : 'none', color: task.status === 'Done' ? '#94a3b8' : '#0f172a' }}>{task.title}</span>
                 <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={14} /> Lead: {task.assignee}</span>
                    <span style={{ fontSize: '0.85rem', color: task.priority === 'High' ? '#ef4444' : '#64748b', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: task.priority === 'High' ? 'bold' : 'normal' }}><AlertTriangle size={14} /> Priority: {task.priority}</span>
                 </div>
               </div>
               <div style={{ textAlign: 'right' }}>
                 <span style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>Target Date</span>
                 <span style={{ fontWeight: '800', color: task.status === 'Done' ? '#94a3b8' : '#0f172a', fontSize: '1rem' }}>{task.due}</span>
               </div>
               <button style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}><MoreVertical size={20} /></button>
            </div>
          ))
        ) : (
          <div style={{ padding: '80px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '18px', border: '2px dashed #e2e8f0' }}>
            <ListTodo size={48} style={{ marginBottom: '16px', opacity: 0.2, color: '#0f172a' }} />
            <h4 style={{ margin: 0, color: '#475569' }}>No Active Tasks</h4>
            <p style={{ color: '#94a3b8', margin: '8px 0 20px 0' }}>All division milestones for this project are currently optimized.</p>
            <button style={{ color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>Initiate New Phase</button>
          </div>
        )}
      </div>
    </div>
  );

  const ResourceListView = () => (
    <div className="animate-fade-in">
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Mid-Atlantic Resource Pool</h2>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Tracking capacity for East Windsor & Jersey divisions.</p>
          </div>
          <button style={{ padding: '12px 24px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Manage Permissions</button>
       </div>
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
        {DATA.resources.map((r) => (
          <div 
            key={r.id} 
            onClick={() => navigate('ResourceDetail', r)}
            style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0', cursor: 'pointer', transition: '0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '20px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '18px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#0f172a', fontSize: '1.4rem', border: '2px solid #fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                {r.name.charAt(0)}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a' }}>{r.name}</h3>
                <p style={{ margin: '2px 0 0', color: '#64748b', fontSize: '0.9rem' }}>{r.role}</p>
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                <span style={{ color: '#64748b', fontWeight: '500' }}>Active Utilization</span>
                <span style={{ fontWeight: '800', color: r.utilization > 90 ? '#ef4444' : '#10b981' }}>{r.utilization}%</span>
              </div>
              <div style={{ width: '100%', height: '10px', backgroundColor: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
                 <div style={{ width: `${r.utilization}%`, height: '100%', backgroundColor: r.utilization > 90 ? '#ef4444' : '#10b981', transition: 'width 1s ease' }}></div>
              </div>
            </div>
            <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
               <Clock size={14} color="#64748b" />
               <span style={{ color: '#475569' }}>Currently: <strong>{r.currentTask}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ResourceDetailView = ({ resource }) => (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <button onClick={() => navigate('ResourceList')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', marginBottom: '24px', fontWeight: 'bold' }}>
        <ArrowLeft size={18} /> Back to Regional Pool
      </button>
      <div style={{ backgroundColor: 'white', padding: '48px', borderRadius: '28px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        <div style={{ width: '120px', height: '120px', margin: '0 auto 24px', borderRadius: '35px', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: 'white', fontWeight: '900', boxShadow: '0 8px 16px rgba(15, 23, 42, 0.2)' }}>
          {resource.name.charAt(0)}
        </div>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '2.4rem', letterSpacing: '-0.5px' }}>{resource.name}</h1>
        <p style={{ color: '#64748b', fontSize: '1.2rem', marginBottom: '32px' }}>{resource.role} | {resource.location}</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
           <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '18px', textAlign: 'left' }}>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.75rem', fontWeight: 'bold' }}>CONTACT EMAIL</p>
              <p style={{ margin: '4px 0 0', fontWeight: '600' }}>{resource.contact}</p>
           </div>
           <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '18px', textAlign: 'left' }}>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.75rem', fontWeight: 'bold' }}>WORK STATUS</p>
              <p style={{ margin: '4px 0 0', fontWeight: '600', color: resource.status === 'Available' ? '#10b981' : '#ef4444' }}>{resource.status}</p>
           </div>
        </div>

        <div style={{ textAlign: 'left', backgroundColor: '#f8fafc', padding: '28px', borderRadius: '20px', marginBottom: '32px', border: '1px solid #f1f5f9' }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#475569', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Operational Assignment</h4>
          <p style={{ margin: 0, fontWeight: '800', fontSize: '1.3rem', color: '#0f172a' }}>{resource.currentTask}</p>
        </div>
        
        <div style={{ width: '100%', height: '1px', backgroundColor: '#f1f5f9', marginBottom: '32px' }}></div>
        
        <button style={{ width: '100%', padding: '18px', backgroundColor: '#0f172a', color: 'white', borderRadius: '14px', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <Mail size={20} /> Reassign Resource
        </button>
      </div>
    </div>
  );

  // --- MAIN SCAFFOLD ---
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f4f7fb', fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden' }}>
      
      {/* SIDEBAR: ELITE OPS DESIGN */}
      <aside style={{ 
        width: sidebarOpen ? '280px' : '90px', backgroundColor: '#0f172a', color: 'white', 
        padding: '30px 20px', transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', flexDirection: 'column', flexShrink: 0 
      }}>
        {/* LOGO.PNG INTEGRATION */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '50px', overflow: 'hidden' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
             <img 
               src="/logo.png" 
               alt="" 
               style={{ width: '48px', height: '48px', objectFit: 'contain' }}
               onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
             />
             <div style={{ display: 'none', backgroundColor: '#0070f3', padding: '12px', borderRadius: '14px', width: '48px', height: '48px', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0, 112, 243, 0.3)' }}>
               <Zap size={24} color="white" fill="white" />
             </div>
          </div>
          {sidebarOpen && (
            <div style={{ lineHeight: '1.1', whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: '900', display: 'block', letterSpacing: '-0.5px' }}>Planner-IQ</span>
              <span style={{ fontSize: '0.7rem', color: '#64748b', letterSpacing: '2px', fontWeight: 'bold' }}>ELITE EDITION</span>
            </div>
          )}
        </div>

        <nav style={{ flex: 1 }}>
          {[
            { id: 'Dashboard', icon: LayoutDashboard },
            { id: 'ProjectList', label: 'Operations', icon: Calendar },
            { id: 'ResourceList', label: 'Regional Pool', icon: Globe },
            { id: 'AutomationView', label: 'EA Automations', icon: BrainCircuit },
            { id: 'SystemHealth', label: 'System Health', icon: ShieldCheck },
            { id: 'Settings', label: 'Configurations', icon: Settings }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '18px', padding: '16px 20px', marginBottom: '10px',
                borderRadius: '16px', border: 'none', cursor: 'pointer', fontSize: '1rem',
                backgroundColor: view === item.id || (view === 'ProjectDetail' && item.id === 'ProjectList') || (view === 'ResourceDetail' && item.id === 'ResourceList') ? '#1e293b' : 'transparent',
                color: view === item.id || (view === 'ProjectDetail' && item.id === 'ProjectList') || (view === 'ResourceDetail' && item.id === 'ResourceList') ? '#60a5fa' : '#94a3b8', 
                transition: '0.2s', textAlign: 'left', fontWeight: '600'
              }}
            >
              <item.icon size={24} style={{ minWidth: '24px' }} />
              {sidebarOpen && <span>{item.label || item.id}</span>}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div style={{ marginTop: 'auto', padding: '20px', backgroundColor: '#1e293b', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
             <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#0070f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>DS</div>
             <div>
               <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold' }}>Dan Sims</p>
               <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Executive Lead</p>
             </div>
          </div>
        )}
      </aside>

      {/* VIEWPORT CONTROLLER */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <header style={{ height: '80px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', flexShrink: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}><Menu size={26} /></button>
            <div style={{ width: '1px', height: '24px', backgroundColor: '#e2e8f0' }}></div>
            <h2 style={{ fontSize: '1.4rem', margin: 0, fontWeight: '800', color: '#0f172a' }}>
              {view === 'ProjectList' ? 'Operational Roadmap' : view === 'ProjectDetail' ? 'Division Deep-Dive' : view === 'ResourceList' ? 'Regional Resource Pool' : view}
            </h2>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#eff6ff', padding: '12px 24px', borderRadius: '30px', color: '#2563eb', fontSize: '0.9rem', fontWeight: '800', boxShadow: '0 2px 4px rgba(37, 99, 235, 0.1)' }}>
               <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#2563eb', boxShadow: '0 0 8px rgba(37, 99, 235, 0.5)' }}></div>
               SECURE EA DEMO
             </div>
             <div style={{ position: 'relative', cursor: 'pointer', color: '#64748b' }} onClick={() => setNotifications(0)}>
               <Bell size={24} />
               {notifications > 0 && <span style={{ position: 'absolute', top: '-6px', right: '-6px', backgroundColor: '#ef4444', color: 'white', fontSize: '11px', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', border: '2px solid white' }}>{notifications}</span>}
             </div>
          </div>
        </header>

        <main style={{ flex: 1, padding: '40px', overflowY: 'auto', scrollBehavior: 'smooth' }}>
          {view === 'Dashboard' && <DashboardView />}
          
          {view === 'ProjectList' && (
            <div className="animate-fade-in" style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                  <h2 style={{ margin: 0 }}>Active Operational Roadmaps</h2>
                  <div style={{ display: 'flex', gap: '12px' }}>
                     <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '14px', top: '13px', color: '#94a3b8' }} />
                        <input type="text" placeholder="Search operations..." style={{ padding: '12px 12px 12px 42px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '0.9rem', width: '260px' }} />
                     </div>
                     <button style={{ padding: '12px', backgroundColor: '#f1f5f9', border: 'none', borderRadius: '12px', cursor: 'pointer' }}><Filter size={20} color="#475569" /></button>
                  </div>
               </div>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1px', backgroundColor: '#f1f5f9' }}>
               {DATA.projects.map(p => (
                 <div key={p.id} onClick={() => navigate('ProjectDetail', p)} style={{ padding: '28px', backgroundColor: 'white', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: '0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: p.status === 'Active' ? '#effaf3' : p.status === 'Delayed' ? '#fff1f2' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <Briefcase size={22} color={p.status === 'Active' ? '#10b981' : p.status === 'Delayed' ? '#ef4444' : '#64748b'} />
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#0f172a' }}>{p.name}</h3>
                        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>Region: <strong>{p.region}</strong> | Project Lead: <strong>{p.lead}</strong></p>
                      </div>
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                      <div style={{ textAlign: 'right', minWidth: '150px' }}>
                        <p style={{ margin: 0, fontWeight: '900', color: '#0f172a', fontSize: '1.1rem' }}>{p.progress}% Complete</p>
                        <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', marginTop: '6px', overflow: 'hidden' }}>
                           <div style={{ width: `${p.progress}%`, height: '100%', backgroundColor: p.status === 'Active' ? '#10b981' : p.status === 'Delayed' ? '#ef4444' : '#3b82f6' }}></div>
                        </div>
                      </div>
                      <ChevronRight size={20} color="#cbd5e1" />
                   </div>
                 </div>
               ))}
               </div>
            </div>
          )}
          
          {view === 'ProjectDetail' && <ProjectDetailView project={selectedItem} />}
          {view === 'ResourceList' && <ResourceListView />}
          {view === 'ResourceDetail' && <ResourceDetailView resource={selectedItem} />}
          
          {view === 'AutomationView' && (
            <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div style={{ backgroundColor: '#0f172a', borderRadius: '28px', padding: '48px', color: 'white', textAlign: 'center', marginBottom: '40px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
                 <div style={{ width: '80px', height: '80px', backgroundColor: '#3b82f6', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 10px 20px rgba(59, 130, 246, 0.4)' }}>
                    <BrainCircuit size={40} color="white" />
                 </div>
                 <h2 style={{ fontSize: '2.4rem', margin: '0 0 12px 0' }}>Elite EA Automations</h2>
                 <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 32px' }}>AI-driven operational sync for the Mid-Atlantic Skilled Trades Division.</p>
                 <button 
                   onClick={() => { setIsSimulating(true); setTimeout(() => setIsSimulating(false), 2000); }}
                   style={{ padding: '18px 40px', backgroundColor: '#3b82f6', border: 'none', borderRadius: '16px', color: 'white', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', transition: '0.2s', display: 'inline-flex', alignItems: 'center', gap: '12px' }}
                   onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                   onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                 >
                   {isSimulating ? <Zap className="animate-spin" size={20} /> : <Zap size={20} fill="white" />}
                   {isSimulating ? "Optimizing Regional Workflows..." : "Execute Daily Optimization"}
                 </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                 <h3 style={{ marginLeft: '12px', color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Pending EA Priority Tasks</h3>
                 {DATA.eaTasks.map((t, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', transition: '0.3s', opacity: isSimulating ? 0.3 : 1 }}>
                       <div style={{ minWidth: '90px', textAlign: 'right', paddingTop: '16px' }}>
                          <span style={{ fontWeight: '800', color: '#0f172a', fontSize: '1rem' }}>{t.time}</span>
                       </div>
                       <div style={{ flex: 1, backgroundColor: 'white', padding: '24px', borderRadius: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', borderLeft: `6px solid ${t.type === 'Urgent' ? '#ef4444' : '#3b82f6'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                             <h4 style={{ margin: '0 0 6px 0', fontSize: '1.2rem', color: '#1e293b' }}>{t.task}</h4>
                             <div style={{ display: 'flex', gap: '12px' }}>
                                <span style={{ fontSize: '0.75rem', padding: '4px 10px', backgroundColor: t.type === 'Urgent' ? '#fff1f2' : '#eff6ff', color: t.type === 'Urgent' ? '#e11d48' : '#2563eb', borderRadius: '20px', fontWeight: 'bold' }}>{t.type.toUpperCase()}</span>
                                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> Status: {t.status}</span>
                             </div>
                          </div>
                          <ChevronRight color="#cbd5e1" />
                       </div>
                    </div>
                 ))}
              </div>
            </div>
          )}

          {view === 'SystemHealth' && (
            <div className="animate-fade-in" style={{ textAlign: 'center', padding: '100px 40px' }}>
               <div style={{ width: '100px', height: '100px', backgroundColor: '#dcfce7', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
                  <ShieldCheck size={60} color="#10b981" />
               </div>
               <h1 style={{ fontSize: '3rem', margin: '0 0 12px 0' }}>98% Operational</h1>
               <p style={{ color: '#64748b', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px' }}>All Planner-IQ elite modules are functioning at peak efficiency. Regional East Windsor database sync complete.</p>
               <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
                  <div style={{ backgroundColor: 'white', padding: '20px 40px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                     <p style={{ margin: 0, color: '#64748b', fontSize: '0.8rem' }}>LATENCY</p>
                     <p style={{ margin: '4px 0 0', fontWeight: 'bold', fontSize: '1.2rem' }}>12ms</p>
                  </div>
                  <div style={{ backgroundColor: 'white', padding: '20px 40px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                     <p style={{ margin: 0, color: '#64748b', fontSize: '0.8rem' }}>UPTIME</p>
                     <p style={{ margin: '4px 0 0', fontWeight: 'bold', fontSize: '1.2rem' }}>99.9%</p>
                  </div>
               </div>
               <button onClick={() => navigate('Dashboard')} style={{ marginTop: '50px', padding: '14px 28px', backgroundColor: 'transparent', border: '2px solid #e2e8f0', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', color: '#475569' }}>Return to Control Center</button>
            </div>
          )}
          
          {view === 'Settings' && <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}><Settings size={64} style={{ marginBottom: '16px', opacity: 0.2 }} /><h2>Elite System Configurations Locked</h2><p>Contact system administrator to modify regional divisions.</p></div>}
        </main>
      </div>
    </div>
  );
}
