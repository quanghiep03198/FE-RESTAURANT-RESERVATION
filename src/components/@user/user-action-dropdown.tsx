import { useUpdateUserStatusMutation } from '@/apis/user/hooks/use-user-request'
import type { IUser } from '@/apis/user/types'
import { CommonActions } from '@/common/constants/enums'
import { usePageContext } from '@/contexts/@user'
import type { CellContext } from '@tanstack/react-table'
import { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Icon } from '../ui/icon'
import { Spinner } from '../ui/spinner'

const UserActionDropdown: React.FC<CellContext<IUser, any>> = ({ row }) => {
	const { event$ } = usePageContext()
	const [open, setOpen] = useState<boolean>(false)

	const { mutateAsync, isPending } = useUpdateUserStatusMutation()

	return (
		<DropdownMenu open={open || isPending} onOpenChange={setOpen}>
			<DropdownMenuTrigger className='text-muted-foreground hover:text-foreground transition-colors duration-200 ease-in-out'>
				<Icon name='Ellipsis' />
			</DropdownMenuTrigger>
			<DropdownMenuContent side='left' align='start'>
				<DropdownMenuItem
					onClick={() =>
						event$.emit({
							action: CommonActions.UPDATE,
							payload: {
								...row.original,
								role_id: String(row.original.role.id)
							}
						})
					}>
					Cập nhật
				</DropdownMenuItem>
				<DropdownMenuItem
					disabled={isPending}
					onClick={async () => {
						await mutateAsync({
							id: row.original.id,
							is_active: !row.original.is_active
						})
					}}>
					{isPending && <Spinner />}
					{row.original.is_active ? 'Tạm khóa' : 'Mở khóa'}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserActionDropdown
