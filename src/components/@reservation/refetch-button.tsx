import { useGetReservationsQuery } from '@/apis/reservation/hooks/use-reservation-request'
import { Button, type ButtonProps } from '../ui/button'
import { Icon } from '../ui/icon'

const RefetchButton: React.FC<ButtonProps> = (props) => {
	const { refetch } = useGetReservationsQuery()

	return (
		<Button {...props} variant='outline' onClick={() => refetch()}>
			<Icon name='RefreshCcw' />
			Tải lại
		</Button>
	)
}

export default RefetchButton
