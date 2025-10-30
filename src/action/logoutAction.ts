'use server';

import { cookies } from 'next/headers';

export const logoutAction = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/auth/logout`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error('로그아웃 실패');
  }

  cookieStore.delete('accessToken');

  return { success: true };
};
