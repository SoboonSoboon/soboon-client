import { imageUploader } from '@/utils/imageUploader';
import { axiosInstance } from '../axiosInstance';

interface LocationType {
  province: string;
  city: string;
  district: string;
  detail: string;
}
export interface ShoppingRegisterData {
  title: string;
  location: LocationType;
  detail: string;
  capacity: number;
  tags?: string[];
}

// 추후에 삭제될 예정
export interface DividingRegisterData {
  title: string;
  description: string;
  price?: number;
  capacity: number;
  location: LocationType;
  productType: string;
  imageUrls: File[];
}

export const shoppingRegisterApi = async (formatData: ShoppingRegisterData) => {
  const response = await axiosInstance.post(
    '/v1/meetings/shopping',
    formatData,
  );
  return response.data;
};

export const dividingRegisterApi = async (formatData: DividingRegisterData) => {
  if (formatData.imageUrls.length === 0) {
    const response = await axiosInstance.post('/v1/meetings/dividing', {
      ...formatData,
      title: formatData.title,
      price: 0,
    });
    return response.data;
  } else {
    const formattedData = await formatDividingRegisterData(
      formatData.imageUrls,
    );
    const response = await axiosInstance.post('/v1/meetings/dividing', {
      ...formatData,
      title: formatData.title,
      price: 0,
      imageUrls: formattedData,
    });
    return response.data;
  }
};

export const formatDividingRegisterData = async (imageUrls: File[]) => {
  const formattedImageUrls = await imageUploader(imageUrls);
  return formattedImageUrls;
};
