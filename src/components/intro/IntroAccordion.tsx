'use client';

import { Accordion, type AccordionItem } from '@/components/Atoms';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const IntroAccordion = () => {
  const ref = useScrollAnimation(0.3);

  const accordionItems: AccordionItem[] = [
    {
      id: '1',
      title: '소분소분은 어떤 서비스인가요?',
      content:
        '소분소분은 대용량 제품을 여러 사람이 함께 구매하여 필요한 만큼만 나누어 사용할 수 있는 플랫폼입니다. \n 비용을 절약하고 낭비를 줄일 수 있어요.',
    },
    {
      id: '2',
      title: '어떻게 사용하나요?',
      content:
        '원하는 제품을 찾아보세요. 함께 구매할 사람들과 모임을 만드세요. 제품을 구매하고 나눠받으세요.  \n사용 후 리뷰를 남겨주세요',
    },
    {
      id: '3',
      title: '비용은 어떻게 계산되나요?',
      content:
        '제품 가격을 참여 인원으로 나누어 계산합니다. 예를 들어 10,000원짜리 제품을 5명이 함께 구매하면 1인당 2,000원입니다.',
    },
    {
      id: '4',
      title: '안전하게 거래할 수 있나요?',
      content:
        '모든 거래는 플랫폼 내에서 이루어지며, 사용자 인증과 리뷰 시스템을 통해 안전한 거래를 보장합니다. 문제가 있을 경우 고객지원팀에 신고할 수 있어요.',
    },
  ];

  return (
    <div
      ref={ref}
      className="mx-auto mt-12 w-full max-w-[1200px] px-4 py-8 text-center sm:mt-20 sm:px-6 sm:py-10 lg:mt-[152px] lg:p-6"
    >
      <strong
        data-scroll="fade-up"
        className="text-text-main font-memomentKkukkkuk mb-6 block pb-8 text-center text-[28px] font-normal sm:mb-8 sm:pb-10 sm:text-[36px] lg:pb-14 lg:text-[44px]"
      >
        자주 묻는 질문
      </strong>
      <Accordion items={accordionItems} allowMultiple={true} />
    </div>
  );
};
