'use client';

import { Button, TextInput } from '@/components/Atoms';
import { imageUploader } from '@/utils/imageUploader';
import { XIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import Image from 'next/image';

interface ValidationOptions {
  maxFiles?: number;
  maxFileSize?: number; // bytes
  allowedTypes?: string[];
}

interface ImageUploadUrlFormProps {
  imageUrls: string[];
  onChange: (urls: string[]) => void;
  validation?: ValidationOptions;
  onUploadStart?: () => void;
  onUploadComplete?: () => void;
  onUploadError?: (error: Error) => void;
}

const DEFAULT_VALIDATION: ValidationOptions = {
  maxFiles: 10,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
  ],
};

export function ImageUploadUrlForm({
  imageUrls,
  onChange,
  validation = DEFAULT_VALIDATION,
  onUploadStart,
  onUploadComplete,
  onUploadError,
}: ImageUploadUrlFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const mergedValidation = { ...DEFAULT_VALIDATION, ...validation };
  const { maxFiles, maxFileSize, allowedTypes } = mergedValidation;

  const validateFiles = (files: File[]): string | null => {
    // 최대 파일 개수 검증
    const totalFiles = imageUrls.length + files.length;
    if (maxFiles && totalFiles > maxFiles) {
      return `이미지는 최대 ${maxFiles}개까지 업로드할 수 있어요.`;
    }

    // 파일 크기 검증
    const oversizedFile = files.find((file) => file.size > (maxFileSize || 0));
    if (oversizedFile && maxFileSize) {
      const sizeMB = Math.round(maxFileSize / (1024 * 1024));
      return `각 이미지 파일은 ${sizeMB}MB 이하여야 해요.`;
    }

    // 파일 타입 검증
    const invalidTypeFile = files.find(
      (file) => !allowedTypes?.includes(file.type),
    );
    if (invalidTypeFile && allowedTypes) {
      const typeNames = allowedTypes
        .map((type) => type.split('/')[1].toUpperCase())
        .join(', ');
      return `${typeNames} 이미지 파일만 업로드 가능합니다.`;
    }

    return null;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);

    // 유효성 검사
    const validationError = validateFiles(newFiles);
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      setIsUploading(true);
      onUploadStart?.();

      // S3에 이미지 업로드
      const uploadedUrls = await imageUploader(newFiles);

      // URL 배열 업데이트
      onChange([...imageUrls, ...uploadedUrls]);

      onUploadComplete?.();
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Upload failed');
      onUploadError?.(err);
      alert('이미지 업로드에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsUploading(false);
      // input 초기화
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedUrls = imageUrls.filter((_, i) => i !== index);
    onChange(updatedUrls);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <TextInput
          placeholder={
            imageUrls.length > 0
              ? `${imageUrls.length}/${maxFiles}개 이미지 선택됨`
              : `이미지를 최대 ${maxFiles}개까지 첨부할 수 있어요.`
          }
          readOnly
          className="flex-1 cursor-pointer focus:border-transparent focus:outline-none"
          onClick={() => !isUploading && inputRef.current?.click()}
        />

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
          multiple
          disabled={isUploading}
        />
        <Button
          variant="outline"
          label={isUploading ? '업로드 중...' : '파일 찾기'}
          onClick={() => inputRef.current?.click()}
          disabled={isUploading || imageUrls.length >= (maxFiles || 10)}
        />
      </div>

      {imageUrls.length > 0 && (
        <div className="overflow-x-auto">
          <div className="flex min-w-max gap-2.5">
            {imageUrls.map((url, index) => (
              <div
                key={index}
                className="group border-gray-10 relative flex-shrink-0 overflow-hidden rounded-lg border"
              >
                <Image
                  src={url}
                  alt={`미리보기 ${index + 1}`}
                  className="size-25 rounded-lg object-cover"
                  width={100}
                  height={100}
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="bg-primary absolute top-1.5 right-1.5 cursor-pointer rounded-full p-1 text-white"
                  disabled={isUploading}
                >
                  <XIcon className="size-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
