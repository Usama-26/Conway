import {TJoin, TModel} from './types';

const tableName = 'product_part_colors';
const columns = ['id', 'hex', 'rgb', 'created_at', 'updated_at'];
const defaultCols = ['id', 'hex', 'rgb'];
const joins: TJoin[] = [];

const productPartColorModel: TModel = {
  tableName,
  columns,
  defaultCols,
};
export default productPartColorModel;
