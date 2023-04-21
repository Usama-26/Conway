import Image from 'next/image';
import React from 'react';
import {GoPlusSmall} from 'react-icons/go';
import {VscDash} from 'react-icons/vsc';
import {XMarkIcon} from '@heroicons/react/24/outline';
export function CartRow() {
  return (
    <div className="flex justify-between items-center md:mx-4 border-b py-2">
      <div className="flex gap-2 items-center">
        <span className="p-1 w-12 h-12 border inline-flex items-center justify-center">
          <Image
            src={'/images/products/gear.png'}
            height={50}
            width={50}
            alt="product image"
            className=" object-cover"
          />
        </span>
        <h4 className=" text-lg hover:underline cursor-pointer">
          Conway Gripper Bar Complete for Bobst SP 900
        </h4>
      </div>
      <div className="flex">
        <div className="px-8 flex">
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
        <div className="px-8">
          <button>
            <XMarkIcon className="stroke-zinc-700 stroke-2 w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
