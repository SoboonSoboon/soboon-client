import { ReactNode } from 'react';

interface SpeechBubbleProps {
  children: ReactNode;
  className?: string;
}

export function SpeechBubble({ children, className = '' }: SpeechBubbleProps) {
  return (
    <div className={`relative ${className}`}>
      {/* 말풍선 본체 */}
      <div className="bg-gray-80 text-normal relative rounded-lg px-4 py-2 text-sm text-white">
        {children}

        {/* 말풍선 꼬리 (위 중앙) */}
        <div className="absolute top-1 left-38 -translate-y-full xl:left-1/2 xl:-translate-x-1/2">
          <svg
            width="13"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.60096 0.999997C5.37076 -0.333336 7.29526 -0.333333 8.06506 1L12.3952 8.5C13.165 9.83334 12.2027 11.5 10.6631 11.5L2.00288 11.5C0.463277 11.5 -0.49897 9.83333 0.27083 8.5L4.60096 0.999997Z"
              fill="#4E4E4E"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
