import AuthLayout from '@/layouts/AuthLayout';
import dynamic from 'next/dynamic';
const Login = dynamic(() => import('@/modules/auth/Login'), {});

const Index = () => {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
};

export default Index;
