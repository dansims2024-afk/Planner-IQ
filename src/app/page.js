"use client";
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Calendar, Globe, BrainCircuit, TrendingUp, Settings, 
  Menu, Bell, Search, Zap, CheckCircle2, ListTodo, ShieldCheck, 
  ChevronRight, Users, Briefcase, FileText, AlertCircle
} from 'lucide-react';

// --- SAMPLE DATA: MID-ATLANTIC EXPANSION ---
const DATA = {
  projects: [
    { id: 1, name: "Skilled Trades: NJ Rollout", status: "Active", progress: 85, region: "North NJ", lead: "Dan Sims" },
    { id: 2, name: "East Windsor Logistics Hub", status: "Planning", progress: 30, region: "Central", lead: "Ops Team" },
    { id: 3, name: "Recruit-IQ Integration", status: "Delayed", progress: 45, region: "Corporate", lead: "Tech Div" },
    { id: 4, name: "Q1 Executive Hiring", status: "Complete", progress: 100, region: "Metro", lead: "Dan Sims" }
  ],
  resources: [
    { name: "Kareen S.", role: "Senior Analyst", utilization: 92, status: "Overloaded" },
    { name: "Mike R.", role: "Field Recruiter", utilization: 65, status: "Available" },
    { name: "Sarah J.", role: "Compliance Officer", utilization: 40, status: "Available" }
  ],
  eaTasks: [
    { time: "09:00 AM", task: "Review Mid-Atlantic KPI Report", type: "Urgent" },
    { time: "11:30 AM", task: "Skilled Trades Budget Approval", type: "Standard" },
    { time: "02:15 PM", task: "Vercel Deployment Sync", type: "Tech" }
  ]
};

export default function PlannerIQDeluxe() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationCount, setNotificationCount] = useState(3);
  const [isSimulating, setIsSimulating] = useState(false);

  // --- VIEW COMPONENTS ---
  
  const DashboardView = () => (
    <div className="animate-fade-in">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {[
          { label: "Active Projects", value: "8", icon: TrendingUp, color: "#3b82f6" },
          { label: "Pending Tasks", value: "24", icon: ListTodo, color: "#8b5cf6" },
          { label: "Team Utilization", value: "78%", icon: Users, color: "#ec4899" },
          { label: "System Health", value: "98%", icon: ShieldCheck, color: "#10b981" }
        ].map((stat, i) => (
          <div key={i} style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '4px' }}>{stat.label}</p>
              <h3 style={{ fontSize: '2rem', margin: 0, color: '#0f172a' }}>{stat.value}</h3>
            </div>
            <div style={{ color: stat.color, backgroundColor: `${stat.color}15`, padding: '12px', borderRadius: '12px' }}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '1.2rem' }}>Priority Roadmap</h3>
          {DATA.projects.slice(0, 3).map((p) => (
            <div key={p.id} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: '600' }}>{p.name}</span>
                <span style={{ fontSize: '0.8rem', color: p.status === 'Active' ? '#10b981' : '#f59e0b', backgroundColor: p.status === 'Active' ? '#d1fae5' : '#fef3c7', padding: '2px 8px', borderRadius: '12px' }}>{p.status}</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px' }}>
                <div style={{ width: `${p.progress}%`, height: '100%', backgroundColor: '#3b82f6', borderRadius: '4px' }}></div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '20px', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <BrainCircuit size={20} color="#3b82f6" />
            <h3 style={{ margin: 0 }}>EA Insight</h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.6' }}>
            <strong>Morning Brief:</strong> Skilled Trades expansion in North NJ is ahead of schedule. Resource allocation for East Windsor needs review by 2:00 PM.
          </p>
          <button style={{ marginTop: '20px', width: '100%', padding: '12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
            View Full Brief
          </button>
        </div>
      </div>
    </div>
  );

  const TimelineView = () => (
    <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '20px', minHeight: '60vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Master Project Schedule</h2>
        <button style={{ padding: '10px 20px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>+ New Initiative</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f1f5f9', textAlign: 'left', color: '#64748b' }}>
            <th style={{ padding: '16px' }}>Project Name</th>
            <th style={{ padding: '16px' }}>Region</th>
            <th style={{ padding: '16px' }}>Lead</th>
            <th style={{ padding: '16px' }}>Progress</th>
            <th style={{ padding: '16px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {DATA.projects.map((p) => (
            <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
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
              <td style={{ padding: '16px' }}>
                <span style={{ fontSize: '0.85rem', padding: '4px 12px', borderRadius: '20px', backgroundColor: p.status === 'Active' ? '#dcfce7' : '#fee2e2', color: p.status === 'Active' ? '#166534' : '#991b1b' }}>
                  {p.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const ResourceView = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
      {DATA.resources.map((r, i) => (
        <div key={i} style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#64748b' }}>
              {r.name.charAt(0)}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{r.name}</h3>
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
          <button style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', backgroundColor: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>
            View Assignments
          </button>
        </div>
      ))}
    </div>
  );

  const AutomationView = () => (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#0f172a', color: 'white', borderRadius: '20px', padding: '32px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ padding: '12px', backgroundColor: '#3b82f6', borderRadius: '12px' }}>
            <Zap size={24} color="white" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Planner-IQ Assistant</h2>
            <p style={{ color: '#94a3b8', margin: '4px 0 0' }}>Automated Executive Operations</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '16px' }}>
           <button 
             onClick={() => { setIsSimulating(true); setTimeout(() => setIsSimulating(false), 2000); }}
             style={{ flex: 1, padding: '16px', backgroundColor: '#3b82f6', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
           >
             {isSimulating ? <BrainCircuit className="animate-spin" /> : <BrainCircuit />}
             {isSimulating ? "Processing..." : "Run Daily Optimization"}
           </button>
           <button style={{ padding: '16px 24px', backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
             Settings
           </button>
        </div>
      </div>

      <h3 style={{ marginLeft: '8px', marginBottom: '16px', color: '#64748b' }}>Today's Automated Schedule</h3>
      {DATA.eaTasks.map((t, i) => (
        <div key={i} style={{ display: 'flex', gap: '24px', marginBottom: '24px', opacity: isSimulating ? 0.5 : 1, transition: '0.3s' }}>
          <div style={{ minWidth: '80px', paddingTop: '4px', textAlign: 'right', fontWeight: 'bold', color: '#64748b' }}>{t.time}</div>
          <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: `4px solid ${t.type === 'Urgent' ? '#ef4444' : '#3b82f6'}` }}>
             <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>{t.task}</h4>
             <span style={{ fontSize: '0.8rem', backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: '12px', color: '#64748b' }}>{t.type}</span>
          </div>
        </div>
      ))}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <div style={{ backgroundColor: '#0070f3', padding: '10px', borderRadius: '10px', minWidth: '44px' }}>
            <Zap size={24} color="white" />
          </div>
          {sidebarOpen && <span style={{ fontSize: '1.4rem', fontWeight: '800' }}>Planner-IQ</span>}
        </div>

        <nav style={{ flex: 1 }}>
          {[
            { id: 'Dashboard', icon: LayoutDashboard },
            { id: 'Project Timeline', icon: Calendar },
            { id: 'Resource Center', icon: Globe },
            { id: 'EA Automations', icon: BrainCircuit },
            { id: 'Settings', icon: Settings }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 16px', marginBottom: '8px',
                borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '0.95rem',
                backgroundColor: activeTab === item.id ? '#334155' : 'transparent',
                color: activeTab === item.id ? '#60a5fa' : '#94a3b8', transition: '0.2s', textAlign: 'left', overflow: 'hidden', whiteSpace: 'nowrap'
              }}
            >
              <item.icon size={22} style={{ minWidth: '22px' }} />
              {sidebarOpen && <span>{item.id}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* CONTENT AREA */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        {/* HEADER */}
        <header style={{ height: '70px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><Menu size={24} /></button>
            <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: '700', color: '#0f172a' }}>{activeTab}</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#eff6ff', padding: '8px 16px', borderRadius: '20px', color: '#2563eb', fontSize: '0.85rem', fontWeight: '600' }}>
               <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563eb' }}></div>
               Demo Mode: Dan Sims
             </div>
             <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setNotificationCount(0)}>
               <Bell size={22} color="#64748b" />
               {notificationCount > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: '#ef4444', color: 'white', fontSize: '10px', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{notificationCount}</span>}
             </div>
          </div>
        </header>

        {/* DYNAMIC MAIN CONTENT */}
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          {activeTab === 'Dashboard' && <DashboardView />}
          {activeTab === 'Project Timeline' && <TimelineView />}
          {activeTab === 'Resource Center' && <ResourceView />}
          {activeTab === 'EA Automations' && <AutomationView />}
          {activeTab === 'Settings' && <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '40px' }}>System Settings Restricted in Demo Mode</div>}
        </main>
      </div>
    </div>
  );
}
