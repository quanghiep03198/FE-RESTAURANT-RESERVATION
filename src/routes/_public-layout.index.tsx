import { stats } from '@/assets/data/about-us'
import { contactInfo } from '@/assets/data/contact-us'
import { testimonials } from '@/assets/data/testimonials'
import AboutUs from '@/components/@landing/about-us-page'
import ContactUs from '@/components/@landing/contact-us-page'
import HeroSection from '@/components/@landing/hero-section'
import NewItemsSection from '@/components/@landing/new-items'
import OfferSection from '@/components/@landing/offers-section'
import PopularDishesSection from '@/components/@landing/popular-dishes'
import TestimonialsComponent from '@/components/@landing/testimonials-section'
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
