import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  // Let Supabase keep the session alive
  const response = await updateSession(request);

  // ── Protect /admin routes ────────────────────────────────────
  // The admin portal is behind Supabase Auth. If you have not yet
  // set up a user, create one in your Supabase dashboard → Auth → Users,
  // then visit /admin/login to sign in.
  // Uncomment the block below once you have configured Auth:
  //
  // const supabase = await createClient();
  // const { data: { user } } = await supabase.auth.getUser();
  // if (request.nextUrl.pathname.startsWith('/admin') && !user) {
  //   return NextResponse.redirect(new URL('/admin/login', request.url));
  // }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
