import {GetServerSideProps} from 'next';
import {setLicenseDB} from 'server/db';
import AuthLayout from '@/layouts/AuthLayout';
import dynamic from 'next/dynamic';
const VerificationEmail = dynamic(
  () => import('@/modules/auth/VerifyEmail'),
  {}
);

const Index = () => {
  return (
    <AuthLayout>
      <VerificationEmail />
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
