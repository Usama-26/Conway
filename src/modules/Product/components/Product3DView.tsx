import ThreeDViewSmall from '@/modules/3d-views/ThreeDViewSmall';
import {Dialog, Transition} from '@headlessui/react';
import {TProduct} from '_types/types';
import Image from 'next/image';
import {XMarkIcon} from '@heroicons/react/24/outline';
import {useRouter} from 'next/router';
import {Fragment, useState} from 'react';
import {Button} from '@/components/Button';

const Product3DView = ({product}: {product: TProduct}) => {
  const [active2d, setActive2d] = useState(false);
  const [active3d, setActive3d] = useState(true);

  const [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
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
                <Dialog.Panel className="w-screen h-screen transform overflow-hidden bg-gray-50 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center p-4 font-poppins">
                    <h4>
                      <b>Active</b> -Griper Bar Complete
                    </h4>
                    <div className="flex gap-8">
                      <button>
                        <Image
                          src={'/icons/cart.svg'}
                          height={15}
                          width={15}
                          alt={'cart icon'}
                        />
                      </button>
                      <button onClick={closeModal}>
                        <XMarkIcon className="w-4 h-4 stroke-2" />
                      </button>
                    </div>
                  </div>
                  <div className=" flex justify-between">
                    <Button
                      size={'lg'}
                      className="fixed w-[370px] bottom-8 left-5 rounded-md text-[14px] p-0 hover:!bg-yellow-700 hover:!text-black border-transparent focus:outline-none uppercase !bg-[#5B5B5B] focus:ring-0"
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
                      className="fixed w-[370px] bottom-8 right-5 rounded-md text-[14px] p-0 hover:!bg-yellow-700 hover:!text-black border-transparent focus:outline-none uppercase !bg-[#5B5B5B] focus:ring-0"
                    >
                      <span>Add to RFQ</span>
                    </Button>
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
