import type { ContactInfo } from '@/assets/data/contact-us'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'

const ContactUs = ({ contactInfo }: { contactInfo: ContactInfo }) => {
	return (
		<section
			id='contact-us'
			className='before:bg-muted relative py-8 before:absolute before:inset-0 before:-z-10 before:skew-y-3 sm:py-16 lg:py-24'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16 lg:mb-24'>
					<Badge variant='outline' className='text-sm font-normal'>
						Liên hệ
					</Badge>
					<h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Kết nối với Jolly Fast Food</h2>
					<p className='text-muted-foreground text-xl'>
						Bạn cần đặt món số lượng lớn, lên combo cho tiệc nhỏ hay hỏi giờ giao hàng? Đội ngũ của chúng tôi luôn
						sẵn sàng hỗ trợ nhanh và rõ ràng.
					</p>
				</div>

				<div className='grid items-center gap-12 lg:grid-cols-2'>
					<img
						src='/jollibee-store.jpg'
						alt='Hình minh họa liên hệ cửa hàng'
						className='size-full object-cover max-lg:max-h-70'
					/>

					<div>
						<h3 className='mb-2 text-2xl'>Chúng tôi luôn sẵn sàng phục vụ</h3>
						<p className='text-muted-foreground mb-10 text-lg'>
							Từ đơn lẻ giao nhanh đến đơn nhóm cho văn phòng, hãy liên hệ nếu bạn cần tư vấn món, báo giá combo
							hoặc hỗ trợ đặt trước theo khung giờ.
						</p>

						{/* Contact Info Grid */}
						<div className='grid gap-6 sm:grid-cols-2'>
							{contactInfo.map((info, index) => (
								<Card className='bg-background hover:border-primary transition-colors duration-300' key={index}>
									<CardContent className='flex flex-col items-center gap-4 text-center'>
										<Avatar className='size-9 border'>
											<AvatarFallback className='bg-transparent [&>svg]:size-5'>
												<Icon name={info.icon} />
											</AvatarFallback>
										</Avatar>
										<div className='space-y-3'>
											<h4 className='text-lg font-semibold'>{info.title}</h4>
											<div className='text-muted-foreground text-base font-medium'>
												{info.description.split('\n').map((line, idx) => (
													<p key={idx}>{line}</p>
												))}
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ContactUs
