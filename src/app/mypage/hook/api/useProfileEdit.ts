import { useAuthStore } from '@/apis/auth/hooks/authStore';
import { putProfile } from '@/apis/mypage/putProfile';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileUpdateData } from '../../utils/profile';

export const useProfileEdit = () => {
  const queryClient = useQueryClient();
  const setUserNickname = useAuthStore((state) => state.setUserNickname);
  const setUserImage = useAuthStore((state) => state.setUserImage);
  const setUserLocation = useAuthStore((state) => state.setUserLocation);

  const {
    mutate: updateProfile,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: async (data: ProfileUpdateData) => {
      return await putProfile(data);
    },
    onSuccess: (response) => {
      // ✅ Hook에서 전역 상태 업데이트
      setUserNickname(response.data.nickname);
      setUserImage(response.data.image);
      setUserLocation(response.data.location);

      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error(' 프로필 수정 실패:', error);
    },
  });

  return {
    updateProfile,
    isSubmitting: isPending,
    error,
    data,
  };
};
