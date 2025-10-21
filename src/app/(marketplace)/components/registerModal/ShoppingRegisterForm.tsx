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
    province: '',
    city: '',
    district: '',
    detail: '',
    description: '',
    capacity: 5, // 디자인에 인원 설정이 누락되어 임시로 5명으로 설정
  });

  const isValid = useMemo(() => {
    return (
      formData.title &&
      formData.province &&
      formData.city &&
      formData.district &&
      formData.detail &&
      formData.description
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
        <button onClick={handleClose} className="cursor-pointer">
          <XIcon className="size-6" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label htmlFor="title" className="text-text-main">
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

          <div className="flex flex-col gap-3">
            <label htmlFor="title" className="text-text-main">
              몇 명을 모을까요?
            </label>
            {/* <Dropdown
              name="capacity"
              id="capacity"
              required
              options={capacityOptions}
              value={formData.capacity}
              onChange={(value) =>
                setFormData({ ...formData, capacity: value })
              }
            /> */}
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="province" className="text-[#1F2937]">
              어디서 만날까요??
            </label>
            <div className="flex flex-col items-center gap-3">
              <div className="flex w-full items-center gap-2.5">
                <Dropdown
                  name="province"
                  id="province"
                  required
                  options={modelProvinceOptions}
                  value={formData.province}
                  onChange={(value) =>
                    setFormData({ ...formData, province: value })
                  }
                />
                <Dropdown
                  name="city"
                  id="city"
                  required
                  options={modelCityOptions}
                  value={formData.city}
                  onChange={(value) =>
                    setFormData({ ...formData, city: value })
                  }
                />
                <Dropdown
                  name="district"
                  id="district"
                  required
                  options={modelDistrictOptions}
                  value={formData.district}
                  onChange={(value) =>
                    setFormData({ ...formData, district: value })
                  }
                />
              </div>
              <div className="w-full">
                <TextInput
                  name="detail"
                  required
                  id="detail"
                  placeholder="나머지 장소를 입력해주세요"
                  value={formData.detail}
                  onChange={(e) =>
                    setFormData({ ...formData, detail: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="date">모임의 설명 글을 작성해보세요!</label>
            <Textarea
              className="min-h-[173px]"
              name="description"
              id="description"
              required
              value={formData.description}
              placeholder={`모집 내용을 작성해주세요.

ex) 대량 고기를 사서 나누고 싶어요.
그 외 필요한 구매 물품은 개인 구매하셔도 되어요.
함께 장보기 할 인원은 3명 정도 생각하고 있어요.이번주 토요일인 10월 10일  3시에 만나기로 해요!`}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
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
    </div>
  );
}
