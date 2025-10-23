import { GoToTopScroll } from '@/utils/goToTopScroll';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useFilterParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeProvince = searchParams.get('province') || '';
  const activeCity = searchParams.get('city') || '';
  const activeStatus = searchParams.get('status') || '';

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === '') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      GoToTopScroll();
      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  return { updateParams, activeProvince, activeCity, activeStatus };
};
