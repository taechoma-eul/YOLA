import { clsx } from 'clsx';
import type { Children } from '@/types/children';

interface TextBlockProps extends Children {
  title: string;
  className: string;
  isMobile?: boolean;
}

const TextBlock = ({ title, children, className, isMobile = false }: TextBlockProps) => {
  return (
    <div
      className={`inline-flex flex-col items-center justify-start gap-4 self-stretch text-center text-lg ${className}`}
    >
      <strong className="h-[25px] font-semibold leading-relaxed text-primary-orange-700">{title}</strong>
      <p
        className={clsx(
          'justify-start self-stretch text-center text-lg leading-[1.39] text-secondary-grey-900',
          isMobile && 'h-[44px]'
        )}
      >
        {children}
      </p>
    </div>
  );
};

export default TextBlock;
