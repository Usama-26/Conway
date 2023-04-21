import ModalYellowHeader from '@/components/ModalYellowHeader';
import OverlayLoader from '@/components/OverlayLoader';
import ThreeDViewSmall from '@/modules/3d-views/ThreeDViewSmall';
import {TProduct} from '_types/types';
import {getProductDetailApi} from 'apis';
import Image from 'next/image';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';

interface IProductPartsModalProps {
  modalProductId: number | null;
  setModalProductId: Dispatch<SetStateAction<number | null>>;
}

const ProductPartsModal = ({
  modalProductId,
  setModalProductId,
}: IProductPartsModalProps) => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<TProduct>();

  const getProduct = async (id: number) => {
    console.log(modalProductId);
    setLoading(true);
    try {
      const {data} = await getProductDetailApi(id);
      console.log(data);
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    modalProductId && getProduct(modalProductId);
  }, [modalProductId]);

  if (loading) return <OverlayLoader />;

  return (
    <ModalYellowHeader
      open={!!modalProductId}
      loading={loading}
      setOpen={() => setModalProductId(null)}
      header={product?.title}
    >
      <div className="grid md:grid-cols-12 gap-2 p-3">
        <div className="col-span-7 ">
          <div className="border border-gray-200 p-1">
            <h1 className="text-black text-[14px] font-poppins font-medium">
              CMI #{' '}
              {
                product?.product_identifiers?.find(
                  idntfr => idntfr.pi.short_name === 'CMI'
                )?.value
              }
            </h1>
            <div className="flex justify-center items-center">
              {product && <ThreeDViewSmall product={product} />}
            </div>
          </div>
          <div className="overflow-x-auto md:w-full mx-auto mt-5">
            <table className="table text-sm table-auto w-full ">
              {/* head */}
              <thead>
                <tr>
                  <th className="p-2 bg-yellow-700 text-black font-poppins text-[14px] font-semibold">
                    CMI PART NO.
                  </th>
                  <th className="p-2 bg-yellow-700 text-black font-poppins text-[14px] font-semibold">
                    OEM PART NO.
                  </th>
                  <th className="p-2 bg-yellow-700 text-black font-poppins text-[14px] font-semibold">
                    DESCRIPTION
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-black font-poppins text-[14px] font-semibold">
                  <td className="p-2">
                    {
                      product?.product_identifiers?.find(
                        idntfr => idntfr.pi.short_name === 'CMI'
                      )?.value
                    }
                  </td>
                  <td className="p-2">
                    {
                      product?.product_identifiers?.find(
                        idntfr => idntfr.pi.short_name === 'OEM'
                      )?.value
                    }
                  </td>
                  <td className="p-2">Conway End Fitting O.S.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-5 px-4 text-left">
          <div>
            <h1 className="text-black text-[18px] font-poppins font-medium">
              {product?.short_description}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex justify-end px-5">
        <div className="flex justify-center items-center gap-1">
          <Image
            src={'/images/exclamation.png'}
            width={15}
            height={15}
            alt=""
          />
          <h1 className="text-[12.5px] font-poppins text-black font-semibold">
            Default QTY = number of items used for this assembly
          </h1>
        </div>
      </div>
      <div className="flex justify-end px-5 mt-4 mb-5">
        <div className="flex justify-center items-center gap-3">
          <div>
            <div className="border border-gray-400 rounded-lg p-0 flex items-center justify-center">
              <div className="border-r border-gray-400">
                <button
                  className="px-5 py-2.5 rounded-md text-[26px] font-medium text-center text-[#454749] font-poppins focus:outline-none"
                  id="decrement"
                >
                  -
                </button>
              </div>
              <div
                className="text-[26px] font-medium font-poppins px-5 text-[#5B5B5B]"
                id="number"
              >
                0
              </div>
              <div className="border-l border-gray-400 ">
                <button
                  className="px-5 py-2.5 rounded-md text-[26px] font-medium text-center text-[#454749] font-poppins focus:outline-none"
                  id="increment"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <button
              className="bg-[#5B5B5B] hover:bg-yellow-700 hover:text-black rounded-lg px-5 py-4 text-white font-poppins font-bold text-[20px]"
              //   onClick={() => dispatch(addProduct(item))}
            >
              ADD TO RFQ
            </button>
          </div>
        </div>
      </div>
    </ModalYellowHeader>
  );
};

export default ProductPartsModal;
