// src/app/page.js
export default function HomePage() {
  // Hard-coded for Demo Mode
  const user = { name: "Dan Sims", role: "Lead Recruiter" };
  
  const stats = [
    { label: "Active Jobs", value: 12 },
    { label: "AI Matches", value: 148 },
    { label: "Interviews", value: 5 }
  ];

  return (
    <main style={{ padding: '40px', fontFamily: 'system-ui, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1a1a1a' }}>Planner-IQ <span style={{ color: '#0070f3' }}>Elite</span></h1>
        <div style={{ padding: '10px 20px', borderRadius: '20px', background: '#e6fffa', border: '1px solid #38a169' }}>
          🟢 Demo Mode: {user.name}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
        {stats.map(stat => (
          <div key={stat.label} style={{ padding: '20px', border: '1px solid #eaeaea', borderRadius: '12px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', margin: '0' }}>{stat.value}</h2>
            <p style={{ color: '#666', margin: '5px 0 0' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      <section style={{ padding: '30px', backgroundColor: '#f9f9f9', borderRadius: '16px', border: '1px solid #eaeaea' }}>
        <h3>Core Creativity AI Matcher</h3>
        <p style={{ color: '#444' }}>Analyze candidate match for <strong>Staff-IQ</strong> positions.</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ padding: '12px 24px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Run Matcher
          </button>
          <button style={{ padding: '12px 24px', backgroundColor: '#fff', color: '#0070f3', border: '1px solid #0070f3', borderRadius: '8px', cursor: 'pointer' }}>
            View Reports
          </button>
        </div>
      </section>
    </main>
  );
}
