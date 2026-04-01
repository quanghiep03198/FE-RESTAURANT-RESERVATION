import { type infer as Infer } from 'zod'
import { baseDishSchema } from './base-dish.schema'

export const updateDishSchema = baseDishSchema.partial()

export type TUpdateDishSchema = typeof updateDishSchema

export type TUpdateDishValues = Infer<typeof updateDishSchema>
