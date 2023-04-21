import { baseFindFirst, baseFind } from "../db"
import fieldModel from "./fieldModel"
import { TJoin, TModel } from "./types"

const tableName = 'form_fields'
const columns = [
    'id',
    'description',
    'input_type',
    'input_class',
    'parent_class',
    'db_column_type',
    'created_at',
    'updated_at',
]
const joins: TJoin[] = []

const findFirst = async () => {
    return await baseFindFirst({
        licenseDb: true,
        query: `select * from ${tableName} where custom_form_id=?`,
        values: [1],
    });
}
const find = async ({ where }: { where: string | null }) => {
    let fields = `ff.*, '||', ${joins.map((j) => (j.as && `${j.as}.*`) || (j.table && `${j.table}.*`)).join(',"||",')}`
    let query = `select ${fields} from form_fields as ff`
    joins.forEach((join) => {
        query += ` ${join.type} JOIN ${join.table} ${join.as} on ${join.on} `
    })

    if (where) {
        query += ` where ${where} `
    }
    query += ' order by `order` ASC'
    console.log(query)
    const result = await baseFind({
        licenseDb: true,
        query: query,
        values: [],
    });
    return result
}

const fieldTypeModel: TModel & {
    findFirst: ({ }: any) => Promise<any>
    find: ({ }: any) => Promise<any>
} = {
    tableName,
    columns,
    findFirst,
    find,
}
export default fieldTypeModel
