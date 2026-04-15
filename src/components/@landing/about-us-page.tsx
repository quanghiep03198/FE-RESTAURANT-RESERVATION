import type { Stat } from '@/assets/data/about-us'
import { cn } from '@/common/utils/cn'
import Image from '@/components/shared/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { useState } from 'react'
import ScrollShadow from '../customs/scroll-shadow'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { Typography } from '../ui/typography'

const AboutUs = ({ stats }: { stats: Stat[] }) => {
	return (
		<section
			id='about-us'
			className='before:bg-muted relative py-8 before:absolute before:inset-0 before:-z-10 before:skew-y-3 sm:py-16 lg:py-24'>
			<div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='mx-auto mb-12 flex max-w-3xl flex-col items-center justify-center space-y-4 text-center md:mb-16 lg:mb-24'>
					<Badge variant='outline' className='text-sm font-normal'>
						Về chúng tôi
					</Badge>
					<h2 className='text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl'>
						Câu chuyện của một thương hiệu món nhanh
					</h2>
					<p className='text-muted-foreground text-xl'>
						Jolly Fast Food ra đời từ mong muốn mang đến những phần ăn nhanh, đậm vị và đáng tin cậy cho mọi buổi
						hẹn, bữa trưa văn phòng hay tối muộn cần nạp năng lượng.
					</p>
					<OurStory />
				</div>
				{/* Video player and stats */}
				<div className='relative mb-8 h-full w-full sm:mb-16 lg:mb-24'>
					<Image
						src='/jollibee-history.webp'
						alt='Hình minh họa về cửa hàng món nhanh'
						className='h-full w-full rounded-lg object-contain brightness-80 sm:max-md:mb-6'
						loading='lazy'
					/>

					{/* Stats card overlapping the video section */}
					<div className='bg-background grid gap-10 rounded-lg border sm:p-6 sm:max-lg:grid-cols-2 md:p-8 lg:absolute lg:-bottom-25 lg:left-1/2 lg:w-4/5 lg:-translate-x-1/2 lg:grid-cols-4 lg:px-10'>
						{stats.map((stat, index) => (
							<div key={index} className='flex flex-col items-center justify-center gap-2.5 text-center'>
								<div className='flex size-7 items-center justify-center [&>svg]:size-7'>
									<Icon name={stat.icon} />
								</div>
								<span className='text-primary text-2xl font-semibold'>{stat.value}</span>
								<p className='text-muted-foreground mt-auto text-sm text-pretty md:text-lg'>
									{stat.description[0]} <br /> {stat.description[1]}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

const OurStory: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<Collapsible open={open} onOpenChange={setOpen}>
			<CollapsibleContent>
				<ScrollShadow className='*:prose-p:text-justify prose prose-h1:text-center max-h-80 px-2 py-6 text-justify'>
					<Typography variant='h1'>TẬP ĐOÀN JFF</Typography>
					<Typography>
						Ngày 28/1/1978, tập đoàn Jolly Fast Food được thành lập tại Việt Nam. Jolly Fast Food là một câu
						chuyện thành công phi thường: từ 2 tiệm kem nhỏ hình thành vào năm 1975, chuyên bán các món ăn nóng và
						bánh mì kẹp trở thành công ty với 7 cửa hàng vào năm 1978, chuyên về bơ gơ, sau đó trở thành một công
						ty đã tạo nên cuộc cách mạng thức ăn nhanh tại Việt Nam. Tập đoàn Jolly Fast Food đã xây dựng thành
						công hệ thống cửa hàng thức ăn nhanh rộng khắp Việt Nam với trên 800 cửa hàng, cùng với hơn 100 cửa
						hàng tại thị trường quốc tế như Ả Rập Thống Nhất, Qatar, Hong Kong, các tiểu vương quốc Ả Rập Xê Út,
						Brunei, Trung Quốc, Singapore, Mỹ và Philippines.
					</Typography>
					<Typography>
						Hiện nay Jolly Fast Food đã trở thành tập đoàn thức ăn nhanh hàng đầu tại Việt Nam. Với hơn 12 nhãn
						hàng, hàng ngàn cửa hàng kinh doanh ẩm thực, và hệ thống cửa hàng nhượng quyền rộng khắp trong nước và
						quốc tế, Jolly Fast Food khát khao mang đến cho khách hàng không chỉ những sản phẩm ngon, chất lượng
						mà còn thể hiện các nét văn hóa truyền thống đặc sắc nhất. Khách hàng khi đến với Jolly Fast Food vừa
						thưởng thức những bữa ăn ngon, vừa trải nghiệm không gian ấm cúng, thân thiện, vui vẻ, và được tận
						hưởng những giây phút hạnh phúc, thoải mái nhất bên gia đình và người thân.
					</Typography>
					<Typography>
						Cửa hàng Jolly Fast Food đầu tiên được mở tại Việt Nam vào năm 1996. Kể từ đó, Jolly Fast Food đã nỗ
						lực hết mình để mang đến các gia đình Việt Nam những bữa ăn ngon miệng với giá cả hợp lý nhất.
					</Typography>
					<Typography>
						Tháng 06/2005 tập đoàn Jolly Fast Food chính thức đầu tư thành lập Công ty TNHH Jolly Fast Food Việt
						Nam, đánh dấu một bước phát triển mới trong việc quản lý và mở rộng hệ thống cửa hàng Jolly Fast Food
						tại Việt Nam. Từ đó, thương hiệu Jolly Fast Food đã nhận được sự ủng hộ và đánh giá rất cao của khách
						hàng tại Việt Nam. Trong 3 năm gần đây hàng loạt những cửa hàng thức ăn nhanh Jolly Fast Food đã tiếp
						tục ra đời và kiến tạo nên một làn sóng mới về mô hình kinh doanh nhà hàng thức ăn nhanh tại thị
						trường Việt Nam.
					</Typography>
					<Typography>
						Ngày 01/12/2011, tập đoàn Jolly Fast Food đã sát nhập thêm 2 thương hiệu F&B hàng đầu tại Việt Nam
						chuyên về kinh doanh nhà hàng và cà phê cao cấp là Highlands Coffee và Phở 24, đánh dấu bước phát
						triển vượt bậc của tập đoàn Jolly Fast Food tại Việt Nam.
					</Typography>
					<Typography>
						Hiện nay hệ thống cửa hàng thức ăn nhanh Jolly Fast Food đã có hơn 70 cửa hàng trải dài hầu hết các
						tỉnh thành tại Việt Nam như: Hà Nội, Ninh Bình, Hạ Long, Hải Phòng, Đà Nẵng, Tp.Hồ Chí Minh, Cần Thơ,
						Nha Trang, Vũng Tàu, Bình Dương, Biên Hòa, Rạch Giá, Long Xuyên, Mỹ Tho, Cà Mau…
					</Typography>
					<Typography>
						Với hệ thống quản lý chuyên nghiệp, phục vụ ân cần, món ăn ngon, giá cả hợp lý, Jolly Fast Food Việt
						Nam luôn mong muốn đem lại niềm vui cho tất cả gia đình, đó chính là tiền đề tạo nên sự phát triển bền
						vững của thương hiệu Jolly Fast Food Việt Nam trong những năm sắp tới.
					</Typography>
					<Typography>
						Hiện nay, Jolly Fast Food Việt Nam đang tìm kiếm đối tác Nhượng quyền thương hiệu quan tâm đến kinh
						doanh hệ thống nhà hàng tiêu chuẩn quốc tế, có niềm đam mê và kinh nghiệm về kinh doanh nhà hàng cao
						cấp, khả năng tài chính. Chi tiết xin vui lòng liên hệ:
					</Typography>
				</ScrollShadow>
			</CollapsibleContent>
			<CollapsibleTrigger
				render={
					<Button
						size='lg'
						className='group relative mt-4 w-fit overflow-hidden rounded-full text-base before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-size-[250%_250%,100%_100%] before:bg-position-[200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-position-[-100%_0,0_0] has-[>svg]:px-6 dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]'>
						{open ? 'Thu gọn' : 'Xem thêm'}
						<Icon
							name={open ? 'ArrowUp' : 'ArrowDown'}
							className={cn(
								'transition-transform duration-200',
								open ? 'group-hover:-translate-y-0.5' : 'group-hover:translate-y-0.5'
							)}
						/>
					</Button>
				}
			/>
		</Collapsible>
	)
}

export default AboutUs
