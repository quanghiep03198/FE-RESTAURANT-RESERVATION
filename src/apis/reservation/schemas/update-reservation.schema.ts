import type { infer as Infer } from 'zod'
import { baseReservationSchema } from './base-reservation.schema'

export const updateReservationSchema = baseReservationSchema.partial()

export type TUpdateReservationSchema = typeof updateReservationSchema

export type TUpdateReservationValues = Infer<typeof updateReservationSchema>
