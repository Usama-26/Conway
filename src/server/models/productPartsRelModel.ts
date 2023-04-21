import {TProductPartsRel} from '_types/types';
import {TJoin, TModel} from './types';
import {getJoinsString, getSelectFieldsString} from 'server/utils/db-helper';
import {baseFind} from 'server/db';
import productModel from './productModel';
import productPartColorModel from './productPartColorModel';

const tableName = 'product_parts_rel';
const columns = [
  'id',
  'product_part_id',
  'product_id',
  'item_nu',
  'qty',
  'color_id',
  'description',
  'created_by',
  'modified_by',
  'created_at',
  'updated_at',
];
const defaultCols = [
  'id',
  'product_part_id',
  'product_id',
  'item_nu',
  'qty',
  'color_id',
  'description',
];

const joins: {[key: string]: TJoin} = {
  product: {
    type: 'INNER',
    table: productModel.tableName,
    as: 'product',
    on: `product.id=${tableName}.product_id`,
    fields: productModel.defaultCols!,
  },
  pp: {
    type: 'LEFT',
    table: productModel.tableName,
    as: 'pp',
    on: `pp.id=${tableName}.product_part_id`,
    fields: ['id', 'title', 'slug'],
  },
  pp_color: {
    type: 'LEFT',
    table: productPartColorModel.tableName,
    as: 'pp_color',
    on: `pp_color.id=${tableName}.color_id`,
    fields: productPartColorModel.defaultCols!,
  },
};

const find = async ({
  selectCols,
  where,
  withJoins = [],
}: {
  selectCols?: string[];
  where: {product_id: number};
  withJoins?: string[];
}): Promise<TProductPartsRel[] | any[]> => {
  const fields = getSelectFieldsString(tableName, {
    cols: selectCols || columns,
    joins: Object.values(joins),
    withJoins,
  });
  const joinsQuery = getJoinsString(Object.values(joins), withJoins);
  let whereCond: string[] = [];

  whereCond.push(`${tableName}.product_id=${where.product_id}`);

  let query = `select ${fields} from ${tableName} ${joinsQuery} ${
    whereCond.length > 0 ? 'where ' + whereCond.join(' AND ') : ''
  }`;

  return await baseFind<TProductPartsRel[]>({
    licenseDb: true,
    query: query,
    values: [],
  });
};

const productPartsRelModel: TModel & {
  find: ({
    selectCols,
    where,
    withJoins = [],
  }: {
    selectCols?: string[];
    where: {product_id: number};
    withJoins?: string[];
  }) => Promise<TProductPartsRel[]>;
} = {
  tableName,
  columns,
  defaultCols,
  find,
};
export default productPartsRelModel;
