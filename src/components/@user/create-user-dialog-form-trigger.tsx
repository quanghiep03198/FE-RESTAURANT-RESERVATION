import { CommonActions } from '@/common/constants/enums'
import { usePageContext } from '@/contexts/@user'
import type { ButtonProps } from 'react-day-picker'
import { Button } from '../ui/button'
import { Icon } from '../ui/icon'

const CreateUserFormDialogTrigger: React.FC<ButtonProps> = (props) => {
	const { event$ } = usePageContext()

	return (
		<Button {...props} onClick={() => event$.emit({ action: CommonActions.CREATE })}>
			<Icon name='Plus' />
			Thêm người dùng
		</Button>
	)
}

export default CreateUserFormDialogTrigger
