import { baseFindFirst, baseFind } from "../db"
import { TModel } from "./types"
// interface FormFieldModel {
//     tableName: string
//     findFirst: () => {}
//     find: () => {}
// }
const tableName = 'form_fields'
const columns = [
    'id',
    'slug',
    'table_model',
    'word_id',
    'referenced_to',
    'field_type_id',
    'table_type_id',
    'created_at',
    'updated_at',
]
const joins: any[] = []
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

const fieldModel: TModel & {
    findFirst: ({ }: any) => Promise<any>
    find: ({ }: any) => Promise<any>
} = {
    tableName,
    columns,
    findFirst,
    find,
}
export default fieldModel
