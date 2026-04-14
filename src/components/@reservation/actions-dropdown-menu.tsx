import { ReservationStatus } from '@/apis/reservation/constants'
import {
	useCreateOrUpdateReservationMutation,
	useDeleteReservationMutation
} from '@/apis/reservation/hooks/use-reservation-request'
import type { TUpdateReservationValues } from '@/apis/reservation/schemas/update-reservation.schema'
import type { IReservation } from '@/apis/reservation/types'
import { CommonActions } from '@/common/constants/enums'
import { usePageContext } from '@/contexts/event-context'
import type { CellContext } from '@tanstack/react-table'
import { useState } from 'react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Icon } from '../ui/icon'
import { Spinner } from '../ui/spinner'

const ReservationActionsDropdownMenu: React.FC<CellContext<IReservation, void>> = ({ row }) => {
	const { event$ } = usePageContext()
	const { mutateAsync: cancelReservationAsync, isPending: isCancelling } = useDeleteReservationMutation()
	const { mutateAsync: updateReservationAsync, isPending: isChangingStatus } = useCreateOrUpdateReservationMutation(
		CommonActions.UPDATE
	)
	const [open, setOpen] = useState<boolean>(false)

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger
					disabled={row.original.status === ReservationStatus.CANCELED}
					render={
						<Button variant='ghost' size='icon-sm'>
							<Icon name='Ellipsis' />
						</Button>
					}
				/>
				<DropdownMenuContent className='w-40'>
					<DropdownMenuGroup>
						<DropdownMenuItem
							onClick={() => event$.emit({ action: CommonActions.UPDATE, payload: row.original })}>
							Cập nhật
						</DropdownMenuItem>
						{row.original.status === ReservationStatus.PENDING && (
							<DropdownMenuItem
								disabled={isChangingStatus}
								onClick={async () =>
									updateReservationAsync({
										reservation_code: row.original.reservation_code,
										isConfirmed: true
									} as TUpdateReservationValues)
								}>
								Xác nhận đặt bàn
							</DropdownMenuItem>
						)}
						<DropdownMenuItem onClick={() => setOpen(true)}>Hủy đặt bàn</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialog open={open || isCancelling} onOpenChange={setOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogMedia className='bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive'>
							<Icon name='Trash2' />
						</AlertDialogMedia>
						<AlertDialogTitle>Hủy đặt bàn?</AlertDialogTitle>
						<AlertDialogDescription>
							Vui lòng xác nhận lại với khách hàng trước khi thực thao tác hủy đặt bàn.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel variant='outline'>Bỏ qua</AlertDialogCancel>
						<AlertDialogAction
							variant='destructive'
							disabled={isCancelling}
							onClick={async () =>
								await cancelReservationAsync(row.original.reservation_code).then(() => setOpen(false))
							}>
							{isCancelling && <Spinner />}
							Xác nhận hủy
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

export default ReservationActionsDropdownMenu
