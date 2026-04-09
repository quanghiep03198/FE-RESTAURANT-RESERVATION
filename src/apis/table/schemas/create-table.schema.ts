import { type infer as Infer } from 'zod'
import { baseTableSchema } from './base-table.schema'

export const createTableSchema = baseTableSchema.required({ name: true, capacity: true })

export type TCreateTableSchema = typeof createTableSchema

export type TCreateTableValues = Infer<typeof createTableSchema>
