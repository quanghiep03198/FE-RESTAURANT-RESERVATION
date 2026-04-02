import { cn } from '@/common/utils/cn'
import { Spinner } from '../ui/spinner'
import { Typography } from '../ui/typography'

const Loading: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => {
	return (
		<div className={cn('grid h-screen w-screen place-content-center', className)} {...props}>
			<Typography variant='small' className='inline-flex items-center gap-x-2'>
				<Spinner /> Đang tải ...
			</Typography>
		</div>
	)
}

export default Loading
