import { CommonActions } from '@/common/constants/enums'
import { usePageContext } from '@/contexts/event-context'
import { Button } from '../ui/button'
import { DialogTrigger } from '../ui/dialog'
import { Icon } from '../ui/icon'

const ComboFormDialogTrigger = () => {
	const { event$ } = usePageContext()

	return (
		<DialogTrigger
			render={
				<Button onClick={() => event$.emit({ action: CommonActions.CREATE })}>
					<Icon name='Plus' />
					Tạo combo mới
				</Button>
			}
		/>
	)
}

export default ComboFormDialogTrigger
