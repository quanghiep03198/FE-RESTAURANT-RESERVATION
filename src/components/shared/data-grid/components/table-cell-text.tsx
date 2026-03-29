import { Typography } from '@/components/ui/typography'
import { type CellContext } from '@tanstack/react-table'
import { isEmpty, isNil } from 'lodash-es'

const TableCellText: React.FC<CellContext<any, any>> = (props) => {
	const value = props.getValue()

	if (isNil(value) || isEmpty(value))
		return (
			<Typography variant='small' color='muted' className='line-clamp-1'>
				Chưa xác định
			</Typography>
		)

	return value
}

export default TableCellText
