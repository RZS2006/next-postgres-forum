import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-violet-200 py-4">
      <div className="container mx-auto flex justify-between px-4">
        <Link href="/" className="font-bold">
          Forum
        </Link>
        {session?.user ? (
          <div className="flex items-center gap-2">
            {session.user.name}
            <Image
              src={session.user.image as string}
              alt=""
              height={32}
              width={32}
            />
            <LogoutButton />
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
