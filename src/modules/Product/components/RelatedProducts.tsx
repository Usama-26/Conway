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
          breakpoints: {
            1024: {
              perPage: 3,
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
        {relatedProducts?.map(product => (
          <SplideSlide key={product.id}>
            <ProductCard product={product} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default RelatedProducts;
