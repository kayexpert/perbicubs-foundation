'use server';

import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { timingSafeEqual } from 'node:crypto';

const GENERIC_ERROR = 'Invalid email or password.';
const COOKIE_NAME = 'admin_session';
const SESSION_TTL_HOURS = 12;

function constantTimeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a, 'utf8');
  const bBuf = Buffer.from(b, 'utf8');
  if (aBuf.length !== bBuf.length) {
    // Still perform a compare so the timing isn't trivially distinguishable.
    timingSafeEqual(aBuf, aBuf);
    return false;
  }
  return timingSafeEqual(aBuf, bBuf);
}

export async function loginAction(_prevState: { error: string } | null, formData: FormData) {
  const emailRaw = formData.get('email');
  const passwordRaw = formData.get('password');
  const email = typeof emailRaw === 'string' ? emailRaw.trim() : '';
  const password = typeof passwordRaw === 'string' ? passwordRaw : '';

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  // Generic config error — don't leak which env var is missing.
  if (!adminEmail || !adminPassword || !sessionSecret) {
    return { error: 'Server configuration error. Contact the site administrator.' };
  }

  // Both email and password are compared in constant time.
  const emailOk = constantTimeEqual(email, adminEmail);
  const passwordOk = constantTimeEqual(password, adminPassword);

  if (!emailOk || !passwordOk) {
    return { error: GENERIC_ERROR };
  }

  const secret = new TextEncoder().encode(sessionSecret);
  const token = await new SignJWT({ admin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_HOURS}h`)
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * SESSION_TTL_HOURS,
    path: '/',
  });

  redirect('/admin');
}
