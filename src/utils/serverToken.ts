import { cookies } from 'next/headers';

export const getServerToken = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get('accessToken')?.value || null;
};
