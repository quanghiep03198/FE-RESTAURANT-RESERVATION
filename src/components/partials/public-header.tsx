type Props = {}

const PublicHeader = (props: Props) => {
	return (
		<header className='bg-background/80 flex h-12 items-center justify-between p-4 backdrop-blur-sm'>
			<picture>
				<img src='/logo.png' alt='Logo' className='max-w-24' />
			</picture>
			<nav></nav>
		</header>
	)
}

export default PublicHeader
