import {TJoin, TModel} from './types';

const tableName = 'product_types';
const columns = ['id', 'type', 'created_at', 'updated_at'];
const defaultCols = ['id', 'type'];
const joins: TJoin[] = [];

const productTypeModel: TModel = {
  tableName,
  columns,
  defaultCols,
};
export default productTypeModel;
