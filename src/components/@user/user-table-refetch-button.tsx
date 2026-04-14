import { useGetUsersQuery } from '@/apis/user/hooks/use-user-request'
import useMediaQuery from '@/hooks/use-media-query'
import { Tooltip } from '../customs/tooltip'
import { Button, type ButtonProps } from '../ui/button'
import { Icon } from '../ui/icon'

const UserTableRefetchButton: React.FC<ButtonProps> = (props) => {
	const isMobile = useMediaQuery('(max-width: 767px')
	const { refetch } = useGetUsersQuery()

	return (
		<Tooltip
			message='Tải lại'
			contentProps={{ hidden: !isMobile }}
			triggerProps={{
				render: (
					<Button
						className={!isMobile && 'bg-background'}
						variant={isMobile ? 'ghost' : 'outline'}
						size={isMobile ? 'icon' : 'default'}
						onClick={() => refetch()}
						{...props}>
						<Icon name='RefreshCcw' /> {!isMobile && 'Tải lại'}
					</Button>
				)
			}}
		/>
	)
}

export default UserTableRefetchButton
