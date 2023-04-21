import dynamic from 'next/dynamic';

const ThreeDView = dynamic(() => import('@/modules/3d-views/ThreeDView'), {
  ssr: false,
});
const Index = () => {
  return <ThreeDView />;
};

export default Index;
