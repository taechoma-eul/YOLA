import { clsx } from 'clsx';

const NavLabel = ({ isBold, label }: { isBold: boolean; label: string }) => {
  return (
    <p
      className={clsx(
        'flex h-[25px] justify-between text-center text-lg text-secondary-grey-900',
        isBold ? 'font-semibold' : 'font-normal'
      )}
    >
      {label}
    </p>
  );
};

export default NavLabel;
