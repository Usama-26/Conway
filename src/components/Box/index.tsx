import {type PropsWithChildren} from 'react';

export default function Box({children}: PropsWithChildren) {
  return (
    <div className="flex justify-center items-center md:bg-gray-100 bg-white">
      <div className="w-full bg-white rounded-[20px] pt-6 pb-8 px-12 md:shadow-md md:shadow-gray-200">
        {children}
      </div>
    </div>
  );
}
