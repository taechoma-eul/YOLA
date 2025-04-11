'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { DEFAULT_AVATAR_URL } from '@/constants/default-image-url';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCommentsByPostId, getPostMetaClient } from '@/lib/utils/api/gonggam-detail-client.api';
import type { CommentWithUser } from '@/types/gonggam';
import { formatRelativeDate } from '@/lib/utils/date-format';
import { useGonggamComments } from '@/lib/hooks/queries/use-gonggam-comments';

interface PostInteractionProps {
  postId: number;
  tags: string[];
}

const GonggamPostInteraction = ({ postId, tags }: PostInteractionProps) => {
  const [likeCnt, setLikeCnt] = useState<number>(0);
  const [commentCnt, setCommentCnt] = useState<number>(0);
  const { comments, isCommentsPending, commentsErr } = useGonggamComments(postId);

  useEffect(() => {
    const fetchPostMeta = async () => {
      try {
        const { likeCnt, commentCnt } = await getPostMetaClient(postId);
        setLikeCnt(likeCnt);
        setCommentCnt(commentCnt);
      } catch (err) {
        console.error('포스트 메타데이터를 가져오는 데 실패했습니다:', err);
      }
    };
    fetchPostMeta();
  }, [postId]);

  if (isCommentsPending) return null;
  if (commentsErr) throw Error(commentsErr.message);

  return (
    <section>
      {/* 좋아요(하트) 버튼 */}
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <button className="flex items-center gap-2 rounded-md border border-gray-500 p-2 transition-colors hover:text-primary">
          <Heart size={14} />
          <span>{likeCnt}</span>
        </button>
      </div>
      {/* 태그 영역 */}
      <div className="mt-4">
        <ul className="mb-6 flex flex-wrap gap-2 text-sm text-muted-foreground">
          {tags?.map((tag) => (
            <li key={tag} className="rounded-md border border-gray-300 bg-muted px-2 py-1 text-xs text-gray-600">
              # {tag}
            </li>
          ))}
        </ul>
      </div>

      {/* 댓글 영역 */}
      <div className="mt-8">
        <h2 className="mb-4 text-base font-medium">댓글 {commentCnt}개</h2>

        {comments.map((comment) => (
          <div key={comment.id} className="mb-6 flex items-start gap-2 border-b pb-6 text-sm">
            {/* 프로필 이미지 */}
            <div className="relative h-[40px] w-[40px] shrink-0 overflow-hidden rounded-full">
              <Image
                src={comment.writer.profileImage || DEFAULT_AVATAR_URL}
                alt={`${comment.writer.nickname}의 프로필 이미지`}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>

            {/* 닉네임, 시간, 텍스트 */}
            <div>
              <div className="flex items-center gap-1">
                <p className="font-mono">{comment.writer.nickname ?? '알 수 없음'}</p>
                <span className="text-xs text-gray-400">{formatRelativeDate(comment.created_at)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{comment.comment}</p>
            </div>
          </div>
        ))}

        {/* 댓글 입력창 */}
        <form className="flex items-center gap-2">
          {/* TODO: 로그인 사용자의 프로필 이미지 */}
          <div className="relative h-[40px] w-[40px] overflow-hidden rounded-full">
            <Image
              src={DEFAULT_AVATAR_URL}
              alt={`로그인유저의 프로필 이미지`}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <input
            type="text"
            placeholder="댓글을 작성해보세요."
            className="flex-1 rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button type="submit">등록하기</Button>
        </form>
      </div>
    </section>
  );
};

export default GonggamPostInteraction;
