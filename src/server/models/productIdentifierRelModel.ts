import {TProductIdentifier, TProductIdentifierRel} from '_types/types';
import {TJoin, TModel} from './types';
import {getJoinsString, getSelectFieldsString} from 'server/utils/db-helper';
import {baseFind} from 'server/db';
import productIdentifierModel from './productIdentifierModel';

const tableName = 'product_identifiers_rel';
const columns = [
  'id',
  'product_identifier_id',
  'product_id',
  'value',
  'parent',
];
const defaultCols = ['id', 'product_identifier_id', 'product_id', 'value'];
const joins: TJoin[] = [
  {
    type: 'INNER',
    table: productIdentifierModel.tableName,
    as: 'pi',
    on: `pi.id=${tableName}.product_identifier_id`,
    fields: productIdentifierModel.defaultCols!,
  },
];

const find = async ({
  where,
  withJoins = [],
}: {
  where?: {product_ids?: number[]};
  withJoins?: string[];
}): Promise<TProductIdentifierRel[] | any[]> => {
  const fields = getSelectFieldsString(tableName, {
    cols: columns,
    joins,
    withJoins,
  });
  const joinsQuery = getJoinsString(joins, withJoins);
  let whereCond: string[] = [];

  if (where?.product_ids && (where?.product_ids?.length || 0) > 0) {
    whereCond.push(
      `${tableName}.product_id IN (${where.product_ids.join(',')}) `
    );
  }

  let query = `select ${fields} from ${tableName} ${joinsQuery} ${
    whereCond.length > 0 ? 'where ' + whereCond.join(' AND ') : ''
  }`;

  return await baseFind<TProductIdentifierRel[] | []>({
    licenseDb: true,
    query: query,
    values: [],
  });
};

const productIdentifierRelModel: TModel & {
  find: ({
    where,
    withJoins = [],
  }: {
    where?: {product_ids?: number[]};
    withJoins?: string[];
  }) => Promise<TProductIdentifierRel[] | []>;
} = {
  tableName,
  columns,
  defaultCols,
  find,
};
export default productIdentifierRelModel;
