'use client';

import { Button, Dropdown, Label, Textarea, TextInput } from '@/components';
import { CAPACITY_OPTIONS, MODEL_PROVINCE_OPTIONS } from '@/constants';
import { GET_MODEL_CITY_OPTIONS } from '@/constants/locations';
import { GET_MODEL_DISTRICT_OPTIONS } from '@/constants/locations';

const DIVIDING_PRODUCT_TYPE_OPTIONS = [
  { value: 'FRESH', label: '신선식품' },
  { value: 'EASY_MEAL', label: '간편식' },
  { value: 'MEAT_SEAFOOD', label: '정육/수산' },
  { value: 'FROZEN', label: '냉동식품' },
  { value: 'LIVING_KITCHEN', label: '생필품' },
  { value: 'DIGITAL', label: '디지털기기' },
  { value: 'ETC', label: '기타' },
];

export default function DividingRegisterPage() {
  return (
    <div className="mx-auto mt-4 w-full max-w-[760px] px-4 sm:mt-6 sm:px-6 lg:mt-10">
      <div className="rounded-xl border border-[var(--GrayScale-Gray10)] bg-white p-4 sm:p-6">
        <p className="text-pry mb-6 text-xl font-bold sm:mb-8 sm:text-2xl lg:mb-9">
          <span className="text-primary font-memomentKkukkkuk">소분</span>
          모임 만들기
        </p>
        <form className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
          <div>
            <Label htmlFor="productType" required>
              어떤 품목을 소분하세요?
            </Label>
            <div className="mt-3 flex flex-wrap gap-1.5 xl:gap-2.5">
              {DIVIDING_PRODUCT_TYPE_OPTIONS.map((option) => (
                <div
                  key={option.value}
                  className="flex flex-col items-center gap-0.5"
                >
                  <div className="size-[80px] bg-gray-200"></div>
                  <span className="text-text-sub2 text-xs sm:text-sm">
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="capacity" required>
              몇 명을 모을까요?
            </Label>
            <Dropdown
              name="capacity"
              id="capacity"
              required
              options={CAPACITY_OPTIONS}
              value="3"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="province" required>
              어디서 만날까요??
            </Label>
            <div className="flex flex-col gap-3 sm:items-center">
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-2.5">
                <div className="flex-1">
                  <Dropdown
                    name="province"
                    id="province"
                    required
                    options={MODEL_PROVINCE_OPTIONS}
                    value="서울특별시"
                    onChange={(value) => console.log(value)}
                  />
                </div>
                <div className="flex-1">
                  <Dropdown
                    name="city"
                    id="city"
                    required
                    options={GET_MODEL_CITY_OPTIONS('서울특별시')}
                    value="강남구"
                    onChange={(value) => console.log(value)}
                  />
                </div>
                <div className="flex-1">
                  <Dropdown
                    name="district"
                    id="district"
                    required
                    options={GET_MODEL_DISTRICT_OPTIONS('강남구')}
                    value="역삼동"
                    onChange={(value) => console.log(value)}
                  />
                </div>
              </div>
              <div className="w-full">
                <TextInput
                  name="detail"
                  required
                  id="detail"
                  placeholder="나머지 장소를 입력해주세요"
                  value="역삼동 123-456"
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="imageUrls" required>
              이미지를 추가할까요?
            </Label>
            <div className="flex flex-col gap-3">
              {/* <ImageUploadForm formData={formData} setFormData={setFormData} /> */}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="description" required>
              상세 설명
            </Label>
            <Textarea
              className="min-h-[120px] sm:min-h-[150px] lg:min-h-[173px]"
              name="description"
              id="description"
              required
              value="이런 식으로 나누고 싶어요.
언제 구매했어요.
언제 어디서 만나고 싶어요"
              placeholder={`모집 내용을 작성해주세요.

ex)
이런 식으로 나누고 싶어요.
언제 구매했어요.
언제 어디서 만나고 싶어요`}
              onChange={(e) => console.log(e.target.value)}
            />
          </div>

          <div className="flex justify-center sm:justify-start">
            <Button
              label="확인"
              type="submit"
              className="w-full sm:w-auto sm:min-w-[120px]"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
