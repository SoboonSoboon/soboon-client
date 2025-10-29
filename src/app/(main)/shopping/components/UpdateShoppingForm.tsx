'use client';

import { Button, Dropdown, Label, Textarea, TextInput } from '@/components';
import {
  CAPACITY_OPTIONS,
  MODEL_PROVINCE_OPTIONS,
  SHOPPING_TAGS,
} from '@/constants';
import {
  GET_MODEL_CITY_OPTIONS,
  GET_MODEL_DISTRICT_OPTIONS,
} from '@/constants/locations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { ApiResponse } from '@/types/common';
import { useToast, KeywordChip } from '@/components/Atoms';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { MeetingDetailType } from '@/types/meetingsType';
import { updateShoppingMeeting } from '@/action/meetingAction';

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

interface UpdateShoppingFormProps {
  meetingDetail: MeetingDetailType;
  meetingId: string;
}

export function UpdateShoppingForm({
  meetingDetail,
  meetingId,
}: UpdateShoppingFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    reset,
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
  const { success, error: showError } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (meetingDetail) {
      const existingTags = meetingDetail.tags || [];

      reset({
        title: meetingDetail.title || '',
        capacity: meetingDetail.total_member || 0,
        tags: existingTags,
        location: {
          province:
            meetingDetail.location_dep0 ||
            meetingDetail.location?.province ||
            '',
          city:
            meetingDetail.location_dep1 || meetingDetail.location?.city || '',
          district:
            meetingDetail.location_dep2 ||
            meetingDetail.location?.district ||
            '',
          detail:
            meetingDetail.detail_address ||
            meetingDetail.location?.detail ||
            '',
        },
        detail: meetingDetail.description || '',
      });

      if (existingTags.length > 0) {
        setTimeout(() => {
          setValue('tags', existingTags);
          clearErrors('tags');
        }, 100);
      } else {
      }
    }
  }, [meetingDetail, reset, setValue, clearErrors]);

  const { mutate: shoppingUpdate } = useMutation({
    mutationFn: async (formatData: ShoppingFormData) => {
      return await updateShoppingMeeting(meetingId, formatData);
    },
    onSuccess: (data: ApiResponse<string>) => {
      success(data.message || '장보기 모임이 성공적으로 수정되었습니다.');
      router.push('/shopping');
    },
    onError: (error: Error) => {
      showError(error.message || '장보기 모임 수정에 실패했습니다.');
    },
  });

  const onSubmit = (data: ShoppingFormData) => {
    shoppingUpdate(data);
  };

  const handleTagClick = (tagValue: string) => {
    const currentTags = watch('tags');
    const isSelected = currentTags.includes(tagValue);

    if (isSelected) {
      const newTags = currentTags.filter((t) => t !== tagValue);
      setValue('tags', newTags);
    } else {
      const newTags = [...currentTags, tagValue];
      setValue('tags', newTags);
    }
    clearErrors('tags');
  };

  return (
    <div className="mx-auto w-full max-w-[760px]">
      <div className="border-gray-10 flex flex-col gap-6 rounded-xl border bg-white p-4 sm:gap-8 sm:p-6 lg:gap-10">
        <span className="text-2xl font-bold sm:text-2xl">
          <strong className="text-primary">장보기 </strong>
          모임 수정하기
        </span>
        <form
          className="flex flex-col gap-6 sm:gap-8 lg:gap-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Label htmlFor="title" className="font-semibold" required>
              모임 제목을 입력해주세요
            </Label>
            <div className="mt-3">
              <TextInput
                id="title"
                placeholder="ex) 대량 고기 구매해서 나누고 싶어요!"
                {...register('title')}
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="capacity" className="font-semibold" required>
              모집 인원을 선택해주세요
            </Label>
            <div className="mt-3">
              <Dropdown
                options={CAPACITY_OPTIONS}
                value={watch('capacity')}
                onChange={(value) => {
                  setValue('capacity', Number(value));
                  clearErrors('capacity');
                }}
                placeholder="인원을 선택해주세요"
              />
              {errors.capacity && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.capacity.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="tags" className="font-semibold" required>
              어떤 장보기를 할까요?
            </Label>
            <div className="mt-3 flex flex-wrap gap-2">
              {SHOPPING_TAGS.map((tag) => {
                const isSelected = watch('tags').includes(tag.value);

                return (
                  <KeywordChip
                    key={tag.value}
                    label={tag.label}
                    variant={isSelected ? 'active' : 'inactive'}
                    onClick={() => handleTagClick(tag.value)}
                  />
                );
              })}
            </div>
            {errors.tags && (
              <p className="mt-2 text-sm text-red-500">{errors.tags.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="location" className="font-semibold" required>
              어디서 만날까요?
            </Label>
            <div className="mt-3 flex flex-col gap-3">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1">
                  <Dropdown
                    options={MODEL_PROVINCE_OPTIONS}
                    value={watch('location.province')}
                    onChange={(value) => {
                      setValue('location.province', value);
                      setValue('location.city', '');
                      setValue('location.district', '');
                      clearErrors('location.province');
                    }}
                    placeholder="시/도"
                  />
                </div>
                <div className="flex-1">
                  <Dropdown
                    options={GET_MODEL_CITY_OPTIONS(watch('location.province'))}
                    value={watch('location.city')}
                    onChange={(value) => {
                      setValue('location.city', value);
                      setValue('location.district', '');
                      clearErrors('location.city');
                    }}
                    placeholder="시/군/구"
                    disabled={!watch('location.province')}
                  />
                </div>
                <div className="flex-1">
                  <Dropdown
                    options={GET_MODEL_DISTRICT_OPTIONS(watch('location.city'))}
                    value={watch('location.district')}
                    onChange={(value) => {
                      setValue('location.district', value);
                      clearErrors('location.district');
                    }}
                    placeholder="동/읍/면"
                    disabled={!watch('location.city')}
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
