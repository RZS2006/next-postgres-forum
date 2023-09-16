'use client';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import EditPost from '@/components/EditPost';

export default function DashboardPosts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['userPosts'],
    queryFn: async () => await axios.get('/api/user/posts'),
  });

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred';

  return (
    <section>
      <h2>Posts</h2>
      {data?.data.posts.map((post: any) => (
        <EditPost key={post.id} post={post} />
      ))}
    </section>
  );
}
