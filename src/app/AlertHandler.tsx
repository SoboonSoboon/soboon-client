'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useToast } from '@/components/Atoms';

export default function AlertHandler() {
  const searchParams = useSearchParams().get('alert');
  const { error } = useToast();

  useEffect(() => {
    if (searchParams === 'login_required') {
      error('로그인이 필요합니다.');
    }
  }, [searchParams]);

  return null;
}
