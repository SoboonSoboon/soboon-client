'use client';

import {
  MODEL_PROVINCE_OPTIONS,
  GET_MODEL_CITY_OPTIONS,
  GET_MODEL_DISTRICT_OPTIONS,
} from '@/constants';
import { useMemo, useState, useEffect } from 'react';
import { dividingRegisterApi } from '@/apis/meetings/registerApi';
import {
  useToast,
  TextInput,
  Textarea,
  Button,
  Label,
} from '@/components/Atoms';
import { Dropdown } from '@/components/Molecules';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ApiResponse } from '@/types/common';
import categories from '@/constants/categories';
import ImageUploadForm from './imageLoader';
import RegisterModalHeader from './RegisterModalHeader';
import { useUserLocation } from '@/hooks';

interface DividingRegisterFormProps {
  handleClose: () => void;
}

export function DividingRegisterForm({
  handleClose,
}: DividingRegisterFormProps) {
  const { success, error } = useToast();
  const router = useRouter();
  const { userLocation, hasLocation } = useUserLocation();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    itemName: '',
    price: 0,
    location: {
      province: '',
      city: '',
      district: '',
      detail: '',
    },
    capacity: 0,
    productType: '',
    imageUrls: [] as File[],
  });

  useEffect(() => {
    if (hasLocation && userLocation) {
      setFormData((prev) => ({
        ...prev,
        location: {
          province: userLocation.province || '',
          city: userLocation.city || '',
          district: userLocation.district || '',
          detail: userLocation.detail || '',
        },
      }));
    }
  }, [hasLocation, userLocation]);

  const isValid = useMemo(() => {
    return (
      formData.itemName &&
      formData.productType &&
      formData.location.province &&
      formData.location.city &&
      formData.location.district &&
      formData.location.detail &&
      formData.description &&
      formData.capacity > 0
    );
  }, [formData]);

  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await dividingRegisterApi({
        ...formData,
      });
      return response;
    },
    onSuccess: (data: ApiResponse<string>) => {
      success(data.message!);
      router.push('/dividing');
      router.refresh();
      handleClose();
    },
    onError: (data: ApiResponse<string>) => {
      error(data.message!);
      handleClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <>
      <RegisterModalHeader
        title="소분하기 모임 등록"
        handleClose={handleClose}
      />
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Label htmlFor="productType" required>
              어떤 품목을 소분하세요?
            </Label>
            <Dropdown
              name="productType"
              id="productType"
              //required
              options={categories}
              value={formData.productType}
              onChange={(value) =>
                setFormData({ ...formData, productType: value })
              }
              variant="form"
            />
            <TextInput
              id="itemName"
              required
              placeholder="품목 이름을 적어주세요. (ex. 동물복지 유정란 30구)"
              value={formData.itemName}
              onChange={(e) =>
                setFormData({ ...formData, itemName: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="capacity" required>
              몇 명이 함께하면 좋을까요?
            </Label>
            <TextInput
              name="capacity"
              id="capacity"
              required
              value={formData.capacity.toString()}
              placeholder="ex) 3"
              onChange={(e) =>
                setFormData({ ...formData, capacity: Number(e.target.value) })
              }
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="province" required>
              어디서 만날까요?
            </Label>
            <div className="flex flex-col items-center gap-3">
              <div className="flex w-full items-center gap-2.5">
                <Dropdown
                  name="province"
                  id="province"
                  options={MODEL_PROVINCE_OPTIONS}
                  value={formData.location.province}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      location: { ...formData.location, province: value },
                    })
                  }
                  placeholder="지역 선택"
                  variant="form"
                />
                <Dropdown
                  name="city"
                  id="city"
                  options={GET_MODEL_CITY_OPTIONS(formData.location.province)}
                  value={formData.location.city}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      location: { ...formData.location, city: value },
                    })
                  }
                  variant="form"
                  placeholder="시/군/구"
                />
                <Dropdown
                  name="district"
                  id="district"
                  options={GET_MODEL_DISTRICT_OPTIONS(formData.location.city)}
                  value={formData.location.district}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      location: { ...formData.location, district: value },
                    })
                  }
                  variant="form"
                  placeholder="동/읍/면"
                />
              </div>
              <div className="w-full">
                <TextInput
                  name="detail"
                  required
                  id="detail"
                  placeholder="나머지 장소를 입력해 주세요"
                  value={formData.location.detail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        detail: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="imageUrls" required>
              이미지를 추가할까요?
            </Label>
            <div className="flex flex-col gap-3">
              <ImageUploadForm
                imageFiles={formData.imageUrls}
                setImageFiles={(imageFiles) =>
                  setFormData({ ...formData, imageUrls: imageFiles })
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="description" required>
              상세 설명을 작성해 주세요.
            </Label>
            <Textarea
              className="min-h-[173px]"
              name="description"
              id="description"
              required
              value={formData.description}
              placeholder={`ex) 언제 구매한 제품이예요.
이런 식으로 나누고 싶어요.
언제 어디서 만나고 싶어요.`}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </div>

        <Button label="확인" type="submit" disabled={!isValid} />
      </form>
    </>
  );
}
