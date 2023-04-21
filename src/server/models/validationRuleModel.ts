import {TValidationRule} from '_types/types';
import {baseFindFirst, baseFind} from '../db';
import {TJoin, TModel} from './types';
const tableName = 'validation_rules';
const columns = [
  'id',
  'description',
  'slug',
  'input',
  'message',
  'created_at',
  'updated_at',
];
const joins: TJoin[] = [];

const findFirst = async (where: string) => {
  return await baseFindFirst({
    licenseDb: true,
    query: `select * from ${tableName} where ${where}`,
    values: [1],
  });
};

const find = async ({where, fields}: {where: string; fields?: string[]}) => {
  let query = `select ${fields ? fields.join(', ') : '*'} from ${tableName} `;
  if (where) {
    query += ` where ${where}`;
  }
  console.log(query);
  return await baseFind({
    licenseDb: true,
    query: query,
    values: [],
  });
};

const findByFields = async ({form_field_ids}: {form_field_ids: number[]}) => {
  let query =
    `select ${tableName}.*, fr.form_field_id from ${tableName} ` +
    `inner join form_field_validation_rule fr on fr.validation_rule_id=${tableName}.id and fr.form_field_id IN(${form_field_ids.join(
      ','
    )})`;
  console.log(query);
  return await baseFind({
    licenseDb: true,
    query: query,
    values: [],
  });
};

const validationRuleModel: TModel & {
  findFirst: ({}: any) => Promise<any>;
  find: ({}: any) => Promise<any>;
  findByFields: ({}: any) => Promise<TValidationRule[]>;
} = {
  tableName,
  columns,
  findFirst,
  find,
  findByFields,
};
export default validationRuleModel;
