import { useCreateTableSessionMutation } from '@/apis/table-session/hooks/use-table-session-request'
import { TableStatus } from '@/apis/table/constants'
import { useDeleteTableMutation } from '@/apis/table/hooks/use-table-request'
import type { ITable } from '@/apis/table/types'
import { CommonActions } from '@/common/constants/enums'
import { usePageContext } from '@/contexts/event-context'
import RoleBaseAccessControl from '@/guards/role-base-access-control'
import { useState } from 'react'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Icon } from '../ui/icon'
import { Spinner } from '../ui/spinner'

const TableCardDropdownMenu: React.FC<{ data: ITable }> = ({ data }) => {
	const [open, setOpen] = useState(false)
	const { mutateAsync: deleteAsync, isPending: isDeleting } = useDeleteTableMutation()
	const { mutateAsync: createSessionAsync } = useCreateTableSessionMutation()
	// const { mutateAsync: updateSessionAsync, isPending: isUpdatingSession } = useUpdateTableSessionMutation()
	const { event$ } = usePageContext()

	return (
		<RoleBaseAccessControl authorizedRoles={['OWNER', 'MANAGER']}>
			<DropdownMenu open={open || isDeleting} onOpenChange={setOpen}>
				<DropdownMenuTrigger
					className='absolute top-2 right-2 z-10'
					onClick={(e) => e.stopPropagation()}
					render={
						<Button variant='outline' size='icon-xs'>
							<Icon name='Ellipsis' />
						</Button>
					}
				/>
				<DropdownMenuContent className='w-44'>
					{(data.status === TableStatus.AVAILABLE || data.status === TableStatus.RESERVED) && (
						<DropdownMenuItem
							onClick={async () =>
								await createSessionAsync({
									table_id: data.id,
									guest_count: data.capacity
								})
							}>
							Mở phiên phục vụ
						</DropdownMenuItem>
					)}
					{/* {data.status === TableStatus.OCCUPIED && <DropdownMenuItem onClick={}>Đóng phiên phục vụ</DropdownMenuItem>} */}
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={(e) => {
							e.stopPropagation()
							event$.emit({ action: CommonActions.UPDATE, payload: data })
						}}>
						Cập nhật
					</DropdownMenuItem>
					<DropdownMenuItem
						disabled={isDeleting}
						onClick={async (e) => {
							e.stopPropagation()
							deleteAsync(data.slug)
						}}>
						{isDeleting && <Spinner />}
						Xóa
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</RoleBaseAccessControl>
	)
}

export default TableCardDropdownMenu
