import ThreeDViewSmall from '@/modules/3d-views/ThreeDViewSmall';
import {Dialog, Transition} from '@headlessui/react';
import {TProduct} from '_types/types';
import Image from 'next/image';
import {XMarkIcon} from '@heroicons/react/24/outline';
import {GoPlusSmall} from 'react-icons/go';
import {VscDash} from 'react-icons/vsc';
import {Fragment, useState} from 'react';
import {Button} from '@/components/Button';
import {BsArrowsAngleContract, BsArrowsAngleExpand} from 'react-icons/bs';

const Product3DView = ({product}: {product: TProduct}) => {
  const [active2d, setActive2d] = useState(false);
  const [active3d, setActive3d] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function openSideBar() {
    setIsSideBarOpen(true);
  }

  function closeSideBar() {
    setIsSideBarOpen(false);
  }

  const setActive = () => {
    setActive2d(!active2d);
    setActive3d(!active3d);
  };
  return (
    <div className=" w-full h-[480px]">
      {active3d && (
        <>
          <div className="overflow-hidden w-[320px] md:w-full flex justify-center">
            <ThreeDViewSmall product={product} />
          </div>
        </>
      )}
      {active2d && (
        <div className="p-4">
          <Image
            src="/images/products/gripper-bar.png"
            alt="Product Image"
            width={513}
            height={495}
            className="mx-auto w-80 h-80 object-cover pt-10"
          />
        </div>
      )}
      <div className="absolute right-2 top-20 inline-flex flex-col gap-2">
        <button onClick={openModal}>
          <Image
            src="/static/imgs/full-screen--v2.png"
            alt="Product Image"
            width={500}
            height={500}
            className="mx-auto w-7 h-7 object-cover"
          />
        </button>
        <button
          onClick={setActive}
          className={` w-7 h-7  ${
            active3d
              ? 'bg-yellow-700 hover:bg-yellow-700 text-black'
              : 'text-white  hover:bg-zinc-900 bg-[#5b5b5b]'
          }`}
        >
          3D
        </button>
        <button
          onClick={setActive}
          className={` w-7 h-7  ${
            active2d
              ? 'bg-yellow-700 hover:bg-yellow-700 text-black'
              : 'text-white hover:bg-zinc-900 bg-[#5b5b5b]'
          }`}
        >
          2D
        </button>
      </div>
      <div className=" p-4 translate-y-12 flex justify-center">
        <Image
          src="/static/imgs/move.png"
          alt="Product Image"
          width={90}
          height={120}
          className=" w-16 h-20 object-cover bg-white"
        />
        <Image
          src="/static/imgs/rotate.png"
          alt="Product Image"
          width={90}
          height={120}
          className=" w-16 h-20 object-cover bg-white"
        />
        <Image
          src="/static/imgs/zoom.png"
          alt="Product Image"
          width={90}
          height={120}
          className=" w-16 h-20 object-cover bg-white"
        />
        <Image
          src="/static/imgs/select-part.png"
          alt="Product Image"
          width={90}
          height={120}
          className=" w-16 h-20 object-cover bg-white"
        />
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
            <div className="flex min-h-full items-center justify-center  text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-screen h-screen transform overflow-hidden bg-gray-50 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center p-4 font-poppins">
                    <h4>
                      <b>Active</b> - Griper Bar Complete
                    </h4>
                    <div className="flex gap-8">
                      <button>
                        <Image
                          src={'/icons/cart.svg'}
                          height={32}
                          width={32}
                          alt={'cart icon'}
                        />
                      </button>
                      <button onClick={closeModal}>
                        <XMarkIcon className="w-8 h-8 stroke-2" />
                      </button>
                    </div>
                  </div>
                  <div
                    onClick={openSideBar}
                    className="flex items-center justify-center"
                  >
                    <ThreeDViewSmall />
                  </div>
                  <div className=" flex justify-between font-poppins">
                    <Button
                      size={'lg'}
                      className="fixed w-[370px] bottom-8 left-5 rounded-md text-[14px] p-0 hover:!bg-yellow-700 hover:!text-black border-transparent focus:outline-none !bg-[#5B5B5B] focus:ring-0"
                    >
                      <span>Select Multiple</span>
                    </Button>
                    <div className="image-container">
                      <div className="move"></div>
                      <div className="scroll"></div>
                      <div className="pan"></div>
                      <div className="selectModel"></div>
                    </div>
                    <Button
                      size={'lg'}
                      className="fixed w-[370px] bottom-8 right-5 rounded-md text-[14px] p-0 hover:!bg-yellow-700 hover:!text-black border-transparent focus:outline-none  !bg-[#5B5B5B] capitalize focus:ring-0"
                    >
                      <span>Add to RFQ</span>
                    </Button>

                    <div
                      className={` absolute top-0 right-0 bg-white h-screen w-[400px] shadow text-black font-poppins transition overflow-scroll ${
                        isSideBarOpen ? 'translate-x-0' : 'translate-x-[400px]'
                      }  
                    `}
                    >
                      <div className=" bg-yellow-700 flex justify-between p-4">
                        <h2 className="font-bold text-2xl">Part Information</h2>
                        <span className="inline-flex gap-4">
                          <button>
                            <BsArrowsAngleExpand className="w-6  h-6 stroke-1" />
                          </button>
                          <button onClick={closeSideBar}>
                            <XMarkIcon className="w-6 h-6 stroke-2" />
                          </button>
                        </span>
                      </div>
                      <div className="flex flex-col p-4">
                        <div>
                          <h2 className=" font-bold pb-4 text-2xl">
                            Conway End Fitting O.S.
                          </h2>
                          <div className="relative border p-2 h-80 w-full">
                            <h1 className="text-3xl py-10 font-bold text-center text-zinc-700/50">
                              3D Part
                            </h1>
                            <span className="absolute top-2 left-2">
                              CMI # 10-318-0-02-00
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="grid my-4 font-medium gap-1 grid-cols-2 grid-rows-3 text-sm">
                            <div className="px-4 py-2 bg-yellow-700">
                              CMI PART NO.
                            </div>
                            <div className="px-4 py-2 border border-yellow-700">
                              10-318-0-15-00
                            </div>
                            <div className="px-4 py-2 bg-yellow-700">
                              DESCRIPTION
                            </div>
                            <div className="px-4 py-2 border border-yellow-700">
                              Conway End Fitting O.S.
                            </div>
                            <div className="px-4 py-2 bg-yellow-700">
                              COMPARE TO OEM
                            </div>
                            <div className="px-4 py-2 border border-yellow-700">
                              BSA0387016200
                            </div>
                          </div>
                          <p>
                            Conway End Fitting Operator Side that goes into the
                            gripper bars for Bobst die cutters SP 900 E and SP
                            900 ER; SP 1080 E and SP 1080 EEG; SPO 1080 E and
                            SPO 1080 EEG. Contact us for a quote.
                          </p>
                          <div className="mt-4 flex items-center">
                            <Image
                              src={'/icons/info-circle.png'}
                              height={20}
                              width={20}
                              alt="info icon"
                            />
                            <span className="font-bold text-xs">
                              Default QTY = number of items used for this
                              assembly
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2">
                            <div className="flex">
                              <button className="w-9 h-10 rounded-l-lg border border-r-0 hover:bg-yellow-700">
                                <VscDash className=" w-6 h-6 fill-zinc-700 mx-auto" />
                              </button>
                              <span className="border text-center h-10 w-12 py-2 text-zinc-700">
                                1
                              </span>
                              <button className="w-9 h-10 rounded-r-lg border border-l-0 hover:bg-yellow-700">
                                <GoPlusSmall className="w-6 h-6 fill-zinc-700 mx-auto" />
                              </button>
                            </div>
                            <Button
                              size={'lg'}
                              className=" rounded-md text-2xl hover:!bg-yellow-700 hover:!text-black border-transparent focus:outline-none uppercase !bg-[#5B5B5B] focus:ring-0"
                            >
                              <span>ADD TO RFQ</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Product3DView;
