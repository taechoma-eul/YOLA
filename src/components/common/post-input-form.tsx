'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import ImageUploader from '@/components/common/image-uploader';
import TagInput from '@/components/common/tag-input';
import DatePicker from '@/components/common/date-picker';
import ChecklistPostDropdown from '@/components/features/checklist/checklist-post-dropdown';
import { useLifePost } from '@/lib/hooks/mutations/use-life-posts';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import { PATH } from '@/constants/page-path';
import { getToday } from '@/lib/utils/get-date';
import type { MissionType } from '@/types/checklist';
import { useUpdateLifePost } from '@/lib/hooks/mutations/use-update-life-post';

interface LifeInputFormProps {
  missionId: string | null;
  dropdownMissions?: MissionType[];
  completedIds?: number[];
  isEditMode?: boolean;
  defaultValues?: {
    id: number;
    title: string;
    content: string;
    tags: string[];
    date: string;
    imageUrls: string[];
    missionId?: number;
  };
}

const lifeRecordSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1, '내용은 필수입니다')
});

type FormData = z.infer<typeof lifeRecordSchema>;

type UploadedImage = {
  publicUrl: string;
  storagePath: string;
};

const IMAGE_STORAGE_BUCKET = 'life-post-images';

const PostInputForm = ({
  missionId,
  dropdownMissions,
  completedIds,
  isEditMode = false,
  defaultValues
}: LifeInputFormProps) => {
  const router = useRouter();
  const { mutate, isPending } = useLifePost();
  const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateLifePost();

  const [tags, setTags] = useState<string[]>(defaultValues?.tags || []);
  const [selectedDate, setSelectedDate] = useState<string>(defaultValues?.date || getToday());
  const [images, setImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>(
    defaultValues?.imageUrls?.map((url) => ({ publicUrl: url, storagePath: '' })) || []
  );
  const [selectedMissionId, setSelectedMissionId] = useState<number | null>(
    defaultValues?.missionId ?? (missionId ? +missionId : null)
  );

  const isMission = !!missionId;
  const selectedMission = dropdownMissions?.find((m) => m.id === selectedMissionId);
  const DEFAULT_TITLE = isMission ? (selectedMission?.content ?? '미션 인증') : `${selectedDate}의 혼자 라이프 기록`;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(lifeRecordSchema),
    defaultValues: {
      title: defaultValues?.title ?? '',
      content: defaultValues?.content ?? ''
    }
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

  const onSubmit = async (data: FormData) => {
    const title = data.title?.trim() || DEFAULT_TITLE;
    const content = data.content.trim();

    try {
      const newUploads = await uploadImages(images);
      const imageUrls = [...uploadedImages.map((img) => img.publicUrl), ...newUploads.map((img) => img.publicUrl)];

      const payload = {
        title,
        content,
        rawTags: tags.join(','),
        imageUrls,
        missionId: selectedMissionId?.toString() ?? null,
        date: selectedDate
      };

      if (isEditMode && defaultValues) {
        updateMutate(
          { id: defaultValues.id, ...payload },
          {
            onSuccess: () => {
              alert('수정되었습니다!');
              router.push(PATH.LIFE);
            },
            onError: (err: unknown) => {
              if (err instanceof Error) {
                alert(err.message);
              } else {
                alert('수정 중 알 수 없는 오류가 발생했습니다.');
              }
            }
          }
        );
      } else {
        mutate(payload, {
          onSuccess: () => {
            alert('저장되었습니다!');
            router.push(PATH.LIFE);
          },
          onError: (err) => {
            alert(err instanceof Error ? err.message : '저장 중 오류가 발생했습니다.');
          }
        });
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : '알 수 없는 오류');
    }
  };

  const handleCancel = async () => {
    const confirm = window.confirm('작성 중인 내용이 사라집니다. 취소할까요?');
    if (!confirm) return;

    try {
      const pathsToDelete = uploadedImages.map((img) => img.storagePath).filter(Boolean);
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
      <h1 className="mb-5 text-2xl font-bold text-black">
        {isEditMode ? '기록 수정' : !isMission && '나의 일기 작성'}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="mb-4 rounded-xl border border-gray-200 bg-white p-8">
          <div className="mb-4 flex items-center gap-4">
            {isMission && dropdownMissions && (
              <ChecklistPostDropdown
                missions={dropdownMissions}
                completedIds={completedIds}
                selectedId={selectedMissionId}
                onSelect={setSelectedMissionId}
              />
            )}
            {!isMission && (
              <input
                type="text"
                {...register('title')}
                placeholder={DEFAULT_TITLE}
                className="mb-[20px] w-[700px] border-b border-gray-300 pb-2 text-xl font-semibold outline-none placeholder:text-gray-400 focus:border-blue-500"
              />
            )}
            <DatePicker date={selectedDate} setDate={setSelectedDate} />
          </div>

          <div>
            <textarea
              {...register('content')}
              placeholder="내용을 입력하세요..."
              className="h-[300px] w-full resize-none bg-white p-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>}
          </div>
        </div>

        <TagInput value={tags} onChange={setTags} />

        <ImageUploader
          images={images}
          onChange={setImages}
          defaultImageUrls={uploadedImages.map((img) => img.publicUrl)}
          onRemoveDefaultImage={(idx) => {
            const updated = [...uploadedImages];
            updated.splice(idx, 1);
            setUploadedImages(updated);
          }}
        />

        <div className="mx-auto mt-4 flex w-full items-center justify-center gap-5">
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex w-56 items-center justify-center gap-2.5 rounded-xl border bg-white px-4 py-2.5"
          >
            작성 취소
          </button>
          <button
            type="submit"
            disabled={isPending || isUpdatePending}
            className="inline-flex w-56 items-center justify-center gap-2.5 rounded-xl bg-orange-400 px-4 py-2.5"
          >
            {isPending || isUpdatePending
              ? isEditMode
                ? '수정중...'
                : '등록중...'
              : isEditMode
                ? '수정하기'
                : '등록하기'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostInputForm;
