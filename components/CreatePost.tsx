'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface Post {
  title: string;
  content: string;
}

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastId: string;

  const createPost = useMutation({
    mutationFn: async (post: Post) => {
      await axios.post('/api/posts', post);
    },
    onSuccess: (data) => {
      console.log(data);
      setTitle('');
      setContent('');
      setIsDisabled(false);
      toast.remove(toastId);
      toast.success('A new post has been created 🚀', { id: toastId });
      queryClient.invalidateQueries(['posts']);
    },
    onError: (error: any) => {
      if (error instanceof AxiosError) {
        toast.remove(toastId);
        toast.error(error?.response?.data.message, { id: toastId });
      }
      console.log(error);
      setIsDisabled(false);
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toastId = toast.loading('Creating a post...', { id: toastId });
    setIsDisabled(true);
    createPost.mutate({ title, content });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-black"
      />
      <div>
        <textarea
          name="content"
          id="content"
          cols={30}
          rows={10}
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-black"
        ></textarea>
        <p className={content.length > 500 ? 'text-red-600' : ''}>
          {`${content.length}`}/500
        </p>
      </div>
      <button
        type="submit"
        disabled={isDisabled}
        className="bg-violet-200 disabled:opacity-20"
      >
        Add Post
      </button>
    </form>
  );
};

export default CreatePost;
