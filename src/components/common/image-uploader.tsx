'use client';

import { clsx } from 'clsx';
import { CirclePlusIcon, X } from 'lucide-react';
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

  const isMax = images.length + defaultImageUrls.length >= maxCount;

  return (
    <div className="flex items-start gap-40 rounded-md bg-secondary-grey-100 px-6 py-4">
      <div className="w-50 flex flex-col items-start justify-center">
        <p className="mb-1 mt-5 text-xl font-semibold text-secondary-grey-800">이미지등록</p>
        <p className="text-xs text-secondary-grey-700">이미지는 최대 {maxCount}개까지 등록됩니다.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {/* 업로드 버튼 */}
        <label
          className={clsx(
            'flex h-24 w-24 flex-col items-center justify-center rounded-md border border-dashed text-sm',
            isMax
              ? 'cursor-not-allowed border-secondary-grey-500 bg-secondary-grey-150 text-secondary-grey-500'
              : 'cursor-pointer border-secondary-grey-500 bg-white text-secondary-grey-800 hover:bg-secondary-grey-150'
          )}
        >
          <span className="text-4xl">
            <CirclePlusIcon />
          </span>
          <span className="text-xs">추가하기</span>
          <input type="file" multiple className="hidden" disabled={isMax} onChange={handleUpload} />
        </label>

        {/* 기본 이미지 목록 */}
        {defaultImageUrls.map((url, idx) => (
          <div key={`default-${idx}`} className="relative h-24 w-24 overflow-hidden rounded-md border">
            <Image src={url} alt={`uploaded-${idx}`} width={96} height={96} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onRemoveDefaultImage?.(idx)}
              className="absolute right-1 top-1 rounded bg-black bg-opacity-70 px-1 text-xs text-secondary-grey-700"
            >
              ✕
            </button>
          </div>
        ))}

        {/* 새로 선택된 이미지 목록 */}
        {images.map((img, idx) => (
          <div key={`new-${idx}`} className="relative h-24 w-24 overflow-hidden rounded-md border">
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
              className="absolute right-1 top-1 flex h-[20px] w-[20px] items-center justify-center rounded-full border-[2px] border-secondary-grey-400 bg-white text-secondary-grey-700"
            >
              <X className="h-[15px] w-[15px]" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
