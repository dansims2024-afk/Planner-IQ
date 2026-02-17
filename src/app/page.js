"use client";
import React, { useState } from 'react';
import { 
  Calendar, Clock, CheckCircle2, TrendingUp, Settings, 
  ChevronRight, BrainCircuit, ListTodo, Zap, LayoutDashboard,
  ShieldCheck, Globe
} from 'lucide-react';

export default function PlannerIQEliteDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  // ELITE EA/PM SAMPLE DATA
  const activeProjects = [
    { name: "Skilled Trades Expansion", region: "Mid-Atlantic", progress: 75 },
    { name: "Recruit-IQ Integration", region: "Corporate", progress: 40 },
    { name: "Executive Search Q1", region: "East Windsor", progress: 90 }
  ];

  const stats = [
    { label: "Active Projects", value: "8", icon: TrendingUp, color: "#0070f3" },
    { label: "Pending Tasks", value: "24", icon: ListTodo, color: "#7928ca" },
    { label: "Completed (MTD)", value: "142", icon: CheckCircle2, color: "#10b981" }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* SIDEBAR: EA / PROJECT MANAGER VIEW */}
      <aside style={{ width: '280px', backgroundColor: '#111', color: 'white', padding: '30px 20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', padding: '0 10px' }}>
          <div style={{ backgroundColor: '#0070f3', padding: '8px', borderRadius: '8px' }}>
            <Zap size={24} color="white" />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-0.5px' }}>Planner-IQ <span style={{ color: '#0070f3' }}>Elite</span></span>
        </div>

        <nav style={{ flex: 1 }}>
          {[
            { id: 'Dashboard', icon: LayoutDashboard },
            { id: 'Project Timeline', icon: Calendar },
            { id: 'Resource Allocation', icon: Globe },
            { id: 'EA Automations', icon: BrainCircuit },
            { id: 'System Settings', icon: Settings }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', marginBottom: '8px',
                borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1rem',
                backgroundColor: activeTab === item.id ? '#0070f3' : 'transparent',
                color: activeTab === item.id ? 'white' : '#999', transition: '0.2s', textAlign: 'left'
              }}
            >
              <item.icon size={20} /> {item.id}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN PM CONTENT */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', margin: 0, color: '#111' }}>{activeTab}</h2>
            <p style={{ color: '#666', margin: '4px 0 0' }}>Executive Lead: Dan Sims | Mid-Atlantic Operations</p>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '8px 16px', borderRadius: '12px', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="#10b981" />
            <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>Secure EA Access</span>
          </div>
        </header>

        {/* PM STATS CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ color: stat.color, marginBottom: '12px' }}><stat.icon size={28} /></div>
              <h3 style={{ fontSize: '2rem', margin: '0', color: '#111' }}>{stat.value}</h3>
              <p style={{ color: '#666', margin: '4px 0 0', fontWeight: '500' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ACTIVE PROJECT TRACKER */}
        <div style={{ backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #eaeaea', overflow: 'hidden' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #eaeaea', backgroundColor: '#fafafa' }}>
            <h3 style={{ margin: 0 }}>Executive Project Roadmap</h3>
          </div>
          <div style={{ padding: '24px' }}>
            {activeProjects.map((project, idx) => (
              <div key={idx} style={{ marginBottom: '24px', padding: '16px', border: '1px solid #f0f0f0', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontWeight: 'bold', color: '#111' }}>{project.name}</span>
                  <span style={{ color: '#0070f3', fontWeight: '600' }}>{project.progress}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${project.progress}%`, height: '100%', backgroundColor: '#0070f3' }}></div>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '8px' }}>Scope: {project.region} Division Roadmap</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
