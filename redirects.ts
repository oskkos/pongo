import { type Redirect } from 'next/dist/lib/load-custom-routes';

export const redirects: Redirect[] = [
  {
    source: '/index',
    destination: '/apartments',
    permanent: true,
  },
  {
    source: '/',
    destination: '/apartments',
    permanent: true,
  },
];
