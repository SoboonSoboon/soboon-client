import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import { Modal } from './modal';

// 1. Meta 객체 정의 - 스토리북의 기본 설정
const meta = {
  title: 'Molecules/Modal', // 스토리북 사이드바에서 보여질 경로
  component: Modal, // 실제 컴포넌트
  parameters: {
    layout: 'fullscreen', // 모달은 전체 화면에서 보는 것이 좋음
  },
  args: {
    onClose: fn(), // 스토리북 액션 로거용 함수
  },
  argTypes: {
    // 2. Controls 패널에서 조작할 수 있는 props 정의
    isOpen: {
      control: 'boolean',
      description: '모달의 열림/닫힘 상태',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '모달의 크기',
    },
    showBackdrop: {
      control: 'boolean',
      description: '배경 오버레이 표시 여부',
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: '배경 클릭 시 모달 닫기 여부',
    },
    position: {
      control: 'select',
      options: ['center', 'top', 'bottom', 'left', 'right'],
      description: '모달의 위치',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

// 3. 상태를 가진 인터랙티브 컴포넌트 래퍼
// 모달은 isOpen 상태가 필요하므로 useState를 사용하는 래퍼 컴포넌트 생성
interface InteractiveModalProps {
  size?: 'sm' | 'md' | 'lg';
  showBackdrop?: boolean;
  closeOnBackdropClick?: boolean;
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  children?: React.ReactNode;
}

const InteractiveModal = ({ children, ...props }: InteractiveModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        모달 열기
      </button>
      <Modal {...props} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </Modal>
    </div>
  );
};

// Story 타입을 InteractiveModalProps로 변경
type Story = StoryObj<InteractiveModalProps>;

// 4. 기본 스토리 - 가장 일반적인 사용 사례
export const Default: Story = {
  render: (args) => (
    <InteractiveModal {...args}>
      <h2 className="mb-4 text-xl font-bold">기본 모달</h2>
      <p className="mb-4">이것은 기본 모달입니다.</p>
      <p>ESC 키를 누르거나 배경을 클릭하면 닫힙니다.</p>
    </InteractiveModal>
  ),
  args: {
    size: 'md',
    showBackdrop: true,
    closeOnBackdropClick: true,
    position: 'center',
  },
};

// 5. 크기별 스토리들
export const SmallModal: Story = {
  render: (args) => (
    <InteractiveModal {...args}>
      <h2 className="mb-2 text-lg font-bold">작은 모달</h2>
      <p>작은 크기의 모달입니다.</p>
    </InteractiveModal>
  ),
  args: {
    size: 'sm',
  },
};

export const LargeModal: Story = {
  render: (args) => (
    <InteractiveModal {...args}>
      <h2 className="mb-4 text-2xl font-bold">큰 모달</h2>
      <p className="mb-4">큰 크기의 모달입니다.</p>
      <p className="mb-4">더 많은 콘텐츠를 담을 수 있습니다.</p>
      <div className="space-y-2">
        <p>• 첫 번째 항목</p>
        <p>• 두 번째 항목</p>
        <p>• 세 번째 항목</p>
      </div>
    </InteractiveModal>
  ),
  args: {
    size: 'lg',
  },
};

// 6. 위치별 스토리들
export const TopModal: Story = {
  render: (args) => (
    <InteractiveModal {...args}>
      <h2 className="mb-4 text-xl font-bold">상단 모달</h2>
      <p>화면 상단에 위치한 모달입니다.</p>
    </InteractiveModal>
  ),
  args: {
    position: 'top',
    size: 'md',
  },
};

export const BottomModal: Story = {
  render: (args) => (
    <InteractiveModal {...args}>
      <h2 className="mb-4 text-xl font-bold">하단 모달</h2>
      <p>화면 하단에 위치한 모달입니다. 모바일에서 자주 사용됩니다.</p>
    </InteractiveModal>
  ),
  args: {
    position: 'bottom',
    size: 'md',
  },
};

// 7. 특수한 동작을 가진 스토리들
export const NoBackdrop: Story = {
  render: (args) => (
    <InteractiveModal {...args}>
      <h2 className="mb-4 text-xl font-bold">배경 없는 모달</h2>
      <p>배경 오버레이가 없는 모달입니다.</p>
      <p>닫기 버튼이나 ESC 키로만 닫을 수 있습니다.</p>
    </InteractiveModal>
  ),
  args: {
    showBackdrop: false,
    closeOnBackdropClick: false,
  },
};

export const NoBackdropClick: Story = {
  render: (args) => (
    <InteractiveModal {...args}>
      <h2 className="mb-4 text-xl font-bold">배경 클릭 비활성화</h2>
      <p>배경을 클릭해도 닫히지 않는 모달입니다.</p>
      <p>닫기 버튼이나 ESC 키로만 닫을 수 있습니다.</p>
    </InteractiveModal>
  ),
  args: {
    closeOnBackdropClick: false,
  },
};

// 8. 실제 사용 사례를 보여주는 스토리
export const ConfirmDialog: Story = {
  render: (args) => (
    <InteractiveModal {...args}>
      <div className="text-center">
        <h2 className="mb-4 text-xl font-bold">확인</h2>
        <p className="mb-6">정말로 삭제하시겠습니까?</p>
        <div className="flex justify-center gap-2">
          <button className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400">
            취소
          </button>
          <button className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
            삭제
          </button>
        </div>
      </div>
    </InteractiveModal>
  ),
  args: {
    size: 'sm',
  },
};

export const FormModal: Story = {
  render: (args) => (
    <InteractiveModal {...args}>
      <h2 className="mb-4 text-xl font-bold">사용자 정보 입력</h2>
      <form className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">이름</label>
          <input
            type="text"
            className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="이름을 입력하세요"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">이메일</label>
          <input
            type="email"
            className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
          >
            취소
          </button>
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            저장
          </button>
        </div>
      </form>
    </InteractiveModal>
  ),
  args: {
    size: 'md',
  },
};
