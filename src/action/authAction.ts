'use server';

import { cookies } from 'next/headers';

export const setTokenInCookie = async (token: string, userId: number) => {
  const cookieStore = await cookies();

  cookieStore.set({
    name: 'accessToken',
    value: token,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: true,
    path: '/',
  });

  cookieStore.set({
    name: 'userId',
    value: userId.toString(),
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
};

export const deleteTokenInCookie = async () => {
  (await cookies()).delete('accessToken');
  (await cookies()).delete('userId');
};
