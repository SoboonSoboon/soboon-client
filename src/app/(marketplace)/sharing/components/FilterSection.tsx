'use client';

import { Checkbox, Label } from '@/components';
import categories from '@/constants/categories';
import { cityOptions, provinceOptions } from '@/constants/locations';
import { ChevronDown } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const Line = () => {
  return <div className="bg-gray-10 my-5 h-[1px] w-full" />;
};

export const FilterSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeCategory = searchParams.get('productType') || '';
  const activeProvince = searchParams.get('province') || '';
  const activeCity = searchParams.get('city') || '';
  const handleCategoryChange = useCallback(
    (productType: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (productType === '') {
        params.delete('productType');
      } else {
        params.set('productType', productType);
      }

      router.push(`?${params.toString()}`);

      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    },
    [router, searchParams],
  );

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
      params.set('province', province);
      params.set('city', city);

      router.push(`?${params.toString()}`);

      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    },
    [router, searchParams],
  );

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
          <div className="relative">
            <select
              name="province"
              id="province"
              className="w-full min-w-[120px] cursor-pointer appearance-none rounded-md border-2 border-[#f3f5f6] bg-white px-3 py-2 pr-8 text-gray-700 transition-all duration-200 hover:border-gray-500 focus:border-gray-500 focus:outline-none"
              onChange={(e) => {
                const selectedProvince = provinceOptions.find(
                  (province) => province.value === e.target.value,
                );
                handleRegionChange(selectedProvince?.value || '', '');
                if (selectedProvince?.value === '') {
                  handleRegionChange('', '');
                }
              }}
            >
              {provinceOptions.map((province) => (
                <option key={province.value} value={province.value}>
                  {province.label}
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
              className="w-full min-w-[120px] cursor-pointer appearance-none rounded-md border-2 border-[#f3f5f6] bg-white px-3 py-2 pr-8 text-gray-700 transition-all duration-200 hover:border-gray-500 focus:border-gray-500 focus:outline-none"
              onChange={(e) => {
                const selectedCity = cityOptions.find(
                  (city) => city.value === e.target.value,
                );
                handleRegionChange(activeProvince, selectedCity?.value || '');
              }}
              value={activeCity}
            >
              {cityOptions.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-200 group-hover:rotate-180" />
            </div>
          </div>
        </div>
      </div>

      <Line />

      <div>
        <h5 className="mb-4 text-lg">카테고리</h5>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`w-fit shrink-0 cursor-pointer rounded-md px-4 py-2 ${
                activeCategory === category.value
                  ? 'border-primary border bg-white'
                  : 'hover:border-primary hover:text-primary border border-[#f3f1ef] bg-[#f3f1ef]'
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
