import ProductCard from '@/components/ProductCard';
import {Splide, SplideSlide} from '@splidejs/react-splide';
import {TProduct} from '_types/types';

interface IRelatedProductsProps {
  relatedProducts?: TProduct[];
}
const RelatedProducts = ({relatedProducts}: IRelatedProductsProps) => {
  return (
    <div id="mySplide">
      <Splide
        options={{
          perPage: 4,
          perMove: 1,
          gap: '2rem',
          pagination: false,
          width: '1920px',
          breakpoints: {
            1536: {
              perPage: 3,
              gap: '1rem',
              width: '1200px',
            },
            768: {
              perPage: 2,
            },
            640: {
              perPage: 1,
              width: '320px',
            },
          },
        }}
        className="mx-auto px-6 md:px-0"
      >
        <SplideSlide>
          <ProductCard />
        </SplideSlide>
        <SplideSlide>
          <ProductCard />
        </SplideSlide>
        <SplideSlide>
          <ProductCard />
        </SplideSlide>
        <SplideSlide>
          <ProductCard />
        </SplideSlide>

        {/* {relatedProducts?.map(product => (
          <SplideSlide key={product.id}>
            <ProductCard product={product} />
          </SplideSlide>
        ))} */}
      </Splide>
    </div>
  );
};

export default RelatedProducts;
