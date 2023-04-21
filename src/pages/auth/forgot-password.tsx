import AuthLayout from '@/layouts/AuthLayout';
import dynamic from 'next/dynamic';
const ForgotPassword = dynamic(
  () => import('@/modules/auth/ForgotPassword'),
  {}
);

const Index = () => {
  return (
    <AuthLayout>
      <ForgotPassword />
    </AuthLayout>
  );
};

export default Index;
