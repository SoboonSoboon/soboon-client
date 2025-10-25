'use client';

import { Dropdown } from '@/components/Molecules/Dropdown';
import { Checkbox, Label } from '@/components';
import { PROVINCE_OPTIONS, GET_CITY_OPTIONS } from '@/constants';
import categories from '@/constants/categories';
import { useFilterParams } from '@/hooks/useFilterParams';
import { useMemo } from 'react';

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

      <div className="flex items-center gap-2">
        <Checkbox
          id="recruiting"
          name="recruiting"
          className="active:bg-primary checked:border-primary checked:bg-primary size-6 checked:text-white"
          onChange={(checked) =>
            handleStatusChange(checked ? 'RECRUITING' : '')
          }
        />
        <Label htmlFor="recruiting">가능한 모임만 보기</Label>
      </div>

      <Line />

      <div>
        <h5 className="mb-4 text-lg">지역</h5>
        <div className="flex flex-col gap-2">
          <Dropdown
            name="province"
            value={activeProvince}
            options={PROVINCE_OPTIONS}
            className="w-full"
            onChange={(province) => handleProvinceChange(province)}
            placeholder="지역 선택"
            variant="filter"
          />
          <Dropdown
            name="city"
            value={activeCity}
            options={availableCityOptions}
            className="w-full"
            onChange={(city) => handleCityChange(city)}
            placeholder="시/군/구 선택"
            variant="filter"
          />
        </div>
      </div>

      <Line />

      <div>
        <h5 className="mb-4 text-lg">카테고리</h5>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleProductTypeChange(category.value)}
              className={`w-fit shrink-0 cursor-pointer rounded-md px-4 py-2 ${
                activeProductType === category.value
                  ? 'bg-[var(--GreenScale-Green10)]'
                  : 'bg-gray-5'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
