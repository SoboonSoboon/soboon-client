'use client';

import { Button, Dropdown, Label, Textarea, TextInput } from '@/components';
import { CAPACITY_OPTIONS, MODEL_PROVINCE_OPTIONS } from '@/constants';
import { GET_MODEL_CITY_OPTIONS } from '@/constants/locations';
import { GET_MODEL_DISTRICT_OPTIONS } from '@/constants/locations';

export default function ShoppingRegisterPage() {
  return (
    <div className="mx-auto mt-4 w-full max-w-[760px] px-4 sm:mt-6 sm:px-6 lg:mt-10">
      <div className="rounded-xl border border-[var(--GrayScale-Gray10)] bg-white p-4 sm:p-6">
        <p className="text-pry mb-6 text-xl font-bold sm:mb-8 sm:text-2xl lg:mb-9">
          <span className="text-primary font-memomentKkukkkuk">장보기</span>
          모임 만들기
        </p>
        <form className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
          <div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="title" required>
                어떤 장보기 모임을 만들까요?
              </Label>
              <TextInput
                id="title"
                required
                placeholder="ex) 트레이더스 고양점에서 등심 고기 사실 분?"
              />
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
            <Label htmlFor="description" required>
              모임의 설명 글을 작성해보세요!
            </Label>
            <Textarea
              className="min-h-[120px] sm:min-h-[150px] lg:min-h-[173px]"
              name="detail"
              id="detail"
              required
              value="대량 고기를 사서 나누고 싶어요.
그 외 필요한 구매 물품은 개인 구매하셔도 되어요.
함께 장보기 할 인원은 3명 정도 생각하고 있어요.이번주 토요일인 10월 10일  3시에 만나기로 해요!"
              placeholder={`모집 내용을 작성해주세요.

ex) 대량 고기를 사서 나누고 싶어요.
그 외 필요한 구매 물품은 개인 구매하셔도 되어요.
함께 장보기 할 인원은 3명 정도 생각하고 있어요.이번주 토요일인 10월 10일  3시에 만나기로 해요!`}
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
