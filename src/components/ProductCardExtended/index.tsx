import {TProduct} from '_types/types';
import Image from 'next/image';
import {Suspense} from 'react';
import {getCompareTo, getProductImage} from 'utils/helper';

interface IProductCardExtendedProps {
  product: TProduct;
}

export default function ProductCardExtended({
  product,
}: IProductCardExtendedProps) {
  return (
    <div className="flex flex-col gap-y-1">
      <div className=" transition-transform duration-100 hover:bg-[#EEEAEA] p-2 rounded-md ">
        <div className="w-full flex md:flex-row flex-col justify-between items-center rounded-md py-5 px-4 pr-0 font-poppins text-black border bg-white cursor-pointer ">
          <div className="md:basis-3/5 basis-full md:order-1 order-2 md:py-0 py-4">
            <h1 className="md:text-2xl text-xl font-bold">{product.title}</h1>
            <div className="my-2">
              {product?.product_identifiers?.map(identifier => (
                <Suspense key={identifier.id}>
                  <span>
                    {identifier.pi.short_name} # {identifier.value}
                  </span>
                  <br />
                </Suspense>
              ))}

              <span>{getCompareTo(product)}</span>
            </div>
            <p className="mb-8 md:text-base text-sm font-poppins">
              {product.short_description}
            </p>
            <div className="flex gap-3 font-poppins">
              <button className="px-5 py-1 bg-[#5B5B5B] rounded-lg font-medium border border-transparent text-white hover:text-black sm:text-base text-sm hover:border-black hover:bg-white transition duration-200 ">
                Learn More
              </button>
              <button className="px-5 py-1 text-black rounded-lg font-medium border border-transparent bg-yellow-700 hover:border-black sm:text-base text-sm hover:bg-white transition duration-200 ">
                Quote Now
              </button>
            </div>
          </div>
          <div className="md:basis-2/5 basis-full md:order-2 order-1 md:py-0 py-4">
            <div className="w-[300px] h-[172px] relative">
              <Image
                src={getProductImage(product)}
                fill
                className="
                object-cover"
                alt={product.default_image?.description || ''}
                // className={'h-full object-contain'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
