import { CommonActions } from '@/common/constants/enums'
import { usePageContext } from '@/contexts/event-context'
import React from 'react'
import { Button, type ButtonProps } from '../ui/button'
import { Icon } from '../ui/icon'

const CategoryFormDialogTrigger: React.FC<ButtonProps> = (props) => {
	const { event$ } = usePageContext()

	return (
		<Button {...props} onClick={() => event$.emit({ action: CommonActions.CREATE })}>
			<Icon name='Plus' /> Thêm danh mục mới
		</Button>
	)
}

export default CategoryFormDialogTrigger
