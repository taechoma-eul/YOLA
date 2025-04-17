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
import { useUpdateLifePost } from '@/lib/hooks/mutations/use-update-life-post';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import { PATH } from '@/constants/page-path';
import { getToday } from '@/lib/utils/get-date';
import type { MissionType } from '@/types/checklist';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-keys';
import { ChevronLeft } from 'lucide-react';

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
type UploadedImage = { publicUrl: string; storagePath: string };

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
  const queryClient = useQueryClient();

  const isLoading = isPending || isUpdatePending;
  const action = isEditMode ? '수정' : '등록';
  const buttonLabel = `${action}${isLoading ? '중...' : '하기'}`;

  const [tags, setTags] = useState(defaultValues?.tags || []);
  const [selectedDate, setSelectedDate] = useState(defaultValues?.date || getToday());
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

      const { error } = await supabase.storage.from(IMAGE_STORAGE_BUCKET).upload(filePath, file);
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

      const onSuccess = () => {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEY.LIFE_POSTS()
        });
        alert(`${action}되었습니다!`);
        router.push(PATH.LIFE);
      };

      const onError = (err: unknown) => {
        alert(err instanceof Error ? err.message : `${action} 중 알 수 없는 오류가 발생했습니다.`);
      };

      const mutationFn =
        isEditMode && defaultValues
          ? () => updateMutate({ id: defaultValues.id, ...payload }, { onSuccess, onError })
          : () => mutate(payload, { onSuccess, onError });

      mutationFn();
    } catch (err) {
      alert(err instanceof Error ? err.message : '알 수 없는 오류');
    }
  };

  const handleCancel = async () => {
    const confirm = window.confirm('작성 중인 내용이 사라집니다. 뒤로갈까요?');
    if (!confirm) return;

    try {
      const pathsToDelete = uploadedImages.map((img) => img.storagePath).filter(Boolean);
      if (pathsToDelete.length > 0) await deleteImages(pathsToDelete);
      router.back();
    } catch (err) {
      alert('이미지 삭제 실패: ' + (err instanceof Error ? err.message : ''));
    }
  };

  return (
    <div className="min-h-screen w-full max-w-[1200px] bg-white px-4 py-10 text-secondary-grey-900">
      <button
        type="button"
        onClick={handleCancel}
        className="mb-[32px] flex items-center text-sm text-secondary-grey-600 hover:text-secondary-grey-800"
      >
        <ChevronLeft className="mr-1 h-5 w-5" />
        뒤로가기
      </button>
      <div className="flex w-full items-center justify-between">
        <h1 className="mb-[20px] text-xl font-bold">{isEditMode ? '기록 수정' : '혼자라이프 일기 작성'}</h1>
        <div className="ml-4 shrink-0">
          <DatePicker date={selectedDate} setDate={setSelectedDate} />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1200px]">
        <div className="mb-6 h-[450px] w-full rounded-lg border border-secondary-grey-200 bg-white p-8">
          <div className="mb-6 flex items-start justify-between border-b border-secondary-grey-200">
            <input
              type="text"
              {...register('title')}
              placeholder={DEFAULT_TITLE}
              className="w-full border-none text-xl font-semibold outline-none placeholder:text-secondary-grey-500"
            />
          </div>

          <textarea
            {...register('content')}
            placeholder="내용을 입력하세요..."
            className="h-56 w-full resize-none text-sm placeholder:text-secondary-grey-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-400"
          />
          {errors.content && <p className="mt-2 text-sm text-red-500">{errors.content.message}</p>}
        </div>

        <div className="mb-6">
          <TagInput value={tags} onChange={setTags} />
          <p className="mt-2 text-xs text-secondary-grey-500">최대 8글자, 6개 이내</p>
        </div>

        <div className="mb-6">
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
        </div>

        <div className="mx-auto mt-6 flex w-full items-center justify-center gap-5">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-56 items-center justify-center gap-2.5 rounded-lg bg-primary-orange-400 px-4 py-2.5 text-white hover:bg-primary-orange-600 disabled:opacity-50"
          >
            {buttonLabel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostInputForm;
