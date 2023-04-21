import {TJoin, TModel} from './types';
import {getJoinsString, getSelectFieldsString} from 'server/utils/db-helper';
import {baseCreateManyRecord, baseFind} from 'server/db';
import productModel from './productModel';
import {TOrderProductsRel} from '_types';

const tableName = 'order_products_rel';
const columns = [
  'id',
  'product_part_id',
  'product_id',
  'item_nu',
  'qty',
  'color',
  'description',
  'order_id',
  'oem',
  'cmi',
  'created_at',
  'updated_at',
];
const defaultCols = [
  'id',
  'product_part_id',
  'product_id',
  'item_nu',
  'qty',
  'color',
  'description',
  'order_id',
  'oem',
  'cmi',
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
};

const find = async ({
  selectCols,
  where,
  withJoins = [],
}: {
  selectCols?: string[];
  where: {order_id: number};
  withJoins?: string[];
}): Promise<TOrderProductsRel[]> => {
  const fields = getSelectFieldsString(tableName, {
    cols: selectCols || columns,
    joins: Object.values(joins),
    withJoins,
  });
  const joinsQuery = getJoinsString(Object.values(joins), withJoins);
  const whereCond: string[] = [];

  whereCond.push(`${tableName}.order_id=${where.order_id}`);

  const query = `select ${fields} from ${tableName} ${joinsQuery} ${
    whereCond.length > 0 ? 'where ' + whereCond.join(' AND ') : ''
  }`;

  return await baseFind<TOrderProductsRel>({
    licenseDb: true,
    query: query,
    values: [],
  });
};

const createMany = async (data: TOrderProductsRel[]) => {
  console.log({data});
  const result = await baseCreateManyRecord({
    licenseDb: true,
    table: tableName,
    data,
  });

  return result.affectedRows;
};

const orderProductsRelModel: TModel & {
  find: ({
    selectCols,
    where,
    withJoins = [],
  }: {
    selectCols?: string[];
    where: {order_id: number};
    withJoins?: string[];
  }) => Promise<TOrderProductsRel[]>;
} = {
  tableName,
  columns,
  defaultCols,
  find,
};
export default orderProductsRelModel;
