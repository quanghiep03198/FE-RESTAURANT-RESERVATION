import { navigationData } from '@/assets/data/header'
import Footer from '@/components/layouts/@public/footer'
import Header from '@/components/layouts/@public/header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public-layout')({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<div className='flex min-h-screen flex-col'>
			{/* Header Section */}
			<Header navigationData={navigationData as any} />

			{/* Main Content */}
			<main className='flex w-full flex-col pt-17.5 *:scroll-mt-16'>
				<Outlet />
			</main>

			{/* Footer Section */}
			<Footer />
		</div>
	)
}
