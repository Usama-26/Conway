import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {setLicenseDB} from '../server/db';
import categoryModel from 'server/models/categoryModel';
import dynamic from 'next/dynamic';
import {TBreadCrumb} from '_types/ui';
const Catalog = dynamic(() => import('@/modules/catalog'), {});
const HomeLayout = dynamic(() => import('@/layouts/HomeLayout'), {});

// export default function Home({ styleUrl, fields }: { styleUrl: string, fields: any }) {
export default function Home({
  categories,
  sidebarCategories,
  breadcrumb,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <HomeLayout sidebarCategories={sidebarCategories} breadcrumb={breadcrumb}>
      <Catalog categories={categories} />
    </HomeLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  if (!(await setLicenseDB(req.headers.host))) {
    return {
      notFound: true,
    };
  }
  const breadcrumb: TBreadCrumb[] = [
    {
      title: 'Product Catalog',
      url: '/catalog',
      active: true,
    },
  ];
  return {
    props: {
      categories: await categoryModel.find({
        where: {parent_id: 1},
        withJoins: ['category_media'],
      }),
      sidebarCategories: await categoryModel.getCategoriesHierarchy(),
      breadcrumb,
    },
  };
};
