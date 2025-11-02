'use client';

import { DateFilter } from '@/components/Atoms';
import { SearchInput } from '@/components/Molecules';
import { useFilterParams } from '@/hooks/useFilterParams';

export const SearchSection = () => {
  const { updateParams } = useFilterParams();

  const handleDateChange = (value: 'RECENT' | 'OLDEST') => {
    updateParams({ sortType: value });
  };

  const handleSearch = (searchText: string) => {
    updateParams({ keyword: searchText });
  };

  return (
    <div className="flex w-full max-w-[361px] justify-between gap-2.5">
      <DateFilter onChange={handleDateChange} className="!h-[44px]" />
      <div className="flex-1">
        <SearchInput onSearch={handleSearch} className="h-[44px]" />
      </div>
    </div>
  );
};
