import { stats } from '@/assets/data/about-us'
import { contactInfo } from '@/assets/data/contact-us'
import { testimonials } from '@/assets/data/testimonials'
import AboutUs from '@/components/layouts/@public/about-us-page'
import ContactUs from '@/components/layouts/@public/contact-us-page'
import HeroSection from '@/components/layouts/@public/hero-section'
import NewItemsSection from '@/components/layouts/@public/new-items'
import OfferSection from '@/components/layouts/@public/offers-section'
import PopularDishesSection from '@/components/layouts/@public/popular-dishes'
import TestimonialsComponent from '@/components/layouts/@public/testimonials-section'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public-layout/')({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<title>Trang chủ</title>
			<meta
				name='description'
				content='Chào mừng đến với Jolly Fast Food, nơi burger mọng nước, gà rán giòn rụm và combo tiện lợi được
							chuẩn bị nhanh để chiều mọi cơn thèm của bạn.'
			/>

			<HeroSection />
			<PopularDishesSection />
			<AboutUs stats={stats} />
			<TestimonialsComponent testimonials={testimonials} />
			<NewItemsSection />
			<ContactUs contactInfo={contactInfo} />
			<OfferSection />
		</>
	)
}
