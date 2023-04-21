/* eslint-disable prettier/prettier */
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import React from 'react';
export function SearchInputMobile() {
  return (
    <div className="mx-10 text-center py-3 sm:hidden">
      <label htmlFor="searchMobile" className="relative inline-block w-full">
        <input
          type="text"
          placeholder="Search Products"
          className={
            'w-full py-2 px-4  focus:outline-1 outline-yellow-700 rounded-md border border-[#dbdbdb]'
          }
        />
        <button
          onClick={() => console.log('Search Results')}
          className="absolute top-2 right-2"
        >
          <MagnifyingGlassIcon className="w-6 h-6 stroke-[#bdbdbd]" />
        </button>
      </label>
    </div>
  );
}
