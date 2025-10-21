'use client';

import {
  modelProvinceOptions,
  modelCityOptions,
  modelDistrictOptions,
} from '@/constants/locations';
import { useMemo, useState } from 'react';
import { shoppingRegisterApi } from '@/apis/meetings/registerApi';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ApiResponse } from '@/types/common';
import { XIcon } from 'lucide-react';
import { TextInput, useToast, Textarea, Button } from '@/components/Atoms';
import { Dropdown } from '@/components/Molecules';

interface ShoppingRegisterFormProps {
  handleClose: () => void;
}

export function ShoppingRegisterForm({
  handleClose,
}: ShoppingRegisterFormProps) {
  const { success, error } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    location: {
      province: '',
      city: '',
      district: '',
      detail: '',
    },
    detail: '',
    capacity: 5, // 디자인에 인원 설정이 누락되어 임시로 5명으로 설정
  });

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
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">장보기 모임 등록</h1>
        <button onClick={handleClose} className="cursor-pointer">
          <XIcon className="h-4 w-4" />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="mb-3 block text-[#1F2937]">
            어떤 장보기 모임을 만들까요?
          </label>
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

        <div className="mb-6">
          <div>
            <label htmlFor="province" className="mb-3 block text-[#1F2937]">
              어디서 만날까요??
            </label>
            <div className="mb-3 flex items-center gap-2">
              <Dropdown
                name="province"
                id="province"
                required
                options={modelProvinceOptions}
                value={formData.location.province}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, province: value },
                  })
                }
              />
              <Dropdown
                name="city"
                id="city"
                required
                options={modelCityOptions}
                value={formData.location.city}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, city: value },
                  })
                }
              />
              <Dropdown
                name="district"
                id="district"
                required
                options={modelDistrictOptions}
                value={formData.location.district}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, district: value },
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <TextInput
            name="detail"
            required
            id="detail"
            placeholder="나머지 장소를 입력해주세요"
            value={formData.location.detail}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: { ...formData.location, detail: e.target.value },
              })
            }
          />
        </div>

        <div className="mb-6">
          <label htmlFor="date" className="mb-3 block">
            모임의 설명글을 작성해보세요!
          </label>
          <Textarea
            className="min-h-[173px]"
            name="detail"
            id="detail"
            required
            value={formData.detail}
            placeholder={`모집 내용을 작성해주세요.

ex) 대량 고기를 사서 나누고 싶어요.
그 외 필요한 구매 물품은 개인 구매하셔도 되어요.
함께 장보기 할 인원은 3명 정도 생각하고 있어요.이번주 토요일인 10월 10일  3시에 만나기로 해요!`}
            onChange={(e) =>
              setFormData({ ...formData, detail: e.target.value })
            }
          />
        </div>

        <Button
          label="확인"
          type="submit"
          className={`w-full border-none text-white ${
            isValid ? '!bg-primary' : '!bg-gray-30'
          }`}
          disabled={!isValid}
        />
      </form>
    </>
  );
}
