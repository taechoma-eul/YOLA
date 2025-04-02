'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import Image from 'next/image';

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
  const DEFAULT_TITLE = `${today}의 혼자 라이프 기록`;

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
    const title = data.title?.trim() || DEFAULT_TITLE;

    // const formData = {
    //   user_id: userId,
    //   mission_id: missionId,
    //   title,
    //   content: data.content,
    //   images
    // };
  };

  return (
    <div className="min-h-screen bg-zinc-900 px-4 py-10 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-2xl space-y-6 rounded-2xl bg-zinc-800 p-8 shadow-lg"
      >
        <h1 className="text-2xl font-bold text-white">{isMission ? '미션 인증 기록' : '나의 일기 작성'}</h1>

        <input
          type="text"
          {...register('title')}
          placeholder={DEFAULT_TITLE}
          className="w-full border-b border-zinc-600 bg-transparent pb-2 text-xl font-semibold outline-none placeholder:text-zinc-500 focus:border-blue-500"
        />

        <div>
          <textarea
            {...register('content')}
            placeholder="내용을 입력하세요..."
            className="h-40 w-full resize-none rounded-lg border border-zinc-600 bg-zinc-800 p-4 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.content && <p className="mt-1 text-sm text-red-400">{errors.content.message}</p>}
        </div>

        <div>
          <label className="inline-block cursor-pointer rounded-md border border-zinc-500 bg-zinc-700 px-4 py-2 text-sm transition hover:bg-zinc-600">
            이미지 업로드
            <input type="file" multiple className="hidden" onChange={handleImageUpload} />
          </label>

          <div className="mt-3 flex flex-wrap gap-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative h-24 w-24 overflow-hidden rounded-md border border-zinc-600">
                <Image
                  src={URL.createObjectURL(img)}
                  alt={`preview-${idx}`}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(idx)}
                  className="absolute right-1 top-1 rounded bg-black bg-opacity-70 px-1 text-xs text-white"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          저장하기
        </button>
      </form>
    </div>
  );
};

export default LifeInputForm;
