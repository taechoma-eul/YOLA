import ContentsContainer from '@/components/features/home/main-gonggam-item-contents-container';
import ReactionBox from '@/components/features/home/main-gonggam-item-reaction-box';
import MypageItemContainer from '@/components/features/mypage/mypage-gonggam-item-container';
import { formatRelativeDate } from '@/lib/utils/date-format';
import type { GonggamPostWithCounts } from '@/types/gonggam-posts';

interface ItemProps {
  post: GonggamPostWithCounts;
}

const MypageGonggamItem = ({ post }: ItemProps) => {
  return (
    <MypageItemContainer postId={post.id} category={post.category}>
      <ContentsContainer>
        <h2 className="justify-start self-stretch text-sm">{post.category}</h2>
        <p className="w-80 justify-start overflow-hidden text-ellipsis whitespace-nowrap text-xs">{post.content}</p>
        <time className="mt-3 flex text-xs text-neutral-400" dateTime={post.created_at}>
          <div className="text-black">{post.users.nickname}</div> · {formatRelativeDate(post.created_at)}
        </time>
        <ReactionBox likes={post.like_count ?? 0} comments={post.comment_count ?? 0} />
      </ContentsContainer>
    </MypageItemContainer>
  );
};

export default MypageGonggamItem;
