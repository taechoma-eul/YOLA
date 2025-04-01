'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

type LifeInputFormProps = {
  userId: string;
  missionId: string | null;
};

const lifeRecordSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1, '내용은 필수입니다')
});

type FormData = z.infer<typeof lifeRecordSchema>;

const LifeInputForm = ({ userId, missionId }: LifeInputFormProps) => {
  const isMission = !!missionId;
  const today = new Date().toISOString().split('T')[0].replace(/-/g, '.');
  const defaultTitle = `${today}의 혼자 라이프 기록`;

  const [images, setImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(lifeRecordSchema)
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleImageRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const onSubmit = (data: FormData) => {
    const title = data.title?.trim() || defaultTitle;

    // TODO: Supabase 저장 로직 연결
    console.log({
      user_id: userId,
      mission_id: missionId,
      title,
      content: data.content,
      images
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl space-y-4 rounded bg-white p-6 shadow">
      <h1 className="text-xl font-bold">{isMission ? '미션 인증 기록' : '나의 일기 작성'}</h1>

      <div>
        <input
          type="text"
          {...register('title')}
          placeholder={defaultTitle}
          className="w-full border-b py-2 text-lg font-bold outline-none"
        />
      </div>

      <div>
        <textarea
          {...register('content')}
          placeholder="내용을 입력하세요..."
          className="h-40 w-full resize-none rounded border p-3"
        />
        {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>}
      </div>

      <div>
        <label className="mb-2 inline-block cursor-pointer">
          <input type="file" multiple className="hidden" onChange={handleImageUpload} />
          <span className="rounded bg-gray-200 px-3 py-1">이미지 업로드</span>
        </label>

        <div className="mt-2 flex flex-wrap gap-3">
          {images.map((img, idx) => (
            <div key={idx} className="relative h-24 w-24 overflow-hidden rounded border">
              <img src={URL.createObjectURL(img)} alt={`preview-${idx}`} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => handleImageRemove(idx)}
                className="absolute right-0 top-0 bg-black bg-opacity-50 px-1 text-xs text-white"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        저장하기
      </button>
    </form>
  );
};

export default LifeInputForm;
