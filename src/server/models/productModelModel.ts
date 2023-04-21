import {TJoin, TModel} from './types';

const tableName = 'product_models';
const columns = ['id', 'name', 'created_at', 'updated_at'];
const defaultCols = ['id', 'name'];
const joins: TJoin[] = [];

const productModelModel: TModel = {
  tableName,
  columns,
  defaultCols,
};
export default productModelModel;
