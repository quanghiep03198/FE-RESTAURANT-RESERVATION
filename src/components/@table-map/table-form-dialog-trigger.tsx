import { CommonActions } from '@/common/constants/enums'
import { cn } from '@/common/utils/cn'
import { usePageContext } from '@/contexts/event-context'
import useMediaQuery from '@/hooks/use-media-query'
import React from 'react'
import { Button, type ButtonProps } from '../ui/button'
import { Icon } from '../ui/icon'

const TableFormDialogTrigger: React.FC<ButtonProps> = ({ className, ...props }) => {
	const { event$ } = usePageContext()
	const isMobile = useMediaQuery('(max-width: 920px)')

	return (
		<Button
			{...props}
			size={isMobile ? 'sm' : 'default'}
			className={cn('ml-auto', className)}
			onClick={() => event$.emit({ action: CommonActions.CREATE })}>
			<Icon name='Plus' /> Thêm bàn
		</Button>
	)
}

export default TableFormDialogTrigger
