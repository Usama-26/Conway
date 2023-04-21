import React from 'react';

export default function SearchInput({
  isSearchBarVisible,
}: {
  isSearchBarVisible: boolean;
}) {
  return (
    <input
      id="search"
      type="text"
      placeholder="Search"
      className={`bg-white shadow rounded-full py-2 border px-4 focus:outline-none focus:border transition-all translate-x-12 -z-10 text-sm ${
        isSearchBarVisible
          ? '2xl:w-96 xl:w-80 lg:w-72 md:w-64 sm:w-56 w-48 sm:inline-block hidden'
          : 'w-0 invisible'
      }`}
    />
  );
}
