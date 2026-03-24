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
	SidebarMenuSubItem
} from '@/components/ui/sidebar'
import {
	Appointment01Icon,
	ChevronRight,
	Dish02Icon,
	Invoice01Icon,
	LayoutGrid,
	UserMultiple02Icon
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link } from '@tanstack/react-router'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { Typography } from '../ui/typography'
import NavUser from './nav-user'

const AppSidebar: React.FC = () => {
	return (
		<Sidebar>
			<SidebarHeader>
				<div className='flex items-center'>
					<img src='/logo.png' className='max-w-16 object-contain' />
					<div>
						<Typography variant='h4' className='leading-none'>
							Bếp Việt
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
					<SidebarMenu>
						<SidebarMenuItem>
							<Link to='/floor-plan'>
								<SidebarMenuButton>
									<HugeiconsIcon icon={LayoutGrid} />
									Sơ đồ chỗ ngồi
								</SidebarMenuButton>
							</Link>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<Link to='/floor-plan'>
								<SidebarMenuButton>
									<HugeiconsIcon icon={Appointment01Icon} />
									Đặt bàn
								</SidebarMenuButton>
							</Link>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<Collapsible defaultOpen={true}>
								<CollapsibleTrigger
									render={
										<SidebarMenuButton className='[&[aria-expanded=true]_svg:last-child]:rotate-90'>
											<HugeiconsIcon icon={Dish02Icon} />
											Quản lý Menu
											<HugeiconsIcon icon={ChevronRight} className='ml-auto' />
										</SidebarMenuButton>
									}
								/>
								<CollapsibleContent>
									<SidebarMenuSub>
										<SidebarMenuSubItem>
											<Link to='/dish-categories'>
												<SidebarMenuSubButton>Danh mục món</SidebarMenuSubButton>
											</Link>
										</SidebarMenuSubItem>
										<SidebarMenuSubItem>
											<Link to='/dishes'>
												<SidebarMenuButton>Món ăn</SidebarMenuButton>
											</Link>
										</SidebarMenuSubItem>
										<SidebarMenuSubItem>
											<Link to='/combo'>
												<SidebarMenuButton>Combo</SidebarMenuButton>
											</Link>
										</SidebarMenuSubItem>
									</SidebarMenuSub>
								</CollapsibleContent>
							</Collapsible>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<Link to='/invoices'>
								<SidebarMenuButton>
									<HugeiconsIcon icon={Invoice01Icon} />
									Hóa đơn
								</SidebarMenuButton>
							</Link>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Quản lý</SidebarGroupLabel>
					<SidebarMenu>
						<SidebarMenuItem>
							<Link to='/user-management'>
								<SidebarMenuButton>
									<HugeiconsIcon icon={UserMultiple02Icon} size={24} strokeWidth={2} />
									Quản lý người dùng
								</SidebarMenuButton>
							</Link>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	)
}

export default AppSidebar
