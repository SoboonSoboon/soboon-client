import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/Atoms/Toast/useToast';
import { postBookmarkedMeetingApi, deleteBookmarkedMeetingApi } from '@/apis';
import { mypageKeys } from '@/constants/queryKey';

export const useBookmark = () => {
  const queryClient = useQueryClient();
  const { success } = useToast();

  const handleBookmark = async (id: string, isBookmarked: boolean) => {
    try {
      if (isBookmarked) {
        const response = await deleteBookmarkedMeetingApi(+id);
        success(response.message);
      } else {
        const response = await postBookmarkedMeetingApi(+id);
        success(response.message);
      }
      queryClient.invalidateQueries({
        queryKey: mypageKeys.bookmarksMeeting(),
      });
    } catch (error) {
      console.error('찜 처리 실패:', error);
    }
  };

  return { handleBookmark };
};
