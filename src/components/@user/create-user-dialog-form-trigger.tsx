import { CommonActions } from '@/common/constants/enums'
import { usePageContext } from '@/contexts/@user'
import { Plus } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import type { ButtonProps } from 'react-day-picker'
import { Button } from '../ui/button'

const CreateUserFormDialogTrigger: React.FC<ButtonProps> = (props) => {
	const { event$ } = usePageContext()

	return (
		<Button {...props} onClick={() => event$.emit({ action: CommonActions.CREATE })}>
			<HugeiconsIcon icon={Plus} />
			Thêm người dùng
		</Button>
	)
}

export default CreateUserFormDialogTrigger
