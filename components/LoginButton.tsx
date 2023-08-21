'use client';

import { signIn } from 'next-auth/react';

const LoginButton = () => {
  return <button onClick={() => signIn()}>Sign In</button>;
};

export default LoginButton;
