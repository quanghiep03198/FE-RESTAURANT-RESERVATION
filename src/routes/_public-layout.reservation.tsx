import { useCreateCustomerReservation } from '@/apis/reservation/hooks/use-reservation-request'
import { createReservationSchema } from '@/apis/reservation/schemas/create-reservation.schema'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet
} from '@/components/ui/field'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { Typography } from '@/components/ui/typography'
import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import { useCookieState } from 'ahooks'
import { format, isBefore, isValid, startOfDay } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useState, type SubmitEventHandler } from 'react'

export const Route = createFileRoute('/_public-layout/reservation')({
	component: RouteComponent
})

function RouteComponent() {
	const [] = useCookieState('my-reservation')
	const [isAgreed, setIsAgreed] = useState<boolean>(false)
	const { mutateAsync, isPending, isSuccess } = useCreateCustomerReservation()
	const [createdReservationCode, setCreatedReservationCode] = useCookieState('my-reservation')

	const form = useForm({
		defaultValues: {
			customer_name: '',
			customer_phone: '',
			guest_count: null,
			reservation_time: null,
			remark: ''
		},
		onSubmit: async ({ value }) => {
			const createdReservation = await mutateAsync(value)
		},
		listeners: {
			onChange: ({ formApi }) => {
				console.log('reservation_time', format(formApi.getFieldValue('reservation_time'), 'yyyy-MM-dd HH:mm'))
				// formApi.getFieldValue('reservation_time')
			}
		},
		validators: {
			onSubmit: createReservationSchema as any
		}
	})

	const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		form.handleSubmit()
	}

	return (
		<>
			<title>Đặt bàn</title>
			<meta name='description' content='Đặt bàn Online chỉ với vài thao tác đơn giản' />

			<section className='relative mx-auto flex w-full flex-col items-center justify-center gap-10 overflow-hidden object-top'>
				<div className='bg-secondary text-secondary-foreground w-full place-content-center p-6 text-center'>
					<Typography variant='h1'>ĐẶT BÀN ONLINE</Typography>
				</div>
				<form className='mx-auto my-10 w-full max-w-3xl rounded-lg p-6 shadow-lg' onSubmit={handleSubmit}>
					<FieldSet>
						<FieldLegend>Thông tin của bạn</FieldLegend>
						<FieldDescription>
							Vui lòng hoàn tất các thông tin dưới đây để chúng tôi có thể phục vụ bạn tốt nhất
						</FieldDescription>
						<FieldGroup className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
							<form.Field name='customer_name'>
								{(field) => {
									const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
									return (
										<Field className='col-start-1 lg:col-span-1'>
											<FieldLabel>Họ và tên</FieldLabel>
											<Input
												name={field.name}
												id={field.name}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												placeholder='Nguyễn Văn A'
											/>

											{isInvalid && <FieldError errors={field.state.meta.errors} />}
										</Field>
									)
								}}
							</form.Field>
							<form.Field name='customer_phone'>
								{(field) => {
									const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
									return (
										<Field className='col-span-full lg:col-span-1 lg:col-start-2'>
											<FieldLabel>Số điện thoại</FieldLabel>
											<Input
												name={field.name}
												id={field.name}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												placeholder='09********'
											/>

											{isInvalid && <FieldError errors={field.state.meta.errors} />}
										</Field>
									)
								}}
							</form.Field>
							<form.Field name='guest_count'>
								{(field) => {
									const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
									return (
										<Field className='col-span-full lg:col-span-1 lg:col-start-1'>
											<FieldLabel>Số lượng khách dự kiến</FieldLabel>
											<Input
												name={field.name}
												id={field.name}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												type='number'
												placeholder='10'
											/>

											{isInvalid && <FieldError errors={field.state.meta.errors} />}
										</Field>
									)
								}}
							</form.Field>
							<form.Field name='reservation_time'>
								{(field) => {
									const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
									return (
										<Field>
											<FieldLabel htmlFor='date-picker-optional'>Thời gian đến dự kiến</FieldLabel>
											<div className='grid grid-cols-[1fr_2fr] gap-x-2'>
												<Input
													type='time'
													id='reservation_time.time'
													step={60 * 30}
													min='10:00'
													max='21:00'
													value={isValid(field.state.value) ? format(field.state.value, 'HH:mm') : ''}
													onChange={(e) => {
														const [hours, minutes] = e.target.value.split(':').map(Number)
														const newDate = field.state.value ? new Date(field.state.value) : new Date()
														newDate.setHours(hours, minutes, 0, 0)
														field.handleChange(newDate)
													}}
													className='bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
												/>
												<Popover>
													<PopoverTrigger
														className='flex-1 basis-full'
														render={
															<Button
																variant='outline'
																id='date-picker-optional'
																aria-selected={!!field.state.value}
																className='text-muted-foreground aria-selected:text-foreground w-full flex-1 justify-start font-normal capitalize'>
																<Icon name='Calendar' />
																{field.state.value
																	? format(field.state.value, 'PPP', { locale: vi })
																	: 'Chọn ngày'}
															</Button>
														}
													/>
													<PopoverContent className='w-auto gap-0 overflow-hidden p-0' align='start'>
														<Calendar
															mode='single'
															selected={field.state.value}
															captionLayout='dropdown'
															defaultMonth={field.state.value}
															disabled={(date) => isBefore(date, startOfDay(new Date()))}
															onSelect={(date) => {
																const newDate = new Date(date)
																if (field.state.value) {
																	newDate.setHours(
																		field.state.value.getHours(),
																		field.state.value.getMinutes() || 0,
																		0,
																		0
																	)
																}
																newDate.setHours(10, 0, 0, 0)
																field.handleChange(newDate)
															}}
														/>
													</PopoverContent>
												</Popover>
											</div>
											{isInvalid && <FieldError errors={field.state.meta.errors} />}
										</Field>
									)
								}}
							</form.Field>
							<form.Field name='remark'>
								{(field) => {
									const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
									return (
										<Field className='col-span-full'>
											<FieldLabel>Ghi chú</FieldLabel>
											<Textarea
												name={field.name}
												id={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												className='field-sizing-fixed'
												rows={5}
												placeholder='Ví dụ: Chúng tôi sẽ mang theo một chiếc bánh sinh nhật, vui lòng chuẩn bị nến và dao cắt bánh. Cảm ơn!'
											/>
											{isInvalid && <FieldError errors={field.state.meta.errors} />}
										</Field>
									)
								}}
							</form.Field>
						</FieldGroup>
						<FieldGroup>
							<Alert>
								<Icon name='CalendarCheck2' />
								<AlertTitle>Chính sách đặt bàn</AlertTitle>
								<AlertDescription className='text-pretty'>
									Trạng thái đặt bàn của được sẽ được tính giữ chỗ trong vòng 1 tiếng trước thời gian đến dự
									kiến. Ngoài ra, bạn sẽ không phải trả bất cứ khoản phí giữ chỗ nào.
								</AlertDescription>
							</Alert>
							<Field orientation='horizontal'>
								<Checkbox id='reservation-agreement-checkbox' onCheckedChange={setIsAgreed} />
								<FieldLabel htmlFor='reservation-agreement-checkbox'>
									Tôi hiểu và đồng ý với chính sách đặt bàn
								</FieldLabel>
							</Field>
							<Field orientation='horizontal'>
								<Button type='submit' size='lg' disabled={!isAgreed || isPending} className='w-full'>
									{isPending && <Spinner />}
									Xác nhận thông tin đặt bàn
								</Button>
							</Field>
						</FieldGroup>
					</FieldSet>
				</form>
			</section>
		</>
	)
}
