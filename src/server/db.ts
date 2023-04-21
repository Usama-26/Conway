import moment from 'moment';
import mysql from 'mysql2/promise';

import licenseModel from './models/licenseModel';
import {TJoin} from './models/types';
import {makeRelationObject} from './utils/db-helper';
import {makeSerializable} from './utils/helper';
const defaultConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: (process.env.DB_PORT as unknown as number) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const db = mysql.createPool({
  ...defaultConfig,
  ...{database: process.env.DB_DATABASE},
});
let licenseDb: any;

const joinFieldSeprator = '||';

// export const closeConn = async () => {
//   await licenseDb.end();
// };

// TODO: impplement it with session OR cookies to not fetch license in every page
export const setLicenseDB = async (host?: string) => {
  if (!host) return false;
  console.info('webUrl', host);
  // TODO: temp set host for localhost testing
  if (host === 'localhost:3333') {
    host = 'cmachines-dev1.zipcpq.com';
  }
  const license = await licenseModel.findLicense(host);
  console.log('lilicense', license?.id);
  if (!license) {
    return false;
  }

  try {
    licenseDb = mysql.createPool({
      ...defaultConfig,
      ...{database: process.env.LICENSE_DB_PREFIX + license.license},
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export async function excuteQuery<T = unknown>({
  query,
  values,
}: {
  query: string;
  values: any;
}) {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.execute(query, values);
    await connection.release();
    return rows;
  } catch (error) {
    console.error(error);
    return {error};
  }
}

export async function excuteLicenseDBQuery<T = unknown>({
  query,
  values,
}: {
  query: string;
  values: any;
}) {
  const connection = await licenseDb.getConnection();
  try {
    const [rows] = await connection.execute(query, values);
    await connection.release();
    return rows;
  } catch (error) {
    console.error(error);
    return {error};
  }
}

export const baseFind = async <T = any>({
  licenseDb,
  query,
  values,
}: {
  licenseDb?: boolean;
  query: string;
  values: any;
}): Promise<T[]> => {
  const results: any = licenseDb
    ? await excuteLicenseDBQuery({query, values})
    : await excuteQuery({query, values});
  if (results?.error) return [];
  return makeSerializable(results).map((row: any) => makeRelationObject(row));
};

export const baseFindFirst = async <T = any>({
  licenseDb,
  query,
  values,
}: {
  licenseDb?: boolean;
  query: string;
  values: any;
}): Promise<T | null> => {
  let firstQuery = query;
  if (!query.includes('limit')) {
    firstQuery += ` limit 1`;
  }
  let results: any = licenseDb
    ? await excuteLicenseDBQuery({query: firstQuery, values})
    : await excuteQuery({query: firstQuery, values});

  if (results?.error) return null;

  if (results && Array.isArray(results) && results.length > 0)
    return makeSerializable(results).map(row =>
      makeRelationObject(row)
    )[0] as T;
  return null;
};

export const getQueryFields = (joins: TJoin[]) => {
  let queryFields: string[] = [];

  joins.forEach(join => {
    queryFields.push(
      join.fields
        .map(
          col => `${join.as}.${col} as '${join.as}${joinFieldSeprator}${col}'`
        )
        .join(', ')
    );
  });

  return queryFields.join(', ');
};

export const getResutWithJoins = (data: any[]) => {
  return data.map(row => {
    let dataRow: any = {};
    Object.keys(row).forEach(field => {
      if (field.includes(joinFieldSeprator)) {
        let fieldArr = field.split(joinFieldSeprator); //[tablename, field]
        dataRow[fieldArr[0]] = {
          ...(dataRow[fieldArr[0]] || {}), // checking prev. object if not add blank {}
          ...{[fieldArr[1]]: row[field]}, // adding firld key : value
        };
      } else dataRow[field] = row[field]; // assign same table field and value
    });
    return dataRow;
  });
};

export const baseCreateRecord = async ({
  licenseDb,
  table,
  data,
  created_at = true,
  updated_at = true,
}: {
  licenseDb?: boolean;
  table: string;
  data: any;
  created_at?: boolean;
  updated_at?: boolean;
}) => {
  data['created_at'] = moment().format();
  data['updated_at'] = moment().format();
  if (!created_at) delete data.created_at;
  if (!updated_at) delete data.updated_at;

  let query = `INSERT into ${table} (${Object.keys(data).join(
    ', '
  )}) values(${Object.values(data)
    .map(_ => '?')
    .join(', ')})`;
  let results: any = licenseDb
    ? await excuteLicenseDBQuery({query, values: Object.values(data)})
    : await excuteQuery({query, values: Object.values(data)});
  if (results?.error) return null;
  return makeSerializable(results);
};

export const baseCreateManyRecord = async ({
  licenseDb,
  table,
  data,
  created_at = true,
  updated_at = true,
}: {
  licenseDb?: boolean;
  table: string;
  data: any[];
  created_at?: boolean;
  updated_at?: boolean;
}) => {
  if (data.length === 0) return 0;
  // fields = data
  // data.map(item => {});
  // data['created_at'] = moment().format();
  // data['updated_at'] = moment().format();
  // if (!created_at) delete data.created_at;
  // if (!updated_at) delete data.updated_at;

  let query = `INSERT into ${table} (${Object.keys(data).join(
    ', '
  )}) values(${Object.values(data)
    .map(_ => '?')
    .join(', ')})`;
  let results: any = licenseDb
    ? await excuteLicenseDBQuery({query, values: Object.values(data)})
    : await excuteQuery({query, values: Object.values(data)});
  if (results?.error) return null;
  return makeSerializable(results);
};

export const baseUpdateRecord = async ({
  licenseDb,
  table,
  data,
  where = '',
  updated_at = true,
}: {
  licenseDb?: boolean;
  table: string;
  data: any;
  where: string;
  updated_at?: boolean;
}) => {
  data['updated_at'] = moment().format();
  if (!updated_at) delete data.updated_at;

  const insertData = Object.keys(data).map(key => {
    return `${key}='${data[key]}'`;
  });
  let query = `UPDATE ${table} set ${insertData.join(', ')} where ${where}`;
  let results: any = licenseDb
    ? await excuteLicenseDBQuery({query, values: []})
    : await excuteQuery({query, values: []});
  if (results?.error) return null;
  return makeSerializable(results);
};

export const baseDeleteRecord = async ({
  licenseDb,
  table,
  where = '',
}: {
  licenseDb?: boolean;
  table: string;
  where: string;
}) => {
  if (where && where !== '') {
    let query = `DELETE from ${table} where ${where}`;
    let results: any = licenseDb
      ? await excuteLicenseDBQuery({query, values: []})
      : await excuteQuery({query, values: []});
    if (results?.error) return null;
    return true;
  }
  return false;
};

export const baseIsUnique = async ({
  licenseDb,
  table,
  field,
  value,
}: {
  licenseDb?: boolean;
  table: string;
  field: string;
  value: string;
}) => {
  let query = `select count(id) as count from ${table} where ${field}='${value}'`;
  let results: any = licenseDb
    ? await excuteLicenseDBQuery({query, values: []})
    : await excuteQuery({query, values: []});
  if (results?.error) return true; // unable to check unique
  return results[0].count > 0;
};
