'use client';

import { Checkbox, Dropdown, Label, TextInput } from '@/components';
import categories from '@/constants/categories';
import { useState } from 'react';

const Line = () => {
  return <div className="bg-gray-10 my-5 h-[1px] w-full" />;
};

// 추후 의논 후 데이터 추가 및 constants 파일로 이동
const regionOptions = [
  { value: '1', label: '서울특별시' },
  { value: '2', label: '경기도' },
  { value: '3', label: '인천시' },
  { value: '4', label: '강원도' },
  { value: '5', label: '충청도' },
  { value: '6', label: '전라도' },
  { value: '7', label: '경상도' },
  { value: '8', label: '제주도' },
];

// 추후 의논 후 데이터 추가 및 constants 파일로 이동
const districtOptions = [
  { value: '1', label: '강남구' },
  { value: '2', label: '강동구' },
  { value: '3', label: '강서구' },
  { value: '4', label: '강북구' },
  { value: '5', label: '강서구' },
  { value: '6', label: '강서구' },
  { value: '7', label: '강서구' },
];

export const FilterSection = () => {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [price, setPrice] = useState({ min: 0, max: 0 });

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
        />
        <Label htmlFor="recruiting">모집중</Label>
      </div>

      <Line />

      <div>
        <h5 className="mb-4 text-lg">지역</h5>
        <div className="flex flex-col gap-2">
          <Dropdown options={regionOptions} />
          <Dropdown options={districtOptions} />
        </div>
      </div>

      <Line />

      <div>
        <h5 className="mb-4 text-lg">카테고리</h5>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`w-fit shrink-0 cursor-pointer rounded-md px-4 py-2 ${
                activeCategory === category
                  ? 'border-primary border bg-white'
                  : 'hover:border-primary hover:text-primary border border-[#f3f1ef] bg-[#f3f1ef]'
              }`}
            >
              {category}
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
          className={`underline ${price.min !== 0 || price.max !== 0 ? 'text-primary' : 'text-[#9CA3AF]'}`}
        >
          적용하기
        </p>
      </div>
    </div>
  );
};
