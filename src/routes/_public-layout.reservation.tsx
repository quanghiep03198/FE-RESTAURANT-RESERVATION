import { createCustomerReservationSchema } from '@/apis/reservation/schemas/create-customer-reservation.schema'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
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
import { Textarea } from '@/components/ui/textarea'
import { Typography } from '@/components/ui/typography'
import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import { useCookieState } from 'ahooks'
import { format, isBefore } from 'date-fns'
import { vi } from 'date-fns/locale'

export const Route = createFileRoute('/_public-layout/reservation')({
	component: RouteComponent
})

function RouteComponent() {
	const [] = useCookieState('my-reservation')
	const form = useForm({
		defaultValues: {
			customer_name: '',
			customer_phone: '',
			guest_count: null,
			reservation_time: null,
			remark: ''
		},
		listeners: {
			onChange: ({ formApi }) => {
				console.log('reservation_time', format(formApi.getFieldValue('reservation_time'), 'yyyy-MM-dd HH:mm'))
				// formApi.getFieldValue('reservation_time')
			}
		},
		validators: {
			onSubmit: createCustomerReservationSchema as any
		}
	})

	return (
		<section className='relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-10 overflow-hidden object-top p-6'>
			<Typography variant='h1'>ĐẶT BÀN ONLINE</Typography>
			<Card className='relative z-10 mx-auto w-full max-w-4xl'>
				<CardContent className=''>
					<form>
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
												<FieldDescription>
													Số lượng khách dự kiến để chúng tôi có thể sắp xếp bàn phù hợp
												</FieldDescription>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										)
									}}
								</form.Field>
								<form.Field name='reservation_time'>
									{(field) => {
										return (
											<Field>
												<FieldLabel htmlFor='date-picker-optional'>Thời gian đến dự kiến</FieldLabel>
												<div className='grid grid-cols-[2fr_1fr] gap-x-2'>
													<Popover>
														<PopoverTrigger
															className='flex-1 basis-full'
															render={
																<Button
																	variant='outline'
																	id='date-picker-optional'
																	className='w-full flex-1 justify-between font-normal capitalize'>
																	{field.state.value
																		? format(field.state.value, 'PPP', { locale: vi })
																		: 'Chọn ngày'}
																	<Icon name='ChevronDown' />
																</Button>
															}
														/>
														<PopoverContent className='w-auto gap-0 overflow-hidden p-0' align='start'>
															<Calendar
																mode='single'
																selected={field.state.value}
																captionLayout='dropdown'
																defaultMonth={field.state.value}
																disabled={(date) => isBefore(date, new Date())}
																onSelect={(date) => {
																	const newDate = new Date(date)
																	if (field.state.value) {
																		newDate.setHours(
																			field.state.value.getHours(),
																			field.state.value.getMinutes(),
																			0,
																			0
																		)
																	}
																	field.handleChange(newDate)
																}}
															/>
														</PopoverContent>
													</Popover>
													<Input
														type='time'
														id='reservation_time.time'
														step={60 * 15}
														value={
															field.state.value
																? format(field.state.value, 'HH:mm')
																: format(new Date(), 'HH:mm')
														}
														onChange={(e) => {
															const [hours, minutes] = e.target.value.split(':').map(Number)
															const newDate = field.state.value
																? new Date(field.state.value)
																: new Date()
															newDate.setHours(hours, minutes, 0, 0)
															field.handleChange(newDate)
														}}
														className='bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
													/>
												</div>
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
						</FieldSet>
					</form>
				</CardContent>
			</Card>
		</section>
	)
}
