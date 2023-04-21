import {TProductPartsRel} from '_types/types';
import Image from 'next/image';
import {Dispatch, SetStateAction} from 'react';
import ToolTip from '@/components/ToolTip';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {AddRFQProductData, addRFQProduct} from '@/store/reducers/cart';
import {dispatch} from '@/store/index';
import Tippy, {useSingleton} from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import styled from 'styled-components';

interface IProductPartTableRowProps {
  bold?: boolean;
  item: TProductPartsRel;
  selectedItems: number[];
  setSelectedItems: Dispatch<SetStateAction<number[]>>;
  setModalProductId: Dispatch<SetStateAction<number | null>>;
}

const StyledTippy = styled(Tippy)`
  &.custom-tooltip {
    border-radius: 10px;
    background-color: white;
    color: #ffffff;
  }
`;

const ProductPartTableRow = ({
  bold,
  item,
  selectedItems,
  setSelectedItems,
  setModalProductId,
}: IProductPartTableRowProps) => {
  const {data: session, status} = useSession();
  const router = useRouter();
  const [source, target] = useSingleton();

  const handleCartClick = async () => {
    if (!session) router.push('/auth/login');
    else {
      const data: AddRFQProductData = {
        customer_id: session.user.id,
        items: [item],
      };
      dispatch(addRFQProduct(data));
    }
  };

  return (
    <>
      <StyledTippy
        singleton={source}
        placement="top"
        arrow={true}
        delay={2000}
        offset={[55, 5]}
        theme="light"
        className="custom-tooltip"
      />
      <tr
        className={`${
          bold ? 'font-semibold' : ''
        } hover:bg-[#C0C0C040] hover cursor-pointer`}
      >
        <td className="p-2 text-center sticky left-0">
          <input
            type="checkbox"
            className="checkbox"
            checked={selectedItems.includes(item.id)}
            onChange={evt => {
              if (evt.target.checked) {
                setSelectedItems([...selectedItems, item.id]);
                return;
              }

              setSelectedItems(selectedItems.filter(id => id !== item.id));
            }}
          />
        </td>
        <td className="p-2 text-center text-[#303651]">{item.id}</td>
        <td className="p-2 text-center text-[#303651]">{item.qty}</td>
        <td className="p-2 text-[#303651]">{item.product_part_id}</td>
        <td className="p-2 text-[#303651]">{item.description}</td>
        <td className="p-0 md:p-2">
          <div>
            <Tippy
              content={
                <span className="font-poppins font-medium text-[12px] text-[#1E1E1E]">
                  See more information
                </span>
              }
              singleton={target}
            >
              <button onClick={() => setModalProductId(item.product_part_id)}>
                <Image
                  src="/icons/eye-outlined.svg"
                  width={512}
                  height={512}
                  alt="eye icon"
                  className="w-12 h-12 md:w-6 md:h-6"
                />
              </button>
            </Tippy>

            <Tippy
              content={
                <span className="font-poppins font-medium text-[12px] text-[#1E1E1E]">
                  Add to Request For Quote
                </span>
              }
              singleton={target}
            >
              <button onClick={handleCartClick}>
                <Image
                  src="/icons/cart.svg"
                  width={512}
                  height={512}
                  alt="cart icon"
                  className="w-7 h-7 ml-2 md:w-6 md:h-6"
                />
              </button>
            </Tippy>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ProductPartTableRow;
