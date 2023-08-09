'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { categories } from '@/data/categories';
import CategoryBox from './CategoryItem';

const Sidebar = () => {
  const params = useSearchParams();
  const category = params?.get('category');

  const pathname = usePathname();
  const isMainPage = pathname === '/';
  if (!isMainPage) {
    return null;
  }
  
  return (
    <div
      className="
        fixed
        flex flex-col 
        max-h-screen shadow-md
        overflow-scroll
        scroll-smooth
        "
    >
      {Object.entries(categories).map(([label, { icon }]) => (
        <CategoryBox
          key={label}
          label={label}
          icon={icon}
          selected={category === label}
        />
      ))}
    </div>
  );
};

export default Sidebar;
