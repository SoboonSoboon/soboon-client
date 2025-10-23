'use client';

import { GET_CITY_OPTIONS } from '@/constants';
import { useMemo } from 'react';
import { CategoryFilter } from './CategoryFilter';
import { LocationFilter } from './LocationFilter';
import { StatusFilter } from './StatusFilter';
import { useFilterParams } from '@/hooks/useFilterParams';

const Line = () => {
  return <div className="bg-gray-10 my-5 h-[1px] w-full" />;
};

export const FilterSection = () => {
  const { updateParams, activeProductType, activeProvince, activeCity } =
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

  const handleProductTypeChange = (productType: string) => {
    updateParams({ productType });
  };

  const handleStatusChange = (status: string) => {
    updateParams({ status });
  };

  return (
    <div>
      <div className="mb-4">
        <h4 className="text-2xl">필터</h4>
      </div>

      <StatusFilter handleStatusChange={handleStatusChange} />

      <Line />

      <LocationFilter
        activeProvince={activeProvince}
        activeCity={activeCity}
        availableCityOptions={availableCityOptions}
        handleProvinceChange={handleProvinceChange}
        handleCityChange={handleCityChange}
      />

      <Line />

      <CategoryFilter
        activeProductType={activeProductType}
        handleProductTypeChange={handleProductTypeChange}
      />
    </div>
  );
};
