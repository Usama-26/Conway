import {Popover, Transition} from '@headlessui/react';
import Image from 'next/image';
import React, {Fragment} from 'react';
export function FilterBox({dummyVariants}: any) {
  return (
    <Popover>
      {({open}) => (
        <>
          <Popover.Button className="inline-flex items-center gap-2 rounded-md border px-4 py-1 hover:text-black hover:border-black hover:bg-yellow-700">
            <Image
              src={'/icons/filter.png'}
              height={18}
              width={18}
              alt={'Filter Icon'}
            />
            <span>Filter</span>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute bg-white z-10 md:w-[560px] px-6 py-4 rounded-md right-0 shadow border mt-2">
              <h3>Choose the model number of your Bobst die cutter</h3>

              <div className="flex flex-col flex-wrap max-h-72 my-4 ">
                {dummyVariants?.map((variant: any) => {
                  return (
                    <label
                      key={variant}
                      htmlFor={variant}
                      className="inline-flex gap-2 py-2 cursor-pointer"
                    >
                      <input type="checkbox" className="" id={variant} />
                      <span className="font-medium">{variant}</span>
                    </label>
                  );
                })}
              </div>

              <button className="px-10 float-right py-2 bg-[#5B5B5B] rounded-lg font-medium border border-transparent text-white hover:text-black text-lg hover:border-black hover:bg-white transition duration-200 -translate-y-4">
                Filter
              </button>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
