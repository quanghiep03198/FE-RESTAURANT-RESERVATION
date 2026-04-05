import { Typography } from '../ui/typography'
import ComboSearchInput from './combo-search-input'

const ComboListToolbar: React.FC = () => {
	return (
		<div className='flex items-center justify-between'>
			<Typography variant='h4'>Danh sách Combo</Typography>
			<ComboSearchInput />
		</div>
	)
}

export default ComboListToolbar
