'use client';

import { DateFilter } from '@/components';
import { CITY_OPTIONS, PROVINCE_OPTIONS, GET_CITY_OPTIONS } from '@/constants';
import { statusOptions } from '@/constants/status';
import { ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { FilterSelect } from './FilterSelect';

export const FilterSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeProvince = searchParams.get('province') || '';
  const activeCity = searchParams.get('city') || '';
  const activeStatus = searchParams.get('status') || '';

  const availableCityOptions = useMemo(() => {
    if (!activeProvince) {
      return CITY_OPTIONS; // 전체 옵션 보여주기
    }
    return [
      { value: '', label: '전체' },
      ...GET_CITY_OPTIONS(activeProvince).slice(1),
    ];
  }, [activeProvince]);

  const handleStatusChange = useCallback(
    (status: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('status', status);
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const handleRegionChange = useCallback(
    (province: string, city: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (province === '') {
        params.delete('province');
      } else {
        params.set('province', province);
      }

      if (city === '') {
        params.delete('city');
      } else {
        params.set('city', city);
      }

      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });

      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const handleDateChange = (value: 'RECENT' | 'OLDEST') => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortType', value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <FilterSelect
          name="province"
          value={activeProvince}
          options={PROVINCE_OPTIONS}
          onChange={(value) => handleRegionChange(value, '')}
        />
        <FilterSelect
          name="city"
          value={activeCity}
          options={availableCityOptions}
          onChange={(value) => handleRegionChange(activeProvince, value)}
        />
        <FilterSelect
          name="status"
          value={activeStatus}
          options={statusOptions}
          onChange={handleStatusChange}
        />
      </div>
      <div>
        <DateFilter onChange={(value) => handleDateChange(value)} />
      </div>
    </div>
  );
};
