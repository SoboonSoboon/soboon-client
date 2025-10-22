import { axiosInstance } from '../axiosInstance';

export const deleteMeetingsApi = async (id: number) => {
  const response = await axiosInstance.delete(`/v1/meetings/${id}`);
  return response.data;
};
