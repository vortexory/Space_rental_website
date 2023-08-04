'use client';
import useSearchModal from '@/app/hooks/useSearchModal';
import React from 'react';
import { BiSearch } from 'react-icons/bi';

const Search = () => {
  const searchModal = useSearchModal();
  return (
    <div
      className="border-[1px] md:w-auto py-1 rounded-full shadow-sm hover:shadow-md transition cursor-pointer min-w-[20rem] flex flex-row items-center justify-between pr-3 pl-3"
      onClick={searchModal.onOpen}
    >
      <div> Where do you wanna go? </div>
      <div className="p-2  rounded-full text-white bg-gray-900">
        <BiSearch />
      </div>
    </div>
  );
};

export default Search;
