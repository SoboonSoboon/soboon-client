'use client';

import { SearchIcon } from 'lucide-react';
import { FormEvent, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/utils/cn';

interface SearchInputProps {
  onSearch?: (query: string) => void;
  className?: string;
  placeholder?: string;
}

export const SearchInput = ({
  onSearch,
  className,
  placeholder = '검색어를 입력하세요',
}: SearchInputProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 초기값을 URL에서 가져오기
  const [searchValue, setSearchValue] = useState(() => {
    return searchParams.get('keyword') || '';
  });

  // URL 파라미터와 동기화
  useEffect(() => {
    const urlSearch = searchParams.get('keyword') || '';
    setSearchValue(urlSearch);
  }, [searchParams]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      if (onSearch) {
        onSearch(searchValue);
      } else {
        // 기본 동작: URL 업데이트
        const params = new URLSearchParams(searchParams.toString());
        params.set('keyword', searchValue);
        router.push(`?${params.toString()}`, { scroll: false });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'border-text-line1 relative w-full rounded-lg border bg-white',
        className,
      )}
    >
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={placeholder}
        className="h-full w-full pr-11 pl-4"
      />
      <button
        type="submit"
        className="absolute top-1/2 right-4 z-10 -translate-y-1/2 cursor-pointer text-center"
      >
        <SearchIcon className="text-Green-50" />
      </button>
    </form>
  );
};
