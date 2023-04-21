import React, {useState} from 'react';
import Image from 'next/image';
import {TModuleMediaRel} from '_types/types';
import {IMAGE_PLACEHOLDER} from '_constant';

interface IImageGalleryProps {
  mainImage?: TModuleMediaRel | null;
  thumbnailImages?: TModuleMediaRel[];
}

const ImageGallery = ({mainImage, thumbnailImages}: IImageGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(mainImage);

  const previousImage = () => {
    if (!currentImage || !thumbnailImages) {
      return;
    }
    const currentIndex = thumbnailImages?.indexOf(currentImage);
    const previousIndex =
      currentIndex === 0 ? thumbnailImages.length - 1 : currentIndex - 1;
    setCurrentImage(thumbnailImages[previousIndex]);
  };

  const nextImage = () => {
    if (!currentImage || !thumbnailImages) {
      return;
    }
    const currentIndex = thumbnailImages.indexOf(currentImage);
    const nextIndex =
      currentIndex === thumbnailImages.length - 1 ? 0 : currentIndex + 1;
    setCurrentImage(thumbnailImages[nextIndex]);
  };

  return (
    <div className="flex md:flex-row  flex-col justify-between gap-4">
      <div className="w-full bg-[#FAF8F8] col-span-10 flex justify-center items-center p-5 mx-auto">
        <div className="relative md:w-[500px] md:h-[400px] w-[300px] h-[300px]">
          <Image
            src={
              currentImage?.media
                ? process.env.NEXT_PUBLIC_MEDIA_BASE_PATH! +
                  currentImage.media.path
                : IMAGE_PLACEHOLDER
            }
            alt={currentImage?.description}
            fill
          />
        </div>
      </div>
      {thumbnailImages && thumbnailImages?.length > 0 && (
        <div className="flex md:flex-col flex-row items-center justify-center">
          <button
            className="p-2 md:rotate-0 -rotate-90"
            onClick={previousImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transform rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div className="flex flex-col items-center justify-center">
            {thumbnailImages?.map((thumbnail, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentImage(thumbnail)}
                className="mb-3 border"
              >
                <Image
                  src={
                    thumbnail?.media
                      ? process.env.NEXT_PUBLIC_MEDIA_BASE_PATH! +
                        thumbnail.media.path
                      : IMAGE_PLACEHOLDER
                  }
                  width={50}
                  height={50}
                  className="rounded-lg"
                  alt=""
                />
              </button>
            ))}
          </div>
          <button
            className="p-2 md:mt-0 md:mb-0 md:rotate-0 -rotate-90"
            onClick={nextImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
