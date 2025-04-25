import { Children } from '@/types/children';

const TextBlock = ({ title, children }: { title: string } & Children) => {
  return (
    <div className="inline-flex flex-col items-center justify-start gap-4 self-stretch text-center text-lg">
      <strong className="h-[25px] font-semibold leading-relaxed text-primary-orange-700">{title}</strong>
      <p className="justify-start self-stretch text-center text-lg leading-[1.39] text-secondary-grey-900">
        {children}
      </p>
    </div>
  );
};

export default TextBlock;
