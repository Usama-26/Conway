import ProductCard from '@/components/ProductCard';
import {Tab} from '@headlessui/react';
import {ChevronRightIcon} from '@heroicons/react/24/outline';
import Image from 'next/image';
import ImageGallery from '../../components/imageGallery';
import {Button} from '@/components/Button';
import {TProduct} from '_types/types';
import {Suspense, useState} from 'react';
import RelatedProducts from './components/RelatedProducts';
import ProductPartsTable from './components/ProductPartsTable';
import Product3DView from './components/Product3DView';
import {getCompareTo} from 'utils/helper';

interface IProductDetailProps {
  product: TProduct;
}

const ProductDetail = ({product}: IProductDetailProps) => {
  const [showProductDetails, setShowProductDetails] = useState(true);

  return (
    <section className="text-black font-poppins mt-4 w-full">
      <div className="mx-auto mb-10 flex lg:flex-row flex-col-reverse gap-7 justify-center">
        <div className="lg:basis-6/12 mb-4 ">
          <div className="flex sm:flex-nowrap flex-wrap justify-between gap-5">
            <h1 className="font-bold md:text-[30px] text-2xl md:text-start text-center">
              <span>{product.title}</span>
            </h1>
            <div>
              <Button
                onClick={() => setShowProductDetails(!showProductDetails)}
                className="rounded-md text-[14px] w-[170px] p-0 hover:!bg-yellow-700 hover:!text-black border-transparent focus:outline-none uppercase !bg-[#5B5B5B] focus:ring-0"
              >
                <span>
                  {showProductDetails ? 'PRODUCT DETAILS' : 'QUOTE NOW'}
                </span>
                <ChevronRightIcon className="h-3 stroke-2" />
              </Button>
            </div>
          </div>
          {showProductDetails ? (
            <ProductPartsTable product={product} />
          ) : (
            <div>
              <div className="my-8 font-bold">
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

              <div
                dangerouslySetInnerHTML={{__html: product.description}}
              ></div>

              <p className="text-lg">
                <span className="mr-4">Looking for a specific part ?</span>
                <Button
                  className="rounded-md gap-2 hover:!bg-yellow-700 hover:!text-black hover:!border-l-black border-l border-transparent !font-normal h-8 !py-1 !text-sm !bg-[#5B5B5B]"
                  onClick={() => setShowProductDetails(!showProductDetails)}
                >
                  <span>Find it here</span>
                </Button>
              </p>
            </div>
          )}
        </div>
        <div className="lg:basis-6/12 mb-12 relative mx-auto md:mx-0">
          {showProductDetails ? (
            <Product3DView product={product} />
          ) : (
            <div>
              <ImageGallery
                mainImage={product.default_image}
                thumbnailImages={product.product_medias}
              />
            </div>
          )}
        </div>
      </div>
      <Tab.Group>
        <Tab.List className="flex md:justify-start justify-center mt-10 mb-12">
          <Tab className={'md:inline-block block lg:basis-auto basis-full'}>
            {({selected}) => (
              <div
                className={` border bg-white border-b-transaparent border-[#BDBDBD] rounded-tl text-center lg:w-72  py-4 hover:bg-yellow-700 hover:border ${
                  selected
                    ? 'border border-black border-r-black'
                    : 'border-r-transparent'
                }`}
              >
                Related Products
              </div>
            )}
          </Tab>
          <Tab className={'md:inline-block block g:basis-auto basis-full'}>
            {({selected}) => (
              <div
                className={` border border-b-transaparent border-[#BDBDBD] rounded-tr text-center lg:w-72  py-4 hover:bg-yellow-700 hover:border' ${
                  selected && 'border border-black'
                }`}
              >
                Documentation
              </div>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2 mb-12">
          <Tab.Panel>
            <RelatedProducts relatedProducts={product.related_products} />
          </Tab.Panel>
          <Tab.Panel>
            <div className="text-sm h-44 font-medium">
              <p>
                To find out even more, download our specification document here:
              </p>
              <p>
                <b>General Literature</b>
                ...........................................................{' '}
                <button className="text-blue-700">Download PDF (2.0)</button>
              </p>
            </div>
            <div>
              <Image
                src="/images/logo.png"
                alt=""
                className="opacity-50"
                width={200}
                height={200}
              />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
};

export default ProductDetail;
