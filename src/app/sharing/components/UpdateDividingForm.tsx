'use client';

import { Button, Dropdown, Label, Textarea, TextInput } from '@/components';
import { CAPACITY_OPTIONS, MODEL_PROVINCE_OPTIONS } from '@/constants';
import { GET_MODEL_CITY_OPTIONS } from '@/constants/locations';
import { GET_MODEL_DISTRICT_OPTIONS } from '@/constants/locations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import ImageUploadForm from '@/components/marketplace/registerModal/imageLoader';
import { useMutation } from '@tanstack/react-query';
import { ApiResponse } from '@/types/common';
import { useToast } from '@/components/Atoms';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect } from 'react';
import { imageUploader } from '@/utils';
import { MeetingDetailType } from '@/types/meetingsType';
import { updateDividingMeeting } from '@/action/meetingAction';

// TODO: 상수값으로 선언 되어있음. 상수값 수정 후 삭제 필요
const DIVIDING_PRODUCT_TYPE_OPTIONS = [
  { value: 'FRESH', label: '신선식품' },
  { value: 'EASY_MEAL', label: '간편식' },
  { value: 'MEAT_SEAFOOD', label: '정육/수산' },
  { value: 'FROZEN', label: '냉동식품' },
  { value: 'LIVING_KITCHEN', label: '생필품' },
  { value: 'DIGITAL', label: '디지털기기' },
  { value: 'ETC', label: '기타' },
];

const dividingFormSchema = z.object({
  productType: z.string().min(1, { message: '제품 카테고리를 선택해주세요.' }),
  itemName: z.string().min(1, { message: '품목 이름을 입력해주세요.' }),
  capacity: z
    .number()
    .min(1, { message: '모집 인원을 선택해주세요.' })
    .min(2, { message: '모집 인원은 2명 이상이어야 합니다.' })
    .max(5, { message: '모집 인원은 5명 이하로 입력해주세요.' }),
  location: z.object({
    province: z.string().min(1, { message: '주소를 선택해주세요.' }),
    city: z.string().min(1, { message: '주소를 선택해주세요.' }),
    district: z.string().min(1, { message: '주소를 선택해주세요.' }),
    detail: z
      .string()
      .min(1, { message: '상세 주소를 입력해주세요.' })
      .min(3, { message: '상세 주소는 3자 이상 입력해주세요.' })
      .max(50, { message: '상세 주소는 50자 이하로 입력해주세요.' }),
  }),
  imageUrls: z
    .array(z.instanceof(File))
    .max(10, { message: '이미지는 최대 10장까지만 추가할 수 있습니다.' })
    .refine(
      (files) => files.every((file) => file.size <= 10 * 1024 * 1024), // 10MB 제한
      { message: '각 이미지 파일은 10MB 이하여야 합니다.' },
    )
    .refine(
      (files) =>
        files.every((file) => {
          const allowedTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/webp',
          ];
          return allowedTypes.includes(file.type);
        }),
      { message: 'JPG, PNG, GIF, WebP 이미지 파일만 업로드 가능합니다.' },
    ),
  description: z
    .string()
    .min(10, { message: '상세 설명은 10자 이상 입력해주세요.' })
    .max(500, { message: '상세 설명은 500자 이하로 입력해주세요.' }),
});

type DividingFormData = z.infer<typeof dividingFormSchema>;

interface UpdateDividingFormProps {
  meetingDetail: MeetingDetailType;
  meetingId: string;
}

export function UpdateDividingForm({
  meetingDetail,
  meetingId,
}: UpdateDividingFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<DividingFormData>({
    resolver: zodResolver(dividingFormSchema),
    defaultValues: {
      productType: '',
      itemName: '',
      capacity: 0,
      location: {
        province: '',
        city: '',
        district: '',
        detail: '',
      },
      description: '',
      imageUrls: [],
    },
    mode: 'onChange',
  });
  const { success, error: showError } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (meetingDetail) {
      const productTypeValue = meetingDetail.productTypes?.[0];

      reset({
        productType: productTypeValue,
        itemName: meetingDetail.item || '',
        capacity: meetingDetail.total_member || 0,
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
        description: meetingDetail.description || '',
        imageUrls: [],
      });

      if (productTypeValue) {
        setValue('productType', productTypeValue);
        clearErrors('productType');
      }
    }
  }, [meetingDetail, reset, setValue, clearErrors]);

  const { mutate: dividingUpdate } = useMutation({
    mutationFn: async (formatData: DividingFormData) => {
      let imageUrls: string[] = [];

      if (formatData.imageUrls.length > 0) {
        imageUrls = await imageUploader(formatData.imageUrls);
      }

      const requestData = {
        ...formatData,
        title: '',
        price: 0,
        imageUrls: imageUrls,
      };

      return await updateDividingMeeting(meetingId, requestData);
    },
    onSuccess: (data: ApiResponse<string>) => {
      success(data.message || '소분 모임이 성공적으로 수정되었습니다.');
      router.push('/sharing');
    },
    onError: (error: Error) => {
      showError(error.message || '소분 모임 수정에 실패했습니다.');
    },
  });

  const onSubmit = (data: DividingFormData) => {
    dividingUpdate(data);
  };

  return (
    <form
      className="flex flex-col gap-6 sm:gap-8 lg:gap-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Label htmlFor="productType" className="font-semibold" required>
          어떤 품목을 소분하세요?
        </Label>
        <div className="mt-3 flex flex-wrap gap-1.5 sm:flex-nowrap xl:gap-2.5">
          {DIVIDING_PRODUCT_TYPE_OPTIONS.map((option) => {
            const isSelected = watch('productType') === option.value;

            return (
              <div
                key={option.value}
                className="flex w-[80px] flex-col items-center gap-1 sm:flex-1"
              >
                <button
                  type="button"
                  onClick={() => {
                    setValue('productType', option.value);
                    clearErrors('productType');
                  }}
                  className={`hover:border-primary relative flex h-[70px] w-[70px] cursor-pointer items-center justify-center rounded-lg transition-colors duration-200 ${
                    watch('productType') === option.value
                      ? 'border-primary border-2'
                      : 'border-gray-10 border'
                  }`}
                >
                  <Image
                    src={`/images/category_${option.value}.png`}
                    alt={option.label}
                    fill
                    className="object-contain"
                  />
                </button>
                <span
                  className={`w-full text-center text-sm ${
                    watch('productType') === option.value
                      ? 'text-primary font-semibold'
                      : 'text-text-main'
                  }`}
                >
                  {option.label}
                </span>
              </div>
            );
          })}
        </div>
        {errors.productType && (
          <p className="mt-2 text-sm text-red-500">
            {errors.productType.message}
          </p>
        )}
        <div className="mt-3">
          <TextInput
            id="itemName"
            placeholder="품목 이름을 적어주세요. (ex. 동물복지 유정란 30구)"
            {...register('itemName')}
          />
          {errors.itemName && (
            <p className="mt-2 text-sm text-red-500">
              {errors.itemName.message}
            </p>
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
        <Label htmlFor="imageUrls" className="font-semibold">
          이미지를 추가할까요?
        </Label>
        <div className="flex flex-col gap-3">
          <ImageUploadForm
            imageFiles={watch('imageUrls')}
            setImageFiles={(imageFiles: File[]) =>
              setValue('imageUrls', imageFiles)
            }
          />
          {errors.imageUrls && (
            <p className="text-sm text-red-500">{errors.imageUrls.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="description" className="font-semibold" required>
          상세 설명
        </Label>
        <Textarea
          className="min-h-[120px] sm:min-h-[150px] lg:min-h-[173px]"
          id="description"
          {...register('description')}
          placeholder={`모집 내용을 작성해주세요.

ex)
이런 식으로 나누고 싶어요.
언제 구매했어요.
언제 어디서 만나고 싶어요`}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <Button
        label="수정하기"
        type="submit"
        className="w-full sm:w-auto sm:min-w-[120px]"
      />
    </form>
  );
}
