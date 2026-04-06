import { useGetCategoriesQuery } from '@/apis/menu/hooks/use-category-request'
import { useGetDishesQuery } from '@/apis/menu/hooks/use-dish-request'
import { useStoredDishFilter } from '@/apis/menu/hooks/use-stored-dish-filter'
import { formatCurrency } from '@/common/utils/format-currency'
import { useMemo } from 'react'
import { Icon } from '../ui/icon'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	SidebarSeparator
} from '../ui/sidebar'
import { Typography } from '../ui/typography'

const DishFilterSidebar: React.FC = () => {
	const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery()
	const { filterValues, setFilterValues } = useStoredDishFilter()
	const { data: dishes, isLoading: isLoadingDishes } = useGetDishesQuery()

	const maxPrice = useMemo(() => (Array.isArray(dishes) ? Math.max(...dishes.map((item) => item.price)) : 0), [dishes])
	const minPrice = useMemo(() => (Array.isArray(dishes) ? Math.min(...dishes.map((item) => item.price)) : 0), [dishes])

	const roundDown = (value: number, step: number) => Math.floor(value / step) * step
	const roundUp = (value: number, step: number) => Math.ceil(value / step) * step

	const STEP = 20000
	const roundedMin = roundDown(minPrice, STEP)
	const roundedMax = roundUp(maxPrice, STEP)

	const priceRanges = useMemo(() => {
		if (!Array.isArray(dishes) || dishes.length === 0) return []
		const ranges = []
		for (let start = roundedMin; start < roundedMax; start += STEP) {
			const end = Math.min(start + STEP, roundedMax)
			ranges.push({ min: start, max: end })
		}
		return ranges
	}, [roundedMin, roundedMax])

	return (
		<Sidebar side='right' collapsible='offcanvas' className='h-screen'>
			<SidebarHeader className='px-4'>
				<Typography className='font-medium'>Tìm kiếm nâng cao</Typography>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className='inline-flex items-center gap-x-2'>
						<Icon name='FileText' /> Danh mục
					</SidebarGroupLabel>
					<SidebarMenu>
						{isLoadingCategories ? (
							Array.from({ length: 5 }, (_, index) => <SidebarMenuSkeleton key={index} />)
						) : (
							<>
								<SidebarMenuButton onClick={() => setFilterValues((prev) => ({ ...prev, category: null }))}>
									Tất cả
									<SidebarMenuBadge
										aria-current={filterValues.category === null}
										className='opacity-0 transition-opacity duration-100 aria-current:opacity-100'>
										<Icon name='Check' size={12} />
									</SidebarMenuBadge>
								</SidebarMenuButton>
								{Array.isArray(categories) &&
									categories
										.filter((cate) => cate.is_active)
										.map((category) => (
											<SidebarMenuItem key={category.id}>
												<SidebarMenuItem>
													<SidebarMenuButton
														onClick={() =>
															setFilterValues((prev) => ({ ...prev, category: category.slug }))
														}>
														{category.name}
													</SidebarMenuButton>
													<SidebarMenuBadge
														aria-current={filterValues.category === category.slug}
														className='opacity-0 transition-opacity duration-100 aria-current:opacity-100'>
														<Icon name='Check' size={12} />
													</SidebarMenuBadge>
												</SidebarMenuItem>
											</SidebarMenuItem>
										))}
							</>
						)}
					</SidebarMenu>
				</SidebarGroup>
				<SidebarSeparator />
				<SidebarGroup>
					<SidebarGroupLabel className='inline-flex items-center gap-x-2'>
						<Icon name='DollarSign' /> Khoảng giá
					</SidebarGroupLabel>
					<SidebarMenu>
						{isLoadingDishes ? (
							Array.from({ length: 5 }, (_, index) => <SidebarMenuSkeleton key={index} />)
						) : (
							<>
								<SidebarMenuItem>
									<SidebarMenuButton onClick={() => setFilterValues((prev) => ({ ...prev, price: null }))}>
										Tất cả
										<SidebarMenuBadge
											aria-current={!filterValues.price}
											className='opacity-0 transition-opacity duration-100 aria-current:opacity-100'>
											<Icon name='Check' size={12} />
										</SidebarMenuBadge>
									</SidebarMenuButton>
								</SidebarMenuItem>
								{priceRanges.map((range) => (
									<SidebarMenuItem key={`${range.min}-${range.max}`}>
										<SidebarMenuButton onClick={() => setFilterValues((prev) => ({ ...prev, price: range }))}>
											{formatCurrency(range.min)} - {formatCurrency(range.max)}
											<SidebarMenuBadge
												aria-current={
													range.min === filterValues.price?.min && range.max === filterValues.price?.max
												}
												className='opacity-0 transition-opacity duration-100 aria-current:opacity-100'>
												<Icon name='Check' size={12} />
											</SidebarMenuBadge>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</>
						)}
					</SidebarMenu>
				</SidebarGroup>
				<SidebarSeparator />
				<SidebarGroup>
					<SidebarGroupLabel className='inline-flex items-center gap-x-2'>
						<Icon name='SquareCheckBig' /> Trạng thái hoạt động
					</SidebarGroupLabel>
					<SidebarMenuItem>
						<SidebarMenuButton onClick={() => setFilterValues((prev) => ({ ...prev, isActive: null }))}>
							Tất cả
							<SidebarMenuBadge
								aria-current={filterValues.isActive === null}
								className='opacity-0 transition-opacity duration-100 aria-current:opacity-100'>
								<Icon name='Check' size={12} />
							</SidebarMenuBadge>
						</SidebarMenuButton>
						<SidebarMenuButton onClick={() => setFilterValues((prev) => ({ ...prev, isActive: true }))}>
							Đang kinh doanh
							<SidebarMenuBadge
								aria-current={filterValues.isActive === true}
								className='opacity-0 transition-opacity duration-100 aria-current:opacity-100'>
								<Icon name='Check' size={12} />
							</SidebarMenuBadge>
						</SidebarMenuButton>
						<SidebarMenuButton onClick={() => setFilterValues((prev) => ({ ...prev, isActive: false }))}>
							Đã ngừng kinh doanh
							<SidebarMenuBadge
								aria-current={filterValues.isActive === false}
								className='opacity-0 transition-opacity duration-100 aria-current:opacity-100'>
								<Icon name='Check' size={12} />
							</SidebarMenuBadge>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}

export default DishFilterSidebar
