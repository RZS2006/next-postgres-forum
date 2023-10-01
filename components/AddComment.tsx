'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const AddComment = ({ id }: any) => {
  const [content, setContent] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastId: string;

  const addComment = useMutation({
    mutationFn: async (comment: any) => {
      await axios.post('/api/comments', comment);
    },
    onSuccess: (data) => {
      console.log(data);
      setContent('');
      setIsDisabled(false);
      toast.remove(toastId);
      toast.success('A new comment has been created 🚀', { id: toastId });
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

    toastId = toast.loading('Adding a comment...', { id: toastId });
    setIsDisabled(true);
    addComment.mutate({ content, id });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
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
        Add Comment
      </button>
    </form>
  );
};

export default AddComment;
