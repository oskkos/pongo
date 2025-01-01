'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { JSX } from 'react';

export function TopNavAction({
  path,
  label,
  disabled,
  children,
}: {
  path: string;
  label: string;
  disabled?: boolean;
  children: JSX.Element;
}) {
  const currentPath = usePathname();
  const buttonClass = currentPath.startsWith(path) ? 'btn btn-outline' : 'btn btn-ghost';
  return disabled ? (
    <button className={`flex-col gap-1 w-36 ${buttonClass}`} disabled={disabled}>
      {children}
      {label}
    </button>
  ) : (
    <Link href={path}>
      <button className={`flex-col gap-1 w-36 ${buttonClass}`}>
        {children}
        {label}
      </button>
    </Link>
  );
}

export function BottomNavAction({
  path,
  label,
  disabled,
  children,
}: {
  path: string;
  label: string;
  disabled?: boolean;
  children: JSX.Element;
}) {
  const currentPath = usePathname();
  const activeClass = currentPath.startsWith(path) ? 'active' : '';

  return disabled ? (
    <button className="flex flex-col items-center disabled" disabled>
      {children}
      <span className="btm-nav-label">{label}</span>
    </button>
  ) : (
    <Link href={path} className={activeClass}>
      <button className="flex flex-col items-center">
        {' '}
        {children}
        <span className="btm-nav-label">{label}</span>
      </button>
    </Link>
  );
}
