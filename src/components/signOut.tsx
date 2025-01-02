import { redirect } from 'next/navigation';
import { MdLogout } from 'react-icons/md';

import { signOut } from '@/auth';

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirect: false });
        redirect('/signin');
      }}
    >
      <button className="btn btn-circle" type="submit">
        <MdLogout size={24} />
      </button>
    </form>
  );
}
