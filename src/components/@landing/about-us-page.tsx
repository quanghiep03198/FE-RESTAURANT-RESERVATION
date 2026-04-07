import type { Stat } from '@/assets/data/about-us'
import Image from '@/components/shared/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'

const AboutUs = ({ stats }: { stats: Stat[] }) => {
	return (
		<section
			id='about-us'
			className='before:bg-muted relative py-8 before:absolute before:inset-0 before:-z-10 before:skew-y-3 sm:py-16 lg:py-24'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
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
					<Button
						size='lg'
						className='group relative w-fit overflow-hidden rounded-full text-base before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-size-[250%_250%,100%_100%] before:bg-position-[200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-position-[-100%_0,0_0] has-[>svg]:px-6 dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]'
						render={
							<Link href='#'>
								Xem thêm
								<ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
							</Link>
						}
					/>
				</div>

				{/* Video player and stats */}
				<div className='relative mb-8 h-full w-full sm:mb-16 lg:mb-24'>
					<Image
						src='/jollibee-history.webp'
						alt='Hình minh họa về cửa hàng món nhanh'
						className='h-full w-full rounded-lg object-contain brightness-80'
						loading='lazy'
					/>

					{/* Stats card overlapping the video section */}
					<div className='bg-background grid gap-10 rounded-lg border p-8 sm:max-lg:grid-cols-2 lg:absolute lg:-bottom-25 lg:left-1/2 lg:w-4/5 lg:-translate-x-1/2 lg:grid-cols-4 lg:px-10'>
						{stats.map((stat, index) => (
							<div key={index} className='flex flex-col items-center justify-center gap-2.5 text-center'>
								<div className='flex size-7 items-center justify-center [&>svg]:size-7'>
									<Icon name={stat.icon} />
								</div>
								<span className='text-2xl font-semibold'>{stat.value}</span>
								<p className='text-muted-foreground text-lg'>
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

export default AboutUs
