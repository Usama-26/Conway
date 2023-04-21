import Image from 'next/image';
import Link from 'next/link';
import {TCategory} from '_types/types';

interface ICatalogProps {
  categories: TCategory[];
}
export default function Catalog({categories}: ICatalogProps) {
  console.log(categories);
  return (
    <div>
      <h4 className="mt-0 pb-6">
        Choose a category to browse Conway product for that machine
      </h4>
      <div className="max-h-[750px] overflow-y-scroll overflow-x-hidden grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Card */}
        {categories.map(category => {
          return (
            <Link key={category.name} href={`/catalog/${category.slug}`}>
              <div className="p-2 rounded hover:bg-neutral-600/10 transition-transform duration-500 zoomUP">
                <div className="rounded border border-[#c0c0c0]">
                  <div className="relative h-36 bg-white rounded flex justify-center items-center ">
                    <Image
                      src={`${
                        category.category_media
                          ? process.env.NEXT_PUBLIC_MEDIA_BASE_PATH! +
                            category.category_media?.media?.path
                          : '/images/placeholder.png'
                      }`}
                      width={200}
                      height={120}
                      alt={category.category_media?.description || ''}
                      className={'h-full object-contain'}
                    />
                    <div className="overlay absolute flex w-full h-full top-0 left-0 items-center justify-center hover:bg-gray-100/50 transition duration-500">
                      <div className="rounded-full p-6 bg-yellow-700/75 transition-all duration-500  opacity-0">
                        <Image
                          src={'/icons/arrow-forward.png'}
                          width={40}
                          height={40}
                          alt={'Forward Link Arrow'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-700 py-1 text-black">
                    <h2 className="text-center uppercase">{category.name}</h2>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
