import { Icon } from '@/components/ui/icon'

type Props = {}

const PublicHeader = (props: Props) => {
	return (
		<header>
			<nav>
				<Icon name='ChefHat' size={40} strokeWidth={1.5} />
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
