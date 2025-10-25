import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { LinkRenderer } from './LinkRenderer';

const meta = {
  title: 'Atoms/LinkRenderer',
  component: LinkRenderer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '링크가 포함된 텍스트',
    },
  },
} satisfies Meta<typeof LinkRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

const singleShortLinkText =
  '짧은 링크가 어떻게 본문에 들어가는지 확인해보세요: https://soboon.netlify.app/';

const singleLongLinkText =
  '긴 링크가 어떻게 본문에 들어가는지 확인해보세요: https://zemmaworld.com/product/mmmm-2%EC%B0%A8%EC%98%A4%ED%94%88%ED%94%BC%EC%B9%B4-%EC%86%8C%ED%94%84%ED%8A%B8%EC%8A%A4%EC%9B%A8%EC%9D%B4%EB%93%9C-%EB%B8%94%EB%A3%A8%EC%A2%85size12/32153/category/918/display/1/cafe_mkt=ue_naver_hot_1?NaPm=ct%3Dmh69lgtk%7Cci%3D7749a6056bdce2bee4b2292c74f985bbc985b6cc%7Ctr%3Dsbsh%7Csn%3D180496%7Cic%3D%7Chk%3D0b879c7a6a70965685973bc7c78a7ffe3945e933';

const multipleLinksText =
  '짧은 링크가 어떻게 본문에 들어가는지 확인해보세요: https://soboon.netlify.app/ 긴 링크가 어떻게 본문에 들어가는지 확인해보세요: https://zemmaworld.com/product/mmmm-2%EC%B0%A8%EC%98%A4%ED%94%88%ED%94%BC%EC%B9%B4-%EC%86%8C%ED%94%84%ED%8A%B8%EC%8A%A4%EC%9B%A8%EC%9D%B4%EB%93%9C-%EB%B8%94%EB%A3%A8%EC%A2%85size12/32153/category/918/display/1/cafe_mkt=ue_naver_hot_1?NaPm=ct%3Dmh69lgtk%7Cci%3D7749a6056bdce2bee4b2292c74f985bbc985b6cc%7Ctr%3Dsbsh%7Csn%3D180496%7Cic%3D%7Chk%3D0b879c7a6a70965685973bc7c78a7ffe3945e933 텍스트 중간에 있는 링크도 잘 표시되는지 확인해보세요.';

export const Default: Story = {
  args: {
    text: singleShortLinkText,
  },
  parameters: {
    layout: 'centered',
  },
};

export const MultipleLinks: Story = {
  args: {
    text: multipleLinksText,
  },
  parameters: {
    layout: 'centered',
  },
};

export const AllStates: Story = {
  args: {
    text: multipleLinksText,
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-xl font-bold">
          단일 링크가 본문에 포함된 경우
        </h2>
        <div className="flex gap-4">
          <div className="flex-1">
            <h3 className="mb-1 text-lg font-semibold">기본 상태</h3>
            <div className="border-gray-10 rounded-lg border bg-white p-3">
              <LinkRenderer text={singleShortLinkText} />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="mb-1 text-lg font-semibold">긴 텍스트</h3>
            <div className="border-gray-10 rounded-lg border bg-white p-3">
              <LinkRenderer text={singleLongLinkText} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-xl font-bold">
          2개 이상의 링크가 본문에 포함된 경우
        </h2>
        <div className="flex flex-col gap-2">
          <h3 className="mb-1 text-lg font-semibold">기본 상태</h3>
          <div className="border-gray-10 rounded-lg border bg-white p-3">
            <LinkRenderer text={multipleLinksText} />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};
