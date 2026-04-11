import { CommonActions } from '@/common/constants/enums'
import { usePageContext } from '@/contexts/event-context'
import { Button } from '../ui/button'
import { Icon } from '../ui/icon'

const ReservationFormDialogTrigger = () => {
	const { event$ } = usePageContext()

	return (
		<Button onClick={() => event$.emit({ action: CommonActions.CREATE })}>
			<Icon name='Plus' />
			Tạo đặt bàn mới
		</Button>
	)
}

export default ReservationFormDialogTrigger
