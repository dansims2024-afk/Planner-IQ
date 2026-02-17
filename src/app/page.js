"use client";
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Calendar, Globe, BrainCircuit, TrendingUp, Settings, 
  Menu, Bell, Zap, ListTodo, ShieldCheck, CheckSquare, Square,
  Users, ArrowLeft, Clock, CheckCircle2, AlertTriangle, X, Mail, Phone, 
  ChevronRight, Search, Filter, MoreVertical, Plus, ExternalLink, Download,
  Briefcase, BarChart4, PieChart, Activity, Map, CreditCard, Layers, 
  Truck, Building2, HardHat, FileText
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
      description: "Aggressive expansion of skilled trades recruitment hubs across Newark and Jersey City. Focus on localized union partnerships and high-volume placement.",
      tasks: [
        { id: 101, title: "Finalize Newark Hub Lease Agreement", assignee: "Dan Sims", due: "Feb 20", status: "Pending", priority: "High", category: "Legal" },
        { id: 102, title: "Onboard 3 Senior Skilled Recruiters", assignee: "Mike R.", due: "Feb 25", status: "Done", priority: "Medium", category: "HR" },
        { id: 103, title: "Deploy Regional KPI Dashboard v2", assignee: "Sarah J.", due: "Feb 28", status: "Pending", priority: "High", category: "Tech" },
        { id: 104, title: "Safety Protocol Audit: Newark Site", assignee: "Kareen S.", due: "Mar 02", status: "Pending", priority: "High", category: "Operations" },
        { id: 105, title: "Community Outreach: Local Unions", assignee: "Dan Sims", due: "Mar 05", status: "Pending", priority: "Medium", category: "Marketing" },
        { id: 106, title: "Initial Talent Pool Vector Sync", assignee: "Dev Team", due: "Mar 08", status: "Pending", priority: "Low", category: "Tech" }
      ]
    },
    { 
      id: 2, name: "East Windsor Logistics Hub", status: "Planning", progress: 30, region: "Central NJ", lead: "Ops Team", budget: "$450,000", spent: "$120,000",
      description: "Development of a centralized logistics and supply chain management center in East Windsor to support Mid-Atlantic distribution sync.",
      tasks: [
        { id: 201, title: "Zoning Permit Final Review", assignee: "Legal", due: "Mar 05", status: "Pending", priority: "High", category: "Legal" },
        { id: 202, title: "Site Safety & HVAC Inspection", assignee: "Mike R.", due: "Mar 12", status: "Pending", priority: "Medium", category: "Operations" },
        { id: 203, title: "Select Local Logistics Vendor", assignee: "Sarah J.", due: "Mar 18", status: "Pending", priority: "Low", category: "Procurement" },
        { id: 204, title: "Warehouse Flooring Installation", assignee: "Ops Team", due: "Apr 01", status: "Pending", priority: "Medium", category: "Construction" },
        { id: 205, title: "Install EA-Logic Sensors (Phase 1)", assignee: "Tech Team", due: "Apr 10", status: "Pending", priority: "High", category: "Tech" }
      ]
    },
    { id: 3, name: "Recruit-IQ API Integration", status: "Delayed", progress: 45, region: "Corporate", lead: "Tech Div", budget: "$200,000", spent: "$180,000", description: "Full-scale synchronization between the Planner-IQ operational core and the Recruit-IQ candidate matching engine.", tasks: [] },
    { id: 4, name: "Q1 Executive Search Hub", status: "Complete", progress: 100, region: "Metro", lead: "Dan Sims", budget: "N/A", spent: "N/A", description: "Direct hire executive placement search focusing on VP and Director level roles for the new division.", tasks: [] },
    { id: 5, name: "Mid-Atlantic Vendor Sync", status: "Active", progress: 60, region: "Mid-Atlantic", lead: "Sarah J.", budget: "$75,000", spent: "$40,000", description: "Annual alignment session with regional supply partners to optimize logistics costs and timelines.", tasks: [] },
    { id: 6, name: "Compliance Audit 2026", status: "Active", progress: 15, region: "Corporate", lead: "Legal", budget: "$50,000", spent: "$5,000", description: "Comprehensive regulatory and safety review for all new Skilled Trades divisions in the Mid-Atlantic area.", tasks: [] },
    { id: 7, name: "South NJ Field Expansion", status: "Planning", progress: 5, region: "South NJ", lead: "Mike R.", budget: "$300,000", spent: "$0", description: "Expansion into the Camden and Cherry Hill markets to tap into the local manufacturing talent pool.", tasks: [] },
    { id: 8, name: "Planner-IQ Elite v2 Launch", status: "Active", progress: 92, region: "Remote", lead: "Dev Team", budget: "$150,000", spent: "$145,000", description: "Final UI polish and Vercel stabilization for the Next.js 14 operational interface.", tasks: [] }
  ],
  resources: [
    { id: 101, name: "Kareen S.", role: "Senior Analyst", utilization: 92, status: "Overloaded", currentTask: "Financial Modeling", location: "East Windsor", contact: "kareen@planner-iq.com", experience: "12 Yrs", focus: "Capital Allocation" },
    { id: 102, name: "Mike R.", role: "Field Recruiter", utilization: 65, status: "Available", currentTask: "Candidate Screening", location: "Remote", contact: "mike@planner-iq.com", experience: "8 Yrs", focus: "Skilled Trades" },
    { id: 103, name: "Sarah J.", role: "Compliance Officer", utilization: 40, status: "Available", currentTask: "Audit Prep", location: "Corporate", contact: "sarah@planner-iq.com", experience: "15 Yrs", focus: "Regulatory Sync" }
  ],
  eaTasks: [
    { id: 't1', time: "09:00 AM", task: "Review Mid-Atlantic KPI Report", type: "Urgent", status: "Pending", duration: "30m", tool: "Analytics" },
    { id: 't2', time: "11:30 AM", task: "Skilled Trades Budget Approval", type: "Standard", status: "Pending", duration: "45m", tool: "Financials" },
    { id: 't3', time: "02:15 PM", task: "Vercel Deployment Sync", type: "Tech", status: "In Progress", duration: "15m", tool: "Console" },
    { id: 't4', time: "04:00 PM", task: "Executive Summary Write-up", type: "Standard", status: "Pending", duration: "1h", tool: "Reports" }
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
    <div style={{ animation: 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '28px', marginBottom: '40px' }}>
        {DATA.stats.map((stat, i) => (
          <div key={i} onClick={() => navigate(stat.linkTo)} style={{ backgroundColor: 'white', padding: '28px', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', cursor: 'pointer', transition: '0.3s transform ease', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ color: stat.color, backgroundColor: `${stat.color}15`, padding: '14px', borderRadius: '14px' }}>
                <stat.icon size={26} />
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: stat.trend.includes('+') ? '#10b981' : stat.trend === 'Optimal' ? '#3b82f6' : '#64748b' }}>{stat.trend}</span>
                <p style={{ margin: 0, fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>MTD Trend</p>
              </div>
            </div>
            <p style={{ color: '#64748b', fontSize: '1rem', margin: 0, fontWeight: '500' }}>{stat.label}</p>
            <h3 style={{ fontSize: '2.5rem', margin: '6px 0 0', color: '#0f172a', fontWeight: '900', letterSpacing: '-1px' }}>{stat.value}</h3>
          </div>
        ))}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2.4fr 1fr', gap: '28px' }}>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
               <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900', color: '#0f172a' }}>Regional Roadmap Expansion</h3>
               <p style={{ margin: '4px 0 0', color: '#64748b' }}>Mid-Atlantic Skilled Trades Division Rollout</p>
            </div>
            <button onClick={() => navigate('ProjectList')} style={{ padding: '10px 24px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '0.5px' }}>MASTER OPS</button>
          </div>
          <div style={{ spaceY: '16px' }}>
            {DATA.projects.slice(0, 5).map((p) => (
              <div key={p.id} onClick={() => navigate('ProjectDetail', p)} style={{ marginBottom: '16px', padding: '22px', border: '1px solid #f1f5f9', borderRadius: '20px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: '0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ width: '48px', height: '48px', backgroundColor: p.progress === 100 ? '#dcfce7' : '#eff6ff', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {p.progress === 100 ? <CheckCircle2 color="#10b981" size={24} /> : <Activity color="#3b82f6" size={24} />}
                  </div>
                  <div>
                    <span style={{ fontWeight: '800', fontSize: '1.1rem', color: '#1e293b', display: 'block' }}>{p.name}</span>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Owner: <strong>{p.lead}</strong> | {p.region}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', minWidth: '140px' }}>
                  <span style={{ fontSize: '1rem', fontWeight: '900', color: '#0f172a' }}>{p.progress}%</span>
                  <div style={{ width: '120px', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', marginTop: '6px', overflow: 'hidden' }}>
                    <div style={{ width: `${p.progress}%`, height: '100%', backgroundColor: p.progress === 100 ? '#10b981' : '#3b82f6', transition: 'width 1s ease-in-out' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ backgroundColor: '#0f172a', padding: '40px', borderRadius: '32px', color: 'white', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '40px' }}>
            <Calendar size={26} color="#3b82f6" />
            <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900' }}>Executive Pulse</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[
              { label: "NEXT HIGH-STAKE SYNC", value: "3:00 PM EST", icon: Clock, color: "#10b981", detail: "Skilled Trades Budgeting" },
              { label: "PRIORITY UNREAD", value: "12 URGENT", icon: Mail, color: "#3b82f6", detail: "Ops Hub Feedback" },
              { label: "CALLBACK QUEUE", value: "2 PENDING", icon: Phone, color: "#8b5cf6", detail: "Sarah & Mike R." }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '20px' }}>
                <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><item.icon color={item.color} size={24} /></div>
                <div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', fontWeight: '900', letterSpacing: '1px' }}>{item.label}</p>
                  <p style={{ margin: '2px 0', fontWeight: '900', fontSize: '1.25rem' }}>{item.value}</p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '24px', backgroundColor: '#1e293b', borderRadius: '24px', borderLeft: '6px solid #3b82f6', marginTop: '40px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <BrainCircuit size={20} color="#3b82f6" />
                <span style={{ color: '#3b82f6', fontWeight: '900', fontSize: '0.8rem', letterSpacing: '1px' }}>EA LOGIC SUGGESTION</span>
             </div>
             <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.6', color: '#e2e8f0', fontWeight: '500' }}>"North NJ logistics deep-dive required before tomorrow's board meeting. Block 4:00 PM today."</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ProjectDetailView = ({ project }) => (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <button onClick={() => navigate('ProjectList')} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontWeight: '900', fontSize: '1rem' }}>
          <ArrowLeft size={22} /> MASTER OPERATIONS ROADMAP
        </button>
        <div style={{ display: 'flex', gap: '16px' }}>
           <button style={{ padding: '12px 24px', backgroundColor: 'white', border: '2px solid #e2e8f0', borderRadius: '14px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}><Download size={20} /> Export Summary</button>
           <button style={{ padding: '12px 32px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '14px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '900' }}>UPDATE PHASE</button>
        </div>
      </div>
      
      <div style={{ backgroundColor: 'white', padding: '56px', borderRadius: '40px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '48px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#3b82f6', fontWeight: '900', fontSize: '1rem', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '1px' }}>
              <Zap size={20} fill="#3b82f6" /> DIVISION TRACKING ID: #PIQ-{project.id}00-NJ
            </div>
            <h1 style={{ fontSize: '3.6rem', margin: '0 0 16px 0', color: '#0f172a', letterSpacing: '-2px', fontWeight: '900', lineHeight: '1' }}>{project.name}</h1>
            <p style={{ color: '#64748b', fontSize: '1.4rem', maxWidth: '750px', lineHeight: '1.6', fontWeight: '500' }}>{project.description}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
             <span style={{ padding: '14px 32px', borderRadius: '40px', backgroundColor: project.status === 'Active' ? '#dcfce7' : project.status === 'Delayed' ? '#fee2e2' : '#fef3c7', color: project.status === 'Active' ? '#166534' : project.status === 'Delayed' ? '#991b1b' : '#92400e', fontWeight: '900', fontSize: '1.1rem', display: 'inline-block', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
               {project.status.toUpperCase()}
             </span>
             <p style={{ marginTop: '16px', color: '#64748b', fontWeight: 'bold' }}>Manager: <strong>{project.lead}</strong></p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '28px', marginBottom: '48px' }}>
          {[
            { label: "ALLOCATED BUDGET", value: project.budget || "TBD", icon: CreditCard, sub: "Q1 Funding" },
            { label: "CAPITAL SPENT", value: project.spent || "$0", icon: TrendingUp, sub: "Actual Cost" },
            { label: "GEOGRAPHIC SCOPE", value: project.region, icon: Map, sub: "Regional Focus" },
            { label: "RESOURCE STATUS", value: "High Intensity", icon: Users, sub: "Core Team" }
          ].map((item, idx) => (
            <div key={idx} style={{ padding: '32px', backgroundColor: '#f8fafc', borderRadius: '28px', border: '1px solid #f1f5f9' }}>
               <div style={{ color: '#3b82f6', marginBottom: '16px' }}><item.icon size={24} /></div>
               <p style={{ margin: 0, color: '#64748b', fontSize: '0.8rem', fontWeight: '900', letterSpacing: '1px' }}>{item.label}</p>
               <p style={{ margin: '10px 0 2px 0', fontSize: '1.8rem', fontWeight: '900', color: '#1e293b', letterSpacing: '-0.5px' }}>{item.value}</p>
               <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>{item.sub}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#f8fafc', padding: '40px', borderRadius: '32px', border: '1px solid #f1f5f9' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: '900', color: '#0f172a' }}>Operational Phase Progression</h3>
              <div style={{ textAlign: 'right' }}>
                 <span style={{ fontWeight: '900', color: '#0f172a', fontSize: '1.5rem' }}>{project.progress}%</span>
                 <p style={{ margin: 0, color: '#64748b', fontSize: '0.8rem', fontWeight: 'bold' }}>TARGET: 100%</p>
              </div>
           </div>
           <div style={{ width: '100%', height: '22px', backgroundColor: '#e2e8f0', borderRadius: '11px', overflow: 'hidden', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ width: `${project.progress}%`, height: '100%', backgroundColor: '#3b82f6', transition: 'width 2s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)' }}></div>
           </div>
        </div>
      </div>

      {/* STRATEGIC MILESTONES MODULE */}
      <div style={{ backgroundColor: 'white', borderRadius: '40px', padding: '48px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
           <div>
             <h3 style={{ margin: 0, fontSize: '2rem', color: '#0f172a', fontWeight: '900', letterSpacing: '-1px' }}>Strategic Milestones</h3>
             <p style={{ margin: '6px 0 0', color: '#64748b', fontSize: '1.1rem', fontWeight: '500' }}>Active task management for Mid-Atlantic division rollout.</p>
           </div>
           <button style={{ padding: '16px 32px', backgroundColor: '#f1f5f9', color: '#0f172a', borderRadius: '16px', border: 'none', cursor: 'pointer', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1rem' }}>
             <Plus size={22} /> NEW ACTION ITEM
           </button>
        </div>
        
        {project.tasks && project.tasks.length > 0 ? (
          <div style={{ spaceY: '12px' }}>
            {project.tasks.map((task) => (
              <div key={task.id} style={{ display: 'flex', alignItems: 'center', padding: '32px', borderBottom: '1px solid #f1f5f9', gap: '32px', transition: '0.3s' }}>
                <div style={{ cursor: 'pointer', color: task.status === 'Done' ? '#10b981' : '#cbd5e1' }}>
                  {task.status === 'Done' ? <CheckSquare size={34} strokeWidth={2.5} /> : <Square size={34} strokeWidth={2.5} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                     <span style={{ fontSize: '0.85rem', color: '#3b82f6', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px', backgroundColor: '#eff6ff', padding: '4px 12px', borderRadius: '8px' }}>{task.category}</span>
                     <span style={{ fontSize: '0.85rem', color: task.priority === 'High' ? '#ef4444' : '#64748b', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <AlertTriangle size={16} /> {task.priority.toUpperCase()} PRIORITY
                     </span>
                  </div>
                  <span style={{ display: 'block', fontSize: '1.4rem', fontWeight: '800', textDecoration: task.status === 'Done' ? 'line-through' : 'none', color: task.status === 'Done' ? '#94a3b8' : '#0f172a' }}>{task.title}</span>
                  <div style={{ display: 'flex', gap: '24px', marginTop: '8px' }}>
                      <span style={{ fontSize: '1rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}><Users size={18} /> Owner: <strong>{task.assignee}</strong></span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', minWidth: '150px' }}>
                  <span style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '900', letterSpacing: '1px' }}>TARGET DATE</span>
                  <span style={{ fontWeight: '900', color: task.status === 'Done' ? '#94a3b8' : '#0f172a', fontSize: '1.4rem', letterSpacing: '-0.5px' }}>{task.due}</span>
                </div>
                <button style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '10px' }}><MoreVertical size={28} /></button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '120px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '32px', border: '4px dashed #e2e8f0' }}>
            <ListTodo size={80} style={{ marginBottom: '24px', opacity: 0.1, color: '#0f172a' }} />
            <h4 style={{ margin: 0, color: '#475569', fontSize: '1.5rem', fontWeight: '900' }}>No Active Division Milestones</h4>
            <p style={{ color: '#94a3b8', margin: '16px 0 40px 0', fontSize: '1.2rem', fontWeight: '500' }}>The operational roadmap for this division is currently clear.</p>
            <button style={{ color: '#3b82f6', background: 'white', border: '2px solid #3b82f6', padding: '16px 40px', borderRadius: '16px', cursor: 'pointer', fontWeight: '900', fontSize: '1.1rem' }}>START NEW PHASE</button>
          </div>
        )}
      </div>
    </div>
  );

  const ResourceListView = () => (
    <div style={{ animation: 'fadeIn 0.6s ease' }}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
          <div>
            <h2 style={{ fontSize: '2.4rem', margin: 0, fontWeight: '900', letterSpacing: '-1.5px' }}>Regional Resource Allocation</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '4px' }}>Tracking executive capacity across East Windsor & Mid-Atlantic hubs.</p>
          </div>
          <button style={{ padding: '16px 32px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '14px', fontWeight: '900', cursor: 'pointer', fontSize: '1rem' }}>POOL CONFIGURATION</button>
       </div>
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '32px' }}>
        {DATA.resources.map((r) => (
          <div key={r.id} onClick={() => navigate('ResourceDetail', r)} style={{ backgroundColor: 'white', padding: '40px', borderRadius: '32px', border: '1px solid #e2e8f0', cursor: 'pointer', transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} onMouseOver={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.transform = 'translateY(-4px)'; }} onMouseOut={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '24px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', color: '#0f172a', fontSize: '2rem', border: '3px solid white', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}>{r.name.charAt(0)}</div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.6rem', fontWeight: '900', color: '#0f172a' }}>{r.name}</h3>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '1.1rem', fontWeight: '600' }}>{r.role}</p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                   <span style={{ fontSize: '0.75rem', backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: '8px', fontWeight: 'bold' }}>{r.experience} EXP</span>
                   <span style={{ fontSize: '0.75rem', backgroundColor: '#eff6ff', color: '#3b82f6', padding: '4px 10px', borderRadius: '8px', fontWeight: 'bold' }}>{r.focus.toUpperCase()}</span>
                </div>
              </div>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '1rem' }}>
                <span style={{ color: '#64748b', fontWeight: 'bold' }}>OPERATIONAL UTILIZATION</span>
                <span style={{ fontWeight: '900', color: r.utilization > 90 ? '#ef4444' : '#10b981' }}>{r.utilization}%</span>
              </div>
              <div style={{ width: '100%', height: '14px', backgroundColor: '#f1f5f9', borderRadius: '7px', overflow: 'hidden', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
                 <div style={{ width: `${r.utilization}%`, height: '100%', backgroundColor: r.utilization > 90 ? '#ef4444' : '#10b981', transition: 'width 1.5s ease-out' }}></div>
              </div>
            </div>
            <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '18px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #f1f5f9' }}>
               <Clock size={20} color="#64748b" />
               <span style={{ color: '#475569', fontSize: '1rem', fontWeight: '500' }}>Currently: <strong>{r.currentTask}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- MASTER RENDER SCAFFOLD ---
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f4f7fb', fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden' }}>
      
      {/* ELITE MASTER SIDEBAR */}
      <aside style={{ width: sidebarOpen ? '320px' : '110px', backgroundColor: '#0f172a', color: 'white', padding: '40px 24px', transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '60px', overflow: 'hidden' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
             <img src="/logo.png" alt="" style={{ width: '56px', height: '56px', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
             <div style={{ display: 'none', backgroundColor: '#0070f3', padding: '14px', borderRadius: '18px', width: '56px', height: '56px', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0, 112, 243, 0.4)' }}>
               <Zap size={30} color="white" fill="white" />
             </div>
          </div>
          {sidebarOpen && (
            <div style={{ lineHeight: '1', whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: '900', display: 'block', letterSpacing: '-1.5px' }}>Planner-IQ</span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', letterSpacing: '4px', fontWeight: 'bold', marginTop: '6px', display: 'block' }}>ELITE MASTER</span>
            </div>
          )}
        </div>

        <nav style={{ flex: 1 }}>
          {[
            { id: 'Dashboard', icon: LayoutDashboard, label: 'Control Center' },
            { id: 'ProjectList', label: 'Operational Roadmaps', icon: Map },
            { id: 'ResourceList', label: 'Team Capacity Hub', icon: Globe },
            { id: 'AutomationView', label: 'EA Logic Engine', icon: BrainCircuit },
            { id: 'Financials', label: 'Division Budgeting', icon: CreditCard },
            { id: 'SystemHealth', label: 'System Integrity', icon: ShieldCheck }
          ].map((item) => (
            <button key={item.id} onClick={() => navigate(item.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '22px', padding: '22px 26px', marginBottom: '14px', borderRadius: '22px', border: 'none', cursor: 'pointer', fontSize: '1.1rem', backgroundColor: view === item.id ? '#1e293b' : 'transparent', color: view === item.id ? '#60a5fa' : '#94a3b8', transition: '0.25s', textAlign: 'left', fontWeight: '700' }}>
              <item.icon size={30} strokeWidth={2.5} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div style={{ marginTop: 'auto', padding: '28px', backgroundColor: '#1e293b', borderRadius: '28px', display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #334155', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
             <div style={{ width: '56px', height: '56px', borderRadius: '18px', backgroundColor: '#0070f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1.3rem', boxShadow: '0 4px 15px rgba(0, 112, 243, 0.4)' }}>DS</div>
             <div>
               <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '900' }}>Dan Sims</p>
               <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', fontWeight: '800' }}>EXECUTIVE LEAD</p>
             </div>
          </div>
        )}
      </aside>

      {/* VIEWPORT CONTROLLER */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <header style={{ height: '110px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 64px', flexShrink: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}><Menu size={36} strokeWidth={2.5} /></button>
            <div style={{ width: '2px', height: '40px', backgroundColor: '#e2e8f0' }}></div>
            <h2 style={{ fontSize: '2rem', margin: 0, fontWeight: '900', color: '#0f172a', letterSpacing: '-1.5px' }}>
              {view === 'ProjectList' ? 'Operational Master Roadmaps' : view === 'ProjectDetail' ? 'Division Operational Sync' : view}
            </h2>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: '#eff6ff', padding: '16px 36px', borderRadius: '44px', color: '#2563eb', fontSize: '1.1rem', fontWeight: '900', boxShadow: '0 4px 10px rgba(37, 99, 235, 0.15)' }}>
               <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#2563eb', boxShadow: '0 0 15px rgba(37, 99, 235, 0.7)' }}></div>
               EA SECURE ENVIRONMENT
             </div>
             <div style={{ position: 'relative', cursor: 'pointer', color: '#64748b' }} onClick={() => setNotifications(0)}>
               <Bell size={36} strokeWidth={2.5} />
               {notifications > 0 && <span style={{ position: 'absolute', top: '-12px', right: '-12px', backgroundColor: '#ef4444', color: 'white', fontSize: '14px', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', border: '4px solid white', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>{notifications}</span>}
             </div>
          </div>
        </header>

        <main style={{ flex: 1, padding: '64px', overflowY: 'auto', scrollBehavior: 'smooth' }}>
          {view === 'Dashboard' && <DashboardView />}
          
          {view === 'ProjectList' && (
            <div style={{ backgroundColor: 'white', padding: '64px', borderRadius: '40px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '56px' }}>
                  <h2 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1.5px' }}>Active Regional Hub Operations</h2>
                  <div style={{ display: 'flex', gap: '20px' }}>
                     <div style={{ position: 'relative' }}>
                        <Search size={26} style={{ position: 'absolute', left: '20px', top: '19px', color: '#94a3b8' }} />
                        <input type="text" placeholder="Filter active operations..." style={{ padding: '22px 22px 22px 64px', borderRadius: '20px', border: '2px solid #e2e8f0', fontSize: '1.2rem', width: '450px', fontWeight: '500', outline: 'none' }} />
                     </div>
                  </div>
               </div>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1px', backgroundColor: '#f1f5f9', borderRadius: '32px', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
               {DATA.projects.map(p => (
                 <div key={p.id} onClick={() => navigate('ProjectDetail', p)} style={{ padding: '44px', backgroundColor: 'white', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: '0.3s' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
                      <div style={{ width: '70px', height: '70px', borderRadius: '22px', backgroundColor: p.status === 'Active' ? '#effaf3' : p.status === 'Delayed' ? '#fff1f2' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                         <Briefcase size={34} color={p.status === 'Active' ? '#10b981' : p.status === 'Delayed' ? '#ef4444' : '#64748b'} strokeWidth={2.5} />
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#0f172a', fontWeight: '900', letterSpacing: '-0.5px' }}>{p.name}</h3>
                        <p style={{ margin: '8px 0 0', color: '#64748b', fontSize: '1.2rem', fontWeight: '500' }}>Geography: <strong>{p.region}</strong> | Executive Hub Lead: <strong>{p.lead}</strong></p>
                      </div>
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '100px' }}>
                      <div style={{ textAlign: 'right', minWidth: '240px' }}>
                        <p style={{ margin: 0, fontWeight: '900', color: '#0f172a', fontSize: '1.6rem', letterSpacing: '-1px' }}>{p.progress}% Phase Completed</p>
                        <div style={{ width: '100%', height: '14px', backgroundColor: '#f1f5f9', borderRadius: '7px', marginTop: '14px', overflow: 'hidden' }}>
                           <div style={{ width: `${p.progress}%`, height: '100%', backgroundColor: p.status === 'Active' ? '#10b981' : p.status === 'Delayed' ? '#ef4444' : '#3b82f6', transition: 'width 1.5s' }}></div>
                        </div>
                      </div>
                      <ChevronRight size={40} color="#cbd5e1" strokeWidth={3} />
                   </div>
                 </div>
               ))}
               </div>
            </div>
          )}
          
          {view === 'ProjectDetail' && <ProjectDetailView project={selectedItem} />}
          {view === 'ResourceList' && <ResourceListView />}
          {view === 'AutomationView' && <div style={{ textAlign: 'center', padding: '120px' }}><BrainCircuit size={120} color="#3b82f6" strokeWidth={2} /><h2 style={{ fontSize: '3rem', marginTop: '40px', fontWeight: '900', letterSpacing: '-2px' }}>AI EA LOGIC ENGINE ACTIVE</h2><p style={{ fontSize: '1.6rem', color: '#64748b', fontWeight: '500' }}>Optimizing regional operational vectors for Skilled Trades divisions...</p></div>}
          {view === 'SystemHealth' && <div style={{ textAlign: 'center', padding: '160px 40px' }}><ShieldCheck size={140} color="#10b981" strokeWidth={2} /><h1 style={{ fontSize: '4.5rem', marginTop: '40px', fontWeight: '900', letterSpacing: '-3px' }}>98.4% Operational</h1><p style={{ fontSize: '1.8rem', color: '#64748b', fontWeight: '500' }}>All secure systems in East Windsor hub are synchronized.</p></div>}
        </main>
      </div>
    </div>
  );
}
