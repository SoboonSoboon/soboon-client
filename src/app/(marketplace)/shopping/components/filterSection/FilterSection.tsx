'use client';

import { DateFilter } from '@/components';
import { PROVINCE_OPTIONS, GET_CITY_OPTIONS } from '@/constants';
import { statusOptions } from '@/constants/status';
import { useFilterParams } from '@/hooks/useFilterParams';
import { useMemo } from 'react';
import { FilterSelect } from './FilterSelect';

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
      updateParams({ province, city: '' }); // province 변경 시 항상 city 초기화
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
        <FilterSelect
          name="province"
          value={activeProvince}
          options={PROVINCE_OPTIONS}
          onChange={(province) => handleProvinceChange(province)}
        />
        <FilterSelect
          name="city"
          value={activeCity}
          options={availableCityOptions}
          onChange={(city) => handleCityChange(city)}
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
