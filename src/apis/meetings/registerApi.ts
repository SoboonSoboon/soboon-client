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
export interface SharingRegisterData {
  title: string;
  description: string;
  price: number;
  capacity: number;
  province: string;
  city: string;
  district: string;
  detail: string;
  productType: string;
  imageUrls: File[];
}

export interface DividingRegisterData {
  title?: string;
  capacity: number;
  location: LocationType;
  productType: string;
  description: string;
  imageUrls: File[];
}

export const shoppingRegisterApi = async (formatData: ShoppingRegisterData) => {
  const response = await axiosInstance.post(
    '/v1/meetings/shopping',
    formatData,
  );
  return response.data;
};

// 추후에 삭제될 예정
export const sharingRegisterApi = async (data: SharingRegisterData) => {
  const formattedData = await formatSharingRegisterData(data);
  const response = await axiosInstance.post(
    '/v1/meetings/dividing',
    formattedData,
  );
  return response.data;
};

const formatSharingRegisterData = async (data: SharingRegisterData) => {
  const imageUrls = await imageUploader(data.imageUrls);

  const formData = {
    title: data.title,
    description: data.description,
    price: data.price,
    capacity: data.capacity,
    location: {
      province: data.province,
      city: data.city,
      district: data.district,
      detail: data.detail,
    },
    productType: data.productType,
    imageUrls: imageUrls,
  };

  return formData;
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
