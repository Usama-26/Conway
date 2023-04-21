import React, {ReactNode, Fragment, useRef} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import OverlayLoader from '../OverlayLoader';

interface IModalYellowHeaderProps {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  header?: string | ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  loading?: boolean;
}

export default function ModalYellowHeader({
  open,
  setOpen,
  header,
  footer,
  children,
  loading,
}: IModalYellowHeaderProps) {
  // const cancelButtonRef = useRef(null);

  return (
    <>
      {loading && open && <OverlayLoader />}

      <Transition.Root appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          // initialFocus={cancelButtonRef}
          onClose={() => setOpen && setOpen(false)}
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-100"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-sm bg-white p-0 text-left align-middle shadow-xl transition-all">
                  <div>
                    <div className="flex flex-row bg-yellow-700 justify-between items-center p-4">
                      {!!header && (
                        <h1 className="text-black font-poppins text-[25px] font-semibold">
                          {header}
                        </h1>
                      )}
                      {setOpen && (
                        <div
                          className="cursor-pointer"
                          onClick={() => setOpen(false)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="currentColor"
                            className="bi bi-x"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {children}
                    {!!footer && <>{footer}</>}
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
