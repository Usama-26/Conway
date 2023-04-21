import {
  TModuleMediaRel,
  TProductIdentifier,
  TProductIdentifierRel,
} from '_types/types';
import {TJoin, TModel} from './types';
import {getJoinsString, getSelectFieldsString} from 'server/utils/db-helper';
import {baseFind} from 'server/db';
import mediaModel from './mediaModel';

const tableName = 'module_media_rel';
const columns = [
  'id',
  'record_id',
  'media_id',
  'module_id',
  'table_rel',
  'description',
  'default',
  'order',
  'created_at',
  'updated_at',
];
const defaultCols = [
  'id',
  'record_id',
  'media_id',
  'module_id',
  'table_rel',
  'description',
  'default',
  'order',
];

const joins: {[key: string]: TJoin} = {
  media: {
    type: 'INNER',
    table: mediaModel.tableName,
    as: 'media',
    on: `media.id=${tableName}.media_id`,
    fields: mediaModel.defaultCols!,
  },
};

const find = async ({
  where,
  withJoins = [],
}: {
  where: {
    record_id: number;
    table_rel: string;
    ext_not?: string[];
    ext?: string[];
    default_image?: boolean;
  };
  withJoins?: string[];
}): Promise<TModuleMediaRel[] | any[]> => {
  const fields = getSelectFieldsString(tableName, {
    cols: columns,
    joins: Object.values(joins),
    withJoins,
  });
  const joinsQuery = getJoinsString(Object.values(joins), withJoins);

  let whereCond: string[] = [];
  whereCond.push(`${tableName}.record_id=${where.record_id}`);
  whereCond.push(`${tableName}.table_rel='${where.table_rel}'`);

  if (where.ext_not) {
    whereCond.push(
      `${joins.media.as}.extension NOT IN('${where.ext_not.join("','")}')`
    );
  }

  if (where.ext) {
    whereCond.push(
      `${joins.media.as}.extension IN('${where.ext.join("','")}')`
    );
  }

  if (where.default_image) {
    whereCond.push(`${tableName}.default=1`);
  }

  let query = `select ${fields} from ${tableName} ${joinsQuery} ${
    whereCond.length > 0 ? 'where ' + whereCond.join(' AND ') : ''
  } order by ${tableName}.\`order\``;

  return await baseFind<TModuleMediaRel[] | []>({
    licenseDb: true,
    query: query,
    values: [],
  });
};

const moduleMediaRelModel: TModel & {
  find: ({
    where,
    withJoins = [],
  }: {
    where: {
      record_id: number;
      table_rel: string;
      ext_not?: string[];
      ext?: string[];
      default_image?: boolean;
    };
    withJoins?: string[];
  }) => Promise<TModuleMediaRel[] | []>;
} = {
  tableName,
  columns,
  defaultCols,
  find,
};
export default moduleMediaRelModel;
