import { nativeEnum, type infer as Infer } from 'zod'
import { CartStatus } from '../constants'
import { baseCartSchema } from './base-cart.schema'

export const updateCartSchema = baseCartSchema
	.pick({ items: true })
	.extend({ status: nativeEnum(CartStatus).optional() })

export type TUpdateCartValues = Infer<typeof updateCartSchema>
