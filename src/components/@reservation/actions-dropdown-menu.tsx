import { useDeleteReservationMutation } from '@/apis/reservation/hooks/use-reservation-request'
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
	const { mutateAsync, isPending } = useDeleteReservationMutation()
	const [open, setOpen] = useState<boolean>(false)

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger
					render={
						<Button variant='ghost' size='icon-sm'>
							<Icon name='Ellipsis' />
						</Button>
					}
				/>
				<DropdownMenuContent>
					<DropdownMenuGroup>
						<DropdownMenuItem>Cập nhật</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => event$.emit({ action: CommonActions.UPDATE, payload: row.original })}>
							Hủy đặt bàn
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialog open={open || isPending} onOpenChange={setOpen}>
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
							disabled={isPending}
							onClick={async () => await mutateAsync()}>
							{isPending && <Spinner />}
							Xác nhận hủy
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

export default ReservationActionsDropdownMenu
