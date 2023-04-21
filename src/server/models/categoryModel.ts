import {getJoinsString, getSelectFieldsString} from 'server/utils/db-helper';
import {TCategory} from '_types/types';
import {baseFindFirst, baseFind} from '../db';
import {TJoin, TModel} from './types';
import moduleMediaRelModel from './moduleMediaRelModel';
const tableName = 'categories';
const columns = [
  'id',
  'parent_id',
  'lft',
  'rgt',
  'depth',
  'name',
  'description',
  'image',
  'long_description',
  'active',
  'locked',
  'created_at',
  'updated_at',
  'slug',
];

const defaultCols = [
  'id',
  'parent_id',
  'name',
  'description',
  'image',
  'long_description',
  'active',
  'slug',
];

const joins: TJoin[] = [
  {
    type: 'LEFT',
    table: tableName,
    as: 'parent',
    on: `parent.id=${tableName}.parent_id AND parent.locked=0`,
    fields: defaultCols!,
  },
];

const findFirst = async ({
  where,
  withJoins = [],
}: {
  where?: {slug?: string};
  withJoins?: string[];
}): Promise<any> => {
  const fields = getSelectFieldsString(tableName, {
    cols: columns,
    joins,
    withJoins,
  });
  const joinsQuery = getJoinsString(joins, withJoins);
  const whereCond: string[] = [];

  if (where?.slug) {
    whereCond.push(`${tableName}.slug='${where.slug}'`);
  }

  let query = `select ${fields} from ${tableName} ${joinsQuery} ${
    whereCond.length > 0 ? 'WHERE ' + whereCond.join(' AND ') : ''
  } limit 1`;
  console.log(query);
  const result = await baseFindFirst<TCategory>({
    licenseDb: true,
    query: query,
    values: [],
  });

  if (result) {
    if (withJoins.includes('children')) {
      result['children'] = await getCategoriesHierarchy(result.id, [
        'id',
        'name',
        'slug',
        'parent_id',
      ]);
    }
  }

  return result;
};

const find = async ({
  selectCols,
  where,
  withJoins = [],
}: {
  selectCols?: string[];
  where?: {parent_id?: number; id_not?: number[]};
  withJoins?: string[];
}): Promise<TCategory[]> => {
  const fields = getSelectFieldsString(tableName, {
    cols: selectCols || columns,
    joins,
    withJoins,
  });

  const joinsQuery = getJoinsString(joins, withJoins);
  let whereCond = `WHERE ${tableName}.locked=0 AND ${tableName}.id!=1`;
  if (where?.parent_id)
    whereCond += ` AND ${tableName}.parent_id=${where?.parent_id}`;

  if (where?.id_not)
    whereCond += ` AND ${tableName}.id NOT IN (${where.id_not.join(',')})`;

  let query = `select ${fields} from ${tableName} ${joinsQuery} ${whereCond}`;

  const rows = await baseFind<TCategory>({
    licenseDb: true,
    query: query,
    values: [],
  });

  return await Promise.all(
    rows.map(async row => {
      if (withJoins.includes('category_media')) {
        const medias = await moduleMediaRelModel.find({
          where: {record_id: row.id, table_rel: tableName},
          withJoins: ['media'],
        });
        row['category_media'] = medias.length > 0 ? medias[0] : null
      }
      return row;
    })
  );
};

const getCategoriesHierarchy = async (
  categoryId?: number,
  selectCols?: string[]
): Promise<TCategory[]> => {
  const records = await find({
    selectCols,
    where: categoryId ? {id_not: [categoryId]} : undefined,
  });
  // let hierarchyRecords: TCategory[] = [];
  return records
    .filter(
      item =>
        (!categoryId && item.parent_id === 1) ||
        (categoryId && item.parent_id === categoryId)
    )
    .map(item => {
      return {
        ...item,
        ...{
          children: getChildren(item, records),
        },
      };
    });
};

const getChildren = (
  category: TCategory,
  allCategories: TCategory[]
): TCategory[] => {
  return allCategories
    .filter(item => item.parent_id === category.id)
    .map(item => {
      return {
        ...item,
        ...{
          children: getChildren(item, allCategories),
        },
      };
    });
};

const categoryModel: TModel & {
  findFirst: ({
    where,
    withJoins,
  }: {
    where?: {slug?: string};
    withJoins?: string[];
  }) => Promise<any>;
  find: ({
    selectCols,
    where,
    withJoins = [],
  }: {
    selectCols?: string[];
    where?: {};
    withJoins?: string[];
  }) => Promise<TCategory[] | []>;
  getCategoriesHierarchy: (categoryId?: number) => Promise<TCategory[]>;
} = {
  tableName,
  columns,
  findFirst,
  find,
  getCategoriesHierarchy,
};
export default categoryModel;
