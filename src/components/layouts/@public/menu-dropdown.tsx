import { cn } from '@/common/utils/cn'
import { scrollToSection } from '@/common/utils/scroll-to-section'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Link } from '@tanstack/react-router'
import { ChevronRightIcon, CircleSmallIcon } from 'lucide-react'
import type { ReactElement, ReactNode } from 'react'

export type NavigationItem = {
	title: string
	href: string
}

export type NavigationSection = {
	title: string
	icon?: ReactNode
} & (
	| {
			items: NavigationItem[]
			href?: never
	  }
	| {
			items?: never
			href: string
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
					if (navItem.href) {
						// Extract section ID from href
						const sectionId = navItem.href.replace('#', '')
						const isActive = activeSection === sectionId && activeSection !== ''

						return (
							<DropdownMenuItem
								key={navItem.title}
								render={
									<Link
										to={navItem.href}
										onClick={(e) => {
											e.preventDefault()
											scrollToSection(sectionId)
										}}
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
