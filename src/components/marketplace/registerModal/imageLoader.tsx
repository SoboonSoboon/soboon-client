'use client';

import { Button, TextInput } from '@/components';
import { XIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import Image from 'next/image';

export default function ImageUploadForm({
  imageFiles,
  setImageFiles,
}: {
  imageFiles: File[];
  setImageFiles: (imageFiles: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const totalFiles = imageFiles.length + newFiles.length;

    if (totalFiles > 10) {
      alert('이미지는 최대 10개까지 업로드할 수 있습니다.');
      return;
    }

    const updatedFiles = [...imageFiles, ...newFiles];
    setImageFiles(updatedFiles);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(updatedFiles);

    URL.revokeObjectURL(imagePreviews[index]);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <TextInput
          placeholder={
            imageFiles.length > 0
              ? `${imageFiles.length}/10개 이미지 선택됨`
              : '이미지를 최대 10개까지 첨부할 수 있어요.'
          }
          readOnly
          className="flex-1 cursor-pointer focus:border-transparent focus:outline-none"
          onClick={() => inputRef.current?.click()}
        />

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
          multiple
        />
        <Button
          variant="outline"
          label="파일 찾기"
          onClick={() => inputRef.current?.click()}
          disabled={imageFiles.length >= 10}
        />
      </div>

      {imageFiles.length > 0 && (
        <div className="overflow-x-auto">
          <div className="flex min-w-max gap-2.5">
            {imageFiles.map((image, index) => (
              <div key={index} className="group relative flex-shrink-0">
                <Image
                  src={imagePreviews[index]}
                  alt={`미리보기 ${index + 1}`}
                  className="size-25 rounded-lg object-cover"
                  width={100}
                  height={100}
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="bg-primary absolute top-1.5 right-1.5 cursor-pointer rounded-full p-1 text-white"
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
