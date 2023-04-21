import {TModuleMediaRel} from '_types/types';
import {TJoin, TModel} from './types';
import {getJoinsString, getSelectFieldsString} from 'server/utils/db-helper';
import {baseFind} from 'server/db';
import mediaModel from './mediaModel';
import productModel from './productModel';

const tableName = 'product_related';
const columns = [
  'id',
  'product_id',
  'rel_product_id',
  'created_at',
  'updated_at',
];
const defaultCols = ['id', 'product_id', 'rel_product_id'];
const joins: TJoin[] = [
  {
    type: 'INNER',
    table: productModel.tableName,
    as: 'product',
    on: `product.id=${tableName}.rel_product_id`,
    fields: productModel.defaultCols!,
  },
];

const find = async ({
  where,
  withJoins = [],
}: {
  where: {product_id: number};
  withJoins?: string[];
}): Promise<TModuleMediaRel[] | any[]> => {
  const fields = getSelectFieldsString(tableName, {
    cols: columns,
    joins,
    withJoins,
  });
  const joinsQuery = getJoinsString(joins, withJoins);

  let whereCond: string[] = [];
  whereCond.push(`${tableName}.product_id=${where.product_id}`);

  let query = `select ${fields} from ${tableName} ${joinsQuery} ${
    whereCond.length > 0 ? 'where ' + whereCond.join(' AND ') : ''
  }`;

  return await baseFind<TModuleMediaRel[] | []>({
    licenseDb: true,
    query: query,
    values: [],
  });
};

const productRelatedModel: TModel & {
  find: ({
    where,
    withJoins = [],
  }: {
    where: {product_id: number};
    withJoins?: string[];
  }) => Promise<TModuleMediaRel[] | []>;
} = {
  tableName,
  columns,
  defaultCols,
  find,
};
export default productRelatedModel;
