import { baseFindFirst, baseFind } from "../db"
import { TJoin, TModel } from "./types";
const tableName = 'translations'
const columns = [
    'id',
    'description',
    'word_id',
    'language_id',
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

const find = async ({ where, fields }: { where: string, fields?: string[] }) => {
    let query = `select ${fields ? fields.join(', ') : '*'} from ${tableName} `
    if (where) {
        query += ` where ${where}`
    }
    console.log(query)
    return await baseFind({
        licenseDb: true,
        query: query,
        values: [],
    });
}

const translationModel: TModel & {
    findFirst: ({ }: any) => Promise<any>
    find: ({ }: any) => Promise<any>
} = {
    tableName,
    columns,
    findFirst,
    find,
}
export default translationModel
