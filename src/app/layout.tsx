import { Metadata } from 'next';

import './globals.css';

import { Inter } from 'next/font/google';
import Link from 'next/link';
import { GiMonkey } from 'react-icons/gi';
import { MdHouse, MdPerson } from 'react-icons/md';

import { i18n } from '@/lib/i18n';
import { BottomNavAction, TopNavAction } from './navbarButtons';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Pongo`,
  description: `What an app`,
};

const actions = [
  { path: '/apartments', label: i18n.Apartments, icon: <MdHouse size={24} /> },
  { path: '/tenants', label: i18n.Tenants, icon: <MdPerson size={24} /> },
] as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="navbar sticky top-0 z-50 bg-base-300">
          <Link href="/" className="text-2xl font-bold">
            <GiMonkey size={40} className="mr-2" />
            <span>pongo</span>
          </Link>

          <div className="hidden md:inline-flex ml-8 inline-flex gap-2">
            {actions.map(({ path, label, icon }) => (
              <TopNavAction key={path} path={path} label={label}>
                {icon}
              </TopNavAction>
            ))}
          </div>
        </div>
        <main className="container mx-auto pb-16 md:pb-0">{children}</main>

        <div className="btm-nav visible md:invisible">
          {actions.map(({ path, label, icon }) => (
            <BottomNavAction key={path} path={path} label={label}>
              {icon}
            </BottomNavAction>
          ))}
        </div>
      </body>
    </html>
  );
}
