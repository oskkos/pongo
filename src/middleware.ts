// export { auth as middleware } from '@/auth';

import { auth } from '@/auth';

export const config = {
  matcher: [`/((?!signin|api/auth|_next/static|_next/image|favicon.ico).*)`],
};

export default auth((req) => {
  if (!req.auth) {
    const newUrl = new URL('/signin', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
