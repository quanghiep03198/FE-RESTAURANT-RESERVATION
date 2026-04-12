import type { infer as Infer } from 'zod'
import { baseReservationSchema } from './base-reservation.schema'

export const createReservationSchema = baseReservationSchema

export type TCreateReservationSchema = typeof createReservationSchema

export type TCreateReservationValues = Infer<typeof createReservationSchema>
