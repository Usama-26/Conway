import {Popover, Transition} from '@headlessui/react';
import {TCategory} from '_types/types';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {ChangeEvent, Fragment, useEffect, useState} from 'react';

interface ICatalogFilterProps {
  category: TCategory;
}
const CatalogFilter = ({category}: ICatalogFilterProps) => {
  const router = useRouter();
  const [checkedSlugs, setCheckedSlugs] = useState<string[]>(
    Array.isArray(router.query.sub_category)
      ? router.query.sub_category
      : router.query.sub_category
      ? [router.query.sub_category]
      : []
  );

  useEffect(() => {
    router.push({
      pathname: `/catalog/${category.slug}`,
      query: {sub_category: checkedSlugs},
    });
  }, [checkedSlugs]);

  const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    if (e.target.checked) {
      setCheckedSlugs([...checkedSlugs, ...[e.target.value]]);
    } else {
      setCheckedSlugs(
        checkedSlugs.filter(slug => slug !== e.target.value).map(id => id)
      );
    }
  };

  return (
    <>
      <Popover>
        {({open, close}) => (
          <>
            <Popover.Button className="inline-flex items-center gap-2 rounded-md border px-4 py-1 hover:text-black hover:border-black hover:bg-yellow-700">
              <Image
                src={'/icons/filter.png'}
                height={18}
                width={18}
                alt={'Filter Icon'}
              />
              <span>Filter</span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute bg-white z-10 max-w-sm px-6 py-4 rounded-md right-0 shadow border mt-2">
                <h3>Choose the model number of your Bobst die cutter</h3>

                <div className="flex flex-col flex-wrap max-h-56 my-4 ">
                  {category?.children?.map((variant: TCategory) => {
                    return (
                      <label
                        key={variant.id}
                        htmlFor={variant.slug}
                        className="inline-flex gap-2 py-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-2"
                          onChange={handleCheckBoxChange}
                          value={variant.slug}
                          // checked={checkedSlugs.includes(variant.slug)}
                          defaultChecked={
                            router.query.sub_category === variant.slug ||
                            router.query.sub_category?.includes(variant.slug)
                          }
                          id={variant.slug}
                        />
                        <span className="font-medium">{variant.name}</span>
                      </label>
                    );
                  })}
                </div>
                <button
                  onClick={() => close()}
                  className="px-10 float-right py-2 bg-[#5B5B5B] rounded-lg font-medium border border-transparent text-white hover:text-black text-lg hover:border-black hover:bg-white transition duration-200 -translate-y-4"
                >
                  Filter
                </button>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};
export default CatalogFilter;
