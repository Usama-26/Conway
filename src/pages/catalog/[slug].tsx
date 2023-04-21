import ProductCardExtended from '@/components/ProductCardExtended';
import HomeLayout from '@/layouts/HomeLayout';
import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import Link from 'next/link';
import {setLicenseDB} from 'server/db';
import Typography from '@/components/Typography';
import {ETypographyVarient} from '_enums/ui';
import {TProduct} from '_types/types';
import CatalogFilter from '@/modules/catalog/components/CatalogFilter';
import {getCatalogSlugProps} from 'server/services/catalogService';

export default function Index({
  products,
  sidebarCategories,
  breadcrumb,
  category,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log('category', category);

  return (
    <HomeLayout sidebarCategories={sidebarCategories} breadcrumb={breadcrumb}>
      <div className="mx-2 md:self-start">
        <div className="flex justify-between items-center mx-2 pb-4 relative">
          <Typography varient={ETypographyVarient.H2} className="font-medium">
            {category?.name}
          </Typography>
          <div className="mt-5"></div>
          {category.children?.length > 0 && (
            <CatalogFilter category={category} />
          )}
        </div>
        <p className="mb-4 mx-2">
          {
            "Conway produces high quality gripper bars and related products that are interchangeable with the original manufacturer's product but at better price."
          }
        </p>
        <div className="md:h-[720px] md:overflow-y-scroll ">
          {products.map((product: TProduct) => (
            <Link
              key={product.id}
              href={`/catalog/${category.slug}/${product.slug}`}
            >
              <ProductCardExtended product={product} />
            </Link>
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({query, req}) => {
  if (!(await setLicenseDB(req.headers.host))) {
    return {
      notFound: true,
    };
  }

  return {
    props: getCatalogSlugProps(query),
  };
};
