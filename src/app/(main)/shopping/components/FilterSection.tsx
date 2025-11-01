'use client';

import { Dropdown } from '@/components/Molecules/Dropdown';
import { DateFilter } from '@/components';
import { PROVINCE_OPTIONS, GET_CITY_OPTIONS } from '@/constants';
import { statusOptions } from '@/constants/status';
import { useFilterParams } from '@/hooks/useFilterParams';
import { useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchInput } from '@/components/Molecules/Search/SearchInput';

export const FilterSection = () => {
  const { activeProvince, activeCity, activeStatus, updateParams } =
    useFilterParams();

  const searchParams = useSearchParams();
  const prevFilterParamsRef = useRef<string>('');

  const availableCityOptions = useMemo(() => {
    if (activeProvince === '') {
      return [{ value: '', label: '전체' }];
    }

    return [
      { value: '', label: '전체' },
      ...GET_CITY_OPTIONS(activeProvince).slice(1),
    ];
  }, [activeProvince]);

  const handleStatusChange = (status: string) => {
    updateParams({ status });
  };

  const handleProvinceChange = (province: string) => {
    if (province === '') {
      updateParams({ province, city: '' });
    } else {
      updateParams({ province, city: '' });
    }
  };

  const handleCityChange = (city: string) => {
    updateParams({ city });
  };

  const handleDateChange = (value: 'RECENT' | 'OLDEST') => {
    updateParams({ sortType: value });
  };

  const handleSearch = (searchText: string) => {
    updateParams({ keyword: searchText });
  };

  useEffect(() => {
    // 필터 관련 파라미터만 추출
    const currentFilterParams = [
      searchParams.get('province') || '',
      searchParams.get('city') || '',
      searchParams.get('status') || '',
      searchParams.get('sortType') || '',
      searchParams.get('keyword') || '',
    ].join('|');

    // 현재 값을 이전 값으로 저장
    prevFilterParamsRef.current = currentFilterParams;
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-between">
      <div className="flex w-full gap-2 md:max-w-92">
        <Dropdown
          name="province"
          value={activeProvince}
          options={PROVINCE_OPTIONS}
          onChange={(province) => handleProvinceChange(province)}
          placeholder="지역 선택"
          variant="filter"
          className="h-[44px]"
        />
        <Dropdown
          name="city"
          value={activeCity}
          options={availableCityOptions}
          onChange={(city) => handleCityChange(city)}
          placeholder="시/군/구 선택"
          variant="filter"
          className="h-[44px]"
        />
        <Dropdown
          name="status"
          value={activeStatus}
          options={statusOptions}
          onChange={handleStatusChange}
          placeholder="상태 선택"
          variant="filter"
          className="h-[44px]"
        />
      </div>

      <div className="flex w-full justify-between gap-2.5 md:max-w-[361px]">
        <DateFilter
          onChange={(value) => handleDateChange(value)}
          className="!h-[44px]"
        />
        <div className="flex-1">
          <SearchInput onSearch={handleSearch} className="h-[44px]" />
        </div>
      </div>
    </div>
  );
};
