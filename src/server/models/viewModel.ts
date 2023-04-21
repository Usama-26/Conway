import { baseFindFirst, baseFind } from "../db"
import { TJoin, TModel } from "./types";

const tableName = 'views'
const columns = [
    'id',
    'description',
    'route',
    'custom_form_id',
    'created_at',
    'updated_at',
]
const joins: TJoin[] = []

const findFirst = async (where: string) => {
    return await baseFindFirst({
        licenseDb: true,
        query: `select * from views where ${where}`,
        values: [1],
    });
}
const find = async ({ fields, where, joins }: { fields: string[], where: string, joins?: string[] }) => {
    let query = `select ${fields.length > 0 ? fields.join(',') : '*'} from views `
    // if(joins){
    //     if(joins.includes)
    // }
    if (where) {
        query += ` where ${where}`
    }
    return await baseFind({
        licenseDb: true,
        query: query,
        values: [],
    });
}

const viewModel: TModel & {
    findFirst: ({ }: any) => Promise<any>
    find: ({ }: any) => Promise<any>
} = {
    tableName,
    columns,
    findFirst,
    find,
}
export default viewModel
