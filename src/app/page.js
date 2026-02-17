"use client";
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Calendar, Globe, BrainCircuit, TrendingUp, Settings, 
  Menu, Bell, Zap, ListTodo, ShieldCheck, CheckSquare, Square,
  Users, ArrowLeft, Clock, CheckCircle2, AlertTriangle, X, Mail, Phone, 
  ChevronRight, Search, Filter, MoreVertical, Plus, ExternalLink, Download,
  Briefcase, BarChart4, PieChart, Activity, Map, Tool, CreditCard, Layers
} from 'lucide-react';

// --- FULL DATA ARCHITECTURE: MID-ATLANTIC OPERATIONS ---
const DATA = {
  stats: [
    { id: 'projects', label: "Active Projects", value: "8", icon: TrendingUp, color: "#3b82f6", linkTo: 'ProjectList', trend: "+12%" },
    { id: 'tasks', label: "Pending Tasks", value: "24", icon: ListTodo, color: "#8b5cf6", linkTo: 'AutomationView', trend: "-4%" },
    { id: 'team', label: "Team Utilization", value: "78%", icon: Users, color: "#ec4899", linkTo: 'ResourceList', trend: "Optimal" },
    { id: 'health', label: "System Health", value: "98%", icon: ShieldCheck, color: "#10b981", linkTo: 'SystemHealth', trend: "Stable" }
  ],
  projects: [
    { 
      id: 1, name: "Skilled Trades: NJ Rollout", status: "Active", progress: 85, region: "North NJ", lead: "Dan Sims", budget: "$1,240,000", spent: "$980,000",
      description: "Aggressive expansion of skilled trades recruitment hubs across Newark and Jersey City.",
      tasks: [
        { id: 101, title: "Finalize Newark Hub Lease Agreement", assignee: "Dan Sims", due: "Feb 20", status: "Pending", priority: "High", category: "Legal" },
        { id: 102, title: "Onboard 3 Senior Skilled Recruiters", assignee: "Mike R.", due: "Feb 25", status: "Done", priority: "Medium", category: "HR" },
        { id: 103, title: "Deploy Regional KPI Dashboard v2", assignee: "Sarah J.", due: "Feb 28", status: "Pending", priority: "High", category: "Tech" },
        { id: 104, title: "Safety Protocol Audit: Newark Site", assignee: "Kareen S.", due: "Mar 02", status: "Pending", priority: "High", category: "Operations" },
        { id: 105, title: "Community Outreach: Local Unions", assignee: "Dan Sims", due: "Mar 05", status: "Pending", priority: "Medium", category: "Marketing" }
      ]
    },
    { 
      id: 2, name: "East Windsor Logistics Hub", status: "Planning", progress: 30, region: "Central NJ", lead: "Ops Team", budget: "$450,000", spent: "$120,000",
      description: "Development of a centralized logistics and supply chain management center in East Windsor.",
      tasks: [
        { id: 201, title: "Zoning Permit Final Review", assignee: "Legal", due: "Mar 05", status: "Pending", priority: "High", category: "Legal" },
        { id: 202, title: "Site Safety & HVAC Inspection", assignee: "Mike R.", due: "Mar 12", status: "Pending", priority: "Medium", category: "Operations" },
        { id: 203, title: "Select Local Logistics Vendor", assignee: "Sarah J.", due: "Mar 18", status: "Pending", priority: "Low", category: "Procurement" },
        { id: 204, title: "Warehouse Flooring Installation", assignee: "Ops Team", due: "Apr 01", status: "Pending", priority: "Medium", category: "Construction" }
      ]
    },
    { id: 3, name: "Recruit-IQ API Integration", status: "Delayed", progress: 45, region: "Corporate", lead: "Tech Div", budget: "$200,000", spent: "$180,000", description: "Connecting core logic to the candidate matching engine.", tasks: [] },
    { id: 4, name: "Q1 Executive Search Hub", status: "Complete", progress: 100, region: "Metro", lead: "Dan Sims", budget: "N/A", spent: "N/A", description: "Direct hire executive placement search.", tasks: [] },
    { id: 5, name: "Mid-Atlantic Vendor Sync", status: "Active", progress: 60, region: "Mid-Atlantic", lead: "Sarah J.", budget: "$75,000", spent: "$40,000", description: "Regional partner alignment and supply chain review.", tasks: [] },
    { id: 6, name: "Compliance Audit 2026", status: "Active", progress: 15, region: "Corporate", lead: "Legal", budget: "$50,000", spent: "$5,000", description: "Regulatory review for Skilled Trades divisions.", tasks: [] },
    { id: 7, name: "South NJ Field Expansion", status: "Planning", progress: 5, region: "South NJ", lead: "Mike R.", budget: "$300,000", spent: "$0", description: "Expansion into Camden and Cherry Hill markets.", tasks: [] },
    { id: 8, name: "Planner-IQ Elite v2 Launch", status: "Active", progress: 92, region: "Remote", lead: "Dev Team", budget: "$150,000", spent: "$145,000", description: "Final UI deployment and Vercel stabilization.", tasks: [] }
  ],
  resources: [
    { id: 101, name: "Kareen S.", role: "Senior Analyst", utilization: 92, status: "Overloaded", currentTask: "Financial Modeling", location: "East Windsor", contact: "kareen@planner-iq.com", experience: "12 Yrs" },
    { id: 102, name: "Mike R.", role: "Field Recruiter", utilization: 65, status: "Available", currentTask: "Candidate Screening", location: "Remote", contact: "mike@planner-iq.com", experience: "8 Yrs" },
    { id: 103, name: "Sarah J.", role: "Compliance Officer", utilization: 40, status: "Available", currentTask: "Audit Prep", location: "Corporate", contact: "sarah@planner-iq.com", experience: "15 Yrs" }
  ],
  eaTasks: [
    { id: 't1', time: "09:00 AM", task: "Review Mid-Atlantic KPI Report", type: "Urgent", status: "Pending", duration: "30m" },
    { id: 't2', time: "11:30 AM", task: "Skilled Trades Budget Approval", type: "Standard", status: "Pending", duration: "45m" },
    { id: 't3', time: "02:15 PM", task: "Vercel Deployment Sync", type: "Tech", status: "In Progress", duration: "15m" },
    { id: 't4', time: "04:00 PM", task: "Executive Summary Write-up", type: "Standard", status: "Pending", duration: "1h" }
  ]
};

export default function PlannerIQEliteFull() {
  const [view, setView] = useState('Dashboard');
  const [selectedItem, setSelectedItem] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(3);
  const [isSimulating, setIsSimulating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigate = (targetView, itemData = null) => {
    setSelectedItem(itemData);
    setView(targetView);
  };

  if (!mounted) return null;

  // --- SUB-VIEW COMPONENTS ---

  const DashboardView = () => (
    <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
        {DATA.stats.map((stat, i) => (
          <div key={i} onClick={() => navigate(stat.linkTo)} style={{ backgroundColor: 'white', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', cursor: 'pointer', transition: '0.3s transform ease', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ color: stat.color, backgroundColor: `${stat.color}15`, padding: '12px', borderRadius: '12px' }}>
                <stat.icon size={24} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: stat.trend.includes('+') ? '#10b981' : stat.trend === 'Optimal' ? '#3b82f6' : '#64748b' }}>{stat.trend}</span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>{stat.label}</p>
            <h3 style={{ fontSize: '2.2rem', margin: '4px 0 0', color: '#0f172a', fontWeight: '800' }}>{stat.value}</h3>
          </div>
        ))}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr', gap: '24px' }}>
        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: '800' }}>Active Roadmap: NJ Skilled Trades</h3>
            <button onClick={() => navigate('ProjectList')} style={{ padding: '8px 16px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' }}>MASTER LIST</button>
          </div>
          {DATA.projects.slice(0, 5).map((p) => (
            <div key={p.id} onClick={() => navigate('ProjectDetail', p)} style={{ marginBottom: '12px', padding: '18px', border: '1px solid #f1f5f9', borderRadius: '16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: '0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: p.progress === 100 ? '#dcfce7' : '#eff6ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {p.progress === 100 ? <CheckCircle2 color="#10b981" size={20} /> : <Activity color="#3b82f6" size={20} />}
                </div>
                <div>
                  <span style={{ fontWeight: '700', fontSize: '1rem', color: '#1e293b', display: 'block' }}>{p.name}</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Lead: {p.lead}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{p.progress}%</span>
                <div style={{ width: '100px', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px', marginTop: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${p.progress}%`, height: '100%', backgroundColor: p.progress === 100 ? '#10b981' : '#3b82f6' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ backgroundColor: '#0f172a', padding: '32px', borderRadius: '24px', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <Calendar size={22} color="#3b82f6" />
            <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: '800' }}>Executive Pulse</h3>
          </div>
          {[
            { label: "NEXT MEETING", value: "3:00 PM EST", icon: Clock, color: "#10b981", detail: "Skilled Trades Budget" },
            { label: "PRIORITY MAIL", value: "12 UNREAD", icon: Mail, color: "#3b82f6", detail: "Review Ops Hub" },
            { label: "CALLBACKS", value: "2 PENDING", icon: Phone, color: "#8b5cf6", detail: "Division Leads" }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '14px' }}><item.icon color={item.color} size={20} /></div>
              <div>
                <p style={{ margin: 0, fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', letterSpacing: '1px' }}>{item.label}</p>
                <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.1rem' }}>{item.value}</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>{item.detail}</p>
              </div>
            </div>
          ))}
          <div style={{ padding: '20px', backgroundColor: '#1e293b', borderRadius: '20px', borderLeft: '4px solid #3b82f6', marginTop: '10px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <BrainCircuit size={18} color="#3b82f6" />
                <span style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '0.75rem' }}>EA LOGIC SUGGESTION</span>
             </div>
             <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: '1.5', color: '#e2e8f0' }}>"North NJ logistics deep-dive required before tomorrow's board sync. Block 4:00 PM."</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ProjectDetailView = ({ project }) => (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <button onClick={() => navigate('ProjectList')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontWeight: '800' }}>
          <ArrowLeft size={20} /> MASTER OPERATIONS
        </button>
        <div style={{ display: 'flex', gap: '12px' }}>
           <button style={{ padding: '10px 20px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Download size={18} /> Export</button>
           <button style={{ padding: '10px 24px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>EDIT ROADMAP</button>
        </div>
      </div>
      
      <div style={{ backgroundColor: 'white', padding: '48px', borderRadius: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3b82f6', fontWeight: 'bold', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '12px' }}>
              <Zap size={16} fill="#3b82f6" /> DIVISION ID: #PIQ-{project.id}00
            </div>
            <h1 style={{ fontSize: '3.2rem', margin: '0 0 12px 0', color: '#0f172a', letterSpacing: '-1.5px', fontWeight: '900' }}>{project.name}</h1>
            <p style={{ color: '#64748b', fontSize: '1.2rem', maxWidth: '600px' }}>{project.description}</p>
          </div>
          <span style={{ padding: '12px 28px', borderRadius: '40px', backgroundColor: project.status === 'Active' ? '#dcfce7' : project.status === 'Delayed' ? '#fee2e2' : '#fef3c7', color: project.status === 'Active' ? '#166534' : project.status === 'Delayed' ? '#991b1b' : '#92400e', fontWeight: '900', fontSize: '1rem' }}>
            {project.status.toUpperCase()}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
          {[
            { label: "ALLOCATED BUDGET", value: project.budget || "TBD", icon: CreditCard },
            { label: "CAPITAL SPENT", value: project.spent || "$0", icon: TrendingUp },
            { label: "GEO-FOCUS", value: project.region, icon: Map },
            { label: "RESOURCE STATUS", value: "High Utilization", icon: Users }
          ].map((item, idx) => (
            <div key={idx} style={{ padding: '28px', backgroundColor: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
               <div style={{ color: '#3b82f6', marginBottom: '12px' }}><item.icon size={20} /></div>
               <p style={{ margin: 0, color: '#64748b', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.5px' }}>{item.label}</p>
               <p style={{ margin: '8px 0 0', fontSize: '1.5rem', fontWeight: '900', color: '#1e293b' }}>{item.value}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#f8fafc', padding: '32px', borderRadius: '24px' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: '#475569' }}>Operational Phase Progression</h3>
              <span style={{ fontWeight: '900', color: '#0f172a', fontSize: '1.2rem' }}>{project.progress}%</span>
           </div>
           <div style={{ width: '100%', height: '18px', backgroundColor: '#e2e8f0', borderRadius: '9px', overflow: 'hidden' }}>
              <div style={{ width: `${project.progress}%`, height: '100%', backgroundColor: '#3b82f6', transition: 'width 2s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
           </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '32px', padding: '40px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
           <div>
             <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#0f172a', fontWeight: '900' }}>Strategic Milestones</h3>
             <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '1rem' }}>Granular task management for regional division rollout.</p>
           </div>
           <button style={{ padding: '14px 28px', backgroundColor: '#f1f5f9', color: '#0f172a', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
             <Plus size={20} /> NEW ACTION ITEM
           </button>
        </div>
        
        {project.tasks && project.tasks.length > 0 ? (
          project.tasks.map((task) => (
            <div key={task.id} style={{ display: 'flex', alignItems: 'center', padding: '28px', borderBottom: '1px solid #f1f5f9', gap: '24px', transition: '0.2s' }}>
               <div style={{ cursor: 'pointer', color: task.status === 'Done' ? '#10b981' : '#cbd5e1' }}>
                 {task.status === 'Done' ? <CheckSquare size={30} /> : <Square size={30} />}
               </div>
               <div style={{ flex: 1 }}>
                 <span style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 'bold', textTransform: 'uppercase' }}>{task.category}</span>
                 <span style={{ display: 'block', fontSize: '1.3rem', fontWeight: '700', textDecoration: task.status === 'Done' ? 'line-through' : 'none', color: task.status === 'Done' ? '#94a3b8' : '#0f172a', marginTop: '4px' }}>{task.title}</span>
                 <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
                    <span style={{ fontSize: '0.9rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={16} /> Owner: <strong>{task.assignee}</strong></span>
                    <span style={{ fontSize: '0.9rem', color: task.priority === 'High' ? '#ef4444' : '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}><AlertTriangle size={16} /> Priority: <strong>{task.priority}</strong></span>
                 </div>
               </div>
               <div style={{ textAlign: 'right', minWidth: '120px' }}>
                 <span style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>DEADLINE</span>
                 <span style={{ fontWeight: '900', color: task.status === 'Done' ? '#94a3b8' : '#0f172a', fontSize: '1.2rem' }}>{task.due}</span>
               </div>
               <button style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}><MoreVertical size={24} /></button>
            </div>
          ))
        ) : (
          <div style={{ padding: '100px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '24px', border: '3px dashed #e2e8f0' }}>
            <ListTodo size={60} style={{ marginBottom: '24px', opacity: 0.1, color: '#0f172a' }} />
            <h4 style={{ margin: 0, color: '#475569', fontSize: '1.2rem' }}>No Active Division Milestones</h4>
            <p style={{ color: '#94a3b8', margin: '12px 0 32px 0', fontSize: '1.1rem' }}>Initiate the next phase of the operational roadmap.</p>
            <button style={{ color: '#3b82f6', background: 'white', border: '1px solid #3b82f6', padding: '12px 24px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>START NEW PHASE</button>
          </div>
        )}
      </div>
    </div>
  );

  const ResourceListView = () => (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
       <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '32px' }}>Mid-Atlantic Resource Allocation</h2>
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '32px' }}>
        {DATA.resources.map((r) => (
          <div key={r.id} onClick={() => navigate('ResourceDetail', r)} style={{ backgroundColor: 'white', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0', cursor: 'pointer', transition: '0.2s', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '18px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#0f172a', fontSize: '1.5rem', border: '2px solid white', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>{r.name.charAt(0)}</div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '800' }}>{r.name}</h3>
                <p style={{ margin: 0, color: '#64748b', fontSize: '1rem', fontWeight: '500' }}>{r.role}</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
              <span style={{ color: '#64748b', fontWeight: 'bold' }}>ACTIVE UTILIZATION</span>
              <span style={{ fontWeight: '900', color: r.utilization > 90 ? '#ef4444' : '#10b981' }}>{r.utilization}%</span>
            </div>
            <div style={{ width: '100%', height: '12px', backgroundColor: '#f1f5f9', borderRadius: '6px', overflow: 'hidden' }}>
               <div style={{ width: `${r.utilization}%`, height: '100%', backgroundColor: r.utilization > 90 ? '#ef4444' : '#10b981', transition: 'width 1s ease' }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AutomationView = () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', animation: 'fadeIn 0.5s ease' }}>
      <div style={{ backgroundColor: '#0f172a', borderRadius: '32px', padding: '60px', color: 'white', textAlign: 'center', marginBottom: '48px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
         <div style={{ width: '90px', height: '90px', backgroundColor: '#3b82f6', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 10px 20px rgba(59, 130, 246, 0.4)' }}>
            <BrainCircuit size={48} color="white" />
         </div>
         <h2 style={{ fontSize: '2.8rem', margin: '0 0 16px 0', fontWeight: '900' }}>EA Logic Engine Active</h2>
         <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px' }}>AI-driven operational synchronization for the Mid-Atlantic Skilled Trades Division.</p>
         <button onClick={() => { setIsSimulating(true); setTimeout(() => setIsSimulating(false), 2000); }} style={{ padding: '20px 48px', backgroundColor: '#3b82f6', border: 'none', borderRadius: '18px', color: 'white', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', transition: '0.2s', boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)' }}>
           {isSimulating ? "OPTIMIZING..." : "EXECUTE DAILY SYNC"}
         </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
         {DATA.eaTasks.map((t, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '32px', backgroundColor: 'white', padding: '32px', borderRadius: '24px', borderLeft: `8px solid ${t.type === 'Urgent' ? '#ef4444' : '#3b82f6'}`, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
               <div style={{ fontWeight: '900', minWidth: '100px', fontSize: '1.1rem', color: '#1e293b' }}>{t.time}</div>
               <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '1.4rem', fontWeight: '800' }}>{t.task}</h4>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', padding: '4px 12px', backgroundColor: t.type === 'Urgent' ? '#fee2e2' : '#eff6ff', color: t.type === 'Urgent' ? '#ef4444' : '#3b82f6', borderRadius: '20px', fontWeight: 'bold' }}>{t.type.toUpperCase()} STATUS</span>
                    <span style={{ fontSize: '0.9rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> Duration: {t.duration}</span>
                  </div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );

  // --- MASTER SCAFFOLD ---
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f4f7fb', fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden' }}>
      
      {/* ELITE SIDEBAR */}
      <aside style={{ width: sidebarOpen ? '320px' : '100px', backgroundColor: '#0f172a', color: 'white', padding: '40px 24px', transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '60px', overflow: 'hidden' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
             <img src="/logo.png" alt="" style={{ width: '56px', height: '56px', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
             <div style={{ display: 'none', backgroundColor: '#0070f3', padding: '14px', borderRadius: '16px', width: '56px', height: '56px', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0, 112, 243, 0.3)' }}>
               <Zap size={30} color="white" fill="white" />
             </div>
          </div>
          {sidebarOpen && (
            <div style={{ lineHeight: '1', whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: '900', display: 'block', letterSpacing: '-1.5px' }}>Planner-IQ</span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', letterSpacing: '3px', fontWeight: 'bold', marginTop: '6px', display: 'block' }}>ELITE MASTER</span>
            </div>
          )}
        </div>

        <nav style={{ flex: 1 }}>
          {[
            { id: 'Dashboard', icon: LayoutDashboard, label: 'Control Center' },
            { id: 'ProjectList', label: 'Operational Roadmap', icon: Map },
            { id: 'ResourceList', label: 'Team Capacity', icon: Globe },
            { id: 'AutomationView', label: 'EA Logic Engine', icon: BrainCircuit },
            { id: 'Financials', label: 'Budget Tracker', icon: CreditCard },
            { id: 'SystemHealth', label: 'System Integrity', icon: ShieldCheck }
          ].map((item) => (
            <button key={item.id} onClick={() => navigate(item.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '20px', padding: '20px 24px', marginBottom: '12px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '1.1rem', backgroundColor: view === item.id ? '#1e293b' : 'transparent', color: view === item.id ? '#60a5fa' : '#94a3b8', transition: '0.2s', textAlign: 'left', fontWeight: '700' }}>
              <item.icon size={28} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div style={{ marginTop: 'auto', padding: '24px', backgroundColor: '#1e293b', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #334155' }}>
             <div style={{ width: '52px', height: '52px', borderRadius: '16px', backgroundColor: '#0070f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1.2rem', boxShadow: '0 4px 12px rgba(0, 112, 243, 0.4)' }}>DS</div>
             <div>
               <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '900' }}>Dan Sims</p>
               <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', fontWeight: 'bold' }}>EXECUTIVE LEAD</p>
             </div>
          </div>
        )}
      </aside>

      {/* VIEWPORT */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <header style={{ height: '100px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 56px', flexShrink: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><Menu size={32} /></button>
            <div style={{ width: '2px', height: '36px', backgroundColor: '#e2e8f0' }}></div>
            <h2 style={{ fontSize: '1.8rem', margin: 0, fontWeight: '900', color: '#0f172a', letterSpacing: '-1px' }}>
              {view === 'ProjectList' ? 'Master Operational Roadmap' : view === 'ProjectDetail' ? 'Division Operational Sync' : view}
            </h2>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '14px', backgroundColor: '#eff6ff', padding: '16px 32px', borderRadius: '40px', color: '#2563eb', fontSize: '1.1rem', fontWeight: '900', boxShadow: '0 4px 6px rgba(37, 99, 235, 0.1)' }}>
               <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#2563eb', boxShadow: '0 0 12px rgba(37, 99, 235, 0.6)' }}></div>
               EA SECURE MODE
             </div>
             <div style={{ position: 'relative', cursor: 'pointer', color: '#64748b' }} onClick={() => setNotifications(0)}>
               <Bell size={32} />
               {notifications > 0 && <span style={{ position: 'absolute', top: '-10px', right: '-10px', backgroundColor: '#ef4444', color: 'white', fontSize: '13px', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', border: '3px solid white' }}>{notifications}</span>}
             </div>
          </div>
        </header>

        <main style={{ flex: 1, padding: '56px', overflowY: 'auto', scrollBehavior: 'smooth' }}>
          {view === 'Dashboard' && <DashboardView />}
          {view === 'ProjectList' && (
            <div style={{ backgroundColor: 'white', padding: '48px', borderRadius: '32px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '48px' }}>
                  <h2 style={{ margin: 0, fontSize: '2.2rem', fontWeight: '900' }}>Division Operations</h2>
                  <div style={{ display: 'flex', gap: '20px' }}>
                     <div style={{ position: 'relative' }}>
                        <Search size={24} style={{ position: 'absolute', left: '18px', top: '18px', color: '#94a3b8' }} />
                        <input type="text" placeholder="Filter regional roadmaps..." style={{ padding: '20px 20px 20px 60px', borderRadius: '20px', border: '1px solid #e2e8f0', fontSize: '1.1rem', width: '400px', fontWeight: '500' }} />
                     </div>
                  </div>
               </div>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1px', backgroundColor: '#f1f5f9', borderRadius: '24px', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
               {DATA.projects.map(p => (
                 <div key={p.id} onClick={() => navigate('ProjectDetail', p)} style={{ padding: '40px', backgroundColor: 'white', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: '0.2s' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                      <div style={{ width: '64px', height: '64px', borderRadius: '20px', backgroundColor: p.status === 'Active' ? '#effaf3' : p.status === 'Delayed' ? '#fff1f2' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <Briefcase size={30} color={p.status === 'Active' ? '#10b981' : p.status === 'Delayed' ? '#ef4444' : '#64748b'} />
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.6rem', color: '#0f172a', fontWeight: '800' }}>{p.name}</h3>
                        <p style={{ margin: '8px 0 0', color: '#64748b', fontSize: '1.1rem', fontWeight: '500' }}>Division: <strong>{p.region}</strong> | Executive Lead: <strong>{p.lead}</strong></p>
                      </div>
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
                      <div style={{ textAlign: 'right', minWidth: '220px' }}>
                        <p style={{ margin: 0, fontWeight: '900', color: '#0f172a', fontSize: '1.4rem' }}>{p.progress}% Completed</p>
                        <div style={{ width: '100%', height: '12px', backgroundColor: '#f1f5f9', borderRadius: '6px', marginTop: '12px', overflow: 'hidden' }}>
                           <div style={{ width: `${p.progress}%`, height: '100%', backgroundColor: p.status === 'Active' ? '#10b981' : p.status === 'Delayed' ? '#ef4444' : '#3b82f6' }}></div>
                        </div>
                      </div>
                      <ChevronRight size={32} color="#cbd5e1" />
                   </div>
                 </div>
               ))}
               </div>
            </div>
          )}
          {view === 'ProjectDetail' && <ProjectDetailView project={selectedItem} />}
          {view === 'ResourceList' && <ResourceListView />}
          {view === 'AutomationView' && <AutomationView />}
          {view === 'SystemHealth' && <div style={{ textAlign: 'center', padding: '140px 40px' }}><ShieldCheck size={120} color="#10b981" /><h1 style={{ fontSize: '4rem', marginTop: '32px', fontWeight: '900' }}>98.4% Operational</h1><p style={{ fontSize: '1.5rem', color: '#64748b' }}>All Planner-IQ systems in East Windsor are secure.</p></div>}
        </main>
      </div>
    </div>
  );
}
