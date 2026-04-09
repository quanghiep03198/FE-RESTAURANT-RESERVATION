import { cn } from '@/common/utils/cn'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import type { FileRouteTypes } from '@/route-tree.gen'
import { Link, useLocation } from '@tanstack/react-router'
import type { ReactNode } from 'react'

export type NavigationItem = {
	title: string
	hash: string
	to: string
}

export type NavigationSection = {
	title: string
	icon?: ReactNode
	to?: FileRouteTypes['to']
} & (
	| {
			items: NavigationItem[]
			hash?: never
	  }
	| {
			items?: never
			hash: string
	  }
)

type MenuNavigationProps = {
	navigationData: NavigationSection[]
	activeSection?: string
	className?: string
}

const MenuNavigation = ({ navigationData, activeSection, className }: MenuNavigationProps) => {
	const location = useLocation({ structuralSharing: true })

	return (
		<NavigationMenu className={className}>
			<NavigationMenuList className='flex-wrap justify-start gap-0'>
				{navigationData.map((navItem) => {
					if (navItem.to) {
						// Extract section ID from href
						const sectionId = navItem?.hash?.replace('#', '')
						const isActive =
							activeSection === sectionId && activeSection !== '' && location.pathname === navItem.to

						return (
							<NavigationMenuItem key={navItem.title}>
								<NavigationMenuLink
									className={cn(
										navigationMenuTriggerStyle(),
										'cursor-pointer rounded-full bg-transparent px-3 py-1.5 text-base! font-normal transition-colors duration-200',
										'hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10',
										'focus:text-primary focus:bg-primary/5 dark:focus:bg-primary/10',
										isActive ? 'text-primary bg-primary/5 dark:bg-primary/10' : 'text-muted-foreground'
									)}
									render={
										<Link to={navItem.to} hash={sectionId}>
											{navItem.title}
										</Link>
									}
								/>
							</NavigationMenuItem>
						)
					}

					// Section with dropdown
					return (
						<NavigationMenuItem key={navItem.title}>
							<NavigationMenuTrigger className='text-muted-foreground hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 focus:text-primary focus:bg-primary/5 dark:focus:bg-primary/10 data-[state=open]:text-primary data-[state=open]:bg-primary/5 dark:data-[state=open]:bg-primary/10 data-[state=open]:hover:bg-primary/5 dark:data-[state=open]:hover:bg-primary/10 bg-transparent px-3 py-1.5 text-base [&>svg]:size-4'>
								{navItem.title}
							</NavigationMenuTrigger>
							<NavigationMenuContent className='data-[motion=from-start]:slide-in-from-left-30! data-[motion=to-start]:slide-out-to-left-30! data-[motion=from-end]:slide-in-from-right-30! data-[motion=to-end]:slide-out-to-right-30! absolute w-auto'>
								<ul className='grid w-38 gap-4'>
									<li>
										{navItem.items?.map((item) => (
											<NavigationMenuLink key={item.title} href={item.hash}>
												{item.title}
											</NavigationMenuLink>
										))}
									</li>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					)
				})}
			</NavigationMenuList>
		</NavigationMenu>
	)
}

export default MenuNavigation
