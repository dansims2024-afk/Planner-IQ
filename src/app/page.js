"use client";
import React, { useState } from 'react';
import { 
  Users, Briefcase, BarChart2, Settings, Search,
  ChevronRight, BrainCircuit, FileText, Zap, LayoutDashboard
} from 'lucide-react';

export default function PlannerIQEliteDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // ELITE SAMPLE DATA RESTORED
  const SAMPLE_JD = "Senior Principal FinTech Architect - $240k–$285k. Requires Core Creativity AI Matcher.";
  const SAMPLE_RESUME = "Marcus Vandelay - Principal Software Architect. Expertise in Planner-IQ scaling.";

  const stats = [
    { label: "Active Roles", value: "12", icon: Briefcase, color: "#0070f3" },
    { label: "AI Matches", value: "148", icon: BrainCircuit, color: "#7928ca" },
    { label: "Interviews", value: "5", icon: Users, color: "#ff0080" }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* SIDEBAR WITH CORRECT BRANDING */}
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
            { id: 'Projects', icon: Briefcase },
            { id: 'Talent Pool', icon: Users },
            { id: 'AI Insights', icon: BrainCircuit },
            { id: 'Settings', icon: Settings }
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

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', margin: 0, color: '#111' }}>{activeTab}</h2>
            <p style={{ color: '#666', margin: '4px 0 0' }}>Lead Recruiter: Dan Sims | Mid-Atlantic Skilled Trades</p>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '8px 16px', borderRadius: '12px', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
            <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>Demo Active</span>
          </div>
        </header>

        {/* STATS CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ color: stat.color, marginBottom: '12px' }}><stat.icon size={28} /></div>
              <h3 style={{ fontSize: '2rem', margin: '0', color: '#111' }}>{stat.value}</h3>
              <p style={{ color: '#666', margin: '4px 0 0', fontWeight: '500' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* AI MATCHER FEATURE */}
        <div style={{ backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #eaeaea', overflow: 'hidden' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #eaeaea', backgroundColor: '#fafafa', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BrainCircuit color="#0070f3" />
            <h3 style={{ margin: 0 }}>Core Creativity AI Candidate Matcher</h3>
          </div>
          <div style={{ padding: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Target Requirements</label>
                <div style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '12px', border: '1px solid #eaeaea', minHeight: '100px', fontSize: '0.9rem', color: '#333' }}>
                  {SAMPLE_JD}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Candidate Profile (Marcus Vandelay)</label>
                <div style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '12px', border: '1px solid #eaeaea', minHeight: '100px', fontSize: '0.9rem', color: '#333' }}>
                  {SAMPLE_RESUME}
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => { setIsAnalyzing(true); setTimeout(() => setIsAnalyzing(false), 2000); }}
              style={{ 
                width: '100%', padding: '16px', borderRadius: '12px', border: 'none', fontSize: '1rem', fontWeight: 'bold',
                cursor: 'pointer', transition: '0.2s', backgroundColor: '#0070f3', color: 'white'
              }}
            >
              {isAnalyzing ? "Analyzing Planner-IQ Vectors..." : "Run AI Comparison Analysis"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
