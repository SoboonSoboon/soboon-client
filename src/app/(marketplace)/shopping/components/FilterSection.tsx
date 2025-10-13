import { DateFilter, Dropdown } from '@/components';

export const FilterSection = () => {
  const cityOptions = [
    { value: '1', label: '서울특별시' },
    { value: '2', label: '경기도' },
    { value: '3', label: '인천시' },
    { value: '4', label: '강원도' },
    { value: '5', label: '충청도' },
    { value: '6', label: '전라도' },
    { value: '7', label: '경상도' },
    { value: '8', label: '제주도' },
  ];

  const districtOptions = [
    { value: '1', label: '강남구' },
    { value: '2', label: '강동구' },
    { value: '3', label: '강서구' },
    { value: '4', label: '강북구' },
    { value: '5', label: '강서구' },
    { value: '6', label: '강서구' },
    { value: '7', label: '강서구' },
  ];

  return (
    <div className="mb-8 flex justify-between">
      <div className="flex gap-4">
        <Dropdown options={cityOptions} />
        <Dropdown options={districtOptions} />
      </div>
      <div>
        <DateFilter />
      </div>
    </div>
  );
};
