'use client';

import qs from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { IconType } from 'react-icons';

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    // If the current query already has a "category" key and its value matches the "label" variable,
    // remove the "category" key from the "updatedQuery" to toggle the category style off.
    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    // Using "qs.stringifyUrl" to convert the "updatedQuery" object back to a query string and combine it with the base URL ("/")
    // The "skipNull" option is set to true to skip any key-value pair with a null or undefined value in the resulting query string
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, router, params]);

  return (
    <div
      onClick={handleClick}
      className={`
        w-full flex flex-row items-center justify-between gap-2
        pl-4 p-3 border-r-2 
        hover:text-neutral-800 transition cursor-pointer
        ${
          selected
            ? 'border-r-neutral-800 text-neutral-800 bg-neutral-100 '
            : 'border-transparent  text-neutral-500 '
        }
       
      `}
    >
      <div className=" font-medium text-sm hidden sm:flex">{label}</div>
      <Icon size={26} />
    </div>
  );
};

export default CategoryBox;
