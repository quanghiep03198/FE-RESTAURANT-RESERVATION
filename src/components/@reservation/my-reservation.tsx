import { ReservationStatus } from '@/apis/reservation/constants'
import {
	useCreateCustomerReservation,
	useDeleteReservationMutation
} from '@/apis/reservation/hooks/use-reservation-request'
import { useStoredReservation } from '@/apis/reservation/hooks/use-stored-reservation'
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
import React, { useState } from 'react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	AlertDialogTrigger
} from '../ui/alert-dialog'
import { Spinner } from '../ui/spinner'
import ReservationForm from './reservation-form'

const RESERVATION_STATUS_TEXT = new Map<ReservationStatus, string>([
	[ReservationStatus.PENDING, 'Đang xử lý'],
	[ReservationStatus.COMPLETED, 'Đã hoàn thành'],
	[ReservationStatus.CONFIRMED, 'Đã xác nhận'],
	[ReservationStatus.CANCELED, 'Đã hủy']
])

const MyReservation: React.FC<{ data: IReservation }> = ({ data }) => {
	const [isEditting, setIsEditting] = useState<boolean>(false)
	const mutation = useCreateCustomerReservation()
	const { setStoredReservation } = useStoredReservation()
	if (!data) return null

	return (
		<div className='bg-card mx-auto my-10 grid w-full max-w-360 grid-cols-1 gap-6 rounded-lg p-4 shadow-lg lg:grid-cols-2'>
			<div className='grid place-content-center place-items-center py-10'>
				<div className='animate-in zoom-in-0 fade-in-0 before:bg-success/20 relative mb-6 aspect-square before:absolute before:aspect-square before:size-20 before:rounded-full'>
					<Icon name='CircleCheck' size={80} className='fill-success stroke-white stroke-2' />
				</div>
				<div className='animate-in slide-in-from-bottom-10 fade-in-0 mb-14 space-y-1 text-center duration-300'>
					<Typography variant='h4'>Đặt bàn thành công</Typography>
					<Typography variant='small' className='text-pretty'>
						Chúng tôi đã nhận được yêu cầu đặt bàn của bạn với mã đặt bàn{' '}
						<strong className='uppercase'>{data.reservation_code}</strong>. <br /> Vui lòng giữ mã đặt bàn này để
						kiểm tra trạng thái đặt bàn hoặc chỉnh sửa thông tin đặt bàn nếu cần thiết. Cảm ơn bạn đã sử dụng dịch
						vụ đặt bàn online của chúng tôi!
					</Typography>
				</div>
				<div className='space-x-2'>
					{data.status === ReservationStatus.CANCELED || data.status === ReservationStatus.COMPLETED ? (
						<Button onClick={() => setStoredReservation(null)}>
							<Icon name='Plus' /> Tạo đặt bàn mới
						</Button>
					) : (
						<CancelReservationDialog />
					)}
				</div>
			</div>

			{/* Reservation details card */}

			<div
				className='bg-background animate-in fade-in-0 slide-in-from-right-4 space-y-6 rounded-[inherit] border-none p-6 ring-0 aria-hidden:hidden'
				aria-hidden={isEditting}>
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
							{format(new Date(data?.reservation_time), 'HH:mm', { locale: vi })}
						</Typography>
						<Typography className='capitalize'>
							{format(new Date(data?.reservation_time), 'cccc, dd MMMM, yyyy', { locale: vi })}
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
					<div className='space-y-3'>
						<div className='flex items-center justify-between'>
							<Typography color='muted'>Trạng thái</Typography>
							<Typography className='font-semibold lowercase first-letter:uppercase'>
								{RESERVATION_STATUS_TEXT.get(data.status)}
							</Typography>
						</div>
						<div className='flex items-center justify-between'>
							<Typography color='muted'>Bàn chọn trước</Typography>
							<Typography
								className='font-semibold uppercase aria-invalid:lowercase aria-invalid:first-letter:uppercase'
								aria-invalid={!data.table_code}>
								{data.table_code ?? 'Chưa chọn'}
							</Typography>
						</div>
						<div className='flex items-center justify-between'>
							<Typography color='muted'>Phí giữ chỗ</Typography>
							<Typography className='font-semibold'>{formatCurrency(data.deposit_amount)}</Typography>
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
			<div
				aria-hidden={!isEditting}
				className='bg-background animate-in fade-in-0 slide-in-from-left-4 relative space-y-6 rounded-[inherit] border-none p-6 ring-0 aria-hidden:hidden'>
				<Button
					variant='ghost'
					size='icon'
					className='absolute top-2 right-2 z-10'
					onClick={() => setIsEditting(false)}>
					<Icon name='X' />
				</Button>
				<ReservationForm defaultValues={data} mutation={mutation} />
			</div>
		</div>
	)
}

const CancelReservationDialog: React.FC = () => {
	const { mutateAsync, isPending } = useDeleteReservationMutation()
	const [open, setOpen] = useState<boolean>(false)
	const { storedReservation, setStoredReservation } = useStoredReservation()

	return (
		<AlertDialog open={open || isPending} onOpenChange={setOpen}>
			<AlertDialogTrigger
				render={
					<Button variant='destructive'>
						<Icon name='CalendarX2' /> Hủy đặt bàn
					</Button>
				}
			/>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogMedia className='bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive'>
						<Icon name='Trash2' />
					</AlertDialogMedia>
					<AlertDialogTitle>Hủy đặt bàn?</AlertDialogTitle>
					<AlertDialogDescription>
						Nếu trước thời gian dự kiến 2 tiếng bạn sẽ phải chịu phí hủy đặt bàn tương đương với phí giữ chỗ đã
						thanh toán. Cảm ơn bạn đã thông cảm!
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel variant='outline'>Bỏ qua</AlertDialogCancel>
					<AlertDialogAction
						variant='destructive'
						disabled={isPending}
						onClick={async () =>
							await mutateAsync(storedReservation.code).then(() => setStoredReservation(null))
						}>
						{isPending && <Spinner />}
						Xác nhận hủy
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default MyReservation
