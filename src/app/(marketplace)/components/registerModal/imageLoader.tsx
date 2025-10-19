'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components';
import { XIcon } from 'lucide-react';
import { axiosInstance } from '@/apis/axiosInstance';

export default function ImageUploadForm() {
  const [file, setFile] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) return;

    setFile((prev) => [...prev, ...Array.from(file)]);
  };

  const handleRemove = (f: File) => {
    setFile((prev) => prev.filter((file) => file.name !== f.name));
  };

  const s3Uploader = async (files: File[]) => {
    const abc = async (f: File) => {
      const formData = new FormData();
      formData.append('file', f);
      const response = await axiosInstance.post(
        '/v1/file/upload/images',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    };

    const imagesPaths = await Promise.all(files.map(async (f) => await abc(f)));
    console.log(imagesPaths);
    return imagesPaths;
  };

  return (
    <div className="flex items-start gap-6">
      {/* ✅ 왼쪽 영역 (이미지 or placeholder) */}
      <div className="flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#F9FAFB] px-4 py-2.5">
        {!file.length ? (
          <span className="text-[#9CA3AF]">
            이미지를 최대 10개까지 첨부할 수 있어요.
          </span>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              {file.map((f) => (
                <div key={f.name} className="flex items-center gap-2">
                  <p className="text-sm text-[#9CA3AF]">{f.name}</p>
                  <button
                    onClick={() => handleRemove(f)}
                    type="button"
                    className="cursor-pointer"
                  >
                    <XIcon className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ✅ 파일 선택 버튼 */}
      <div className="flex shrink-0 flex-col justify-center">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          label="파일 찾기"
          className="!text-primary border-primary block !bg-white"
        />
      </div>
    </div>
  );
}
