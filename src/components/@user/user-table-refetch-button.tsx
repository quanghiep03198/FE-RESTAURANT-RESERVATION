import { useGetUserListQuery } from '@/apis/user/hooks/use-user-request'
import useMediaQuery from '@/hooks/use-media-query'
import { Tooltip } from '../customs/tooltip'
import { Button, type ButtonProps } from '../ui/button'
import { Icon } from '../ui/icon'

const UserTableRefreshButton: React.FC<ButtonProps> = (props) => {
	const isMobile = useMediaQuery('(max-width: 767px')
	const { refetch } = useGetUserListQuery()

	return (
		<Tooltip
			message='Tải lại'
			contentProps={{ hidden: !isMobile }}
			triggerProps={{
				render: (
					<Button
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

export default UserTableRefreshButton
