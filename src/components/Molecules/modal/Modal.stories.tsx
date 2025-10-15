import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState, useEffect } from 'react';
import { fn } from 'storybook/test';

import { Modal, useModal } from './index';

// 1. Meta 객체 정의
const meta = {
  title: 'Molecules/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onClose: fn(),
  },
  argTypes: {
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
    showCloseButton: {
      control: 'boolean',
      description: '내부 닫기 버튼 표시 여부',
    },
    closeButtonText: {
      control: 'text',
      description: '닫기 버튼 텍스트',
    },
    closeButtonClassName: {
      control: 'text',
      description: '닫기 버튼 커스텀 클래스',
    },
    className: {
      control: 'text',
      description: '모달 컨테이너 커스텀 클래스',
    },
    contentClassName: {
      control: 'text',
      description: '모달 콘텐츠 커스텀 클래스',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

// 2. 기본 인터랙티브 래퍼
interface InteractiveModalProps {
  size?: 'sm' | 'md' | 'lg';
  showBackdrop?: boolean;
  closeOnBackdropClick?: boolean;
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  showCloseButton?: boolean;
  closeButtonText?: string;
  closeButtonClassName?: string;
  className?: string;
  contentClassName?: string;
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

//  useModal 훅 래퍼
const UseModalWrapper = ({ children, ...props }: InteractiveModalProps) => {
  const modal = useModal();

  return (
    <div>
      <button
        onClick={modal.toggle}
        className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        {modal.isOpen ? '모달 닫기' : '모달 열기'} {/* 🔥 글씨 변경 */}
      </button>
      <Modal {...props} isOpen={modal.isOpen} onClose={modal.close}>
        {children}
      </Modal>
    </div>
  );
};

//  커스텀 글씨로 toggle 버튼
const CustomToggleModal = ({ children, ...props }: InteractiveModalProps) => {
  const modal = useModal();

  return (
    <div>
      <button
        onClick={modal.toggle}
        className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
      >
        {modal.isOpen ? '닫기' : '열기'} {/* 🔥 커스텀 글씨 */}
      </button>
      <Modal {...props} isOpen={modal.isOpen} onClose={modal.close}>
        {children}
      </Modal>
    </div>
  );
};

//  ESC 키 테스트용 래퍼
const EscapeTestModal = ({ children, ...props }: InteractiveModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [escapePressed, setEscapePressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log('🔍 키 이벤트 감지:', event.key);
      if (event.key === 'Escape') {
        console.log('✅ ESC 키 감지!');
        setEscapePressed(true);
        setTimeout(() => setEscapePressed(false), 2000);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div>
      <div className="mb-4 space-x-2">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          모달 열기
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          수동으로 닫기
        </button>
      </div>

      {escapePressed && (
        <div className="mb-4 rounded bg-green-100 p-3 text-green-700">
          ✅ ESC 키 감지됨! (2초 후 사라짐)
        </div>
      )}

      <Modal {...props} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </Modal>
    </div>
  );
};

type Story = StoryObj<InteractiveModalProps>;

// 4. 기본 스토리들
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

//  useModal 훅 사용 (toggle 버튼 글씨 변경)
export const WithUseModal: Story = {
  render: (args) => (
    <UseModalWrapper {...args}>
      <h2 className="mb-4 text-xl font-bold">useModal 훅 사용</h2>
      <p className="mb-4">useModal 훅의 toggle 함수를 사용합니다.</p>
      <p>버튼을 클릭하면 모달이 토글되고 버튼 글씨가 바뀝니다.</p>
    </UseModalWrapper>
  ),
  args: {
    size: 'md',
    showBackdrop: true,
    closeOnBackdropClick: true,
    position: 'center',
  },
};

//  커스텀 글씨로 toggle 버튼 (에러 수정)
export const CustomToggleText: Story = {
  render: (args) => (
    <CustomToggleModal {...args}>
      <h2 className="mb-4 text-xl font-bold">커스텀 Toggle 버튼</h2>
      <p className="mb-4">이 모달은 커스텀 글씨로 toggle 버튼을 사용합니다.</p>
      <p>버튼을 클릭하면 열기 ↔ 닫기로 바뀝니다.</p>
    </CustomToggleModal>
  ),
  args: {
    size: 'md',
    showBackdrop: true,
    closeOnBackdropClick: true,
    position: 'center',
  },
};

//  ESC 키 테스트 스토리
export const EscapeKeyTest: Story = {
  render: (args) => (
    <EscapeTestModal {...args}>
      <h2 className="mb-4 text-xl font-bold">ESC 키 테스트</h2>
      <p className="mb-4">모달을 열고 ESC 키를 눌러보세요!</p>
      <p className="mb-4 text-sm text-gray-600">
        개발자 도구 콘솔을 열어서 키 이벤트를 확인할 수 있습니다.
      </p>
      <div className="rounded bg-yellow-50 p-3">
        <p className="text-sm text-yellow-700">
          💡 ESC 키가 작동하지 않으면 스토리북 환경 문제일 수 있습니다.
        </p>
      </div>
    </EscapeTestModal>
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

// 6. 닫기 버튼 관련 스토리들
export const WithCloseButton: Story = {
  render: (args) => (
    <InteractiveModal {...args}>
      <h2 className="mb-4 text-xl font-bold">닫기 버튼 있는 모달</h2>
      <p className="mb-4">이 모달은 내부에 닫기 버튼이 있습니다.</p>
      <p>닫기 버튼을 클릭하거나 ESC 키를 누르면 닫힙니다.</p>
    </InteractiveModal>
  ),
  args: {
    size: 'md',
    showCloseButton: true,
    closeButtonText: '닫기',
  },
};

export const CustomCloseButton: Story = {
  render: (args) => (
    <InteractiveModal {...args}>
      <h2 className="mb-4 text-xl font-bold">커스텀 닫기 버튼</h2>
      <p className="mb-4">이 모달은 커스텀 스타일의 닫기 버튼을 가집니다.</p>
      <p>버튼 색상과 텍스트를 커스터마이징할 수 있습니다.</p>
    </InteractiveModal>
  ),
  args: {
    size: 'md',
    showCloseButton: true,
    closeButtonText: '확인',
    closeButtonClassName: 'bg-green-500 hover:bg-green-600',
  },
};

// 7. 커스텀 스타일링 스토리들
export const CustomStyling: Story = {
  render: (args) => (
    <InteractiveModal {...args}>
      <h2 className="mb-4 text-xl font-bold text-blue-600">
        커스텀 스타일 모달
      </h2>
      <p className="mb-4">이 모달은 커스텀 스타일링이 적용되어 있습니다.</p>
      <div className="rounded bg-blue-50 p-4">
        <p>배경과 테두리 색상이 커스터마이징되었습니다.</p>
      </div>
    </InteractiveModal>
  ),
  args: {
    size: 'md',
    className: 'backdrop-blur-sm',
    contentClassName: 'border-2 border-blue-300 shadow-xl',
  },
};

// 8. 위치별 스토리들
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

// 9. 특수한 동작을 가진 스토리들
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

// 10. 실제 사용 사례를 보여주는 스토리
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

// 🔥 실제로 열리는 모달 스토리 (isOpen: true로 고정)
export const AlwaysOpen: Story = {
  render: (args) => (
    <Modal {...args} isOpen={true} onClose={fn()}>
      <h2 className="mb-4 text-xl font-bold">항상 열린 모달</h2>
      <p className="mb-4">이 모달은 항상 열려있습니다.</p>
      <p>스토리북에서 모달의 모양을 확인할 수 있습니다.</p>
    </Modal>
  ),
  args: {
    size: 'md',
    showBackdrop: true,
    closeOnBackdropClick: true,
    position: 'center',
  },
};

// 🔥 모든 props를 테스트할 수 있는 스토리
export const AllPropsTest: Story = {
  render: (args) => (
    <InteractiveModal {...args}>
      <h2 className="mb-4 text-xl font-bold">모든 Props 테스트</h2>
      <p className="mb-4">이 모달은 모든 props를 테스트할 수 있습니다.</p>
      <div className="space-y-2">
        <p>• size: {args.size}</p>
        <p>• showBackdrop: {args.showBackdrop ? 'true' : 'false'}</p>
        <p>
          • closeOnBackdropClick: {args.closeOnBackdropClick ? 'true' : 'false'}
        </p>
        <p>• position: {args.position}</p>
        <p>• showCloseButton: {args.showCloseButton ? 'true' : 'false'}</p>
        <p>• closeButtonText: {args.closeButtonText}</p>
      </div>
    </InteractiveModal>
  ),
  args: {
    size: 'md',
    showBackdrop: true,
    closeOnBackdropClick: true,
    position: 'center',
    showCloseButton: true,
    closeButtonText: '닫기',
    closeButtonClassName: 'bg-blue-500 hover:bg-blue-600',
    className: 'backdrop-blur-sm',
    contentClassName: 'border-2 border-blue-300',
  },
};
