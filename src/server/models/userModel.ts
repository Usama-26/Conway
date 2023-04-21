import {baseFindFirst, baseFind} from '../db';
import {TModel} from './types';
const tableName = 'users';
const columns = [
  'id',
  'first_name',
  'last_name',
  'email',
  'email_verified_at',
  'password',
  'company_id',
  'remember_token',
  'created_at',
  'created_at',
  'status',
  'locked',
];

const defaultCols = ['id', 'first_name', 'last_name', 'email'];
const joins: any[] = [];
const userModel: TModel = {
  tableName,
  columns,
  defaultCols
};
export default userModel;
