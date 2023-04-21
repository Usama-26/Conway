import {getJoinsString, getSelectFieldsString} from 'server/utils/db-helper';
import {baseFindFirst, baseFind, baseCreateRecord} from '../db';
import {TJoin, TModel} from './types';
import customerModel from './customerModel';
import {TOrder} from '_types';

const tableName = 'orders';
const columns = [
  'id',
  'customer_id',
  'module_id',
  'status_is',
  'created_by',
  'modified_by',
  'created_at',
  'updated_at',
];

const defaultCols = ['id', 'customer_id', 'module_id', 'status_is'];

const joins: {[key: string]: TJoin} = {
  customer: {
    type: 'INNER',
    table: customerModel.tableName,
    as: 'customer',
    on: `customer.id=${tableName}.customer_id`,
    fields: customerModel.defaultCols!,
  },
  // module: {
  //   type: 'LEFT',
  //   table: moduleModel.tableName,
  //   as: 'module',
  //   on: `module.id=${tableName}.module_id`,
  //   fields: productTypeModel.defaultCols!,
  // },
  // status: {
  //   type: 'LEFT',
  //   table: productBrandModel.tableName,
  //   as: 'status',
  //   on: `status.id=${tableName}.status_is`,
  //   fields: productBrandModel.defaultCols!,
  // },
};

const findFirst = async ({
  where,
  withJoins = [],
}: {
  where: {id: number} | {slug: string};
  withJoins?: string[];
}) => {
  const fields = getSelectFieldsString(tableName, {
    cols: columns,
    joins: Object.values(joins),
    withJoins,
  });
  const joinsQuery = getJoinsString(Object.values(joins), withJoins);
  const whereCond: string[] = [];

  if ('id' in where) {
    whereCond.push(`${tableName}.id='${where.id}'`);
  } else if ('slug' in where) {
    whereCond.push(`${tableName}.slug='${where.slug}'`);
  }

  const query = `select ${fields} from ${tableName} ${joinsQuery} ${
    whereCond.length > 0 ? 'WHERE ' + whereCond.join(' AND ') : ''
  } limit 1`;
  console.log(query);
  const result = await baseFindFirst<TOrder>({
    licenseDb: true,
    query: query,
    values: [],
  });

  if (result) {
    if (withJoins.includes('products')) {
      result['products'] = await getOrderProducts(result);
    }
  }
  return result;
};

const find = async ({
  where,
  withJoins = [],
}: {
  where?: {};
  withJoins?: string[];
}): Promise<TOrder[]> => {
  const fields = getSelectFieldsString(tableName, {
    cols: columns,
    joins: Object.values(joins),
    withJoins,
  });
  const joinsQuery = getJoinsString(Object.values(joins), withJoins);
  const whereCond: string[] = where ? applyWhere(where) : [];

  const query = `select ${fields} from ${tableName} ${joinsQuery} ${
    whereCond.length > 0 ? 'where ' + whereCond.join(' AND ') : ''
  }`;

  const rows = await baseFind<TOrder>({
    licenseDb: true,
    query: query,
    values: [],
  });

  return rows;
};

const create = async (data: TOrder) => {
  const result = await baseCreateRecord({
    licenseDb: true,
    table: tableName,
    data,
  });
  let createdData: TOrder | null = null;
  if (result) {
    createdData = await findFirst({where: {id: result.insertId}});
  }
  return createdData;
};

const orderModel: TModel & {
  find: ({
    where,
    withJoins = [],
  }: {
    where?: {};
    withJoins?: string[];
  }) => Promise<TOrder[]>;
  create: (data: TOrder) => Promise<TOrder | null>;
} = {
  tableName,
  columns,
  defaultCols,
  find,
  create,
};
export default orderModel;

const applyWhere = (where: {}) => {
  const whereCond: string[] = [];
  return whereCond;
};

const getOrderProducts = async (order: TOrder) => {
  const {default: orderProductsRelModel} = await import(
    './orderProductsRelModel'
  );
  return await orderProductsRelModel.find({
    selectCols: orderProductsRelModel.defaultCols!,
    where: {order_id: order.id},
    withJoins: ['product', 'pp'],
  });
};
