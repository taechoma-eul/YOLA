'use client';

import { CirclePlusIcon } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent } from 'react';

interface ImageUploaderProps {
  images: File[];
  onChange: (files: File[]) => void;
  defaultImageUrls?: string[];
  onRemoveDefaultImage?: (index: number) => void;
  maxCount?: number;
}

const ImageUploader = ({
  images,
  onChange,
  defaultImageUrls = [],
  onRemoveDefaultImage,
  maxCount = 3
}: ImageUploaderProps) => {
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    const total = images.length + defaultImageUrls.length + newFiles.length;

    if (total > maxCount) {
      alert(`이미지는 최대 ${maxCount}장까지 등록할 수 있습니다.`);
      return;
    }

    onChange([...images, ...newFiles]);
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <div className="flex items-start gap-40 rounded-md bg-gray-50 px-6 py-4">
      <div className="w-50 flex flex-col items-start justify-center">
        <p className="mb-1 mt-5 text-xl font-semibold text-gray-700">이미지등록</p>
        <p className="text-xs text-gray-500">이미지는 최대 {maxCount}개까지 등록됩니다.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {/* 추가 버튼 */}
        {images.length + defaultImageUrls.length < maxCount && (
          <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-white text-sm text-gray-400 hover:bg-gray-100">
            <span className="text-4xl">
              <CirclePlusIcon />
            </span>
            <span className="text-xs">추가하기</span>
            <input type="file" multiple className="hidden" onChange={handleUpload} />
          </label>
        )}

        {/* 기본 이미지 목록 */}
        {defaultImageUrls.map((url, idx) => (
          <div key={`default-${idx}`} className="relative h-24 w-24 overflow-hidden rounded-md border border-gray-300">
            <Image src={url} alt={`uploaded-${idx}`} width={96} height={96} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onRemoveDefaultImage?.(idx)}
              className="absolute right-1 top-1 rounded bg-black bg-opacity-70 px-1 text-xs text-white"
            >
              ✕
            </button>
          </div>
        ))}

        {/* 새로 선택된 이미지 목록 */}
        {images.map((img, idx) => (
          <div key={`new-${idx}`} className="relative h-24 w-24 overflow-hidden rounded-md border border-gray-300">
            <Image
              src={URL.createObjectURL(img)}
              alt={`preview-${idx}`}
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="absolute right-1 top-1 rounded bg-black bg-opacity-70 px-1 text-xs text-white"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
