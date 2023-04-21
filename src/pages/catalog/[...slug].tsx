import dynamic from 'next/dynamic';
import '@splidejs/react-splide/css';
import {setLicenseDB} from 'server/db';
import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {getCatalogProductProps} from 'server/services/catalogService';
const ProductDetail = dynamic(
  () => import('@/modules/Product/ProductDetail'),
  {}
);
const HomeLayout = dynamic(() => import('@/layouts/HomeLayout'), {});

export default function Index({
  product,
  breadcrumb,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log('product', product);

  return (
    <HomeLayout breadcrumb={breadcrumb}>
      <ProductDetail product={product} />
    </HomeLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({query, req}) => {
  const {slug} = query;
  if (!(await setLicenseDB(req.headers.host)) || !(slug?.length === 2)) {
    return {
      notFound: true,
    };
  }

  return {
    props: getCatalogProductProps(slug as string),
  };
};
