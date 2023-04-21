import Link from 'next/link';
import React, {Fragment, ReactElement, Suspense, useState} from 'react';
import {TCategory} from '_types/types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import {TBreadCrumb} from '_types/ui';
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import {SearchInputMobile} from '@/components/SearchInputMobile';

interface IHomeLayoutProps {
  children: ReactElement;
  sidebarCategories?: TCategory[];
  breadcrumb?: TBreadCrumb[];
}

export default function HomeLayout({
  children,
  sidebarCategories,
  breadcrumb,
}: IHomeLayoutProps) {
  return (
    <div className="font-poppins">
      <Header />
      <div className="yellow-stripe bg-yellow-700 h-16">
        <SearchInputMobile />
      </div>

      <main className="2xl:container mx-auto relative py-5 md:px-20 px-5 text-zinc-700">
        {/* Breadcrumb */}
        <div className="text-sm">
          <ul className="flex flex-row">
            {breadcrumb?.map((item, index) => (
              <Suspense key={item.url}>
                <li
                  className={`flex flex-row ${
                    item.active ? 'text-yellow-700' : 'hover:text-black'
                  }`}
                >
                  {item.active ? (
                    item.title
                  ) : (
                    <Link href={item.url}>{item.title}</Link>
                  )}
                </li>
                {breadcrumb[index + 1] && <li className="mx-2">{'>'}</li>}
              </Suspense>
            ))}
          </ul>
        </div>
        <div
          className="flex lg:flex-row flex-col items-center
         gap-7 pb-5 mt-4"
        >
          {sidebarCategories && (
            <Sidebar
              sidebarCategories={sidebarCategories}
              breadcrumb={breadcrumb}
            />
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
