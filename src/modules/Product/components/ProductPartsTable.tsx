import {TProduct, TProductPartsRel, type TOrderProduct} from '_types/types';
import {Button} from '@/components/Button';
import Image from 'next/image';

import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import ProductPartTableRow from './ProductPartTableRow';
import ProductPartsModal from './ProductPartsModal';

const ProductPartsTable = ({product}: {product: TProduct}) => {
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [modalProductId, setModalProductId] = useState<number | null>(null);

  function handleAddToCart() {
    const selectedProducts =
      product?.bom_parts?.filter(item => selectedItems.includes(item.id)) || [];

    // dispatch(addProducts(selectedProducts));
  }

  return (
    <>
      <div className="my-8">
        <div className="relative overflow-auto border rounded-lg ">
          <table className="w-full text-[14px] table-auto">
            {/* head */}
            <thead className="border-b w-full border-gray-200">
              <tr className="uppercase ">
                <th className="py-2 sticky left-0 bg-white text-center"></th>
                <th className="py-3 px-4 bg-white font-semibold text-center font-poppins">
                  Item No. G
                </th>
                <th className="py-3 px-4 bg-white font-semibold text-center">
                  QTY
                </th>
                <th className="py-3 px-4 bg-white font-semibold text-center">
                  CMI Part No.
                </th>
                <th className="py-3 px-4 bg-white font-semibold text-center">
                  Description
                </th>
                <th className="py-3 px-4 bg-white font-semibold text-center">
                  OEM Part No.
                </th>
                <th className="py-3 px-4 bg-white"></th>
              </tr>
            </thead>
            <tbody>
              {product.bom_parts?.map((item, idx) => (
                <ProductPartTableRow
                  key={idx}
                  item={item}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                  setModalProductId={setModalProductId}
                />
              ))}
            </tbody>
          </table>
          <div className="rounded-none flex items-center p-2 gap-2 sticky left-0">
            <div className="text-center mt-1">
              <input
                type="checkbox"
                className="checkbox"
                checked={selectedItems.length === product.bom_parts?.length}
                onChange={evt => {
                  if (evt.target.checked) {
                    setSelectedItems(
                      product.bom_parts?.map(item => item.id) || []
                    );

                    return;
                  }

                  setSelectedItems([]);
                }}
              />
            </div>
            <h1 className="text-[14px] font-normal text-[#303651]">
              Select all items
            </h1>
          </div>
        </div>
        <Button
          className="rounded-md gap-2 hover:!bg-yellow-700 hover:!text-black hover:!border-l-black border-l border-transparent float-right uppercase mt-4 h-8 !py-1 !text-sm !bg-[#5B5B5B] disabled:bg-[#bdbdbd]"
          onClick={() => handleAddToCart()}
          disabled={selectedItems.length === 0}
        >
          <span>ADD TO RFQ</span>
        </Button>
      </div>

      <ProductPartsModal
        setModalProductId={setModalProductId}
        modalProductId={modalProductId}
      />
    </>
  );
};

export default ProductPartsTable;
