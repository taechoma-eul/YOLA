'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import { useLifePost } from '@/lib/hooks/mutations/useLifePost';
import { v4 as uuidv4 } from 'uuid';
import { PATH } from '@/constants/page-path';
import DatePicker from './date-picker';
import { getToday } from '@/lib/utils/get-today';

type LifeInputFormProps = {
  userId: string;
  missionId: string | null;
};

const lifeRecordSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1, '내용은 필수입니다'),
  tags: z.string().optional()
});

type FormData = z.infer<typeof lifeRecordSchema>;

type UploadedImage = {
  publicUrl: string;
  storagePath: string;
};

const IMAGE_STORAGE_BUCKET = 'life-post-images';

const PostInputForm = ({ userId, missionId }: LifeInputFormProps) => {
  const router = useRouter();
  const { mutate, isPending } = useLifePost();

  const [selectedDate, setSelectedDate] = useState<string>(getToday());
  const [images, setImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const isMission = !!missionId;
  const DEFAULT_TITLE = `${selectedDate}의 혼자 라이프 기록`;
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(lifeRecordSchema)
  });

  const uploadImages = async (files: File[]): Promise<UploadedImage[]> => {
    const uploaded: UploadedImage[] = [];

    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `diary/${fileName}`;

      const { error } = await supabase.storage.from(IMAGE_STORAGE_BUCKET).upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

      if (error) throw new Error('이미지 업로드 실패: ' + error.message);

      const {
        data: { publicUrl }
      } = supabase.storage.from(IMAGE_STORAGE_BUCKET).getPublicUrl(filePath);

      uploaded.push({ publicUrl, storagePath: filePath });
    }

    return uploaded;
  };

  const deleteImages = async (paths: string[]) => {
    const { error } = await supabase.storage.from(IMAGE_STORAGE_BUCKET).remove(paths);
    if (error) throw new Error('이미지 삭제 실패: ' + error.message);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleImageRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormData) => {
    const title = data.title?.trim() || DEFAULT_TITLE;
    const content = data.content.trim();
    const rawTags = data.tags?.trim() ?? '';

    try {
      const uploaded = await uploadImages(images);
      setUploadedImages(uploaded);

      mutate(
        {
          title,
          content,
          rawTags,
          missionId,
          imageUrls: uploaded.map((img) => img.publicUrl),
          date: selectedDate
        },
        {
          onSuccess: () => {
            alert('저장되었습니다!');
            router.push(PATH.LIFE);
          },
          onError: (err) => {
            alert(err instanceof Error ? err.message : '저장 중 오류가 발생했습니다.');
          }
        }
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : '알 수 없는 오류');
    }
  };

  const handleCancel = async () => {
    const confirm = window.confirm('작성 중인 내용이 사라집니다. 취소할까요?');
    if (!confirm) return;

    try {
      const pathsToDelete = uploadedImages.map((img) => img.storagePath);
      if (pathsToDelete.length > 0) {
        await deleteImages(pathsToDelete);
      }
      router.back();
    } catch (err) {
      alert('이미지 삭제 실패: ' + (err instanceof Error ? err.message : ''));
    }
  };

  return (
    <div className="min-h-screen w-full bg-white px-4 py-10 text-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-2xl space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg"
      >
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">{isMission ? '미션 인증 기록' : '나의 일기 작성'}</h1>
          <DatePicker date={selectedDate} setDate={setSelectedDate} />
        </div>

        {/* 제목 입력 */}
        <input
          type="text"
          {...register('title')}
          placeholder={DEFAULT_TITLE}
          className="w-full border-b border-gray-300 pb-2 text-xl font-semibold outline-none placeholder:text-gray-400 focus:border-blue-500"
        />

        {/* 내용 입력 */}
        <div>
          <textarea
            {...register('content')}
            placeholder="내용을 입력하세요..."
            className="h-40 w-full resize-none rounded-lg border border-gray-300 bg-white p-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>}
        </div>

        {/* 해시태그 입력 */}
        <div>
          <input
            type="text"
            {...register('tags')}
            placeholder="#혼밥, #기록"
            className="w-full rounded border border-gray-300 px-4 py-2 text-sm placeholder:text-gray-400"
          />
          {errors.tags && <p className="mt-1 text-sm text-red-500">{errors.tags.message}</p>}
        </div>

        {/* 이미지 업로드 */}
        <div>
          <label className="inline-block cursor-pointer rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm transition hover:bg-gray-200">
            이미지 업로드
            <input type="file" multiple className="hidden" onChange={handleImageUpload} />
          </label>

          <div className="mt-3 flex flex-wrap gap-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative h-24 w-24 overflow-hidden rounded-md border border-gray-300">
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

        {/* 저장 버튼 */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          {isPending ? '저장 중...' : '저장하기'}
        </button>

        {/* 작성 취소 */}
        <button
          type="button"
          onClick={handleCancel}
          className="w-full rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          작성 취소
        </button>
      </form>
    </div>
  );
};

export default PostInputForm;
