import {TJoin, TModel} from './types';

const tableName = 'types';
const columns = ['id', 'name', 'created_at', 'updated_at'];
const defaultCols = ['id', 'name'];
const joins: TJoin[] = [];

const typeModel: TModel = {
  tableName,
  columns,
  defaultCols,
};
export default typeModel;
