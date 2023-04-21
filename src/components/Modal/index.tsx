import React, {ReactNode, Fragment, useRef} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {XMarkIcon} from '@heroicons/react/24/outline';
import OverlayLoader from '../OverlayLoader';

interface IModalProps {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  header?: string | ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  loading?: boolean;
}

export default function Modal({
  open,
  setOpen,
  header,
  footer,
  children,
  loading,
}: IModalProps) {
  const cancelButtonRef = useRef(null);

  return (
    <>
      {loading && open && <OverlayLoader />}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          initialFocus={cancelButtonRef}
          onClose={() => {}}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full  justify-center p-2 sm:p-4 text-center items-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className="relative w-[460px] p-8 transform overflow-hidden
                  rounded-[10px] bg-white text-left shadow-xl transition-all sm:my-8 font-poppins"
                >
                  <div>
                    {setOpen && (
                      <div className="absolute top-4 right-4 flex flex-row-reverse">
                        <XMarkIcon
                          className="cursor-pointer w-5 h-5 stroke-[2.5] stroke-[#b8b8b8]"
                          onClick={() => setOpen(false)}
                        />
                      </div>
                    )}
                    {!!header && (
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-bold leading-6 text-[#444444] flex flex-shrink-0 items-center"
                      >
                        {header}
                      </Dialog.Title>
                    )}
                    <div className="bg-white my-6">{children}</div>
                    {!!footer && (
                      <div className=" sm:flex sm:flex-row-reverse">
                        {footer}
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
