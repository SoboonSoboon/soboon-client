'use client';

import { Checkbox, Label } from '@/components';
import { Button, KeywordChip } from '@/components/Atoms';
import { Dropdown } from '@/components/Molecules/Dropdown';
import { Modal } from '@/components/Molecules/modal';
import { PROVINCE_OPTIONS, GET_CITY_OPTIONS } from '@/constants';
import categories from '@/constants/categories';
import { useFilterParams } from '@/hooks/useFilterParams';
import { useMemo } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterBottomSheet = ({
  isOpen,
  onClose,
}: FilterBottomSheetProps) => {
  const {
    updateParams,
    activeProductType,
    activeProvince,
    activeCity,
    activeStatus,
  } = useFilterParams();

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

  const handleClose = () => {
    onClose();
  };

  return createPortal(
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      position="bottom"
      size="custom"
      showBackdrop={true}
      closeOnBackdropClick={true}
      closeOnEscape={true}
      contentClassName="w-full max-w-none sm:max-w-none rounded-t-3xl rounded-b-none max-h-[90vh]"
      lockScroll={true}
      scrollable={true}
      maxHeight="90vh"
      showCloseButton={false}
    >
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">필터</h3>
          <X
            size={40}
            onClick={handleClose}
            className="cursor-pointer p-2"
            aria-label="필터 닫기"
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="recruiting"
            name="recruiting"
            className="active:bg-primary checked:border-primary checked:bg-primary size-6 checked:text-white"
            checked={activeStatus === 'RECRUITING'}
            onChange={(checked) =>
              handleStatusChange(checked ? 'RECRUITING' : '')
            }
          />
          <Label htmlFor="recruiting">가능한 모임만 보기</Label>
        </div>

        <div className="bg-gray-10 my-5 h-[1px] w-full"></div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold">지역</h3>
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

        <div className="bg-gray-10 my-5 h-[1px] w-full"></div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold">카테고리</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <KeywordChip
                key={category.value}
                onClick={() => handleProductTypeChange(category.value)}
                label={category.label}
                variant={
                  activeProductType === category.value ? 'active' : 'inactive'
                }
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-3 pb-4">
          <Button
            variant="outline"
            aria-label="초기화"
            label="초기화"
            onClick={() => {
              updateParams({
                province: '',
                city: '',
                productType: '',
                status: '',
              });
            }}
            className="flex-1"
          />
          <Button
            variant="filled"
            aria-label="적용"
            label="적용"
            onClick={handleClose}
            className="flex-1"
          />
        </div>
      </div>
    </Modal>,
    document.body,
  );
};
