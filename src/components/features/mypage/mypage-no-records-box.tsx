import CAT_NO_RECORDS from '@images/images/cat-no-records.svg';
import Image from 'next/image';

interface NoRecordsBoxProps {
  mode: '공감' | '라이프';
}

const NoRecordsBox = ({ mode }: NoRecordsBoxProps) => {
  return (
    <div className="col-span-full mb-[272px] flex min-h-[542px] flex-col items-center justify-center whitespace-normal rounded-[12px] bg-secondary-grey-100 text-center text-secondary-grey-500">
      <figure className="relative mb-[20px] h-[58px] w-[65px]">
        <Image src={CAT_NO_RECORDS} alt="기록없음을 알리는 고양이 일러스트" fill className="object-contain" />
      </figure>
      <p>앗 아직 기록이 없어요</p>
      <p>{mode === '공감' ? '공감 게시판에서 글을 작성해보세요!' : '오늘의 혼자 라이프를 기록해보세요!'}</p>
    </div>
  );
};

export default NoRecordsBox;
