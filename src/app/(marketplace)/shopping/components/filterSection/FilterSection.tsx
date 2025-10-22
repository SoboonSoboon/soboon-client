'use client';

import { DateFilter } from '@/components';
import { CITY_OPTIONS, PROVINCE_OPTIONS, GET_CITY_OPTIONS } from '@/constants';
import { statusOptions } from '@/constants/status';
import { ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

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
        <div className="relative">
          <select
            name="province"
            id="province"
            className="min-w-[120px] cursor-pointer appearance-none rounded-md border-2 border-[#f3f5f6] bg-white px-3 py-2 pr-8 text-gray-700 transition-all duration-200 hover:border-gray-500 focus:border-gray-500 focus:outline-none"
            onChange={(e) => {
              const selectedProvince = PROVINCE_OPTIONS.find(
                (province) => province.value === e.target.value,
              );
              handleRegionChange(selectedProvince?.value || '', '');
            }}
            value={activeProvince}
          >
            {PROVINCE_OPTIONS.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-200 group-hover:rotate-180" />
          </div>
        </div>
        <div className="relative">
          <select
            name="city"
            id="city"
            className="min-w-[120px] cursor-pointer appearance-none rounded-md border-2 border-[#f3f5f6] bg-white px-3 py-2 pr-8 text-gray-700 transition-all duration-200 hover:border-gray-500 focus:border-gray-500 focus:outline-none"
            onChange={(e) => {
              const selectedCity = availableCityOptions.find(
                (city) => city.value === e.target.value,
              );
              handleRegionChange(activeProvince, selectedCity?.value || '');
            }}
            value={activeCity}
          >
            {availableCityOptions.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-200 group-hover:rotate-180" />
          </div>
        </div>
        <div className="relative">
          <select
            name="status"
            id="status"
            className="min-w-[120px] cursor-pointer appearance-none rounded-md border-2 border-[#f3f5f6] bg-white px-3 py-2 pr-8 text-gray-700 transition-all duration-200 hover:border-gray-500 focus:border-gray-500 focus:outline-none"
            onChange={(e) => {
              handleStatusChange(e.target.value);
            }}
            value={activeStatus}
          >
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-200 group-hover:rotate-180" />
          </div>
        </div>
      </div>
      <div>
        <DateFilter onChange={(value) => handleDateChange(value)} />
      </div>
    </div>
  );
};
