import { Typography } from '../ui/typography'
import ComboSearchInput from './combo-search-input'

const ComboListToolbar: React.FC = () => {
	return (
		<div className='bg-secondary text-secondary-foreground flex items-center justify-between rounded-lg p-4'>
			<Typography variant='h4'>Danh sách Combo</Typography>
			<ComboSearchInput />
		</div>
	)
}

export default ComboListToolbar
