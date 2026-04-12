import { useCreateOrUpdateReservationMutation } from '@/apis/reservation/hooks/use-reservation-request'
import {
	createReservationSchema,
	type TCreateReservationSchema
} from '@/apis/reservation/schemas/create-reservation.schema'
import {
	updateReservationSchema,
	type TUpdateReservationSchema
} from '@/apis/reservation/schemas/update-reservation.schema'
import type { IReservation } from '@/apis/reservation/types'
import { CommonActions } from '@/common/constants/enums'
import { usePageContext } from '@/contexts/event-context'
import { useRef, useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import ReservationForm from './reservation-form'

const ReservationFormDialog: React.FC = () => {
	const [action, setAction] = useState<CommonActions.CREATE | CommonActions.UPDATE>(null)
	const [open, setOpen] = useState<boolean>(false)
	const [defaultValues, setDefaultValues] = useState<
		| Pick<
				IReservation,
				| 'customer_name'
				| 'customer_phone'
				| 'guest_count'
				| 'reservation_time'
				| 'table_code'
				| 'deposit_amount'
				| 'remark'
		  >
		| undefined
	>(undefined)
	const { event$ } = usePageContext()
	const formSchemaRef = useRef<TCreateReservationSchema | TUpdateReservationSchema>(null)
	const mutation = useCreateOrUpdateReservationMutation(action)

	event$.useSubscription((e) => {
		if (e.action !== CommonActions.CREATE && e.action !== CommonActions.UPDATE) return
		setAction(e.action)
		setOpen(true)
		if (e.action === CommonActions.CREATE) {
			formSchemaRef.current = createReservationSchema
		} else {
			setDefaultValues(e.payload)
			formSchemaRef.current = updateReservationSchema
		}
	})

	return (
		<Dialog open={open || mutation.isPending} onOpenChange={setOpen}>
			<DialogContent className='max-h-[90vh] max-w-4xl overflow-auto'>
				<ReservationForm action={action} defaultValues={defaultValues} mutation={mutation} />
			</DialogContent>
		</Dialog>
	)
}

export default ReservationFormDialog
