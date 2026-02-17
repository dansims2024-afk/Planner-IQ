import { auth } from '@clerk/nextjs/server';

export default function HomePage() {
  const { userId } = auth();

  // Demo Sample Data for the Landing Page
  const stats = [
    { label: "Active Jobs", value: 12 },
    { label: "AI Matches", value: 148 },
    { label: "Interviews", value: 5 }
  ];

  return (
    <main style={{ padding: '40px', fontFamily: 'system-ui, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1a1a1a' }}>Planner-IQ <span style={{ color: '#0070f3' }}>Elite</span></h1>
        <div style={{ padding: '10px 20px', borderRadius: '20px', background: userId ? '#e6fffa' : '#fff5f5' }}>
          {userId ? "🟢 Systems Online" : "🔴 Authentication Required"}
        </div>
      </header>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
        {stats.map(stat => (
          <div key={stat.label} style={{ padding: '20px', border: '1px solid #eaeaea', borderRadius: '12px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', margin: '0' }}>{stat.value}</h2>
            <p style={{ color: '#666', margin: '5px 0 0' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      <section style={{ padding: '30px', backgroundColor: '#f9f9f9', borderRadius: '16px' }}>
        <h3>Core Creativity AI Matcher</h3>
        <p style={{ color: '#444' }}>Our proprietary engine is currently analyzing <strong>Staff-IQ</strong> datasets.</p>
        <button style={{ padding: '12px 24px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Launch Candidate Analyzer
        </button>
      </section>
    </main>
  );
}
