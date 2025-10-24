'use server';

import { cookies } from 'next/headers';

export const setTokenInCookie = async (token: string) => {
  const cookieStore = await cookies();

  cookieStore.set({
    name: 'accessToken',
    value: token,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: true,
    path: '/',
  });
  console.log('accessToken set in cookie');
};
