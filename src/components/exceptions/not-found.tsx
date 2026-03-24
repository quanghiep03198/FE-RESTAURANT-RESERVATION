import { ArrowLeft } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useRouter } from '@tanstack/react-router'
import { HttpStatusCode } from 'axios'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Typography } from '../ui/typography'

export default function NotFoundPage() {
	const router = useRouter()

	return (
		<div className='grid min-h-screen place-items-center px-6 py-24 sm:py-32 xl:px-8'>
			<div>
				<div className='flex items-center gap-x-4'>
					<Typography color='destructive' className='font-semibold'>
						{HttpStatusCode.NotFound}
					</Typography>
					<Separator orientation='vertical' className='h-5 w-0.5' />
					<Typography variant='h4'>Không tìm thấy trang bạn yêu cầu</Typography>
				</div>
				<Typography variant='p' className='mt-2 mb-6 text-base leading-7' color='muted'>
					Trang không tồn tại. Vui lòng kiểm tra lại đường dẫn.
				</Typography>
				<Button variant='link' onClick={() => router.history.back()} className='p-0'>
					<HugeiconsIcon icon={ArrowLeft} />
					Quay lại
				</Button>
			</div>
		</div>
	)
}
