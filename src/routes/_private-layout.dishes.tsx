import DishFilterSidebar from '@/components/@dish/dish-filter-sidebar'
import DishFormDialog from '@/components/@dish/dish-form-dialog'
import DishList from '@/components/@dish/dish-list'
import DishListSearchBar from '@/components/@dish/dish-list-seach-bar'
import { PageHeader, PageWrapper } from '@/components/layouts/@private/app-page'
import { SidebarProvider } from '@/components/ui/sidebar'
import { PageContextProvider } from '@/contexts/event-context'
import { createFileRoute } from '@tanstack/react-router'
import tw from 'tailwind-styled-components'

export const Route = createFileRoute('/_private-layout/dishes')({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<title>Món ăn</title>
			<meta name='description' content='Danh mục các món ăn' />

			<PageContextProvider>
				<SidebarProvider data-outlet-padding='none' className='w-full' cookieName='dish_filter_sidebar'>
					<PageWrapper className='basis-full'>
						<PageHeader className='sticky top-0 z-20! px-6 py-3 backdrop-blur'>
							<DishListSearchBar />
						</PageHeader>
						<PageContent>
							<DishList />
						</PageContent>
					</PageWrapper>
					<DishFilterSidebar />
				</SidebarProvider>
				<DishFormDialog />
			</PageContextProvider>
		</>
	)
}

const PageContent = tw.div`px-6 pb-6`
