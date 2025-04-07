import { ImageSwiper } from '@/components/ui/card-detail-image-swiper';
import { MODAL_Z_INDEX } from '@/constants/z-index';
import type { LifePostWithImageUrls } from '@/types/life-post';
import { ChevronsRight } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
  step 1. 모달을 호출할 파일에 이 코드를 추가해주세요
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<LifePostWithImageUrls | null>(null);

  const handleClickCard = (id: string) => {
    const post = posts.find((post) => post.id === +id);
    if (!post) {
      return;
    }
    setSelectedPost(post);
    setShowModal(true);
  };

  step 2. map안에 카드 컴포넌트를 호출하는 부분에 이 코드를 추가해주세요
  onClick={() => handleClickCard(data.id)}

  step 3. map 바깥에 이 코드를 추가해주세요
  {showModal && (
    <PostDetailModal clickModal={() => setShowModal(false)} showModal={showModal} post={selectedPost} />
  )}
 */

const ZERO = 0;
const TEN = 10;
const THREE_HUNDRED = 300;

export const PostDetailModal = ({
  clickModal,
  showModal,
  post
}: {
  clickModal: Function;
  showModal: boolean;
  post: LifePostWithImageUrls | null;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  if (!post) return;

  const createdDate = post.created_at.slice(ZERO, TEN);

  useEffect(() => {
    if (showModal) {
      setTimeout(() => setIsVisible(true), TEN);
      document.body.style.overflow = 'hidden'; //모달이 클릭되면 배경에 스크롤 막음
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      clickModal(false);
    }, THREE_HUNDRED);
  };

  return (
    /** 모달 배경, 배경 터치시 나가짐 */
    <div
      onClick={() => handleClose()}
      className={`fixed inset-0 z-[${MODAL_Z_INDEX}] bg-black/50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/** 모달 */}
      <div
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫기 방지
        className={`fixed right-0 top-0 h-screen w-2/5 transform overflow-auto bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto p-4">
          <ChevronsRight onClick={() => handleClose()} className="m-3 cursor-pointer" />
          {/** 사진 슬라이드 */}
          <ImageSwiper image_urls={post.image_urls} />
          <div className="flex">
            <p>{createdDate}</p>
            {post.mission_id ? (
              <>
                <span className="m-2 h-1.5 w-1.5 rounded-full bg-rose-300" />
                <p className="text-gray-400">| 미션인증</p>
              </>
            ) : (
              <>
                <span className="m-2 h-1.5 w-1.5 rounded-full bg-black" />
                <p className="text-gray-400">| 하루일기</p>
              </>
            )}
          </div>
          <p>{post.title}</p>
          <h1>{post.content}</h1>
          <div className="mb-2 mt-auto space-x-2 text-[12px] text-gray-700">
            {post.tags?.map((tag, idx) => (
              <span key={`detail_${idx}`} className="text-blue-600">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
