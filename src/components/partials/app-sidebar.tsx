import useAuth from '@/apis/auth/hooks/use-auth-req'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
	SidebarSeparator,
	useSidebar
} from '@/components/ui/sidebar'
import type { TNavigationConfig } from '@/configs/navigation.config'
import navigationConfig from '@/configs/navigation.config'
import useMediaQuery from '@/hooks/use-media-query'
import { ChevronRight, LockIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Fragment, useEffect, useLayoutEffect, useRef } from 'react'
import tw from 'tailwind-styled-components'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { Typography } from '../ui/typography'
import NavUser from './nav-user'

type NavLinkProps = Pick<TNavigationConfig, 'url' | 'title' | 'icon' | 'authorizedRoles'> & {
	viewTransition?: boolean
}

const AppSidebar: React.FC = () => {
	const { user } = useAuth()
	const isMobile = useMediaQuery('(min-width: 320px) and (max-width: 767px)')
	const { open, setOpen } = useSidebar()

	useLayoutEffect(() => {
		if (isMobile) setOpen(false)
	}, [isMobile])

	return (
		<Sidebar variant='inset' side='left' collapsible={isMobile ? 'offcanvas' : 'none'} className='h-screen'>
			<SidebarHeader>
				<div className='flex items-center'>
					<img src='/logo.png' className='max-w-16 object-contain' />
					<div>
						<Typography variant='h4' className='leading-none'>
							Toque Blanche
						</Typography>
						<Typography variant='small' color='muted' className='text-xs'>
							Hệ thống quản lý Đặt bàn
						</Typography>
					</div>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Menu chính</SidebarGroupLabel>
					<SidebarMenu role='menu' aria-label='Main menu'>
						{navigationConfig.main.map((item, index) => {
							if (!Array.isArray(item.items)) return <SidebarMenuLink key={index.toString()} {...item} />
							return (
								<Collapsible key={index.toString()} defaultOpen={true} className='group/collapsible w-full'>
									<CollapsibleTrigger
										render={
											<SidebarMenuButton
												className='[&[aria-expanded=true]_svg:last-child]:rotate-90'
												aria-disabled={item.items.every(
													(subItem) =>
														subItem.authorizedRoles !== '*' &&
														!subItem.authorizedRoles.includes(user?.role?.code)
												)}
												onClick={() => {
													if (isMobile) return
													setOpen(true)
												}}>
												{item.icon && <HugeiconsIcon icon={item.icon} />}
												<SidebarMenuTitle>{item.title}</SidebarMenuTitle>
												<HugeiconsIcon icon={ChevronRight} className='ml-auto' />
											</SidebarMenuButton>
										}
									/>
									<CollapsibleContent className='!scrollbar-none data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down w-full overflow-auto transition-none'>
										<SidebarMenuSub>
											{item.items?.map((subItem, subIndex) => (
												<SidebarMenuSubLink key={`${index + 1}.${subIndex + 1}`} {...subItem} />
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</Collapsible>
							)
						})}
					</SidebarMenu>
				</SidebarGroup>
				{user?.role?.code === 'OWNER' && (
					<Fragment>
						<SidebarSeparator />
						<SidebarGroup>
							<SidebarGroupLabel>Quản lý</SidebarGroupLabel>
							<SidebarMenu role='menu' aria-label='Administration'>
								{navigationConfig.administration.map((item, index) => {
									return <SidebarMenuLink key={index.toString()} {...item} />
								})}
							</SidebarMenu>
						</SidebarGroup>
					</Fragment>
				)}
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}

const SidebarMenuLink: React.FC<NavLinkProps> = ({ url, title, icon, viewTransition, authorizedRoles }) => {
	const isMobile = useMediaQuery('(min-width: 320px) and (max-width: 767px)')
	const { open, openMobile, setOpenMobile } = useSidebar()
	const location = useRouterState({ select: (s) => s.location })
	const ref = useRef<HTMLLIElement>(null)
	const { user } = useAuth()

	const isLinkActive = (user && authorizedRoles.includes(user?.role?.code)) || authorizedRoles === '*'

	const isActive = location.pathname.match(new RegExp(`^${url}$`))

	useEffect(() => {
		if (open && isActive && ref.current) {
			ref.current.scrollIntoView({ behavior: 'auto', block: 'center' })
		}
	}, [open, location.pathname])

	return (
		<SidebarMenuItem
			role='menuitem'
			aria-disabled={!isLinkActive}
			className='group/menuitem aria-disabled:opacity-50'
			ref={ref}
			onClick={() => {
				if (isMobile) setOpenMobile(!openMobile)
			}}>
			<SidebarMenuButton
				size='sm'
				className='group-aria-disabled/menuitem:cursor-not-allowed'
				tooltip={title}
				render={
					<Link
						to={url}
						search={isActive && location.search}
						viewTransition={viewTransition}
						activeProps={{
							className: 'text-primary hover:text-primary bg-primary/10 '
						}}>
						<HugeiconsIcon icon={icon} size={18} className='size-4.5' />
						<SidebarMenuTitle>{title}</SidebarMenuTitle>
						{!isLinkActive && (
							<HugeiconsIcon icon={LockIcon} size={14} className='stroke-muted-foreground ml-auto size-3.5' />
						)}
					</Link>
				}
			/>
		</SidebarMenuItem>
	)
}

const SidebarMenuSubLink: React.FC<Omit<NavLinkProps, 'icon'>> = ({ url, title, viewTransition, authorizedRoles }) => {
	const ref = useRef<HTMLLIElement>(null)
	const isSmallScreen = useMediaQuery('(min-width: 320px) and (max-width: 1365px)')
	const { open, openMobile, setOpenMobile } = useSidebar()
	const location = useRouterState({ select: (s) => s.location })
	const { user } = useAuth()

	const isAccessible = (user && user && authorizedRoles.includes(user?.role?.code)) || authorizedRoles === '*'

	const isActive = location.pathname.match(new RegExp(`^${url}$`))

	useEffect(() => {
		if (open && isActive && ref.current) {
			ref.current.scrollIntoView({ behavior: 'auto', block: 'center' })
		}
	}, [open, location.pathname])

	return (
		<SidebarMenuSubItem
			role='menuitem'
			ref={ref}
			aria-disabled={!isAccessible}
			className='group/menuitem relative aria-disabled:cursor-help aria-disabled:opacity-50'
			onClick={() => {
				if (isSmallScreen) setOpenMobile(!openMobile)
			}}>
			<SidebarMenuSubButton
				size='md'
				className='group-aria-disabled/menuitem:cursor-not-allowed'
				render={
					<Link
						to={url}
						search={isActive && location.search}
						preload='intent'
						viewTransition={viewTransition}
						activeProps={{
							className: 'text-primary hover:text-primary bg-primary/10'
						}}>
						<SidebarMenuTitle>{title}</SidebarMenuTitle>
					</Link>
				}
			/>
			{!isAccessible && (
				<HugeiconsIcon
					icon={LockIcon}
					size={14}
					className='stroke-muted-foreground absolute top-1/2 right-0 translate-x-3.5 -translate-y-1/2'
				/>
			)}
		</SidebarMenuSubItem>
	)
}

const SidebarMenuTitle: React.FC<React.ComponentProps<'span'>> = tw.span`
	font-medium 
`

export default AppSidebar
