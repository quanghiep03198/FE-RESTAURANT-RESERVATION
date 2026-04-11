import generateAvatar from '@/common/libs/generate-avatar'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Icon } from '../ui/icon'
import { Item, ItemContent, ItemMedia, ItemTitle } from '../ui/item'
import { Typography } from '../ui/typography'

const UserTableCell: React.FC<{ name: string | undefined }> = ({ name }) => {
	if (!name)
		return (
			<Typography variant='small' color='muted' className='inline-flex items-center gap-x-2'>
				<Icon name='CircleUserRound' />
				Chưa xác định
			</Typography>
		)

	return (
		<Item className='p-0'>
			<ItemMedia variant='image'>
				<Avatar>
					<AvatarImage src={generateAvatar({ name: name, background: '#ea4646' })} alt={name} />
					<AvatarFallback>{name}</AvatarFallback>
				</Avatar>
			</ItemMedia>
			<ItemContent>
				<ItemTitle className='font-normal'>{name}</ItemTitle>
			</ItemContent>
		</Item>
	)
}

export default UserTableCell
