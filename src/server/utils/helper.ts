import {ClassValue, clsx} from 'clsx';
import categoryModel from 'server/models/categoryModel';
import {TJoin} from 'server/models/types';
import {twMerge} from 'tailwind-merge';
import {TCategory} from '_types/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Make an object serializable to JSON.
//
// Useful to convert an object which may contain non-serializeable data such as
// Dates to an object that doesn't
export function makeSerializable<T extends any>(o: T): T {
  return JSON.parse(JSON.stringify(o));
}

// export const getIntialSSRProps = async (): Promise<{
//   sidebarCategories: TCategory[];
// }> => {
//   return {
//     sidebarCategories: await categoryModel.getCategoriesHierarchy({}),
//   };
// };

export function getSlugFromHierarchy(record: {
  slug: string;
  children: any[];
  [key: string]: any;
}): string[] {
  let slugArr = [record.slug];
  record.children.forEach(item => {
    slugArr = [...slugArr, ...getSlugFromHierarchy(item)];
  });
  return slugArr;
}
