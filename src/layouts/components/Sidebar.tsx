import {Disclosure, Menu, Transition} from '@headlessui/react';
import {ChevronRightIcon} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {TCategory} from '_types/types';
import {TBreadCrumb} from '_types/ui';
import {Suspense, useEffect, useState} from 'react';
import {isSideBarCategoryOpen} from 'utils/helper';

interface ISidebarProps {
  sidebarCategories: TCategory[];
  breadcrumb?: TBreadCrumb[];
}

const Sidebar = ({sidebarCategories, breadcrumb}: ISidebarProps) => {
  const {query} = useRouter();
  const [showSideBar, setShowSideBar] = useState(true);
  useEffect(() => {
    setShowSideBar(false);
    setTimeout(() => {
      setShowSideBar(true);
    }, 1);
  }, [query.slug]);
  console.log(query);
  return (
    <aside className="md:w-72 self-start w-full">
      <div className="mb-6">
        <h5 className="text-2xl">Product Catalog</h5>
      </div>
      {showSideBar && (
        <div className="categories border p-3 border-[#c0c0c0] rounded-md md:w-72 ">
          <ul className="text-black">
            {sidebarCategories.map((category, index) => {
              return (
                <li key={index}>
                  <Disclosure
                    as="div"
                    defaultOpen={isSideBarCategoryOpen(
                      category,
                      query.slug as string
                    )}
                  >
                    {({open}) => (
                      <>
                        <div
                          className={`flex justify-between items-center rounded-md hover:bg-yellow-700 ${
                            open && 'bg-yellow-700'
                          }`}
                        >
                          <Link
                            href={`/catalog/${category.slug}`}
                            className={'w-full p-2'}
                          >
                            <span>{category.name}</span>
                          </Link>
                          <Disclosure.Button
                            className={'p-2 border-l border-zinc-700/50'}
                          >
                            <ChevronRightIcon
                              className={`w-4 ${
                                open ? 'rotate-90' : 'rotate-0'
                              }`}
                            />
                          </Disclosure.Button>
                        </div>
                        <Disclosure.Panel className=" px-2 py-2 text-sm bg-gray-50">
                          <ul className="category-variants-list overflow-y-auto max-h-56">
                            {category?.children?.map(variant => {
                              return (
                                <li key={variant.id}>
                                  <Link href={`/catalog/${variant.slug}`}>
                                    <button
                                      value={variant.name}
                                      className={`category-variant-btn py-1 inline-flex items-center hover:font-bold ${
                                        query.slug !== variant.slug
                                          ? ''
                                          : 'font-bold'
                                      }`}
                                    >
                                      <ChevronRightIcon
                                        className={`chevron w-3 mr-1 ${
                                          query.slug === variant.slug
                                            ? ''
                                            : 'invisible'
                                        }`}
                                      />
                                      <span>{variant.name}</span>
                                    </button>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
