
'use client'
import React from 'react';
// import { BiSearch } from 'react/icons/bi';
import { BiSearch } from 'react-icons/bi';

const Search = () => {
  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer ">
      <div className="flex flex-row items-center justify-between">
        <div className="px-6 font-semibold text-sm">Anywhere</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          Any Week
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div> Add Guests</div>
          <div className="p-2  rounded-full text-white bg-gray-900">
            <BiSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
