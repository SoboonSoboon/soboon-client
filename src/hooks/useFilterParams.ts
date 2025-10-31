import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useFilterParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeProvince = searchParams.get('province') || '';
  const activeCity = searchParams.get('city') || '';
  const activeStatus = searchParams.get('status') || '';
  const activeProductType = searchParams.get('productType') || '';
  const activeTag = searchParams.get('tags') || '';

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

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  return {
    updateParams,
    activeProvince,
    activeCity,
    activeStatus,
    activeProductType,
    activeTag,
  };
};
