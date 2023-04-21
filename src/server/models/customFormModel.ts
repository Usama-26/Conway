import {TCustomForm} from '_types/types';
import {baseFindFirst, baseFind, excuteLicenseDBQuery} from '../db';
import {TJoin, TModel} from './types';
const tableName = 'custom_forms';
const columns = ['id', 'name', 'is_active', 'created_at', 'updated_at'];
const joins: TJoin[] = [];

const findFirst = async (where: string): Promise<any> => {
  return await baseFindFirst({
    licenseDb: true,
    query: `select * from custom_forms where ${where}`,
    values: [],
  });
};

const find = async (
  fields: string[] = [],
  where: string | null = null
): Promise<TCustomForm[] | null> => {
  let query = `select ${
    fields.length > 0 ? fields.join(',') : '*'
  } from form_fields `;
  if (where) {
    query += ` where ${where}`;
  }
  return await baseFind({
    licenseDb: true,
    query: query,
    values: [],
  });
};

const customFormModel: TModel & {
  findFirst: ({}: any) => Promise<any>;
  find: ({}: any) => Promise<any>;
} = {
  tableName,
  columns,
  findFirst,
  find,
};

export default customFormModel;
