'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface Post {
  title: string;
  content: string;
}

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const createPost = useMutation({
    mutationFn: async (post: Post) => {
      await axios.post('/api/posts', post);
    },
  });

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsDisabled(true);
    createPost.mutate({ title, content });
  };

  return (
    <form onSubmit={submitPost} className="flex flex-col gap-2">
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
