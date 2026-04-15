import { cn } from '@/common/utils/cn'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { typographyVariants } from '@/components/ui/typography'
import { Link } from '@tanstack/react-router'
import { MenuIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import MenuDropdown from '../../@landing/menu-dropdown'
import type { NavigationSection } from '../../@landing/menu-navigation'
import MenuNavigation from '../../@landing/menu-navigation'

// Active section hook based on which section is closest to the top of the
// viewport (accounts for header offset). This is more deterministic than
// an IntersectionObserver for this layout and avoids lingering active states.
const useActiveSection = (sectionIds: string[]) => {
	const [activeSection, setActiveSection] = useState<string>('')

	useEffect(() => {
		if (!sectionIds || sectionIds.length === 0) return

		const headerHeight = 80

		const update = () => {
			let closestId = ''
			let minDistance = Number.POSITIVE_INFINITY

			sectionIds.forEach((id) => {
				const el = document.getElementById(id)

				if (!el) return

				const rectTop = el.getBoundingClientRect().top - headerHeight
				const distance = Math.abs(rectTop)

				if (distance < minDistance) {
					minDistance = distance
					closestId = id
				}
			})

			// Only set an active section when it's reasonably close to the
			// viewport top. This prevents a stale/incorrect active state when
			// the user has scrolled elsewhere on the page.
			const activationThreshold = 200 // px

			if (minDistance <= activationThreshold) {
				setActiveSection(closestId)
			} else {
				setActiveSection('')
			}
		}

		// Update on scroll and resize and run once to initialise
		window.addEventListener('scroll', update, { passive: true })
		window.addEventListener('resize', update)
		update()

		return () => {
			window.removeEventListener('scroll', update)
			window.removeEventListener('resize', update)
		}
	}, [sectionIds])

	return activeSection
}

type HeaderProps = {
	navigationData: NavigationSection[]
	className?: string
}

const Header = ({ navigationData, className }: HeaderProps) => {
	const [isScrolled, setIsScrolled] = useState(false)

	// Extract section IDs from navigation data - only include valid sections
	const sectionIds = navigationData.map((item) => item.hash?.replace('#', '')).filter(Boolean) as string[]

	// Only use active section if it's actually in our navigation list
	const detectedActiveSection = useActiveSection(sectionIds)
	const activeSection = sectionIds.includes(detectedActiveSection) ? detectedActiveSection : ''

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0)
		}

		window.addEventListener('scroll', handleScroll)
		handleScroll()

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<header
			className={cn(
				'fixed top-0 z-50 h-16 w-full border-b transition-all duration-300',
				{
					'bg-background shadow-md': isScrolled
				},
				className
			)}>
			<div className='mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8'>
				{/* Logo */}
				<Link
					to='/'
					className={cn(
						typographyVariants({
							variant: 'h2',
							className: 'sour-gummy text-primary leading-none tracking-wide sm:text-xl'
						})
					)}>
					Jolly Fast Food
				</Link>

				{/* Navigation */}
				<MenuNavigation
					navigationData={navigationData}
					activeSection={activeSection}
					className='**:data-[slot=navigation-menu-list]:gap-1 max-lg:hidden'
				/>

				{/* Actions */}
				<div className='flex items-center'>
					<Button
						className='group relative ml-4 w-fit overflow-hidden rounded-full px-4 text-base before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-size-[250%_250%,100%_100%] before:bg-position-[200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-position-[-100%_0,0_0] has-[>svg]:px-6 max-sm:hidden dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]'
						nativeButton={false}
						render={<Link to='/login'>Đăng nhập</Link>}
					/>

					{/* Mobile book table button */}
					<Tooltip>
						<TooltipTrigger
							render={
								<Button className='ml-4 rounded-full sm:hidden' render={<Link to='/login'>Đăng nhập</Link>} />
							}
						/>
						<TooltipContent>Đăng nhập</TooltipContent>
					</Tooltip>

					{/* Mobile menu button */}
					<MenuDropdown
						align='end'
						navigationData={navigationData as any}
						activeSection={activeSection}
						trigger={
							<Button variant='outline' size='icon' className='ml-3 rounded-full lg:hidden'>
								<MenuIcon />
								<span className='sr-only'>Menu</span>
							</Button>
						}
					/>
				</div>
			</div>
		</header>
	)
}

export default Header
