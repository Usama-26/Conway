import {TToken} from '_types/types';
import {
  baseFindFirst,
  baseFind,
  baseCreateRecord,
  baseDeleteRecord,
} from '../db';
import {TModel} from './types';
import bcrypt from 'bcrypt';
import {sendMail} from 'server/mail';

const tableName = 'customer_password_resets';
const columns = ['email', 'token', 'created_at'];
const joins: any[] = [];

const findFirst = async (where: string): Promise<any> => {
  return await baseFindFirst({
    licenseDb: true,
    query: `select * from ${tableName} where ${where}`,
    values: [],
  });
};

const create = async (email: string) => {
  const data = {
    email,
    token: bcrypt.hashSync('', bcrypt.genSaltSync()),
  };
  console.log('data', data);
  const result = await baseCreateRecord({
    licenseDb: true,
    table: tableName,
    data,
    updated_at: false,
  });
  if (result) return await findFirst(`email='${email}' AND token='${data.token}'`);
  return null;
};

const deleteRecord = async (where: string): Promise<boolean | null> => {
  return await baseDeleteRecord({
    licenseDb: true,
    table: tableName,
    where: where,
  });
};

const customerPasswordResetModel: TModel & {
  create: ({}: any) => Promise<TToken | null>;
  findFirst: ({}: any) => Promise<any>;
  deleteRecord: (where: string) => Promise<boolean | null>;
} = {
  tableName,
  columns,
  create,
  findFirst,
  deleteRecord,
};

export default customerPasswordResetModel;
