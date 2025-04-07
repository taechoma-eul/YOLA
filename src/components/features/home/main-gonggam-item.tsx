import ContentsContainer from '@/components/features/home/main-gonggam-item-contents-container';
import ReactionBox from '@/components/features/home/main-gonggam-item-reaction-box';
import ItemContainer from '@/components/features/home/main-gonggam-item-container';
import { GonggamPost } from '@/types/gonggam-posts';

interface ItemProps {
  post: GonggamPost;
}

const GonggamItem = ({ post }: ItemProps) => {
  const { title, content, id, comments, likes } = post;

  return (
    <ItemContainer postId={id}>
      <ContentsContainer>
        <h2 className="justify-start self-stretch text-sm">{title}</h2>
        <p className="w-80 justify-start overflow-hidden text-ellipsis whitespace-nowrap text-xs">{content}</p>
      </ContentsContainer>
      <ReactionBox likes={likes.length} comments={comments.length} />
    </ItemContainer>
  );
};

export default GonggamItem;
