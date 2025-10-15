'use client';

import { Checkbox, Dropdown, Label, TextInput } from '@/components';
import categories from '@/constants/categories';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

const Line = () => {
  return <div className="bg-gray-10 my-5 h-[1px] w-full" />;
};

// 추후 의논 후 데이터 추가 및 constants 파일로 이동
const regionOptions = [
  { value: '서울특별시', label: '서울특별시' },
  { value: '경기도', label: '경기도' },
  { value: '인천시', label: '인천시' },
  { value: '강원도', label: '강원도' },
  { value: '충청도', label: '충청도' },
  { value: '전라도', label: '전라도' },
  { value: '경상도', label: '경상도' },
  { value: '제주도', label: '제주도' },
];

// 추후 의논 후 데이터 추가 및 constants 파일로 이동
const districtOptions = [
  { value: '강남구', label: '강남구' },
  { value: '강동구', label: '강동구' },
  { value: '강서구', label: '강서구' },
  { value: '강북구', label: '강북구' },
];

export const FilterSection = () => {
  const [price, setPrice] = useState({ min: 0, max: 0 });

  const searchParams = useSearchParams();
  const router = useRouter();

  const activeCategory = searchParams.get('productType') || '';

  const handleCategoryChange = useCallback(
    (productType: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (productType === '') {
        params.delete('productType');
      } else {
        params.set('productType', productType);
      }

      // URL 업데이트 (페이지 새로고침 없이)
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

      if (status === '') {
        params.delete('status');
      } else {
        params.set('status', status);
      }

      // URL 업데이트 (페이지 새로고침 없이)
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

  const handlePriceChange = useCallback(
    (min: number, max: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('min', min.toString());
      params.set('max', max.toString());

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
          <Dropdown
            options={regionOptions}
            onChange={(e) => handleRegionChange(e, '')}
          />
          <Dropdown
            options={districtOptions}
            onChange={(e) => handleRegionChange('', e)}
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

      <Line />

      <div>
        <h5 className="mb-4 text-lg">가격</h5>

        <div className="mb-5 flex items-center gap-2">
          <TextInput
            className="!border-text-line1 w-1/2 bg-white"
            placeholder="최소"
            value={price.min === 0 ? '' : price.min.toString()}
            onChange={(e) =>
              setPrice({ ...price, min: Number(e.target.value) || 0 })
            }
          />
          <span className="text-text-line1">~</span>
          <TextInput
            className="!border-text-line1 w-1/2 bg-white"
            placeholder="최대"
            value={price.max === 0 ? '' : price.max.toString()}
            onChange={(e) =>
              setPrice({ ...price, max: Number(e.target.value) || 0 })
            }
          />
        </div>

        <p
          onClick={() => handlePriceChange(price.min, price.max)}
          className={`underline ${price.min !== 0 || price.max !== 0 ? 'text-primary' : 'text-[#9CA3AF]'}`}
        >
          적용하기
        </p>
      </div>
    </div>
  );
};
