import type { Meta, StoryObj } from '@storybook/nextjs-vite';
// import { fn } from 'storybook/test';
import { GoToTopButton } from './GoToTopButton';

const meta = {
  title: 'Atoms/GoToTopButton',
  component: GoToTopButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof GoToTopButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          '**사용법**',
          '- TOP 버튼을 클릭하면 페이지 상단으로 부드럽게 스크롤됩니다',
          '- 스크롤 위치와 관계없이 항상 표시됩니다',
          '',
          '**기능**',
          "- `window.scrollTo({ top: 0, behavior: 'smooth' })` 사용",
          '- 부드러운 스크롤 애니메이션',
        ].join('\n'),
      },
    },
  },
};

export const WithLongContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '긴 콘텐츠가 있는 페이지에서 TOP 버튼의 동작을 확인할 수 있습니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '200vh', padding: '20px' }}>
        <h1 className="text-primary">
          우측 하단에 있는 Go To Top 버튼을 테스트해보세요.
        </h1>
        <div style={{ marginBottom: '50px' }}>
          <h2>페이지 상단</h2>
          <p>스크롤을 내려서 TOP 버튼을 테스트해보세요.</p>
        </div>

        <div style={{ marginBottom: '50px' }}>
          <h2>중간 섹션</h2>
          <p>여기서 TOP 버튼을 클릭하면 페이지 상단으로 이동합니다.</p>
        </div>

        <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          <Story />
        </div>

        <div style={{ marginTop: '100vh' }}>
          <h2>페이지 하단</h2>
          <p>이제 TOP 버튼을 클릭해보세요!</p>
        </div>
      </div>
    ),
  ],
};
