import { axiosInstance } from '@/apis/axiosInstance';

/**
 * 이미지를 S3에 업로드하고 이미지 URL 배열을 반환하는 함수
 * @param images File[]
 * @returns string[]
 */
export const imageUploader = async (images: File[]): Promise<string[]> => {
  const imageUrls = await Promise.all(
    images.map(async (image) => {
      const response = await axiosInstance.post('/v1/file/upload/images', {
        fileName: image.name,
      });

      const { presignedUrl, imageUrl } = response.data;

      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: image,
        headers: {
          'Content-Type': image.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload image: ${image.name}`);
      }

      return imageUrl;
    }),
  );

  return imageUrls;
};
