import { type infer as Infer } from 'zod'
import { baseTableSchema } from './base-table.schema'

export const updateTableSchema = baseTableSchema.partial()

export type TUpdateTableSchema = typeof updateTableSchema

export type TUpdateTableValues = Infer<typeof updateTableSchema>
