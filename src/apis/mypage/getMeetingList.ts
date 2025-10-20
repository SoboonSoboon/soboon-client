import { axiosInstance } from '../axiosInstance';

export async function getHostMeetingList(page: number = 0, size: number = 20) {
  console.log(' 내가 만든 모임 데이터를 가져오는 중...');
  const pageable = JSON.stringify({ page, size });
  try {
    const response = await axiosInstance(
      `/v1/me/meetings/hosted?pageable=${encodeURIComponent(pageable)}`,
    );
    console.log(
      '내가 만든 모임 데이터를 성공적으로 가져왔습니다',
      response.data,
    );
    return response.data;
  } catch (error) {
    console.error(' 내가 만든 모임 데이터를 가져오는데 실패했습니다:', error);
    if (error instanceof Error) {
      throw new Error(`내가 만든 모임 데이터 조회 실패: ${error.message}`);
    } else {
      // 예상치 못한 에러
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
}
