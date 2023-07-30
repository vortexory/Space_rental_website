'use client';

import {  useSearchParams } from 'next/navigation';
import { categories } from '@/data/categories';
import CategoryBox from './CategoryItem';

const Sidebar = () => {
  const params = useSearchParams();
  const category = params?.get('category');


  return (
    <div
      className="
        fixed
        flex flex-col 
        h-full shadow-md
        "
    >
      {Object.entries(categories).map(([label, {  icon }]) => (
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
