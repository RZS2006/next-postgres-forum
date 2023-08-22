import CreatePost from '@/components/CreatePost';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold hover:text-green-600 ">
          Welcome!
        </h1>
        <CreatePost />
      </div>
    </main>
  );
}
