import Link from 'next/link';
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

interface ItemProps {
  path: string;
  label: string;
  isLine: boolean;
}

const ChallengeMenuItem = ({ path, label, isLine }: ItemProps) => {
  return (
    <>
      <DropdownMenuItem className="w-24 justify-center text-xl font-normal text-black hover:bg-gray-100">
        <Link href={path}>{label}</Link>
      </DropdownMenuItem>
      {isLine && <DropdownMenuSeparator className="w-24 bg-neutral-200" />}
    </>
  );
};

export default ChallengeMenuItem;
