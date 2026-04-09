import type { IReservation } from '@/apis/reservation/types'
import { formatCurrency } from '@/common/utils/format-currency'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Separator } from '@/components/ui/separator'
import { Typography } from '@/components/ui/typography'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { padStart } from 'lodash-es'
import React from 'react'

const MyReservation: React.FC<{ data: IReservation }> = ({ data }) => {
	return (
		<div className='bg-card mx-auto my-10 grid w-full max-w-7xl grid-cols-1 gap-6 rounded-lg p-4 shadow-lg lg:grid-cols-2'>
			<div className='grid place-content-center place-items-center py-10'>
				<div className='before:bg-success/20 relative mb-6 aspect-square before:absolute before:aspect-square before:size-20 before:rounded-full'>
					<Icon name='CircleCheck' size={80} className='fill-success stroke-white stroke-2' />
				</div>
				<div className='mb-14 space-y-1 text-center'>
					<Typography variant='h4'>Đặt bàn thành công</Typography>
					<Typography variant='small' className='text-pretty'>
						Chúng tôi đã nhận được yêu cầu đặt bàn của bạn với mã đặt bàn <strong>{data.customer_phone}</strong>.{' '}
						<br /> Vui lòng giữ mã đặt bàn này để kiểm tra trạng thái đặt bàn hoặc chỉnh sửa thông tin đặt bàn nếu
						cần thiết. Cảm ơn bạn đã sử dụng dịch vụ đặt bàn online của chúng tôi!
					</Typography>
				</div>
				<div className='space-x-2'>
					<Button variant='secondary' className='capitalize'>
						Chỉnh sửa thông tin
					</Button>
					<Button className='destructive'>Hủy đặt bàn</Button>
				</div>
			</div>
			{/* Reservation details card */}
			<div className='bg-background space-y-6 rounded-[inherit] border-none p-6 ring-0'>
				<Typography variant='h4' className='mb-6'>
					Thông tin đặt bàn của bạn
				</Typography>
				<div className='grid grid-cols-2 gap-6'>
					<div className='col-span-1 space-y-1'>
						<Typography color='muted' className='capitalize'>
							Họ Tên
						</Typography>
						<Typography className='font-semibold capitalize'>{data.customer_name}</Typography>
					</div>
					<div className='col-span-1 space-y-1'>
						<Typography color='muted' className='capitalize'>
							Số điện thoại
						</Typography>
						<Typography className='font-semibold'>{data.customer_phone}</Typography>
					</div>
					<div className='col-span-1 space-y-1'>
						<Typography color='muted' className='capitalize'>
							Thời gian
						</Typography>
						<Typography className='text-lg font-semibold'>
							{format(new Date(data.reservation_time), 'HH:mm', { locale: vi })}
						</Typography>
						<Typography className='capitalize'>
							{format(new Date(data.reservation_time), 'cccc, dd MMMM, yyyy', { locale: vi })}
						</Typography>
					</div>
					<div className='col-span-1 space-y-1'>
						<Typography color='muted' className='capitalize'>
							Số lượng
						</Typography>
						<Typography className='text-lg font-semibold'>
							{padStart(data.guest_count.toString(), 2, '0')} khách
						</Typography>
					</div>
				</div>
				<Separator />
				<div className='space-y-3'>
					<Typography className='font-semibold'>Tóm tắt dịch vụ</Typography>
					<div className='space-y-2'>
						<div className='flex items-center justify-between'>
							<Typography color='muted'>Phí giữ chỗ</Typography>
							<Typography className='font-semibold'>{formatCurrency(data.deposit_amount)}</Typography>
						</div>
						<div className='flex items-center justify-between'>
							<Typography color='muted'>Bàn chọn trước</Typography>
							<Typography
								className='font-semibold uppercase aria-invalid:lowercase aria-invalid:first-letter:uppercase'
								aria-invalid={!data.table_code}>
								{data.table_code ?? 'Chưa chọn'}
							</Typography>
						</div>
					</div>
				</div>
				<Separator />
				<div className='flex items-center justify-between text-xl'>
					<Typography className='text-lg font-bold'>Tổng tạm tính</Typography>
					<Typography className='text-lg font-bold'>{formatCurrency(data.deposit_amount)}</Typography>
				</div>
				<Alert>
					<Icon name='CalendarCheck2' />
					<AlertTitle>Chính sách Hủy đặt bàn</AlertTitle>
					<AlertDescription className='text-pretty'>
						Bạn có thể hủy đặt bàn miễn phí bất cứ lúc nào trước 2 tiếng so với thời gian đến dự kiến. Sau thời
						gian này, bạn sẽ phải chịu phí hủy đặt bàn tương đương với phí giữ chỗ đã thanh toán. Cảm ơn bạn đã
						thông cảm!
					</AlertDescription>
				</Alert>
			</div>
		</div>
	)
}

export default MyReservation
