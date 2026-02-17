import { auth } from '@clerk/nextjs/server';

export default async function HomePage() {
  // In Next.js 14 Server Components, we use auth() to get the userId
  const { userId } = auth();

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Planner-IQ Dashboard</h1>
      <hr />
      {userId ? (
        <div>
          <p>✅ Authenticated</p>
          <p>Welcome back! Use the links below to manage your projects.</p>
        </div>
      ) : (
        <div>
          <p>❌ Not Signed In</p>
          <p>Please sign in to access your project planner.</p>
        </div>
      )}
    </main>
  );
}
