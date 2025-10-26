'use client';

import { shoppingRegisterApi } from '@/apis';
import { Button, Dropdown, Label, Textarea, TextInput } from '@/components';
import { useToast, KeywordChip } from '@/components/Atoms';
import { MODEL_PROVINCE_OPTIONS } from '@/constants';
import { SHOPPING_TAGS } from '@/constants';
import {
  GET_MODEL_CITY_OPTIONS,
  GET_MODEL_DISTRICT_OPTIONS,
  CAPACITY_OPTIONS,
} from '@/constants/locations';
import { ApiResponse } from '@/types/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';

const shoppingFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: '제목을 입력해주세요.' })
    .max(50, { message: '제목은 50자 이하로 입력해 주세요.' }),
  capacity: z
    .number()
    .min(1, { message: '모집 인원을 선택해 주세요.' })
    .min(2, { message: '모집 인원은 2명 이상이어야 합니다.' })
    .max(5, { message: '모집 인원은 5명 이하로 입력해주세요.' }),
  tags: z
    .array(z.string())
    .min(1, { message: '1개 이상의 태그를 선택해 주세요.' }),
  location: z.object({
    province: z.string().min(1, { message: '주소를 선택해 주세요.' }),
    city: z.string().min(1, { message: '주소를 선택해 주세요.' }),
    district: z.string().min(1, { message: '주소를 선택해 주세요.' }),
    detail: z
      .string()
      .min(1, { message: '상세 주소를 입력해 주세요.' })
      .min(3, { message: '상세 주소는 3자 이상 입력해 주세요.' })
      .max(50, { message: '상세 주소는 50자 이하로 입력해 주세요.' }),
  }),
  detail: z
    .string()
    .min(10, { message: '모임의 설명은 10자 이상 입력해 주세요.' })
    .max(500, { message: '모임의 설명은 500자 이하로 입력해 주세요.' }),
});

type ShoppingFormData = z.infer<typeof shoppingFormSchema>;

export default function ShoppingRegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<ShoppingFormData>({
    resolver: zodResolver(shoppingFormSchema),
    defaultValues: {
      title: '',
      capacity: 0,
      tags: [],
      location: {
        province: '',
        city: '',
        district: '',
        detail: '',
      },
      detail: '',
    },
    mode: 'onChange',
  });
  const { success, error } = useToast();
  const router = useRouter();

  const { mutate: shoppingRegister } = useMutation({
    mutationFn: async (formData: ShoppingFormData) => {
      const response = await shoppingRegisterApi(formData);
      return response;
    },
    onSuccess: (data: ApiResponse<string>) => {
      success(data.message!);
      router.push('/shopping');
    },
    onError: (data: ApiResponse<string>) => {
      error(data.message!);
    },
  });

  const onSubmit = async (data: ShoppingFormData) => {
    shoppingRegister(data);
  };

  return (
    <div className="mx-auto w-full max-w-[760px] px-4 sm:mt-6 sm:px-6 lg:mt-6">
      <div
        className="flex cursor-pointer items-center gap-2 pb-4"
        onClick={() => router.back()}
      >
        <div>
          <ChevronLeft className="text-text-sub2 size-6" />
        </div>
        <span className="text-text-sub2">목록</span>
      </div>
      <div className="border-gray-10 flex flex-col gap-6 rounded-xl border bg-white p-4 sm:gap-8 sm:p-6 lg:gap-10">
        <span className="text-2xl font-bold sm:text-2xl">
          <strong className="text-primary">장보기 </strong>
          모임 만들기
        </span>
        <form
          className="flex flex-col gap-6 sm:gap-8 lg:gap-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="title" className="font-semibold" required>
                어떤 장보기 모임을 만들까요?
              </Label>
              <TextInput
                id="title"
                {...register('title')}
                placeholder="ex) 트레이더스 고양점에서 등심 고기 사실 분?"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="tags" className="font-semibold" required>
                모임 태그를 붙여볼까요?
              </Label>
              <div className="flex flex-wrap gap-2">
                {SHOPPING_TAGS.map((tag: ShoppingTagType) => {
                  const isSelected = watch('tags')?.includes(tag.value);

                  return (
                    <KeywordChip
                      key={`# ${tag.value}`}
                      label={`# ${tag.label}`}
                      onClick={() => {
                        const currentTags = watch('tags') || [];
                        if (isSelected) {
                          setValue(
                            'tags',
                            currentTags.filter((t) => t !== tag.value),
                          );
                        } else {
                          setValue('tags', [...currentTags, tag.value]);
                        }
                      }}
                      variant={isSelected ? 'active' : 'inactive'}
                    />
                  );
                })}
              </div>
              {errors.tags && (
                <p className="text-sm text-red-500">{errors.tags.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="capacity" className="font-semibold" required>
              몇 명을 모을까요?
            </Label>
            <Dropdown
              name="capacity"
              id="capacity"
              options={CAPACITY_OPTIONS}
              value={watch('capacity')}
              onChange={(value) => {
                setValue('capacity', +value);
                clearErrors('capacity');
              }}
            />
            {errors.capacity && (
              <p className="text-sm text-red-500">{errors.capacity.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="province" className="font-semibold" required>
              어디서 만날까요??
            </Label>
            <div className="flex flex-col gap-3 sm:items-center">
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-2.5">
                <div className="flex-1">
                  <Dropdown
                    name="location.province"
                    id="location.province"
                    options={MODEL_PROVINCE_OPTIONS}
                    value={watch('location.province')}
                    onChange={(value) => {
                      setValue('location.province', value);
                      clearErrors('location.province');
                    }}
                  />
                </div>
                <div className="flex-1">
                  <Dropdown
                    name="location.city"
                    id="location.city"
                    options={GET_MODEL_CITY_OPTIONS(watch('location.province'))}
                    value={watch('location.city')}
                    onChange={(value) => {
                      setValue('location.city', value);
                      clearErrors('location.city');
                    }}
                  />
                </div>
                <div className="flex-1">
                  <Dropdown
                    name="location.district"
                    id="location.district"
                    options={GET_MODEL_DISTRICT_OPTIONS(watch('location.city'))}
                    value={watch('location.district')}
                    onChange={(value) => {
                      setValue('location.district', value);
                      clearErrors('location.district');
                    }}
                  />
                </div>
              </div>
              <div className="w-full">
                <TextInput
                  id="location.detail"
                  placeholder="나머지 장소를 입력해주세요"
                  {...register('location.detail')}
                />
              </div>
            </div>
            {errors.location && (
              <>
                {(errors.location.district ||
                  errors.location.city ||
                  errors.location.province) && (
                  <p className="text-sm text-red-500">
                    {errors.location.district?.message}
                  </p>
                )}
              </>
            )}
            {errors.location?.detail && (
              <p className="text-sm text-red-500">
                {errors.location?.detail.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="detail" className="font-semibold" required>
              모임의 설명 글을 작성해보세요!
            </Label>
            <Textarea
              className="min-h-[120px] sm:min-h-[150px] lg:min-h-[173px]"
              id="description"
              {...register('detail')}
              placeholder={`모집 내용을 작성해주세요.

ex) 대량 고기를 사서 나누고 싶어요.
그 외 필요한 구매 물품은 개인 구매하셔도 되어요.
함께 장보기 할 인원은 3명 정도 생각하고 있어요.이번주 토요일인 10월 10일  3시에 만나기로 해요!`}
            />
            {errors.detail && (
              <p className="text-sm text-red-500">{errors.detail.message}</p>
            )}
          </div>

          <Button
            label="확인"
            type="submit"
            className="w-full sm:w-auto sm:min-w-[120px]"
          />
        </form>
      </div>
    </div>
  );
}
