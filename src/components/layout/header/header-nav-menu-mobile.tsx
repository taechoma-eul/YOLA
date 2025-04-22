import Image from 'next/image';
import MENU from '@images/images/header-mobile-menu-icon.svg';

const HeaderMobileMenu = () => {
  return (
    <div className="flex h-11 w-11 items-center justify-center md:hidden">
      <Image src={MENU} alt="헤더 메뉴 리스트 표시 아이콘" width={24} height={24} />
    </div>
  );
};

export default HeaderMobileMenu;
