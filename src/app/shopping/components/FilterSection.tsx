'use client';

import { Dropdown } from '@/components/Molecules/Dropdown';
import { DateFilter } from '@/components';
import { PROVINCE_OPTIONS, GET_CITY_OPTIONS } from '@/constants';
import { statusOptions } from '@/constants/status';
import { useFilterParams } from '@/hooks/useFilterParams';
import { useEffect, useMemo } from 'react';
import { GoToTopScroll } from '@/utils';
import { useSearchParams } from 'next/navigation';
import { SearchInput } from '@/components/Molecules/Search/SearchInput';

export const FilterSection = () => {
  const { activeProvince, activeCity, activeStatus, updateParams } =
    useFilterParams();

  const searchParams = useSearchParams();

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
    console.log('검색어:', searchText);
    updateParams({ search: searchText });
  };

  useEffect(() => {
    GoToTopScroll(300);
  }, [searchParams]);

  return (
    <div className="flex justify-between">
      <div className="flex w-full max-w-92 gap-2">
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

      <div className="flex w-full max-w-[361px] justify-between gap-2.5">
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
