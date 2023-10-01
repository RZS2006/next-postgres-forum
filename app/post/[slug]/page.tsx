'use client';

import Post from '@/components/Post';
import Comment from '@/components/Comment';
import AddComment from '@/components/AddComment';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function PostPage(url: any) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['post'],
    queryFn: async () => await axios.get(`/api/post/${url.params.slug}`),
  });

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred';

  console.log(data);

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold">This a post!</h1>
        <Post key={data?.data.id} post={data?.data} />
        <h2 className="text-2xl font-semibold">Comments</h2>
        {data?.data.comments.map((comment: any) => (
          <Comment key={comment.id} comment={comment} />
        ))}
        <h2 className="text-2xl font-semibold">Add Comment</h2>
        <AddComment id={data?.data.id} />
      </div>
    </main>
  );
}
