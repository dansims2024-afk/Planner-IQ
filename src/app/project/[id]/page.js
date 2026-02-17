// src/app/project/[id]/page.js
export default function ProjectDetailsPage({ params }) {
  const { id } = params;

  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{ marginBottom: '20px' }}>
        <a href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>← Back to Dashboard</a>
      </nav>

      <div style={{ borderLeft: '5px solid #0070f3', paddingLeft: '20px', marginBottom: '30px' }}>
        <h1 style={{ margin: '0' }}>Project: {id}</h1>
        <p style={{ color: '#666' }}>Mid-Atlantic Skilled Trades Division</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        <div style={{ padding: '24px', border: '1px solid #eaeaea', borderRadius: '12px' }}>
          <h3>Target Role: Senior FinTech Architect</h3>
          <p><strong>Status:</strong> Recruiting</p>
          <p><strong>Salary Range:</strong> $240k - $285k</p>
          <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eaeaea' }} />
          <p>AI matches found in East Windsor, NJ area.</p>
        </div>

        <div style={{ padding: '24px', backgroundColor: '#000', color: '#fff', borderRadius: '12px' }}>
          <h3 style={{ color: '#0070f3' }}>Elite Insights</h3>
          <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
            <li>Clerk Auth: <span style={{ color: '#ff4d4f' }}>Pending Setup</span></li>
            <li>Stripe Billing: <span style={{ color: '#ff4d4f' }}>Offline</span></li>
            <li>AI Processing: 🟢 Ready</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
