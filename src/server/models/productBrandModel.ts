import {TJoin, TModel} from './types';

const tableName = 'product_brands';
const columns = ['id', 'name', 'created_at', 'updated_at'];
const defaultCols = ['id', 'name'];
const joins: TJoin[] = [];

const productBrandModel: TModel = {
  tableName,
  columns,
  defaultCols,
};
export default productBrandModel;
