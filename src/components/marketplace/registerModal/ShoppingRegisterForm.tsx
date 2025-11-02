'use client';

import {
  MODEL_PROVINCE_OPTIONS,
  GET_MODEL_CITY_OPTIONS,
  GET_MODEL_DISTRICT_OPTIONS,
  CAPACITY_OPTIONS,
} from '@/constants';
import { useMemo, useState, useEffect } from 'react';
import { shoppingRegisterApi } from '@/apis/meetings/registerApi';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ApiResponse } from '@/types/common';
import { XIcon } from 'lucide-react';
import {
  TextInput,
  useToast,
  Textarea,
  Button,
  Label,
} from '@/components/Atoms';
import { Dropdown } from '@/components/Molecules';
import { useUserLocation } from '@/hooks';

interface ShoppingRegisterFormProps {
  handleClose: () => void;
}

export function ShoppingRegisterForm({
  handleClose,
}: ShoppingRegisterFormProps) {
  const { success, error } = useToast();
  const router = useRouter();
  const { userLocation, hasLocation } = useUserLocation();

  const [formData, setFormData] = useState({
    title: '',
    location: {
      province: '',
      city: '',
      district: '',
      detail: '',
    },
    detail: '',
    description: '',
    capacity: 0,
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
      formData.title &&
      formData.location.province &&
      formData.location.city &&
      formData.location.district &&
      formData.location.detail &&
      formData.detail
    );
  }, [formData]);

  const { mutate: shoppingRegister } = useMutation({
    mutationFn: async () => {
      const response = await shoppingRegisterApi(formData);
      return response;
    },
    onSuccess: (data: ApiResponse<string>) => {
      success(data.message!);
      router.push('/shopping');
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

    shoppingRegister();
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          <span className="text-primary font-memomentKkukkkuk">장보기</span>{' '}
          모임 만들기
        </h1>
        <button
          onClick={handleClose}
          aria-label="닫기 버튼"
          className="cursor-pointer"
        >
          <XIcon className="size-6" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Label htmlFor="title" required>
              어떤 장보기 모임을 만들까요?
            </Label>
            <TextInput
              id="title"
              required
              placeholder="ex) 트레이더스 고양점에서 등심 고기 사실 분?"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="capacity" required>
              몇 명이 함께 하면 좋을까요?
            </Label>
            <Dropdown
              name="capacity"
              id="capacity"
              // required
              options={CAPACITY_OPTIONS}
              value={formData.capacity.toString()}
              onChange={(value) =>
                setFormData({ ...formData, capacity: Number(value) })
              }
              variant="form"
              placeholder="2"
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
                      location: {
                        ...formData.location,
                        province: value,
                        city: '',
                        district: '',
                      },
                    })
                  }
                  variant="form"
                  placeholder="지역 선택"
                />
                <Dropdown
                  name="city"
                  id="city"
                  options={GET_MODEL_CITY_OPTIONS(formData.location.province)}
                  value={formData.location.city}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        city: value,
                        district: '',
                      },
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
            <Label htmlFor="description" required>
              모임의 설명 글을 작성해 주세요.
            </Label>
            <Textarea
              className="min-h-[173px]"
              name="detail"
              id="detail"
              required
              value={formData.detail}
              placeholder={`ex) 대량 고기를 사서 나누고 싶어요.
그 외 필요한 구매 물품은 개인 구매하셔도 되어요.
이번주 토요일인 10월 10일 오후 3시에 만나기로 해요.`}
              onChange={(e) =>
                setFormData({ ...formData, detail: e.target.value })
              }
            />
          </div>
        </div>
        <Button
          label="확인"
          aria-label="확인 버튼"
          type="submit"
          disabled={!isValid}
        />
      </form>
    </div>
  );
}
