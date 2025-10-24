'use client';

import { Dropdown } from '@/components/Molecules/Dropdown';
import { DateFilter } from '@/components';
import { PROVINCE_OPTIONS, GET_CITY_OPTIONS } from '@/constants';
import { statusOptions } from '@/constants/status';
import { useFilterParams } from '@/hooks/useFilterParams';
import { useMemo } from 'react';

export const FilterSection = () => {
  const { activeProvince, activeCity, activeStatus, updateParams } =
    useFilterParams();

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

  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <Dropdown
          name="province"
          value={activeProvince}
          options={PROVINCE_OPTIONS}
          onChange={(province) => handleProvinceChange(province)}
          placeholder="지역 선택"
          variant="filter"
        />
        <Dropdown
          name="city"
          value={activeCity}
          options={availableCityOptions}
          onChange={(city) => handleCityChange(city)}
          placeholder="시/군/구 선택"
          variant="filter"
        />
        <Dropdown
          name="status"
          value={activeStatus}
          options={statusOptions}
          onChange={handleStatusChange}
          placeholder="상태 선택"
          variant="filter"
        />
      </div>
      <div>
        <DateFilter onChange={(value) => handleDateChange(value)} />
      </div>
    </div>
  );
};
