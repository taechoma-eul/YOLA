import { cn } from '@/lib/utils/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-primary/10', className)} {...props} />;
}

function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <Skeleton className="h-[125px] w-[379px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

function SkeletonFlatten() {
  return (
    <div className="flex items-start justify-between">
      <div className="space-y-3">
        <Skeleton className="h-4 w-[500px]" />
        <Skeleton className="h-4 w-[400px]" />
      </div>
      <Skeleton className="ml-4 mr-[100px] h-[80px] w-[80px] rounded-xl" />
    </div>
  );
}

function GonggamSkeletonSection() {
  return (
    <section className="flex min-h-[800px] max-w-[1200px] flex-col divide-y divide-secondary-grey-200 px-[10px]">
      {[...Array(5)].map((_, index) => (
        <article key={index} className="flex items-start justify-between gap-[10px] py-[12px]">
          {/* 왼쪽 텍스트 영역 */}
          <div className="flex flex-1 flex-col items-start gap-1 self-stretch">
            {/* 작성자 영역 */}
            <div className="mt-[11px] flex h-[17px] items-center gap-[4px]">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-1 w-1 rounded-full" />
              <Skeleton className="h-4 w-12" />
            </div>

            {/* 텍스트 영역 */}
            <div className="mb-[13px] mt-[4px] flex flex-col items-start gap-1 self-stretch">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            {/* 좋아요/댓글/조회수 영역 */}
            <Skeleton className="h-[10px] w-[120px] rounded-md bg-primary/10" />
          </div>

          {/* 오른쪽 이미지 영역 */}
          <div className="relative h-[110px] w-[110px] overflow-hidden rounded-[16px]">
            <Skeleton className="h-full w-full" />
          </div>
        </article>
      ))}
    </section>
  );
}

function GonggamSkeletonDetailContent() {
  return (
    <section className="my-[50px] w-full animate-pulse">
      {/* 게시글 헤더 */}
      <header className="mt-[64px]">
        <div className="mb-[12px] h-8 w-2/3 rounded-md bg-primary/10" />
        <div className="flex items-center justify-between border-b pb-[20px]">
          {/* 작성자 정보 */}
          <div className="flex items-center gap-[6px]">
            <div className="relative h-[22px] w-[22px] overflow-hidden rounded-full bg-primary/10" />
            <div className="h-4 w-16 rounded-md bg-primary/10" />
            <div className="h-1 w-1 rounded-full bg-primary/10" />
            <div className="h-4 w-20 rounded-md bg-primary/10" />
            <div className="h-1 w-1 rounded-full bg-primary/10" />
            <div className="h-4 w-10 rounded-md bg-primary/10" />
          </div>

          {/* 내 글 수정 드롭다운 자리 */}
          <div className="h-5 w-5 rounded-md bg-primary/10" />
        </div>
      </header>

      {/* 이미지 영역 */}
      <figure className="mb-[40px] mt-[46px] flex w-full gap-[8px] overflow-hidden">
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="relative aspect-square w-full max-w-[379px] rounded-[12px] bg-primary/10" />
        ))}
      </figure>

      {/* 본문 영역 */}
      <section className="mb-[46px] mt-[40px] flex flex-col gap-4">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="h-4 w-full rounded-md bg-primary/10" />
        ))}
      </section>

      {/* 태그 영역 */}
      <ul className="flex flex-wrap gap-[8px] border-b pb-[38px]">
        {[...Array(4)].map((_, idx) => (
          <li key={idx} className="h-6 w-14 rounded-[4px] bg-primary/10" />
        ))}
      </ul>
    </section>
  );
}

export { Skeleton, SkeletonCard, SkeletonFlatten, GonggamSkeletonSection, GonggamSkeletonDetailContent };
