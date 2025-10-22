// hooks/useProfile.ts
import { useState, useEffect } from 'react';
import { getMyProfileData } from '@/apis/auth/authApi';
import { profileDataType } from '@/types/authType';

export function useProfile() {
  const [data, setData] = useState<profileDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const result = await getMyProfileData();
        if (mounted) {
          setData(result);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return { data, isLoading, error };
}
