'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';

const EditPost = ({ post }: any) => {
  const { id, user, title, content, createdAt, comments } = post;
  const queryClient = useQueryClient();

  const deletePost = useMutation({
    mutationFn: async (id: string) => {
      await axios.post('/api/posts/delete', { data: id });
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success('Post has been deleted.');
      queryClient.invalidateQueries(['userPosts']);
    },
    onError: (error: any) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message);
      }
      console.log(error);
    },
  });

  const onDelete = () => {
    deletePost.mutate(id);
  };

  return (
    <article className="flex flex-col gap-2 bg-zinc-100 p-4">
      <Image src={user.image} height={32} width={32} alt="" />
      <p>{user.name}</p>
      <h3 className="font-semibold">{title}</h3>
      <p>{content}</p>
      <p>{new Date(createdAt).toLocaleDateString()}</p>
      <p>{comments.length} comment(s)</p>
      <Link href={`/posts/${id}`} className="font-semibold text-violet-800">
        Read More
      </Link>
      <button className="w-min bg-red-600 p-2 text-white" onClick={onDelete}>
        Delete
      </button>
      <p className="text-blue-600">Edit Post</p>
    </article>
  );
};

export default EditPost;
