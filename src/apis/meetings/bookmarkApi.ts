import { axiosInstance } from '../axiosInstance';

export const postBookmarkedMeetingApi = async (id: number) => {
  const response = await axiosInstance.post(`/v1/meetings/${id}/bookmarks`);
  return response.data;
};

export const deleteBookmarkedMeetingApi = async (id: number) => {
  const response = await axiosInstance.delete(`/v1/meetings/${id}/bookmarks`);
  return response.data;
};
