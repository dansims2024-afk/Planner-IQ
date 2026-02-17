"use client";
import React, { useState } from 'react';
import { 
  LayoutDashboard, Calendar, Globe, BrainCircuit, TrendingUp, Settings, 
  Menu, Bell, Zap, ListTodo, ShieldCheck, 
  Users, ArrowLeft, Clock, CheckCircle2, AlertTriangle, X
} from 'lucide-react';

// --- DATA STORE ---
const DATA = {
  stats: [
    { id: 'projects', label: "Active Projects", value: "8", icon: TrendingUp, color: "#3b82f6", linkTo: 'ProjectList' },
    { id: 'tasks', label: "Pending Tasks", value: "24", icon: ListTodo, color: "#8b5cf6", linkTo: 'AutomationView' },
    { id: 'team', label: "Team Utilization", value: "78%", icon: Users, color: "#ec4899", linkTo: 'ResourceList' },
    { id: 'health', label: "System Health", value: "98%", icon: ShieldCheck, color: "#10b981", linkTo: 'SystemHealth' }
  ],
  projects: [
    { id: 1, name: "Skilled Trades: NJ Rollout", status: "Active", progress: 85, region: "North NJ", lead: "Dan Sims", budget: "$1.2M", nextStep: "Finalize Newark Hub Lease" },
    { id: 2, name: "East Windsor Logistics Hub", status: "Planning", progress: 30, region: "Central", lead: "Ops Team", budget: "$450k", nextStep: "Vendor Selection" },
    { id: 3, name: "Recruit-IQ Integration", status: "Delayed", progress: 45, region: "Corporate", lead: "Tech Div", budget: "$200k", nextStep: "API Debugging" },
    { id: 4, name: "Q1 Executive Hiring", status: "Complete", progress: 100, region: "Metro", lead: "Dan Sims", budget: "N/A", nextStep: "Onboarding" },
    { id: 5, name: "Mid-Atlantic Vendor Sync", status: "Active", progress: 60, region: "Mid-Atlantic", lead: "Sarah J.", budget: "$75k", nextStep: "Contract Review" },
    { id: 6, name: "Compliance Audit 2026", status: "Active", progress: 15, region: "Corporate", lead: "Legal", budget: "$50k", nextStep: "Data Collection" },
    { id: 7, name: "Field Office Expansion", status: "Planning", progress: 5, region: "South NJ", lead: "Mike R.", budget: "$300k", nextStep: "Site Visits" },
    { id: 8, name: "Planner-IQ V2 Launch", status: "Active", progress: 92, region: "Remote", lead: "Dev Team", budget: "$150k", nextStep: "UAT Testing" }
  ],
  resources: [
    { id: 101, name: "Kareen S.", role: "Senior Analyst", utilization: 92, status: "Overloaded", currentTask: "Financial Modeling", location: "East Windsor" },
    { id: 102, name: "Mike R.", role: "Field Recruiter", utilization: 65, status: "Available", currentTask: "Candidate Screening", location: "Remote" },
    { id: 103, name: "Sarah J.", role: "Compliance Officer", utilization: 40, status: "Available", currentTask: "Audit Prep", location: "Corporate" },
    { id: 104, name: "Dev Team A", role: "Engineering", utilization: 88, status: "Active", currentTask: "Vercel Deployment", location: "Remote" }
  ],
  tasks: [
    { id: 't1', time: "09:00 AM", task: "Review Mid-Atlantic KPI Report", type: "Urgent", status: "Pending" },
    { id: 't2', time: "11:30 AM", task: "Skilled Trades Budget Approval", type: "Standard", status: "Pending" },
    { id: 't3', time: "02:15 PM", task: "Vercel Deployment Sync", type: "Tech", status: "In Progress" },
    { id: 't4', time: "04:00 PM", task: "Executive Summary Write-up", type: "Standard", status: "Pending" }
  ]
};

export default function PlannerIQComplete() {
  const [view, setView] = useState('Dashboard'); // Controls the main screen
  const [selectedItem, setSelectedItem] = useState(null); // Tracks which Project/Resource is clicked
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(3);
  const [isSimulating, setIsSimulating] = useState(false);

  // --- NAVIGATION HANDLER ---
  const navigate = (targetView, itemData = null) => {
    setSelectedItem(itemData);
    setView(targetView);
  };

  // --- SUB-VIEWS ---

  const DashboardView = () => (
    <div className="animate-fade-in">
      {/* CLICKABLE STAT CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {DATA.stats.map((stat, i) => (
          <div 
            key={i} 
            onClick={() => navigate(stat.linkTo)}
            style={{ 
              backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
              border: '1px solid transparent', transition: '0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = stat.color}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}
          >
            <div>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '4px' }}>{stat.label}</p>
              <h3 style={{ fontSize: '2rem', margin: 0, color: '#0f172a' }}>{stat.value}</h3>
              <span style={{ fontSize: '0.75rem', color: stat.color, fontWeight: '500' }}>Click to view →</span>
            </div>
            <div style={{ color: stat.color, backgroundColor: `${stat.color}15`, padding: '12px', borderRadius: '12px' }}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>
      
      {/* DASHBOARD WIDGETS */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
             <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Priority Watchlist</h3>
             <button onClick={() => navigate('ProjectList')} style={{ color: '#3b82f6', background: 'none', border: 'none', fontWeight: '600', cursor: 'pointer' }}>View All Projects</button>
          </div>
          {DATA.projects.slice(0, 3).map((p) => (
            <div 
              key={p.id} 
              onClick={() => navigate('ProjectDetail', p)}
              style={{ marginBottom: '12px', padding: '12px', border: '1px solid #f1f5f9', borderRadius: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div>
                <span style={{ fontWeight: '600', display: 'block' }}>{p.name}</span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{p.region} • {p.lead}</span>
              </div>
              <ArrowLeft size={16} style={{ transform: 'rotate(180deg)', color: '#cbd5e1' }} />
            </div>
          ))}
        </div>
        
        <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '20px', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <BrainCircuit size={20} color="#3b82f6" />
            <h3 style={{ margin: 0 }}>System Status</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
             <CheckCircle2 color="#10b981" /> <span>Planner-IQ Engine: <strong>Online</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
             <CheckCircle2 color="#10b981" /> <span>Database (East Windsor): <strong>Connected</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
             <AlertTriangle color="#f59e0b" /> <span>Vercel Deployments: <strong>Stabilizing</strong></span>
          </div>
          <button onClick={() => navigate('SystemHealth')} style={{ marginTop: '10px', width: '100%', padding: '10px', backgroundColor: '#334155', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Run Diagnostics</button>
        </div>
      </div>
    </div>
  );

  const ProjectListView = () => (
    <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '20px', minHeight: '60vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>All Active Projects ({DATA.projects.length})</h2>
        <button onClick={() => navigate('Dashboard')} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>Back to Home</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f1f5f9', textAlign: 'left', color: '#64748b' }}>
            <th style={{ padding: '16px' }}>Project Name</th>
            <th style={{ padding: '16px' }}>Region</th>
            <th style={{ padding: '16px' }}>Lead</th>
            <th style={{ padding: '16px' }}>Progress</th>
            <th style={{ padding: '16px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {DATA.projects.map((p) => (
            <tr key={p.id} onClick={() => navigate('ProjectDetail', p)} style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: '0.1s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}>
              <td style={{ padding: '16px', fontWeight: '500' }}>{p.name}</td>
              <td style={{ padding: '16px', color: '#64748b' }}>{p.region}</td>
              <td style={{ padding: '16px' }}>{p.lead}</td>
              <td style={{ padding: '16px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <div style={{ width: '80px', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px' }}>
                     <div style={{ width: `${p.progress}%`, height: '100%', backgroundColor: p.progress === 100 ? '#10b981' : '#3b82f6', borderRadius: '3px' }}></div>
                   </div>
                   <span style={{ fontSize: '0.8rem' }}>{p.progress}%</span>
                 </div>
              </td>
              <td style={{ padding: '16px', color: '#3b82f6' }}>View Details</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const ProjectDetailView = ({ project }) => (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <button onClick={() => navigate('ProjectList')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', marginBottom: '24px' }}>
        <ArrowLeft size={18} /> Back to Projects
      </button>
      
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '32px' }}>
          <div>
            <span style={{ color: '#3b82f6', fontWeight: '600', fontSize: '0.9rem' }}>PROJECT ID: #PIQ-{project.id}00</span>
            <h1 style={{ fontSize: '2.5rem', margin: '8px 0', color: '#0f172a' }}>{project.name}</h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Lead: {project.lead} | Region: {project.region}</p>
          </div>
          <span style={{ padding: '8px 16px', borderRadius: '20px', backgroundColor: project.status === 'Active' ? '#dcfce7' : '#fee2e2', color: project.status === 'Active' ? '#166534' : '#991b1b', fontWeight: '600' }}>
            {project.status}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '40px' }}>
          <div style={{ padding: '24px', backgroundColor: '#f8fafc', borderRadius: '16px' }}>
            <h3 style={{ marginTop: 0, color: '#475569' }}>Financials</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{project.budget}</p>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Allocated Budget</p>
          </div>
          <div style={{ padding: '24px', backgroundColor: '#f8fafc', borderRadius: '16px' }}>
            <h3 style={{ marginTop: 0, color: '#475569' }}>Next Milestone</h3>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>{project.nextStep}</p>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Action Required</p>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '16px' }}>Completion Status ({project.progress}%)</h3>
          <div style={{ width: '100%', height: '24px', backgroundColor: '#f1f5f9', borderRadius: '12px', overflow: 'hidden' }}>
             <div style={{ width: `${project.progress}%`, height: '100%', backgroundColor: '#3b82f6', transition: 'width 1s ease' }}></div>
          </div>
        </div>
      </div>
    </div>
  );

  const ResourceListView = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
      {DATA.resources.map((r) => (
        <div 
          key={r.id} 
          onClick={() => navigate('ResourceDetail', r)}
          style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', cursor: 'pointer', transition: '0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
          onMouseOut={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#64748b', fontSize: '1.2rem' }}>
              {r.name.charAt(0)}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{r.name}</h3>
              <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>{r.role}</p>
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
              <span>Capacity</span>
              <span style={{ fontWeight: 'bold', color: r.utilization > 90 ? '#ef4444' : '#10b981' }}>{r.utilization}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px' }}>
               <div style={{ width: `${r.utilization}%`, height: '100%', backgroundColor: r.utilization > 90 ? '#ef4444' : '#10b981', borderRadius: '4px' }}></div>
            </div>
          </div>
          <span style={{ display: 'block', textAlign: 'center', color: '#3b82f6', fontSize: '0.9rem', fontWeight: '500' }}>Click for Profile</span>
        </div>
      ))}
    </div>
  );

  const ResourceDetailView = ({ resource }) => (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <button onClick={() => navigate('ResourceList')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', marginBottom: '24px' }}>
        <ArrowLeft size={18} /> Back to Team
      </button>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '20px', textAlign: 'center' }}>
        <div style={{ width: '100px', height: '100px', margin: '0 auto 24px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: '#64748b' }}>
          {resource.name.charAt(0)}
        </div>
        <h1 style={{ margin: '0 0 8px 0' }}>{resource.name}</h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '24px' }}>{resource.role} • {resource.location}</p>
        
        <div style={{ textAlign: 'left', backgroundColor: '#f8fafc', padding: '24px', borderRadius: '16px', marginBottom: '24px' }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#475569' }}>Current Assignment</h4>
          <p style={{ margin: 0, fontWeight: '500', fontSize: '1.1rem' }}>{resource.currentTask}</p>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderTop: '1px solid #f1f5f9' }}>
          <span>Utilization</span>
          <span style={{ fontWeight: 'bold', color: resource.utilization > 90 ? '#ef4444' : '#10b981' }}>{resource.utilization}%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderTop: '1px solid #f1f5f9' }}>
          <span>Status</span>
          <span>{resource.status}</span>
        </div>
      </div>
    </div>
  );

  const AutomationView = () => (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate('Dashboard')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', marginBottom: '24px' }}>
        <ArrowLeft size={18} /> Back to Dashboard
      </button>
      <div style={{ backgroundColor: '#0f172a', color: 'white', borderRadius: '20px', padding: '32px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ padding: '12px', backgroundColor: '#3b82f6', borderRadius: '12px' }}>
            <Zap size={24} color="white" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Automated Operations</h2>
            <p style={{ color: '#94a3b8', margin: '4px 0 0' }}>Task Optimization Engine</p>
          </div>
        </div>
        <button 
             onClick={() => { setIsSimulating(true); setTimeout(() => setIsSimulating(false), 2000); }}
             style={{ width: '100%', padding: '16px', backgroundColor: '#3b82f6', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
           >
             {isSimulating ? <BrainCircuit className="animate-spin" /> : <BrainCircuit />}
             {isSimulating ? "Optimizing Workflows..." : "Run Daily Optimization"}
        </button>
      </div>

      <h3 style={{ marginLeft: '8px', marginBottom: '16px', color: '#64748b' }}>Pending Tasks ({DATA.tasks.length})</h3>
      {DATA.tasks.map((t) => (
        <div key={t.id} style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
          <div style={{ minWidth: '80px', paddingTop: '4px', textAlign: 'right', fontWeight: 'bold', color: '#64748b' }}>{t.time}</div>
          <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: `4px solid ${t.type === 'Urgent' ? '#ef4444' : '#3b82f6'}` }}>
             <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>{t.task}</h4>
             <span style={{ fontSize: '0.8rem', backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: '12px', color: '#64748b' }}>{t.type}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const SystemHealthView = () => (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
       <ShieldCheck size={64} color="#10b981" style={{ marginBottom: '24px' }} />
       <h2>System Healthy</h2>
       <p style={{ color: '#64748b' }}>All Planner-IQ systems are operational.</p>
       <button onClick={() => navigate('Dashboard')} style={{ marginTop: '20px', padding: '10px 20px', border: '1px solid #cbd5e1', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>Return Home</button>
    </div>
  );

  // --- MAIN RENDER ---
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f4f7fb', fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden' }}>
      
      {/* SIDEBAR */}
      <aside style={{ 
        width: sidebarOpen ? '280px' : '80px', backgroundColor: '#0f172a', color: 'white', 
        padding: '24px 16px', transition: 'width 0.3s ease', display: 'flex', flexDirection: 'column', flexShrink: 0 
      }}>
        {/* LOGO: CSS STYLED (NO IMAGE FILE NEEDED) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <div style={{ backgroundColor: '#0070f3', padding: '10px', borderRadius: '12px', minWidth: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={24} color="white" fill="white" />
          </div>
          {sidebarOpen && (
            <div style={{ lineHeight: '1.1' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', display: 'block' }}>Planner-IQ</span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', letterSpacing: '1px' }}>ELITE EDITION</span>
            </div>
          )}
        </div>

        <nav style={{ flex: 1 }}>
          {[
            { id: 'Dashboard', icon: LayoutDashboard },
            { id: 'ProjectList', label: 'Projects', icon: Calendar },
            { id: 'ResourceList', label: 'Resources', icon: Globe },
            { id: 'AutomationView', label: 'Automations', icon: BrainCircuit },
            { id: 'SystemHealth', label: 'System Status', icon: Settings }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 16px', marginBottom: '8px',
                borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '0.95rem',
                backgroundColor: view === item.id ? '#334155' : 'transparent',
                color: view === item.id ? '#60a5fa' : '#94a3b8', transition: '0.2s', textAlign: 'left', overflow: 'hidden', whiteSpace: 'nowrap'
              }}
            >
              <item.icon size={22} style={{ minWidth: '22px' }} />
              {sidebarOpen && <span>{item.label || item.id}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* RIGHT SIDE */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <header style={{ height: '70px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><Menu size={24} /></button>
            <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: '700', color: '#0f172a' }}>
              {view === 'ProjectList' ? 'Projects' : view === 'ProjectDetail' ? 'Project Details' : view}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#eff6ff', padding: '8px 16px', borderRadius: '20px', color: '#2563eb', fontSize: '0.85rem', fontWeight: '600' }}>
               <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563eb' }}></div>
               Live Demo
             </div>
             <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setNotifications(0)}>
               <Bell size={22} color="#64748b" />
               {notifications > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: '#ef4444', color: 'white', fontSize: '10px', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{notifications}</span>}
             </div>
          </div>
        </header>

        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          {view === 'Dashboard' && <DashboardView />}
          {view === 'ProjectList' && <ProjectListView />}
          {view === 'ProjectDetail' && <ProjectDetailView project={selectedItem} />}
          {view === 'ResourceList' && <ResourceListView />}
          {view === 'ResourceDetail' && <ResourceDetailView resource={selectedItem} />}
          {view === 'AutomationView' && <AutomationView />}
          {view === 'SystemHealth' && <SystemHealthView />}
        </main>
      </div>
    </div>
  );
}
