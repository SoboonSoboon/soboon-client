import { useAuthStore } from '@/apis/auth/hooks/authStore';

export const useUserLocation = () => {
  const { userLocation } = useAuthStore();

  return {
    userLocation,
    hasLocation: !!(
      userLocation.province &&
      userLocation.city &&
      userLocation.district
    ),
  };
};
