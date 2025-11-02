'use client';

import { Button, KeywordChip, Checkbox, Label } from '@/components/Atoms';
import { Dropdown, Modal } from '@/components/Molecules';
import { useFilterParams } from '@/hooks/useFilterParams';
import { useMemo, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { PROVINCE_OPTIONS, GET_CITY_OPTIONS } from '@/constants';
import categories from '@/constants/categories';

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

  const [selectedFilters, setSelectedFilters] = useState({
    productType: '',
    province: '',
    city: '',
    status: '',
  });

  useEffect(() => {
    if (isOpen) {
      setSelectedFilters({
        productType: activeProductType,
        province: activeProvince,
        city: activeCity,
        status: activeStatus,
      });
    }
  }, [isOpen, activeProductType, activeProvince, activeCity, activeStatus]);

  const availableCityOptions = useMemo(() => {
    if (selectedFilters.province === '') {
      return [{ value: '', label: '전체' }];
    }

    return [
      { value: '', label: '전체' },
      ...GET_CITY_OPTIONS(selectedFilters.province).slice(1),
    ];
  }, [selectedFilters.province]);

  const handleProvinceChange = (province: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      province,
      city: '',
    }));
  };

  const handleCityChange = (city: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      city,
    }));
  };

  const handleProductTypeChange = (productType: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      productType,
    }));
  };

  const handleStatusChange = (status: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      status,
    }));
  };

  const handleApplyButtonClick = () => {
    updateParams({
      province: selectedFilters.province,
      city: selectedFilters.city,
      productType: selectedFilters.productType,
      status: selectedFilters.status,
    });
    onClose();
  };

  const handleResetButtonClick = () => {
    setSelectedFilters({
      productType: '',
      province: '',
      city: '',
      status: '',
    });
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

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
            checked={selectedFilters.status === 'RECRUITING'}
            onChange={(checked) =>
              handleStatusChange(checked ? 'RECRUITING' : '')
            }
          />
          <Label htmlFor="recruiting" className="cursor-pointer">
            가능한 모임만 보기
          </Label>
        </div>

        <div className="bg-gray-10 my-5 h-[1px] w-full"></div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold">지역</h3>
          <div className="flex flex-col gap-2">
            <Dropdown
              name="province"
              value={selectedFilters.province}
              options={PROVINCE_OPTIONS}
              className="w-full"
              onChange={(province) => handleProvinceChange(province)}
              placeholder="지역 선택"
              variant="filter"
            />
            <Dropdown
              name="city"
              value={selectedFilters.city}
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
                  selectedFilters.productType === category.value
                    ? 'active'
                    : 'inactive'
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
            onClick={handleResetButtonClick}
            className="w-full"
          />
          <Button
            variant="filled"
            aria-label="적용"
            label="적용"
            onClick={handleApplyButtonClick}
            className="w-full"
          />
        </div>
      </div>
    </Modal>,
    document.body,
  );
};
