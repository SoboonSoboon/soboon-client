import { useEffect, useRef } from 'react';

/**
 * 스크롤 애니메이션을 위한 커스텀 훅
 * 요소가 뷰포트에 진입하면 애니메이션 클래스를 추가합니다.
 *
 * @param threshold - IntersectionObserver threshold 값 (0~1, 기본값: 0.2)
 * @returns ref - 관찰할 컨테이너 엘리먼트에 할당할 ref
 */
export const useScrollAnimation = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const targets = element.querySelectorAll<HTMLElement>('[data-scroll]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const animationType = target.dataset.scroll;

            if (animationType) {
              target.classList.add('animate-in');
            }

            observer.unobserve(target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -200px 0px',
      },
    );

    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return ref;
};

/**
 * 초기 로드 시 순차 애니메이션을 위한 커스텀 훅
 * 컴포넌트 마운트 시 자동으로 순차 애니메이션을 실행합니다.
 */
export const useSequentialAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const targets = element.querySelectorAll<HTMLElement>('[data-sequence]');

    targets.forEach((target) => {
      const delay = parseInt(target.dataset.sequence || '0');
      setTimeout(() => {
        target.classList.add('animate-in');
      }, delay);
    });
  }, []);

  return ref;
};
