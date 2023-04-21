import Image from 'next/image';

import {useSelector, useDispatch} from 'react-redux';

import {TRootState} from '../store';
import HomeLayout from '@/layouts/HomeLayout';
import {Cart} from '@/modules/Cart';
import {Button} from '@/components/Button';
import {Dialog, Transition} from '@headlessui/react';
import {Fragment, useState} from 'react';
import {ChevronLeftIcon, XMarkIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';

const ProductPartsTable = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: TRootState) => state.cart.products);
  const [isOpen, setIsOpen] = useState(false);
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  function closeModal() {
    setIsOpen(false);
    setIsCartEmpty(true);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <HomeLayout>
      <>
        <div className="text-black w-full">
          <Link
            href="/"
            className="inline-flex items-center p-2 hover:text-white hover:bg-[#5b5b5b] rounded-md"
          >
            <ChevronLeftIcon className="w-4 h-4 mr-2" />
            <span>Product Catalog</span>
          </Link>
          <div className="p-4">
            <h3 className="font-bold text-xl">My Request For Quote List</h3>
            <h4 className="text-lg font-semibold inline-flex items-center mt-3">
              <Image
                src={'/icons/info-circle.png'}
                height={30}
                width={30}
                alt="info"
                className="mr-2"
              />
              Please check the quantity of items before requesting a Quote!
            </h4>
          </div>

          {!isCartEmpty ? (
            <div className="max-h-[450px] overflow-scroll">
              <Cart />
              <Cart />
            </div>
          ) : (
            <div className="text-center font-medium text-[22px]">
              <Image
                src={'/images/empty-cart.png'}
                width={500}
                height={367}
                alt="empty cart"
                className="mx-auto object-cover"
              />
              <p>Your RFQ list is empty!</p>
            </div>
          )}

          <div className="text-right mt-4">
            {!isCartEmpty && (
              <Button
                onClick={openModal}
                className="rounded-md text-[14px] w-[170px] p-0 border-transparent focus:outline-none uppercase hover:!bg-yellow-700 hover:!text-black bg-[#5b5b5b] focus:ring-0"
              >
                <span>Send RFQ</span>
              </Button>
            )}
          </div>
        </div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all text-black font-poppins">
                    <button
                      className="absolute right-3 top-3 p-1 hover:bg-[#eeeeee] rounded-md"
                      onClick={closeModal}
                    >
                      <XMarkIcon className="w-6 h-6 stroke-2 stroke-[#b8b8b8]" />
                    </button>
                    <div>
                      <Image
                        src={'/icons/cart-img.png'}
                        height={200}
                        width={200}
                        alt="cart image"
                        className="mx-auto"
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <h4 className="font-bold mb-4">Thank You!</h4>
                      <p>Your request has been successfully sent!</p>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </HomeLayout>
  );
};

export default ProductPartsTable;
