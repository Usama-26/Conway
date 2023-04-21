import {TRootState} from '@/store/index';
import {Menu, Transition} from '@headlessui/react';
import {Fragment, useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {signOut, useSession} from 'next-auth/react';
import {useSelector} from 'react-redux';
import SearchInput from '@/components/SearchInput';

const Header = () => {
  const {data: session, status} = useSession();
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const cartItems = useSelector(
    (state: TRootState) => state.cart.products.length
  );
  const [showPopover, setShowPopover] = useState(false);
  const prevCartItemsRef = useRef(cartItems);

  useEffect(() => {
    if (cartItems > prevCartItemsRef.current) {
      setShowPopover(true);
    }
    prevCartItemsRef.current = cartItems;
  }, [cartItems]);

  return (
    <>
      <header className="mx-10 py-5 text-zinc-700">
        <div className="flex md:flex-row flex-col mx-auto container justify-between items-center">
          <div>
            <Link href={'/'}>
              <Image
                src={'/images/logo.png'}
                height={103}
                width={252}
                alt={'Conway Machines Logo'}
                className={'w-[300px] md:w-36 object-cover mb-3 md:mb-0'}
              />
            </Link>
          </div>
          <menu className="user-menu flex justify-between items-center">
            <div className=" pr-4 py-2 flex gap-6">
              <label htmlFor="search" className="relative sm:inline hidden">
                <SearchInput isSearchBarVisible={isSearchBarVisible} />
              </label>
              <button
                onClick={() => setIsSearchBarVisible(!isSearchBarVisible)}
                className={'z-10 sm:inline hidden'}
              >
                <Image
                  src={'/icons/search.svg'}
                  height={16}
                  width={16}
                  alt={'Search Icon'}
                  className="hover:rounded-full ring-[#dadada] hover:ring-2 ring-offset-4
                   outline-gray-200"
                />
              </button>
              <button
                onClick={() => setShowPopover(!showPopover)}
                className="relative m-auto"
              >
                {cartItems !== 0 ? (
                  <span className="absolute -top-1 -right-2.5 px-1 bg-red-400 rounded-sm text-white font-medium text-[10px]">
                    {cartItems}
                  </span>
                ) : null}

                <Image
                  src={'/icons/cart.svg'}
                  height={15}
                  width={15}
                  alt={'Cart Icon'}
                  className="hover:rounded-full ring-[#dadada] hover:ring-2 ring-offset-4
                   outline-gray-200"
                />

                {showPopover && (
                  <div className="md:absolute popoverMobile z-10 w-[300px] md:w-[460px] top-11 border border-gray-200 shadow-md rounded-lg md:-right-9 -right-40 bg-white ">
                    <div className="relative">
                      <span
                        className="arrow-up hidden md:block"
                        style={{
                          left: 'calc(90% - 4px)',
                          top: '-7px',
                        }}
                      />
                      <div className="md:p-5 p-2">
                        <div className="flex justify-end">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                            className="md:w-7 md:h-7 w-6 h-6"
                            onClick={() => setShowPopover(false)}
                          >
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                          </svg>
                        </div>
                        <div className="flex justify-center">
                          <Image
                            onClick={() => setShowPopover(false)}
                            src={'/images/CartClose.png'}
                            alt=""
                            width={80}
                            height={80}
                          />
                        </div>
                        <div className="px-5 text-center mt-6">
                          <h1 className="md:text-[20px] text-[16px] text-black font-bold">
                            Item successfully added!
                          </h1>
                          <p className="text-black md:text-[12px] text-[10px] font-bold mt-5">
                            Default QTY = number of items used for this
                            assembly! Please check the quantity of items before
                            requesting a Quote!
                          </p>
                        </div>
                        <div className="space-x-5 mt-7">
                          <Link href={session ? '/cart' : '/auth/login'}>
                            <button className="bg-[#5B5B5B] px-5 text-[12px] md:text-[15px] font-semibold  rounded-lg md:px-12 py-2.5 text-white border hover:text-black  hover:border-black sm:text-base text-sm hover:bg-white transition duration-200">
                              Continue
                            </button>
                          </Link>
                          <button className="bg-[#FFCB06] px-3 text-[16px] md:text-[16px] rounded-lg font-semibold md:px-12 py-2 text-black border  hover:border-black sm:text-base text-sm hover:bg-white transition duration-200">
                            My RFQ List
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </button>
            </div>
            <div className="border-[#76787a80] border h-8 ml-4" />
            <div className="pl-6">
              <Menu
                as="div"
                className="z-10 relative inline-block text-left font-poppins"
              >
                <div>
                  <Menu.Button className="hover:bg-[#dadada] flex justify-between rounded-full p-1 gap-2 items-center ">
                    <span className="p-1.5 rounded-full bg-white">
                      <Image
                        src={'/icons/profile.svg'}
                        height={13.34}
                        width={12.43}
                        alt={'Profile Icon'}
                      />
                    </span>
                    {session && <span>Hello, {session.user?.first_name}!</span>}

                    <Image
                      src={'/icons/chevron.svg'}
                      height={6}
                      width={10}
                      alt={'Arrow Down Icon'}
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {!session ? (
                      <div>
                        <Menu.Item>
                          <Link
                            href="/auth/login"
                            className={
                              ' group flex w-full items-center rounded-t-md rounded-b-none px-4 py-3 text-sm hover:bg-[#e5e5e5]'
                            }
                          >
                            Login
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <hr className="mx-2" />
                        </Menu.Item>
                        <Menu.Item>
                          <Link
                            href="/auth/register"
                            className={
                              ' group flex w-full items-center rounded-b-md rounded-t-none px-4 py-3 text-sm hover:bg-[#e5e5e5]'
                            }
                          >
                            Register
                          </Link>
                        </Menu.Item>
                      </div>
                    ) : (
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          <button
                            className={
                              ' group flex w-full items-center rounded-t-md rounded-b-none px-4 py-3 text-sm hover:bg-[#e5e5e5]'
                            }
                          >
                            My Account
                          </button>
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            onClick={() => signOut({redirect: false})}
                            className={
                              ' group flex w-full items-center rounded-b-md rounded-t-none px-4 py-3 text-sm hover:bg-[#e5e5e5]'
                            }
                          >
                            Logout
                          </button>
                        </Menu.Item>
                      </div>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
              {/* <button className="inline-flex items-center gap-4"></button> */}
            </div>
          </menu>
        </div>
      </header>
    </>
  );
};

export default Header;
