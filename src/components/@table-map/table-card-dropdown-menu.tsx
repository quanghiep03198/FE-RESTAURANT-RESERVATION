import { useGetCartByTableQuery } from '@/apis/cart/hooks/use-cart-request'
import {
	useCreateTableSessionMutation,
	useEndTableSessionMutation
} from '@/apis/table-session/hooks/use-table-session-request'
import { TableStatus } from '@/apis/table/constants'
import { useDeleteTableMutation } from '@/apis/table/hooks/use-table-request'
import type { ITableCardData } from '@/apis/table/types'
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

const TableCardDropdownMenu: React.FC<{ data: ITableCardData }> = ({ data }) => {
	const [open, setOpen] = useState(false)
	const { mutateAsync: deleteAsync, isPending: isDeletingTable } = useDeleteTableMutation()
	const { mutateAsync: createSessionAsync, isPending: isCreatingSession } = useCreateTableSessionMutation()
	const { mutateAsync: destroySessionAsync, isPending: isDestroyingSession } = useEndTableSessionMutation()
	const { event$ } = usePageContext()
	const { data: cartData, isLoading: isLoadingCartData } = useGetCartByTableQuery(data?.cart_id)

	const isPending = isCreatingSession || isDestroyingSession || isDeletingTable
	console.log('data', data)

	return (
		<RoleBaseAccessControl authorizedRoles={['OWNER', 'MANAGER']}>
			<DropdownMenu open={open || isPending} onOpenChange={setOpen}>
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
							onClick={async (e) => {
								e.stopPropagation()

								await createSessionAsync({
									table_id: data.id,
									guest_count: data.capacity,
									reservation_code: data.reservation_code
								})
							}}>
							Mở phiên phục vụ
						</DropdownMenuItem>
					)}
					{data.status === TableStatus.OCCUPIED && (
						<DropdownMenuItem
							disabled={isLoadingCartData || cartData?.item_list?.length > 0}
							onClick={async () => destroySessionAsync(data.session_id)}>
							Đóng phiên phục vụ
						</DropdownMenuItem>
					)}
					<DropdownMenuSeparator />
					<DropdownMenuItem
						disabled={data.status !== TableStatus.AVAILABLE}
						onClick={(e) => {
							e.stopPropagation()
							event$.emit({ action: CommonActions.UPDATE, payload: data })
						}}>
						Cập nhật
					</DropdownMenuItem>
					<DropdownMenuItem
						disabled={isDeletingTable || data.status !== TableStatus.AVAILABLE}
						onClick={async (e) => {
							e.stopPropagation()
							deleteAsync(data.slug)
						}}>
						{isDeletingTable && <Spinner />}
						Xóa
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</RoleBaseAccessControl>
	)
}

export default TableCardDropdownMenu
