import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState, useEffect } from 'react';
import { fn } from 'storybook/test';

import { Modal, useModal } from './index';

// 1. Meta 객체 정의
const meta = {
  title: 'Molecules/Modal',
  component: Modal,
  parameters: {
    docs: {
      description: {
        component: `
# Modal 컴포넌트

재사용 가능한 모달 컴포넌트입니다.

## 기본 사용법

### 1. 기본 Modal 사용법

\`\`\`tsx
import { Modal } from '@/components/Molecules/modal';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>모달 열기</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>모달 제목</h2>
        <p>모달 내용</p>
      </Modal>
    </>
  );
}
\`\`\`

### 2. useModal 훅 사용법

\`\`\`tsx
import { Modal, useModal } from '@/components/Molecules/modal';

function MyComponent() {
  const modal = useModal();

  return (
    <>
      <button onClick={modal.open}>모달 열기</button>
      <button onClick={modal.close}>모달 닫기</button>
      <button onClick={modal.toggle}>모달 토글</button>
      
      <Modal isOpen={modal.isOpen} onClose={modal.close}>
        <h2>모달 제목</h2>
        <p>모달 내용</p>
      </Modal>
    </>
  );
}
\`\`\`

### 3. useModal 훅 옵션 사용법

\`\`\`tsx
import { Modal, useModal } from '@/components/Molecules/modal';

function MyComponent() {
  const modal = useModal({
    onOpen: () => console.log('모달이 열렸습니다'),
    onClose: () => console.log('모달이 닫혔습니다')
  });

  return (
    <>
      <button onClick={modal.toggle}>모달 토글</button>
      
      <Modal isOpen={modal.isOpen} onClose={modal.close}>
        <h2>모달 제목</h2>
        <p>모달 내용</p>
      </Modal>
    </>
  );
}
\`\`\`

### 4. 스크롤 가능한 모달 (리스트용)

\`\`\`tsx
import { Modal } from '@/components/Molecules/modal';

function ListModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>리스트 모달 열기</button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        scrollable={true}
        maxHeight="70vh"
        lockScroll={true}
      >
        <h2>긴 리스트</h2>
        {items.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </Modal>
    </>
  );
}
\`\`\`

## Modal Props

- **isOpen**: 모달의 열림/닫힘 상태 (필수)
- **onClose**: 모달을 닫을 때 호출되는 함수 (필수)
- **children**: 모달 내부에 렌더링될 내용 (필수)
- **size**: 모달 크기 (sm, md, lg, 기본값: md)
- **showBackdrop**: 배경 오버레이 표시 여부 (기본값: true)
- **closeOnBackdropClick**: 배경 클릭으로 닫기 여부 (기본값: true)
- **closeOnEscape**: ESC 키로 닫기 여부 (기본값: true)
- **position**: 모달 위치 (center, top, bottom, left, right, 기본값: center)
- **showCloseButton**: 내부 닫기 버튼 표시 여부 (기본값: false)
- **closeButtonText**: 닫기 버튼 텍스트 (기본값: '닫기')
- **closeButtonClassName**: 닫기 버튼 커스텀 클래스
- **className**: 모달 컨테이너 커스텀 클래스
- **contentClassName**: 모달 콘텐츠 커스텀 클래스
- **lockScroll**: 모달 열릴 때 배경 스크롤 락 여부 (기본값: true)
- **scrollable**: 모달 내부 스크롤 허용 여부 (기본값: false)
- **maxHeight**: 모달 최대 높이 (기본값: '80vh')

## useModal 훅 Props

- **onOpen**: 모달이 열릴 때 호출되는 콜백 함수
- **onClose**: 모달이 닫힐 때 호출되는 콜백 함수

## useModal 훅 반환값

- **isOpen**: 현재 모달의 열림/닫힘 상태
- **open**: 모달을 여는 함수
- **close**: 모달을 닫는 함수
- **toggle**: 모달의 열림/닫힘 상태를 토글하는 함수
        `,
      },
    },
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
    lockScroll: {
      control: 'boolean',
      description: '모달 열릴 때 스크롤 락 여부',
    },
    scrollable: {
      control: 'boolean',
      description: '모달 내부 스크롤 허용 여부',
    },
    maxHeight: {
      control: 'text',
      description: '모달 최대 높이 (예: 70vh, 500px)',
    },
  },
  tags: ['autodocs'],
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
  lockScroll?: boolean;
  scrollable?: boolean;
  maxHeight?: string;
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
      <Modal
        {...props}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        lockScroll={false}
      >
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
      <Modal
        {...props}
        isOpen={modal.isOpen}
        onClose={modal.close}
        lockScroll={false}
      >
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
      <Modal
        {...props}
        isOpen={modal.isOpen}
        onClose={modal.close}
        lockScroll={false}
      >
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

      <Modal
        {...props}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        lockScroll={false}
      >
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
    <Modal {...args} isOpen={true} onClose={fn()} lockScroll={false}>
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

// 🔥 모든 Modal props를 사용한 완전한 예제
export const CompleteModalExample: Story = {
  render: (args) => (
    <InteractiveModal {...args}>
      <h2 className="mb-4 text-xl font-bold">완전한 Modal 예제</h2>
      <p className="mb-4">이 모달은 모든 Modal props를 사용합니다.</p>
      <div className="space-y-2 text-sm">
        <p>• size: {args.size}</p>
        <p>• showBackdrop: {args.showBackdrop ? 'true' : 'false'}</p>
        <p>
          • closeOnBackdropClick: {args.closeOnBackdropClick ? 'true' : 'false'}
        </p>
        <p>• position: {args.position}</p>
        <p>• showCloseButton: {args.showCloseButton ? 'true' : 'false'}</p>
        <p>• closeButtonText: {`"${args.closeButtonText}"`}</p>
        <p>• closeButtonClassName: {`"${args.closeButtonClassName}"`}</p>
        <p>• className: {`"${args.className}"`}</p>
        <p>• contentClassName: {`"${args.contentClassName}"`}</p>
      </div>
    </InteractiveModal>
  ),
  args: {
    size: 'lg',
    showBackdrop: true,
    closeOnBackdropClick: true,
    position: 'center',
    showCloseButton: true,
    closeButtonText: '확인',
    closeButtonClassName: 'bg-green-500 hover:bg-green-600 text-white',
    className: 'backdrop-blur-sm',
    contentClassName: 'border-2 border-green-300 shadow-xl',
  },
};

// 🔥 useModal 훅의 모든 기능을 사용한 예제
export const CompleteUseModalExample: Story = {
  render: (args) => {
    const modal = useModal({
      defaultOpen: false,
      onOpen: () => console.log('모달이 열렸습니다'),
      onClose: () => console.log('모달이 닫혔습니다'),
    });

    return (
      <div>
        <div className="mb-4 space-x-2">
          <button
            onClick={modal.open}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            모달 열기
          </button>
          <button
            onClick={modal.close}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            모달 닫기
          </button>
          <button
            onClick={modal.toggle}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            모달 토글
          </button>
        </div>

        <div className="mb-4 rounded bg-gray-100 p-3">
          <p className="text-sm">현재 상태: {modal.isOpen ? '열림' : '닫힘'}</p>
          <p className="text-sm">
            콘솔을 확인하여 onOpen/onClose 콜백을 확인하세요.
          </p>
        </div>

        <Modal {...args} isOpen={modal.isOpen} onClose={modal.close}>
          <h2 className="mb-4 text-xl font-bold">useModal 훅 완전 예제</h2>
          <p className="mb-4">
            이 모달은 useModal 훅의 모든 기능을 사용합니다.
          </p>
          <div className="space-y-2 text-sm">
            <p>• defaultOpen: false</p>
            <p>• onOpen: 콘솔에 &quot;모달이 열렸습니다&quot; 출력</p>
            <p>• onClose: 콘솔에 &quot;모달이 닫혔습니다&quot; 출력</p>
            <p>• isOpen: 현재 모달 상태</p>
            <p>• open(): 모달 열기</p>
            <p>• close(): 모달 닫기</p>
            <p>• toggle(): 모달 토글</p>
          </div>
        </Modal>
      </div>
    );
  },
  args: {
    size: 'md',
    showBackdrop: true,
    closeOnBackdropClick: true,
    position: 'center',
    showCloseButton: true,
    closeButtonText: '닫기',
    closeButtonClassName: 'bg-purple-500 hover:bg-purple-600 text-white',
    className: 'backdrop-blur-sm',
    contentClassName: 'border-2 border-purple-300 shadow-xl',
  },
};

// 🔥 스크롤 가능한 모달 스토리
export const ScrollableModal: Story = {
  render: (args) => (
    <InteractiveModal {...args}>
      <h2 className="mb-4 text-xl font-bold">스크롤 가능한 모달</h2>
      <p className="mb-4">이 모달은 내부 스크롤이 가능합니다.</p>
      <div className="space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="rounded bg-gray-100 p-4">
            <h3 className="font-semibold">항목 {i + 1}</h3>
            <p className="text-sm text-gray-600">
              이것은 스크롤 가능한 모달의 {i + 1}번째 항목입니다. 내용이
              많아지면 모달 내부에서 스크롤할 수 있습니다.
            </p>
          </div>
        ))}
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
    scrollable: true,
    maxHeight: '70vh',
    lockScroll: true,
  },
};

// 🔥 긴 리스트 모달 스토리
export const LongListModal: Story = {
  render: (args) => (
    <InteractiveModal {...args}>
      <h2 className="mb-4 text-xl font-bold">긴 리스트 모달</h2>
      <p className="mb-4">검색 결과나 목록을 표시할 때 사용합니다.</p>
      <div className="space-y-2">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded bg-gray-50 p-3"
          >
            <div>
              <h4 className="font-medium">아이템 {i + 1}</h4>
              <p className="text-sm text-gray-500">설명 {i + 1}</p>
            </div>
            <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
              선택
            </button>
          </div>
        ))}
      </div>
    </InteractiveModal>
  ),
  args: {
    size: 'lg',
    showBackdrop: true,
    closeOnBackdropClick: true,
    position: 'center',
    showCloseButton: true,
    closeButtonText: '닫기',
    scrollable: true,
    maxHeight: '80vh',
    lockScroll: true,
  },
};
