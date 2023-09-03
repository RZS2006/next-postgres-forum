'use client';

import CreatePost from '@/components/CreatePost';
import Post from '@/components/Post';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => await axios.get('/api/posts'),
  });

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred';

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold hover:text-green-600 ">
          Welcome!
        </h1>
        <CreatePost />
        <h2 className="text-2xl font-semibold">Posts</h2>
        <section className="flex flex-col gap-4">
          {data?.data.map((post: any) => <Post key={post.id} post={post} />)}
        </section>
      </div>
    </main>
  );
}
