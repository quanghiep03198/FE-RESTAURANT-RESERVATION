import { cn } from '@/common/utils/cn'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import type { FileRouteTypes } from '@/route-tree.gen'
import { Link } from '@tanstack/react-router'
import { ChevronRightIcon, CircleSmallIcon } from 'lucide-react'
import type { ReactElement, ReactNode } from 'react'

export type NavigationItem = {
	title: string
	href?: string
	to?: FileRouteTypes['to']
}

export type NavigationSection = {
	title: string
	icon?: ReactNode
	to?: FileRouteTypes['to']
} & (
	| {
			items: NavigationItem[]
			hash?: never
			to?: FileRouteTypes['to']
	  }
	| {
			items?: never
			hash?: string
			to?: FileRouteTypes['to']
	  }
)

type Props = {
	trigger: ReactElement
	navigationData: NavigationSection[]
	activeSection?: string
	align?: 'center' | 'end' | 'start'
}

const MenuDropdown = ({ trigger, navigationData, activeSection, align = 'start' }: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={trigger} />
			<DropdownMenuContent className='mt-1 w-[min(93vw,800px)]' align={align}>
				{navigationData.map((navItem) => {
					if (navItem.to) {
						// Extract section ID from href
						const sectionId = navItem?.hash?.replace('#', '')
						const isActive =
							(activeSection === sectionId && activeSection !== '') ||
							(location.pathname === navItem.to && navItem.to !== '/')

						return (
							<DropdownMenuItem
								key={navItem.title}
								render={
									<Link
										hash={sectionId}
										to={navItem.to}
										className={cn(
											'cursor-pointer transition-colors duration-200',
											'hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary',
											isActive ? 'bg-primary/10 text-primary font-medium' : 'text-foreground'
										)}>
										{navItem.icon}
										{navItem.title}
									</Link>
								}
							/>
						)
					}

					return (
						<Collapsible
							key={navItem.title}
							render={
								<DropdownMenuGroup>
									<CollapsibleTrigger
										render={
											<DropdownMenuItem
												onSelect={(event) => event.preventDefault()}
												className='justify-between'>
												{navItem.icon}
												<span className='flex-1'>{navItem.title}</span>
												<ChevronRightIcon className='shrink-0 transition-transform [[data-state=open]>&]:rotate-90' />
											</DropdownMenuItem>
										}
									/>

									<CollapsibleContent className='pl-2'>
										{navItem.items?.map((item) => (
											<DropdownMenuItem
												key={item.title}
												render={
													<Link href={item.href}>
														<CircleSmallIcon />
														<span>{item.title}</span>
													</Link>
												}
											/>
										))}
									</CollapsibleContent>
								</DropdownMenuGroup>
							}
						/>
					)
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default MenuDropdown
