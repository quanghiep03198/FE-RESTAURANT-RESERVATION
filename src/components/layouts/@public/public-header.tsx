import { cn } from '@/common/utils/cn'
import { typographyVariants } from '@/components/ui/typography'
import { Link } from '@tanstack/react-router'

type Props = {}

const PublicHeader = (props: Props) => {
	return (
		<header className='h-20 p-4'>
			<nav>
				<Link
					className={cn(
						typographyVariants({ variant: 'h3', className: 'text-primary sour-gummy leading-none tracking-wide' })
					)}>
					Jolly Fast Food
				</Link>
				<ul>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</nav>
		</header>
	)
}

export default PublicHeader
