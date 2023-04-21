import {GetServerSideProps} from 'next';
import {setLicenseDB} from 'server/db';

import AuthLayout from '@/layouts/AuthLayout';
import dynamic from 'next/dynamic';
const ResetPassword = dynamic(() => import('@/modules/auth/ResetPassword'), {});

const Index = () => {
  return (
    <AuthLayout>
      <ResetPassword />
    </AuthLayout>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  if (!(await setLicenseDB(req.headers.host))) {
    return {
      notFound: true,
    };
  }
  return {
    props: {},
  };
};
