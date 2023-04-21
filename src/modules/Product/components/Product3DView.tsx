import ThreeDViewSmall from '@/modules/3d-views/ThreeDViewSmall';
import {TProduct} from '_types/types';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useState} from 'react';

const Product3DView = ({product}: {product: TProduct}) => {
  const router = useRouter();
  const [active2d, setActive2d] = useState(false);
  const [active3d, setActive3d] = useState(true);

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
        <button onClick={() => router.push('/3d-view')}>
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
    </div>
  );
};

export default Product3DView;
