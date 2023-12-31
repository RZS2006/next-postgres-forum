'use client';

import Image from 'next/image';
import Link from 'next/link';

const Post = ({ post }: any) => {
  const { id, user, title, content, createdAt, comments } = post;

  console.log(post);

  return (
    <article className="flex flex-col gap-2 bg-zinc-100 p-4">
      <Image src={user.image} height={32} width={32} alt="" />
      <p>{user.name}</p>
      <h3 className="font-semibold">{title}</h3>
      <p>{content}</p>
      <p>{new Date(createdAt).toLocaleDateString()}</p>
      <p>{comments.length} comment(s)</p>
      <Link href={`/post/${id}`} className="font-semibold text-violet-800">
        Read More
      </Link>
    </article>
  );
};

export default Post;
