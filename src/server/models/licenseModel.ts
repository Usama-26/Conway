import {baseFindFirst, baseFind} from '../db';
import {TJoin, TModel} from './types';

const tableName = 'licenses';
const columns = [
  'id',
  'description',
  'route',
  'custom_form_id',
  'created_at',
  'updated_at',
];

const findLicense = async (webUrl: string) => {
  return await baseFindFirst({
    query: `select * from ${tableName} where url='${webUrl}' AND status_id=1`,
    values: [],
  });
};

const licenseModel: TModel & {
  findLicense: ({}: any) => Promise<any>;
} = {
  tableName,
  columns,
  findLicense,
};
export default licenseModel;
