import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Protect /admin routes (except /admin/login) ───────────────
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_session')?.value;
    let authenticated = false;

    if (token && process.env.ADMIN_SESSION_SECRET) {
      try {
        const secret = new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET);
        await jwtVerify(token, secret);
        authenticated = true;
      } catch {
        authenticated = false;
      }
    }

    if (!authenticated) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // ── Let Supabase keep the session alive ───────────────────────
  return updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
