import { SidebarTrigger } from '../ui/sidebar'

type Props = {}

const AppNavbar = (props: Props) => {
	return (
		<header className='mt-auto h-(--header-height) border-t px-(--outlet-padding) @3xl:hidden'>
			<nav className='flex h-full items-center'>
				<SidebarTrigger className='mr-auto' />
			</nav>
		</header>
	)
}

export default AppNavbar
