import {CartRow} from '@/components/CartRow';
import Image from 'next/image';
import React from 'react';

import {IoInformationCircleOutline} from 'react-icons/io5';
export function Cart() {
  return (
    <div className="w-full grid grid-cols-1 py-14 px-7 overflow-x-scroll">
      <div className="flex gap-8">
        <div className="flex gap-4 items-center self-start">
          <span className="font-bold">1</span>
          <Image
            src={'/images/products/brush.png'}
            height={100}
            width={100}
            alt="product image"
            className="object-cover border p-1"
          />
        </div>
        <div className="basis-full">
          <div className=" flex justify-between mb-8">
            <h2 className="font-bold text-[22px] leading-[30px] py-1 hover:underline cursor-pointer">
              Conway Gripper Bar Complete for Bobst SP 900
            </h2>
            <div>
              <span className="px-8">
                <IoInformationCircleOutline
                  className="stroke-[#717284] w-4 h-4 inline mr-2 tooltip tooltip-left"
                  data-tip={
                    'Default QTY = number of items used for this assembly!'
                  }
                />
                QUANTITY
              </span>
              <span className="px-8">REMOVE</span>
            </div>
          </div>
          <CartRow />
          <CartRow />
          <CartRow />
        </div>
      </div>
    </div>
  );
}
