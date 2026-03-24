import { cn } from '@/libs/utils'
import { Spinner } from '../ui/spinner'

const Loading: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => {
	return (
		<div className={cn('grid h-screen w-screen place-content-center', className)} {...props}>
			<Spinner /> Đang tải ...
		</div>
	)
}

export default Loading
