'use client';

import { TextInput } from '@/components';
import { modelProvinceOptions } from '@/constants/locations';
import { modelCityOptions } from '@/constants/locations';
import { modelDistrictOptions } from '@/constants/locations';
import { Textarea } from '@/components';
import { Button } from '@/components';
import { useMemo, useState } from 'react';
import { sharingRegisterApi } from '@/apis/meetings/registerApi';
import { useToast } from '@/components/Atoms';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ApiResponse } from '@/types/common';
import categories from '@/constants/categories';
import { XIcon } from 'lucide-react';
import ImageUploadForm from './imageLoader';

interface SharingRegisterFormProps {
  handleClose: () => void;
}

export function SharingRegisterForm({ handleClose }: SharingRegisterFormProps) {
  const { success, error } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    itemName: '',
    price: 0,
    province: '',
    city: '',
    district: '',
    detail: '',
    capacity: 0,
    productType: '',
    imageUrls: [],
  });

  const isValid = useMemo(() => {
    return (
      formData.itemName &&
      formData.productType &&
      formData.province &&
      formData.city &&
      formData.district &&
      formData.detail &&
      formData.description &&
      formData.capacity > 0
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
    console.log(formData);
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
          <label htmlFor="productType" className="mb-3 block text-[#1F2937]">
            어떤 품목을 소분하세요?
          </label>
          <select
            name="productType"
            id="productType"
            required
            value={formData.productType}
            className="hover:border-primary focus:border-primary mb-3 w-full cursor-pointer appearance-none rounded-md border-2 border-[#f3f5f6] bg-white px-3 py-2 pr-8 text-gray-700 transition-all duration-200 focus:outline-none"
            onChange={(e) =>
              setFormData({ ...formData, productType: e.target.value })
            }
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
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

        <div className="mb-6">
          <div>
            <label htmlFor="province" className="mb-3 block text-[#1F2937]">
              몇명을 모을까요?
            </label>
            <div className="mb-3 flex items-center gap-2">
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
          </div>
        </div>

        <div className="mb-6">
          <div>
            <label htmlFor="province" className="mb-3 block text-[#1F2937]">
              어디서 만날까요??
            </label>
            <div className="mb-3 flex items-center gap-2">
              <select
                name="province"
                id="province"
                required
                value={formData.province}
                className="min-w-[120px] cursor-pointer appearance-none rounded-md border-2 border-[#f3f5f6] bg-white px-3 py-2 pr-8 text-gray-700 transition-all duration-200 hover:border-gray-500 focus:border-gray-500 focus:outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, province: e.target.value })
                }
              >
                {modelProvinceOptions.map((province) => (
                  <option key={province.value} value={province.value}>
                    {province.label}
                  </option>
                ))}
              </select>
              <select
                name="city"
                id="city"
                required
                value={formData.city}
                className="min-w-[120px] cursor-pointer appearance-none rounded-md border-2 border-[#f3f5f6] bg-white px-3 py-2 pr-8 text-gray-700 transition-all duration-200 hover:border-gray-500 focus:border-gray-500 focus:outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              >
                {modelCityOptions.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
              <select
                name="district"
                id="district"
                required
                value={formData.district}
                className="min-w-[120px] cursor-pointer appearance-none rounded-md border-2 border-[#f3f5f6] bg-white px-3 py-2 pr-8 text-gray-700 transition-all duration-200 hover:border-gray-500 focus:border-gray-500 focus:outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, district: e.target.value })
                }
              >
                {modelDistrictOptions.map((district) => (
                  <option key={district.value} value={district.value}>
                    {district.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
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

        <div className="mb-6">
          {/* <label htmlFor="description" className="mb-3 block">
            이미지를 추가할까요?
          </label>
          <div className="flex items-center gap-2">
            <input
              id="image-upload"
              type="file"
              multiple
              accept="image/*"
              className="cursor-pointer appearance-none rounded-md border-2 border-[#f3f5f6] bg-white px-3 py-2 text-gray-700 transition-all duration-200 hover:border-gray-500 focus:border-gray-500 focus:outline-none"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({
                  ...formData,
                  imageUrls: Array.from(e.target.files || []),
                })
              }
            />
            <Button
              type="button"
              label="파일 찾기"
              className="!text-primary border-primary block shrink-0 !bg-white"
            />
          </div> */}
          <ImageUploadForm />
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
