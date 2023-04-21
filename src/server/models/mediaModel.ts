import {TMedia, TProductIdentifier} from '_types/types';
import {TJoin, TModel} from './types';
import {getJoinsString, getSelectFieldsString} from 'server/utils/db-helper';
import {baseFind} from 'server/db';

const tableName = 'medias';
const columns = [
  'id',
  'name',
  'url_id',
  'path',
  'extension',
  'media_directory_id',
  'restore_media_directory_id',
  'created_at',
  'updated_at',
];
const defaultCols = [
  'id',
  'name',
  'url_id',
  'path',
  'extension',
  'media_directory_id',
];
const joins: TJoin[] = [];

const find = async ({
  where,
  withJoins = [],
}: {
  where?: {product_ids?: number[]};
  withJoins?: string[];
}): Promise<TMedia[] | any[]> => {
  const fields = getSelectFieldsString(tableName, {
    cols: columns,
    joins,
    withJoins,
  });
  const joinsQuery = getJoinsString(joins, withJoins);
  let whereCond: string[] = [];

  if (where?.product_ids) {
    whereCond.push(
      `${tableName}.id IN (SELECT product_identifier_id from product_identifiers_rel where product_id IN (${where.product_ids.join(
        ','
      )})) `
    );
  }

  let query = `select ${fields} from ${tableName} ${joinsQuery} ${
    whereCond.length > 0 ? 'where ' + whereCond.join(' AND ') : ''
  }`;

  return await baseFind<TMedia[] | []>({
    licenseDb: true,
    query: query,
    values: [],
  });
};

const mediaModel: TModel & {
  find: ({
    where,
    withJoins = [],
  }: {
    where?: {product_ids?: number[]};
    withJoins?: string[];
  }) => Promise<TMedia[] | []>;
} = {
  tableName,
  columns,
  defaultCols,
  find,
};
export default mediaModel;
