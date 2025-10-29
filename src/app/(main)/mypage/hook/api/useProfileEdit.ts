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
    onSuccess: (response, variables) => {
      if (variables.nickname) {
        setUserNickname(variables.nickname);
      }
      if (variables.image) {
        setUserImage(variables.image);
      }
      setUserLocation({
        province: variables.province,
        city: variables.city || null,
        district: variables.district || null,
        detail: null,
      });

      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('프로필 수정 실패:', error);
    },
  });

  return {
    updateProfile,
    isSubmitting: isPending,
    error,
    data,
  };
};
