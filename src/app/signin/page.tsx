import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { Card } from './card';
import { ErrorMessage } from './errorMessage';
import { OAuthSignin } from './oauthSignin';

export default async function Signin({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();
  if (session) {
    redirect('/');
  }
  const error = (await searchParams).error;
  const content = [<OAuthSignin key="oauth-signin" />];

  return <Card message={<ErrorMessage error={error} />} content={content} />;
}
