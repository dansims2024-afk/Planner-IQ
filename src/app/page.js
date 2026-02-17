"use client";
import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, CheckCircle2, TrendingUp, Settings, 
  ChevronRight, BrainCircuit, ListTodo, Zap, LayoutDashboard,
  ShieldCheck, Globe, Menu, X, Bell, Search, Filter
} from 'lucide-react';

export default function PlannerIQEliteFull() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(3);

  // ELITE EA/PM DATA SETS
  const projectData = [
    { id: 1, name: "Skilled Trades Division: NJ Rollout", leader: "Dan Sims", status: "On Track", progress: 85, color: "#0070f3", region: "North" },
    { id: 2, name: "Mid-Atlantic Logistics Sync", leader: "Operations", status: "Delayed", progress: 42, color: "#ff0080", region: "Mid-Atlantic" },
    { id: 3, name: "Executive Search: Q1 Lead Analyst", leader: "Dan Sims", status: "Complete", progress: 100, color: "#10b981", region: "Corporate" },
    { id: 4, name: "Resource Allocation Review", leader: "Management", status: "Planning", progress: 15, color: "#7928ca", region: "East Windsor" }
  ];

  const executiveTasks = [
    { time: "09:00 AM", task: "Mid-Atlantic Division Review", priority: "High" },
    { time: "11:30 AM", task: "Skilled Trades Hiring Sync", priority: "Medium" },
    { time: "02:00 PM", task: "Vercel Production Deployment Check", priority: "Urgent" }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7fb', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* FULL SIDEBAR RESTORED */}
      <aside style={{ 
        width: sidebarOpen ? '280px' : '80px', 
        backgroundColor: '#0f172a', 
        color: 'white', 
        padding: '24px 16px', 
        transition: '0.3s ease',
        display: 'flex', 
        flexDirection: 'column',
        boxShadow: '4px 0 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px', overflow: 'hidden' }}>
          <div style={{ backgroundColor: '#0070f3', padding: '10px', borderRadius: '10px', flexShrink: 0 }}>
            <Zap size={24} color="white" />
          </div>
          {sidebarOpen && <span style={{ fontSize: '1.4rem', fontWeight: '800', whiteSpace: 'nowrap' }}>Planner-IQ <span style={{ color: '#0070f3' }}>Elite</span></span>}
        </div>

        <nav style={{ flex: 1 }}>
          {[
            { id: 'Dashboard', icon: LayoutDashboard },
            { id: 'Project Timeline', icon: Calendar },
            { id: 'Resource Center', icon: Globe },
            { id: 'EA Automations', icon: BrainCircuit },
            { id: 'Strategy Map', icon: TrendingUp },
            { id: 'System Settings', icon: Settings }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 16px', marginBottom: '10px',
                borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '0.95rem',
                backgroundColor: activeTab === item.id ? '#1e293b' : 'transparent',
                color: activeTab === item.id ? '#3b82f6' : '#94a3b8', transition: '0.2s', textAlign: 'left'
              }}
            >
              <item.icon size={22} />
              {sidebarOpen && <span>{item.id}</span>}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', marginTop: 'auto' }}>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '8px' }}>USER ACCOUNT</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#0070f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>DS</div>
              <span style={{ fontSize: '0.9rem' }}>Dan Sims</span>
            </div>
          </div>
        )}
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        
        {/* TOP BAR */}
        <header style={{ 
          height: '70px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', 
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px' 
        }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <Menu size={24} />
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', color: '#94a3b8' }} />
              <input type="text" placeholder="Search roadmap..." style={{ 
                padding: '10px 10px 10px 40px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '300px', backgroundColor: '#f8fafc' 
              }} />
            </div>
            <div style={{ position: 'relative' }}>
              <Bell size={22} color="#64748b" />
              {notifications > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: '#ef4444', color: 'white', fontSize: '10px', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{notifications}</span>}
            </div>
          </div>
        </header>

        {/* DASHBOARD SCROLLABLE AREA */}
        <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Executive Roadmap</h2>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Mid-Atlantic Skilled Trades Expansion & Operations</p>
          </div>

          {/* STATS ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
            {[
              { label: "Active Projects", value: "8", icon: TrendingUp, color: "#3b82f6" },
              { label: "Tasks Pending", value: "24", icon: ListTodo, color: "#8b5cf6" },
              { label: "Resources", value: "14", icon: Globe, color: "#ec4899" },
              { label: "Health Score", value: "92%", icon: ShieldCheck, color: "#10b981" }
            ].map((stat, i) => (
              <div key={i} style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '4px' }}>{stat.label}</p>
                  <h3 style={{ fontSize: '1.8rem', margin: 0, color: '#0f172a' }}>{stat.value}</h3>
                </div>
                <div style={{ color: stat.color, backgroundColor: `${stat.color}15`, padding: '12px', borderRadius: '12px' }}>
                  <stat.icon size={24} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
            {/* PROJECT ROADMAP LIST */}
            <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Division Milestones</h3>
                <button style={{ color: '#3b82f6', background: 'none', border: 'none', fontWeight: '600', cursor: 'pointer' }}>View All</button>
              </div>
              
              {projectData.map((project) => (
                <div key={project.id} style={{ padding: '20px', border: '1px solid #f1f5f9', borderRadius: '16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem' }}>{project.name}</h4>
                      <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#64748b' }}>Region: {project.region}</p>
                    </div>
                    <span style={{ 
                      fontSize: '0.75rem', padding: '4px 10px', borderRadius: '20px', fontWeight: '600',
                      backgroundColor: project.status === 'Delayed' ? '#fff1f2' : '#f0fdf4',
                      color: project.status === 'Delayed' ? '#e11d48' : '#16a34a'
                    }}>
                      {project.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ flex: 1, height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${project.progress}%`, height: '100%', backgroundColor: project.color, transition: '1s ease' }}></div>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#0f172a', width: '35px' }}>{project.progress}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* EA SCHEDULE PANEL */}
            <div style={{ backgroundColor: '#0f172a', borderRadius: '20px', padding: '24px', color: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <BrainCircuit color="#3b82f6" />
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>EA Automations</h3>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '24px' }}>Operational sync for East Windsor & Jersey Divisions.</p>
              
              {executiveTasks.map((item, i) => (
                <div key={i} style={{ padding: '16px', backgroundColor: '#1e293b', borderRadius: '12px', marginBottom: '12px', borderLeft: item.priority === 'Urgent' ? '4px solid #ef4444' : '4px solid #3b82f6' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>
                    <span>{item.time}</span>
                    <span style={{ color: item.priority === 'Urgent' ? '#ef4444' : '#3b82f6' }}>{item.priority}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '500' }}>{item.task}</p>
                </div>
              ))}
              
              <button style={{ 
                width: '100%', marginTop: '12px', padding: '14px', borderRadius: '12px', 
                backgroundColor: '#3b82f6', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' 
              }}>
                Generate PM Report
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
