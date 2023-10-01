'use client';

import Image from 'next/image';
import Link from 'next/link';

const Comment = ({ comment }: any) => {
  const { id, user, message, createdAt } = comment;

  return (
    <li className="flex flex-col gap-2 bg-zinc-100 p-4">
      <Image src={user.image} height={32} width={32} alt="" />
      <p>{user.name}</p>
      <p>{message}</p>
      <p>{new Date(createdAt).toLocaleDateString()}</p>
    </li>
  );
};

export default Comment;
