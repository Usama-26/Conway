import {IMAGE_PLACEHOLDER} from '_constant';
import {TProduct} from '_types/types';
import Image from 'next/image';
import {getProductImage} from 'utils/helper';

interface IProductCardProps {
  product: TProduct;
}

export default function ProductCard({product}: IProductCardProps) {
  return (
    <div className="rounded-md border border-[#C0C0C0] mx-auto ">
      <div className="p-4">
        <Image
          src={getProductImage(product)}
          width={332}
          height={282}
          alt={product.default_image?.description || ''}
          className="mx-auto"
        />
      </div>
      <h1 className="text-center font-medium py-3 border-y border-black">
        {product.title}
      </h1>
      <p className="my-6 text-center">{product.short_description}</p>
      <div className=" pb-6">
        <button className=" block w-4/5 mx-auto px-5 py-1.5 text-black rounded-lg font-medium border bg-yellow-700 border-black  transition duration-200 hover:font-bold">
          Learn more
        </button>
      </div>
    </div>
  );
}
