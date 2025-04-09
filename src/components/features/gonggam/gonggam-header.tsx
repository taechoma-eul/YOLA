import { Button } from '@/components/ui/button';

const GonggamHeader = () => {
  return (
    <section className="mb-5 flex justify-between">
      <h1 className="text-2xl font-extrabold">혼자 라이프 공감 게시판</h1>
      <Button>글 작성하기</Button>
    </section>
  );
};

export default GonggamHeader;
