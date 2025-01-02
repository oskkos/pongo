import 'server-only';

import { Metadata } from 'next';

import './globals.css';

import { Inter } from 'next/font/google';
import Link from 'next/link';
import { GiMonkey } from 'react-icons/gi';
import { MdAttachMoney, MdHouse, MdPerson } from 'react-icons/md';

import { auth } from '@/auth';
import { SignOut } from '@/components/signOut';
import { i18n } from '@/lib/i18n';
import { BottomNavAction, TopNavAction } from './navbarButtons';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Pongo`,
  description: `What an app`,
};

const actions = [
  { path: '/apartments', label: i18n.Apartments, icon: <MdHouse size={24} />, disabled: false },
  { path: '/tenants', label: i18n.Tenants, icon: <MdPerson size={24} />, disabled: false },
  { path: '/finance', label: i18n.Finance, icon: <MdAttachMoney size={24} />, disabled: true },
] as const;

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="navbar md:sticky top-0 z-50 bg-base-300 justify-between">
        <div className="inline-flex">
          <Link href="/" className="text-2xl font-bold inline-flex">
            <GiMonkey size={40} className="mr-2" />
            <span>pongo</span>
          </Link>

          <div className="hidden md:inline-flex ml-8 inline-flex gap-2">
            {actions.map(({ path, label, icon, disabled }) => (
              <TopNavAction key={path} path={path} label={label} disabled={disabled}>
                {icon}
              </TopNavAction>
            ))}
          </div>
        </div>
        <SignOut />
      </div>
      <main className="container mx-auto pb-16 md:pb-0">{children}</main>

      <div className="btm-nav visible md:invisible">
        {actions.map(({ path, label, icon, disabled }) => (
          <BottomNavAction key={path} path={path} label={label} disabled={disabled}>
            {icon}
          </BottomNavAction>
        ))}
      </div>
    </>
  );
}
function UnauthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="navbar md:sticky top-0 z-50 bg-base-300">
        <Link href="/" className="text-2xl font-bold">
          <GiMonkey size={40} className="mr-2" />
          <span>pongo</span>
        </Link>
      </div>
      <main className="container mx-auto pb-16 md:pb-0">{children}</main>
    </>
  );
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={inter.className}>
        {session ? (
          <AuthenticatedLayout>{children}</AuthenticatedLayout>
        ) : (
          <UnauthenticatedLayout>{children}</UnauthenticatedLayout>
        )}
      </body>
    </html>
  );
}
