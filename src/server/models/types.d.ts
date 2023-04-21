export type TModel = {
  tableName: string;
  columns: string[];
  defaultCols?: string[];
  joins?: TJoin[];
};

export type TJoin = {
  type: string;
  table: string;
  as: string;
  on: string;
  fields: string[];
};
