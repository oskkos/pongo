import { Metadata } from 'next';

import './globals.css';

import { Inter } from 'next/font/google';
import Link from 'next/link';
import { GiMonkey } from 'react-icons/gi';
import { MdHouse } from 'react-icons/md';

import { i18n } from '@/lib/i18n';
import { BottomNavAction, TopNavAction } from './navbarButtons';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Pongo`,
  description: `What an app`,
};

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
            <TopNavAction path="/dummy" label={'Dummy'}>
              <MdHouse size={24} />
            </TopNavAction>
            <TopNavAction path="/apartments" label={i18n.Apartments}>
              <MdHouse size={24} />
            </TopNavAction>
            <TopNavAction path="/foobar" label={'Foobar'}>
              <MdHouse size={24} />
            </TopNavAction>
          </div>
        </div>
        <main className="container mx-auto pb-16 md:pb-0">{children}</main>

        <div className="btm-nav visible md:invisible">
          <BottomNavAction path="/dummy" label={'Dummy'}>
            <MdHouse size={24} />
          </BottomNavAction>
          <BottomNavAction path="/apartments" label={i18n.Apartments}>
            <MdHouse size={24} />
          </BottomNavAction>
          <BottomNavAction path="/foobar" label={'Foobar'}>
            <MdHouse size={24} />
          </BottomNavAction>
        </div>
      </body>
    </html>
  );
}
