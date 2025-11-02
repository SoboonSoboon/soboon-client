import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/Atoms';
import { postBookmarkedMeetingApi, deleteBookmarkedMeetingApi } from '@/apis';
import { mypageKeys } from '@/constants/queryKey';

export const useBookmark = () => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  const postBookmarkMutation = useMutation({
    mutationFn: (id: number) => postBookmarkedMeetingApi(id),
    onSuccess: (response) => {
      success(response.message);
      queryClient.invalidateQueries({
        queryKey: mypageKeys.bookmarksMeeting(),
      });
    },
    onError: (err) => {
      console.error('북마크 추가 실패:', err);
      error('북마크 추가에 실패했습니다.');
    },
  });

  const deleteBookmarkMutation = useMutation({
    mutationFn: (id: number) => deleteBookmarkedMeetingApi(id),
    onSuccess: (response) => {
      success(response.message);
      queryClient.invalidateQueries({
        queryKey: mypageKeys.bookmarksMeeting(),
      });
    },
    onError: (err) => {
      console.error('북마크 제거 실패:', err);
      error('북마크 제거에 실패했습니다.');
    },
  });

  const handleBookmark = (id: string, isBookmarked: boolean) => {
    const meetingId = parseInt(id, 10);

    if (isBookmarked) {
      deleteBookmarkMutation.mutate(meetingId);
    } else {
      postBookmarkMutation.mutate(meetingId);
    }
  };

  return {
    handleBookmark,
    isPending:
      postBookmarkMutation.isPending || deleteBookmarkMutation.isPending,
  };
};
