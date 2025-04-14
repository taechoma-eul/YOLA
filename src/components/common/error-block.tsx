import type { Children } from '@/types/children';

interface ErrorBlockProps extends Children {
  errorImage: React.ReactNode;
  errorMessage: string;
}

const ErrorBlock = ({ errorMessage, errorImage, children }: ErrorBlockProps) => {
  return (
    <section className="flex h-[calc(100vh-150px)] w-[1280px] justify-center pt-[227px]">
      <div className="inline-flex w-60 flex-col items-center justify-start gap-10">
        <div className="h-44 self-stretch">{errorImage}</div>
        <div className="flex flex-col items-start justify-start gap-5 self-stretch">
          <p className="font-center inline-flex items-center justify-center gap-2.5 self-stretch px-2.5 text-center text-base leading-snug text-zinc-800">
            {errorMessage} <br />
            홈으로 다시 가볼까요?
          </p>
          {children}
        </div>
      </div>
    </section>
  );
};

export default ErrorBlock;
