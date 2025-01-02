import 'server-only';

import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

import { upsertUser } from './services/userService';

import type { Provider } from 'next-auth/providers';

const providers: Provider[] = [Google];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === 'function') {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== 'credentials');

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: providers,
  pages: {
    signIn: '/signin',
  },
});

const userCache = new Map<string, string>();
export async function getUserIdFromSession() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error('User not found from session');
  }
  if (userCache.has(session.user.email)) {
    return userCache.get(session.user.email) as string;
  }

  const user = await upsertUser({
    email: session.user.email ?? '-',
    name: session.user.name ?? '-',
    image: session.user.image ?? null,
  });
  userCache.set(session.user.email, user.id);
  return user.id;
}
