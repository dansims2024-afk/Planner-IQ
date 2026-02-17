export default function ProjectDetailsPage({ params }) {
  const { id } = params;

  // Elite Sample Data for the Detail View
  const SAMPLE_JD = {
    title: "Senior Principal FinTech Architect",
    salary: "$240k–$285k",
    status: "Priority"
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{ marginBottom: '20px' }}>
        <a href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>← Back to Dashboard</a>
      </nav>

      <div style={{ borderLeft: '5px solid #0070f3', paddingLeft: '20px' }}>
        <h1 style={{ margin: '0' }}>Project Analysis: {id}</h1>
        <p style={{ color: '#666' }}>Lead Recruiter: Dan Sims</p>
      </div>

      <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        {/* Left Col: Job Info */}
        <div style={{ padding: '24px', border: '1px solid #eaeaea', borderRadius: '12px' }}>
          <h3>Position Details</h3>
          <p><strong>Role:</strong> {SAMPLE_JD.title}</p>
          <p><strong>Budget:</strong> {SAMPLE_JD.salary}</p>
          <p><strong>Division:</strong> Mid-Atlantic Skilled Trades</p>
        </div>

        {/* Right Col: AI Insights */}
        <div style={{ padding: '24px', backgroundColor: '#000', color: '#fff', borderRadius: '12px' }}>
          <h3 style={{ color: '#0070f3' }}>AI Match Insights</h3>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>Core Creativity Index: 94%</li>
            <li>Staff-IQ Alignment: High</li>
            <li>Retention Prediction: 2.4 Years</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
