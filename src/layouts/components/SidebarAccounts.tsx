import {ChevronRightIcon} from '@heroicons/react/24/outline';

import Link from 'next/link';
import {useRouter} from 'next/router';

import {TBreadCrumb} from '_types/ui';
import {useEffect, useState} from 'react';

interface ISidebarProps {
  breadcrumb?: TBreadCrumb[];
}

const SidebarAccounts = ({breadcrumb}: ISidebarProps) => {
  const {query, pathname} = useRouter();
  const [showSideBar, setShowSideBar] = useState(true);
  useEffect(() => {
    setShowSideBar(false);
    setTimeout(() => {
      setShowSideBar(true);
    }, 1);
  }, [query.slug]);

  return (
    <aside className="md:max-w-sm min-w-[256px] 2xl:h-[750px] md:h-[700px] w-full md:w-0">
      <div className="mb-6">
        <h5 className="text-2xl">Account Settings</h5>
      </div>

      <div className="categories border p-3 border-[#c0c0c0] rounded-md flex flex-col 2xl:h-[600px] md:h-[550px] md:justify-between font-normal">
        <div>
          <div
            className={`flex justify-between mb-1 items-center pr-1 rounded-md hover:bg-yellow-700 hover:text-black ${
              pathname === '/accounts' && 'bg-yellow-700 text-black'
            }`}
          >
            <Link href={'/accounts'} className={'w-full p-2'}>
              <span>Account Details</span>
            </Link>

            <ChevronRightIcon className={'w-4'} />
          </div>

          <div
            className={`flex justify-between items-center pr-1 rounded-md hover:bg-yellow-700 hover:text-black ${
              pathname === '/accounts/passwords' && 'bg-yellow-700 text-black'
            }`}
          >
            <Link href={'/accounts/passwords'} className={'w-full p-2'}>
              <span>Passwords</span>
            </Link>

            <ChevronRightIcon className={'w-4'} />
          </div>
        </div>

        <div
          className={`flex justify-between items-center pr-1 rounded-md hover:bg-yellow-700 hover:text-black ${
            pathname === '/accounts/deactivate' && 'bg-yellow-700 text-black'
          }`}
        >
          <Link href={'/accounts/deactivate'} className={'w-full p-2'}>
            <span>Delete Account</span>
          </Link>

          <ChevronRightIcon className={'w-4 '} />
        </div>
      </div>
    </aside>
  );
};

export default SidebarAccounts;
