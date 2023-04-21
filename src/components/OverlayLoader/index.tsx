import Spinner from '../Spinner';

export default function OverlayLoader() {
  return (
    <div className="flex justify-center items-center fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-50 z-[99999]">
      <Spinner size="xl" color="text-primary-900" />
    </div>
  );
}
