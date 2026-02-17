// Next.js 14 Dynamic Route
export default function ProjectDetailsPage({ params }) {
  // In version 14.2.0, params is available directly
  const { id } = params;

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Project Details</h1>
      <p>Viewing details for Project ID: <strong>{id}</strong></p>
      
      <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc' }}>
        <h3>Project Stats</h3>
        <p>Loading data for {id}...</p>
      </div>
    </div>
  );
}
