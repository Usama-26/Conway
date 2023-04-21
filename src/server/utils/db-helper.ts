import {TJoin} from 'server/models/types';

export const getJoinsString = (joins: TJoin[], withJoins: string[]) => {
  let joinString = '';
  joins
    .filter(j => withJoins.includes(j.as))
    .forEach(join => {
      joinString += ` ${join.type} JOIN ${join.table} ${join.as} on ${join.on} `;
    });
  return joinString;
};

export const getSelectFieldsString = (
  table: string,
  extra?: {
    cols?: string[];
    joins?: TJoin[];
    withJoins?: string[];
  }
) => {
  let fields = extra?.cols
    ? extra.cols.map(col => `\`${table}\`.${col}`).join(', ')
    : `\`${table}\`.*`;
  if (extra?.joins) {
    const joinFields = getJoinsFields(extra.joins, extra.withJoins);
    fields +=
      joinFields !== ''
        ? `, ${getJoinsFields(extra.joins, extra.withJoins)}`
        : '';
  }

  return fields;
};

export const getJoinsFields = (joins: TJoin[], withJoins: string[] = []) => {
  if (withJoins.length === 0) return '';
  return joins
    .filter(j => withJoins.includes(j.as))
    .map(j =>
      j.fields.map(field => `${j.as}.${field} as \`${j.as}||${field}\``)
    )
    .join(', ');
};

export const makeRelationObject = (row: {[key: string]: any}) => {
  let newRow: {[key: string]: any} = {};
  Object.keys(row).map(key => {
    const keyArr = key.split('||');
    if (keyArr.length == 2) {
      if (row[`${keyArr[0]}||id`]) {
        newRow = {
          ...newRow,
          ...{
            [keyArr[0]]: newRow[keyArr[0]]
              ? {...newRow[keyArr[0]], ...{[keyArr[1]]: row[key]}}
              : {[keyArr[1]]: row[key]},
          },
        };
      } else {
        newRow[keyArr[0]] = null;
      }
    } else {
      newRow[key] = row[key];
    }
  });
  return newRow;
};
