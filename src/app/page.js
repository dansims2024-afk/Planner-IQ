import { auth } from '@clerk/nextjs/server';

export default async function HomePage() {
  const { userId } = await auth();

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Planner-IQ Home</h1>
      {userId ? (
        <p>Welcome back! You are signed in.</p>
      ) : (
        <p>Please sign in to view your projects.</p>
      )}
    </main>
  );
}
