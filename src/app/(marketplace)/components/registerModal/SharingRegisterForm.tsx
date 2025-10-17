'use client';

import {
  modelProvinceOptions,
  modelCityOptions,
  modelDistrictOptions,
} from '@/constants/locations';
import { useMemo, useState } from 'react';
import { sharingRegisterApi } from '@/apis/meetings/registerApi';
import { useToast, TextInput, Textarea, Button } from '@/components/Atoms';
import { Dropdown } from '@/components/Molecules';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ApiResponse } from '@/types/common';
import categories from '@/constants/categories';
import { XIcon } from 'lucide-react';

interface SharingRegisterFormProps {
  handleClose: () => void;
}

export function SharingRegisterForm({ handleClose }: SharingRegisterFormProps) {
  const { success, error } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    itemName: '계란',
    price: 0,
    province: '',
    city: '',
    district: '',
    detail: '',
    capacity: 5,
    productType: '',
    imageUrls: [],
  });

  const isValid = useMemo(() => {
    return (
      formData.title &&
      formData.province &&
      formData.city &&
      formData.district &&
      formData.detail &&
      formData.description &&
      formData.itemName &&
      formData.price &&
      formData.productType &&
      formData.capacity
    );
  }, [formData]);

  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await sharingRegisterApi(formData);
      return response;
    },
    onSuccess: (data: ApiResponse<string>) => {
      success(data.message!);
      router.push('/sharing');
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
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">소분하기 모임 등록</h1>
        <button onClick={handleClose} className="cursor-pointer">
          <XIcon className="h-4 w-4" />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="mb-3 block text-[#1F2937]">
            모임 제목
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
          <label htmlFor="productType" className="mb-3 block text-[#1F2937]">
            어떤 품목을 소분하세요?
          </label>
          <Dropdown
            name="productType"
            id="productType"
            required
            options={categories}
            value={formData.productType}
            onChange={(value) =>
              setFormData({ ...formData, productType: value })
            }
          />
        </div>

        <div className="mb-6">
          <label htmlFor="price" className="mb-3 block text-[#1F2937]">
            소분된 가격은 얼마인가요?
          </label>
          <TextInput
            name="price"
            id="price"
            required
            value={formData.price.toString()}
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
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
                onChange={(value) => setFormData({ ...formData, city: value })}
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
          </div>
        </div>
        <div className="mb-6">
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

        <div className="mb-6">
          <label htmlFor="description" className="mb-3 block">
            상세 설명
          </label>
          <Textarea
            className="min-h-[173px]"
            name="description"
            id="description"
            required
            value={formData.description}
            placeholder={`모집 내용을 작성해주세요.

ex)
이런 식으로 나누고 싶어요.
언제 구매했어요.
언제 어디서 만나고 싶어요`}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
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
