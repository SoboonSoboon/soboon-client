import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ToastProvider } from './ToastContext';
import { useToast } from './useToast';

// Helper components for each story
const DefaultToastDemo = () => {
  const { toast } = useToast();

  return (
    <button
      onClick={() => toast('기본 알림', '기본 토스트 메시지입니다.')}
      className="cursor-pointer rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
    >
      기본 토스트
    </button>
  );
};

const SuccessToastDemo = () => {
  const { success } = useToast();

  return (
    <button
      onClick={() => success('성공!', '작업이 완료되었습니다.')}
      className="cursor-pointer rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
    >
      성공 토스트
    </button>
  );
};

const ErrorToastDemo = () => {
  const { error } = useToast();

  return (
    <button
      onClick={() => error('오류!', '작업이 실패했습니다.')}
      className="cursor-pointer rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
    >
      오류 토스트
    </button>
  );
};

const WarningToastDemo = () => {
  const { warning } = useToast();

  return (
    <button
      onClick={() => warning('경고!', '주의가 필요합니다.')}
      className="cursor-pointer rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
    >
      경고 토스트
    </button>
  );
};

const InfoToastDemo = () => {
  const { info } = useToast();

  return (
    <button
      onClick={() => info('정보!', '알림 정보입니다.')}
      className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    >
      정보 토스트
    </button>
  );
};

const meta = {
  title: 'Atoms/Toast',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## 설정 방법

\`\`\`tsx
import { ToastProvider } from '@/components/Atoms';

function App() {
  return (
    <ToastProvider>
      <App />
    </ToastProvider>
  );
}
\`\`\`

## 사용법

\`\`\`tsx
import { useToast } from '@/components/Atoms';

function App() {
  const { success, error, warning, info } = useToast();

  return (
    <div>
      <button onClick={() => success('성공!', '작업이 완료되었습니다.')}>
        성공 토스트
      </button>
      <button onClick={() => error('오류!', '다시 시도해주세요.')}>
        에러 토스트
      </button>
    </div>
  );
}
\`\`\`
				`,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => <DefaultToastDemo />,
};

export const Success: Story = {
  render: () => <SuccessToastDemo />,
};

export const Error: Story = {
  render: () => <ErrorToastDemo />,
};

export const Warning: Story = {
  render: () => <WarningToastDemo />,
};

export const Info: Story = {
  render: () => <InfoToastDemo />,
};
