'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import ImageUploader from '@/components/common/image-uploader';
import TagInput from '@/components/common/tag-input';
import GonggamSelectBox from '@/components/features/gonggam/gonggam-select-box';
import { categoryMap, reverseCategoryMap } from '@/constants/gonggam-category';
import { PATH } from '@/constants/page-path';
import { QUERY_KEY } from '@/constants/query-keys';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateGonggamPost } from '@/lib/hooks/mutations/use-update-gonggam-post';
import { useGonggamPost } from '@/lib/hooks/mutations/use-gonggam-post';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import type { Tables } from '@/types/supabase';
import backIcon from '@images/images/go-back-icon.svg';

interface GonggamPostInputFormProps {
  isEditMode?: boolean;
  defaultValues?: {
    id: number;
    title: string;
    content: string;
    tags: string[];
    imageUrls: string[];
    category: Category;
  };
}
export type Category = Tables<'gonggam_posts'>['category'];
const categoryKeys = Object.keys(categoryMap) as [keyof typeof categoryMap];

const postSchema = z.object({
  title: z.string().min(1, '내용은 필수입니다'),
  content: z.string().min(1, '내용은 필수입니다'),
  category: z.enum(categoryKeys)
});

type FormData = z.infer<typeof postSchema>;
type UploadedImage = { publicUrl: string; storagePath: string };

const IMAGE_STORAGE_BUCKET = 'gonggam-post-images';

const GonggamPostInputForm = ({ isEditMode = false, defaultValues }: GonggamPostInputFormProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const categoryName = pathName.split('/').filter(Boolean).pop();

  const { mutate, isPending } = useGonggamPost();
  const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateGonggamPost();
  const queryClient = useQueryClient();

  const isLoading = isPending || isUpdatePending;
  const action = isEditMode ? '수정' : '등록';

  const [category, setCategory] = useState<Category>(
    categoryName && !isEditMode ? (reverseCategoryMap[categoryName] as Category) : defaultValues!.category
  );
  const [tags, setTags] = useState(defaultValues?.tags || []);
  const [images, setImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>(
    defaultValues?.imageUrls?.map((url) => ({ publicUrl: url, storagePath: '' })) || []
  );

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: defaultValues?.title ?? '',
      content: defaultValues?.content ?? '',
      category
    }
  });

  const uploadImages = async (files: File[]): Promise<UploadedImage[]> => {
    const uploaded: UploadedImage[] = [];

    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `gonggam/${fileName}`;

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
    const title = data.title?.trim() || '제목 없음';
    const content = data.content.trim();

    try {
      const newUploads = await uploadImages(images);
      const imageUrls = [...uploadedImages.map((img) => img.publicUrl), ...newUploads.map((img) => img.publicUrl)];

      const payload = {
        title,
        content,
        category,
        rawTags: tags.join(','),
        imageUrls
      };

      const onSuccess = () => {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEY.GONGGAM_POSTS()
        });
        alert(`${action}되었습니다!`);
        router.push(`${PATH.GONGGAM}/${categoryMap[category]}`); //작성한 글의 카테고리 게시판으로 이동
      };

      const onError = (err: unknown) => {
        alert(err instanceof Error ? err.message : `${action} 중 오류가 발생했습니다.`);
      };

      const mutationFn =
        isEditMode && defaultValues
          ? () => updateMutate({ id: defaultValues.id, ...payload }, { onSuccess: onSuccess, onError: onError })
          : () => mutate(payload, { onSuccess: onSuccess, onError: onError });

      mutationFn();
    } catch (err) {
      alert(err instanceof Error ? err.message : '알 수 없는 오류 발생');
    }
  };

  const handleCancel = async () => {
    const confirmCancel = window.confirm('작성 중인 내용을 취소하시겠습니까?');
    if (!confirmCancel) return;

    try {
      const pathsToDelete = uploadedImages.map((img) => img.storagePath).filter(Boolean);
      if (pathsToDelete.length > 0) await deleteImages(pathsToDelete);
      router.back();
    } catch (err) {
      alert('이미지 삭제 실패: ' + (err instanceof Error ? err.message : ''));
    }
  };

  return (
    <div className="min-h-screen w-full bg-white px-4 py-10 text-black">
      <button
        type="button"
        onClick={handleCancel}
        className="mb-[32px] inline-flex h-auto w-auto items-center justify-center gap-[12px] py-[4px] text-sm font-normal text-secondary-grey-700"
      >
        <Image src={backIcon} alt="뒤로가기 아이콘" />
        뒤로가기
      </button>
      <GonggamSelectBox value={category} onChange={(value) => setCategory(value as typeof category)} />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="mb-4 rounded-xl border border-gray-200 bg-white p-8">
          <input
            type="text"
            {...register('title')}
            placeholder="제목을 입력하세요"
            className="mb-4 w-full border-b border-gray-300 pb-2 text-xl font-semibold outline-none placeholder:text-gray-400 focus:border-blue-500"
            required
          />
          <textarea
            {...register('content')}
            placeholder="내용을 입력하세요..."
            className="h-[300px] w-full resize-none bg-white p-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>}
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
            type="submit"
            disabled={isLoading}
            className="inline-flex w-56 items-center justify-center gap-2.5 rounded-xl bg-orange-400 px-4 py-2.5 text-white"
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default GonggamPostInputForm;
