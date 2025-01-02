'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

const OAuthButton = ({ name, id, imgSrc }: { name: string; id: string; imgSrc: string }) => (
  <button className="btn btn-lg px-2 gap-1" onClick={() => signIn(id)}>
    <Image alt={`${name} logo`} height="24" width="24" src={imgSrc} />
    <span className="text-xs mt-0">Sign in with {name}</span>
  </button>
);

export function OAuthSignin() {
  return (
    <div className="flex items-center gap-2 mt-4">
      <OAuthButton name="Google" id="google" imgSrc="/img/google.svg" />
    </div>
  );
}
