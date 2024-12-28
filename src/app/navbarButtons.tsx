'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { JSX } from 'react';

export function TopNavAction({ path, label, children }: { path: string; label: string; children: JSX.Element }) {
  const currentPath = usePathname();
  const buttonClass = currentPath.startsWith(path) ? 'btn btn-outline' : 'btn btn-ghost';
  return (
    <Link href={path}>
      <button className={`flex-col gap-1 w-36 ${buttonClass}`}>
        {children}
        {label}
      </button>
    </Link>
  );
}

export function BottomNavAction({ path, label, children }: { path: string; label: string; children: JSX.Element }) {
  const currentPath = usePathname();
  const activeClass = currentPath.startsWith(path) ? 'active' : '';

  return (
    <Link href={path} className={activeClass}>
      <button className="flex flex-col items-center">
        {children}
        <span className="btm-nav-label">{label}</span>
      </button>
    </Link>
  );
}
