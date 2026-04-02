import DishFilterSidebar from '@/components/@dish/dish-filter-sidebar'
import DishList from '@/components/@dish/dish-list'
import DishListSearchBar from '@/components/@dish/dish-list-seach-bar'
import { PageHeader, PageWrapper } from '@/components/private-layout-partials/app-page'
import { SidebarProvider } from '@/components/ui/sidebar'
import { PageContextProvider } from '@/contexts/event-context'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_private-layout/dishes')({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<title>Món ăn</title>
			<meta name='description' content='Danh mục các món ăn' />

			<PageContextProvider>
				<SidebarProvider data-outlet-padding='none' className='w-full' cookieName='dish_filter_sidebar'>
					<PageWrapper className='bg-secondary basis-full'>
						<PageHeader className='sticky top-0 z-20! px-6 py-3 backdrop-blur'>
							<DishListSearchBar />
						</PageHeader>
						<div className='px-6 pb-6'>
							<DishList />
						</div>
					</PageWrapper>
					<DishFilterSidebar />
				</SidebarProvider>
			</PageContextProvider>
		</>
	)
}
