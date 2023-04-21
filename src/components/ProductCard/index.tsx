import {IMAGE_PLACEHOLDER} from '_constant';
import {TProduct} from '_types/types';
import Image from 'next/image';
import {getProductImage} from 'utils/helper';

interface IProductCardProps {
  product: TProduct;
}

export default function ProductCard({product}: IProductCardProps) {
  return (
    <div className="rounded-md border border-[#C0C0C0] mx-auto w-[371px] h-[596px]">
      <div className="flex items-center p-4 h-[343px]">
        <Image
          // src={getProductImage(product)}
          src={'/images/products/gear.png'}
          width={300}
          height={300}
          // alt={product.default_image?.description || ''}
          className="mx-auto object-contain w-80 h-80"
        />
      </div>
      <div className="p-2.5 border-y border-black">
        <h1 className="text-center font-semibold leading-9">
          {/* {product.title} */}
          {/* Only Add if string length is greather than 40 */}
          {`Conway Stripping Pins and accessories`
            .substring(0, 40)
            .concat('...')}
        </h1>
      </div>
      <p className="my-4 px-[18px] text-base leading-5 text-center h-[96px] overflow-hidden ">
        {/* {product.short_description} */}
        {/* Only Add if string length is greater than 160 */}
        {`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque rerum
        obcaecati, fugit harum corrupti fugiat consequatur inventore impedit?
        Velit praesentium temporibus, ipsa voluptate eos, maxime, vel voluptas
        veritatis enim nesciunt ratione! Ipsa nihil quibusdam pariatur
        blanditiis magnam, nulla temporibus mollitia beatae provident vel!
        Mollitia error repellendus nisi quaerat, minima nobis!`
          .substring(0, 160)
          .concat('...')}
      </p>
      <div className="pb-6  ">
        <button className=" block w-3/5 mx-auto px-5 h-[43px] text-black rounded-lg font-medium border bg-yellow-700  transition duration-200 hover:font-bold">
          Learn more
        </button>
      </div>
    </div>
  );
}
