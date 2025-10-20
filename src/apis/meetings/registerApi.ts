import { imageUploader } from '@/utils/imageUploader';
import { axiosInstance } from '../axiosInstance';

export interface ShoppingRegisterData {
  title: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  description: string;
  capacity: number;
}

export interface SharingRegisterData {
  title: string;
  description: string;
  itemName: string;
  price: number;
  capacity: number;
  province: string;
  city: string;
  district: string;
  detail: string;
  productType: string;
  imageUrls: File[];
}

export const shoppingRegisterApi = async (data: ShoppingRegisterData) => {
  const formatData = {
    title: data.title,
    location: {
      province: data.province,
      city: data.city,
      district: data.district,
      detail: data.detail,
    },
    description: data.description,
    capacity: data.capacity,
  };
  const response = await axiosInstance.post(
    '/v1/meetings/shopping',
    formatData,
  );
  return response.data;
};

export const sharingRegisterApi = async (data: SharingRegisterData) => {
  const response = await axiosInstance.post(
    '/v1/meetings/dividing',
    await formatSharingRegisterData(data),
  );
  return response.data;
};

const formatSharingRegisterData = async (data: SharingRegisterData) => {
  const imageUrls = await imageUploader(data.imageUrls);

  const formData = {
    title: data.title,
    description: data.description,
    itemName: data.itemName,
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
