import Image from 'next/image';

import {useSelector, useDispatch} from 'react-redux';

import {TRootState} from '../store';
import HomeLayout from '@/layouts/HomeLayout';
import {Cart} from '@/modules/Cart';

const ProductPartsTable = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: TRootState) => state.cart.products);

  return (
    <HomeLayout>
      <div className="text-black w-full">
        <div>
          <h3 className="font-bold text-xl">My Request For Quote List</h3>
          <h4 className="text-lg font-semibold inline-flex items-center mt-3">
            <Image
              src={'/icons/info-circle.png'}
              height={30}
              width={30}
              alt="info"
              className="mr-2"
            />
            Please check the quantity of items before requesting a Quote!
          </h4>
        </div>
        <Cart />
        <Cart />
      </div>
    </HomeLayout>
  );
};

export default ProductPartsTable;
