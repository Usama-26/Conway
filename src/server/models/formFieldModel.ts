import {getJoinsString, getSelectFieldsString} from 'server/utils/db-helper';
import {TFormField} from '_types/types';
import {
  baseFindFirst,
  baseFind,
  getQueryFields,
  getResutWithJoins,
} from '../db';
import fieldModel from './fieldModel';
import fieldTypeModel from './fieldTypeModel';
import translationModel from './translationModel';
import {TJoin, TModel} from './types';
import validationRuleModel from './validationRuleModel';

const tableName = 'form_fields';
const columns = [
  'id',
  'field_id',
  'custom_form_id',
  'visible',
  'field_word_id',
  'table_word_id',
  'referenced_to',
  'order',
  'table_type_id',
  'created_at',
  'updated_at',
];
const joins: TJoin[] = [
  {
    type: 'LEFT',
    table: 'fields',
    as: 'field',
    on: 'field.id=form_fields.field_id',
    fields: fieldModel.columns,
  },
  {
    type: 'LEFT',
    table: 'field_types',
    as: 'ft',
    on: 'ft.id=field.field_type_id',
    fields: fieldTypeModel.columns,
  },
];

const findFirst = async () => {
  return await baseFindFirst({
    licenseDb: true,
    query: `select * from ${tableName} where custom_form_id=?`,
    values: [1],
  });
};

const find = async ({where}: {where: string | null}) => {
  const withJoins = ['field', 'ft'];
  const fields = getSelectFieldsString(tableName, {
    cols: columns,
    joins,
    withJoins,
  });
  const joinsQuery = getJoinsString(joins, withJoins);
  let query = `select ${fields} from ${tableName} ${joinsQuery}`;
  if (where) {
    query += ` where ${where} `;
  }
  query += ' order by `order` ASC';
  const result = await baseFind({
    licenseDb: true,
    query: query,
    values: [],
  });
  if (Array.isArray(result)) {
    const returnData: TFormField[] = getResutWithJoins(result);
    const wordIds = returnData.map(row => row.field.word_id);
    const fieldTranslations = await translationModel.find({
      where: `language_id=1 AND word_id IN('${wordIds.join("','")}')`,
    });
    const validationRules = await validationRuleModel.findByFields({
      form_field_ids: returnData.map(row => row.id),
    });
    return returnData.map(row => {
      row['field']['translation'] = fieldTranslations.find(
        (translation: any) => row.field.word_id == translation.word_id
      );
      row['validation_rules'] = validationRules.filter(
        (item: any) => row.id == item.form_field_id
      );
      return row;
    });
  }
  return result;
};

const formFieldModel: TModel & {
  findFirst: ({}: any) => Promise<any>;
  find: ({}: any) => Promise<any>;
} = {
  tableName,
  columns,
  findFirst,
  find,
};
export default formFieldModel;
