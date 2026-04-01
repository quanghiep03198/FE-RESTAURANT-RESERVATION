import { useUpdateCategoryStatusMutation } from '@/apis/menu/hooks/use-category-request'
import type { ICategory } from '@/apis/menu/types'
import { CommonActions } from '@/common/constants/enums'
import { usePageContext } from '@/contexts/event-context'
import type { CellContext } from '@tanstack/react-table'
import { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Icon } from '../ui/icon'
import { Spinner } from '../ui/spinner'

const CategoryActionDropdown: React.FC<CellContext<ICategory, any>> = ({ row }) => {
	const { event$ } = usePageContext()
	const [open, setOpen] = useState<boolean>(false)

	const { mutateAsync, isPending } = useUpdateCategoryStatusMutation()

	return (
		<DropdownMenu open={open || isPending} onOpenChange={setOpen}>
			<DropdownMenuTrigger className='text-muted-foreground hover:text-foreground transition-colors duration-200 ease-in-out'>
				<Icon name='Ellipsis' />
			</DropdownMenuTrigger>
			<DropdownMenuContent side='left' align='start' className='w-48'>
				<DropdownMenuItem
					onClick={() =>
						event$.emit({
							action: CommonActions.UPDATE,
							payload: row.original
						})
					}>
					Cập nhật
				</DropdownMenuItem>
				<DropdownMenuItem
					disabled={isPending}
					onClick={async () => {
						await mutateAsync({
							slug: row.original.slug,
							is_active: !row.original.is_active
						})
					}}>
					{isPending && <Spinner />}
					{row.original.is_active ? 'Ngừng kinh doanh' : 'Đưa vào kinh doanh'}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default CategoryActionDropdown
