import { type infer as Infer } from 'zod'
import { baseCartSchema } from './base-cart.schema'

export const createCartSchema = baseCartSchema

export type TCreateCartValues = Infer<typeof createCartSchema>
