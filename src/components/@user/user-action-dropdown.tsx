import { useUpdateUserStatusMutation } from '@/apis/user/hooks/use-user-req'
import type { IUser } from '@/apis/user/types'
import { CommonActions } from '@/common/constants/enums'

import { usePageContext } from '@/contexts/@user'
import { Ellipsis } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { CellContext } from '@tanstack/react-table'
import { pick } from 'lodash-es'
import { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Spinner } from '../ui/spinner'

const UserActionDropdown: React.FC<CellContext<IUser, unknown>> = ({ row }) => {
	const { event$ } = usePageContext()
	const [open, setOpen] = useState<boolean>(false)

	const { mutateAsync, isPending } = useUpdateUserStatusMutation()

	return (
		<DropdownMenu open={open || isPending} onOpenChange={setOpen}>
			<DropdownMenuTrigger className='text-muted-foreground hover:text-foreground transition-colors duration-200 ease-in-out'>
				<HugeiconsIcon icon={Ellipsis} size={14} />
			</DropdownMenuTrigger>
			<DropdownMenuContent side='left' align='start'>
				<DropdownMenuItem
					onClick={() =>
						event$.emit({
							action: CommonActions.UPDATE,
							payload: pick(row.original, [
								'username',
								'display_name',
								'email',
								'employee_code',
								'roles',
								'authorized_factory_codes'
							])
						})
					}>
					Cập nhật
				</DropdownMenuItem>
				<DropdownMenuItem
					disabled={isPending}
					onClick={async () => {
						await mutateAsync({ id: row.original.id, is_active: !row.original.is_active })
					}}>
					{isPending && <Spinner />}
					{row.original.is_active ? 'Tạm khóa' : 'Mở khóa'}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserActionDropdown
