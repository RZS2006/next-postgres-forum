import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <main className="min-h-screen">
      <h1 className="text-3xl font-semibold">
        This the dashboard! {session?.user?.name}
      </h1>
    </main>
  );
}
