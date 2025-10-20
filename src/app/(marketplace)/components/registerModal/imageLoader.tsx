'use client';

import { SharingRegisterData } from '@/apis/meetings/registerApi';
import { Button } from '@/components';
import { XIcon } from 'lucide-react';
import { useRef } from 'react';

export default function ImageUploadForm({
  formData,
  setFormData,
}: {
  formData: SharingRegisterData;
  setFormData: (formData: SharingRegisterData) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) return;
    setFormData({
      ...formData,
      imageUrls: [...formData.imageUrls, ...Array.from(file)],
    });
  };

  const handleRemoveImage = (image: File) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((i) => i !== image),
    });
  };

  return (
    <div className="flex items-start gap-6">
      {/* ✅ 왼쪽 영역 (이미지 or placeholder) */}
      <div className="flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#F9FAFB] px-4 py-2.5">
        {formData.imageUrls.length > 0 ? (
          <div className="flex flex-col gap-2">
            {formData.imageUrls.map((image) => (
              <div key={image.name} className="flex items-center gap-2">
                <p className="text-text-sub2 text-sm">{image.name}</p>
                <XIcon
                  className="size-3 cursor-pointer"
                  onClick={() => handleRemoveImage(image)}
                />
              </div>
            ))}
          </div>
        ) : (
          <span className="text-[#9CA3AF]">
            이미지를 최대 10개까지 첨부할 수 있어요.
          </span>
        )}
      </div>

      {/* ✅ 파일 선택 버튼 */}
      <div className="flex shrink-0 flex-col justify-center">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
          multiple
        />
        <Button
          label="파일 찾기"
          className="!text-primary border-primary block !bg-white"
          onClick={() => inputRef.current?.click()}
        />
      </div>
    </div>
  );
}
