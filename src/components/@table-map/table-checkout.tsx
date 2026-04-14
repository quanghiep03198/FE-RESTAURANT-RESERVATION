import type { ICart } from '@/apis/cart/types'
import { PaymentMethod } from '@/apis/invoice/constants'
import { useCreateInvoiceMutation } from '@/apis/invoice/hooks/use-invoice-request'
import { invoiceSchema } from '@/apis/invoice/schemas'
import type { IReservation } from '@/apis/reservation/types'
import { contactInfo } from '@/assets/data/contact-us'
import QRCodeImage from '@/assets/images/banking-qr.jpg'
import { formatCurrency } from '@/common/utils/format-currency'
import { getStorageUrl } from '@/common/utils/get-storage-url'
import { useForm } from '@tanstack/react-form'
import { useEffect, useMemo, type SubmitEventHandler } from 'react'
import Image from '../shared/image'
import { Button } from '../ui/button'
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
	FieldTitle
} from '../ui/field'
import { Icon } from '../ui/icon'
import { Input } from '../ui/input'
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '../ui/item'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Separator } from '../ui/separator'
import { Spinner } from '../ui/spinner'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../ui/table'
import { Textarea } from '../ui/textarea'
import { Typography } from '../ui/typography'

type TTableCheckoutProps = {
	data: Partial<ICart> &
		Pick<IReservation, 'reservation_code' | 'customer_name' | 'customer_phone' | 'deposit_amount'> & {
			cart_order_id: number
		}
	onCancel: () => void
	onFinish: () => void
}

const TableCheckout: React.FC<TTableCheckoutProps> = ({ data, onCancel, onFinish }) => {
	const { mutateAsync, isPending } = useCreateInvoiceMutation()

	const form = useForm({
		defaultValues: {
			cart_order_id: data?.cart_order_id,
			customer_name: data?.customer_name,
			customer_phone: data?.customer_phone,
			payment_method: PaymentMethod.CASH,
			paid_amount: null,
			deposit_amount: data?.deposit_amount,
			note: ''
		},
		onSubmit: async ({ value }) => {
			await mutateAsync(value)
			onFinish()
		},
		validators: {
			onSubmit: invoiceSchema as any
		}
	})

	const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		form.handleSubmit()
	}

	useEffect(() => {
		form.setFieldValue('cart_order_id', data?.cart_order_id)
		form.setFieldValue('customer_name', data?.customer_name)
		form.setFieldValue('customer_phone', data?.customer_phone)
		form.setFieldValue('deposit_amount', data?.deposit_amount)
	}, [data?.reservation_code, data?.customer_name, data?.customer_phone])

	const depositAmount = data?.deposit_amount ?? 0

	const tempTotalAmount = useMemo(() => {
		if (!Array.isArray(data.item_list)) return 0
		return data.item_list.reduce((acc, curr) => acc + curr.unit_price * curr.quantity, 0)
	}, [data.item_list])

	const taxAmount = useMemo(() => {
		return (tempTotalAmount - depositAmount) / 10
	}, [tempTotalAmount, depositAmount])

	return (
		<div className='grid w-full grid-cols-2 gap-6'>
			<div className='space-y-6'>
				<div className='flex w-full items-center justify-between'>
					<div className='space-y-1'>
						<Typography as='h1' variant='h2' className='text-primary sour-gummy mb-6! leading-none tracking-wide'>
							Jolly Fast Food
						</Typography>
						<ul className='text-muted-foreground ml-4 list-disc'>
							<li className='text-pretty'>{contactInfo.find((item) => item.slug === 'address')?.description}</li>
							<li className='text-pretty'>{contactInfo.find((item) => item.slug === 'hotline')?.description}</li>
							<li className='text-pretty'>{contactInfo.find((item) => item.slug === 'email')?.description}</li>
						</ul>
					</div>
					<div className='place-items-center rounded-md border p-1'>
						<Image src={QRCodeImage} alt='QR thanh toán' className='aspect-square size-24' />
						<Image
							src='/vnpay-qr-logo.webp'
							alt='QR thanh toán'
							className='max-w-12 object-contain object-center'
						/>
					</div>
				</div>
				<Separator />
				<form onSubmit={handleSubmit} className='w-full space-y-6'>
					<FieldGroup className='scrollbar-none! max-h-[50vh] overflow-y-auto'>
						<FieldSet>
							<FieldLegend>Thông tin khách hàng</FieldLegend>
							<FieldGroup className='grid grid-cols-2'>
								<form.Field name='customer_name'>
									{(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

										return (
											<Field>
												<FieldLabel htmlFor={field.name}>Họ tên Khách hàng</FieldLabel>
												<Input
													id={field.name}
													name={field.name}
													autoCapitalize='on'
													value={field.state.value}
													onBlur={field.handleBlur}
													placeholder='Nguyen Van A'
													onChange={(e) => field.handleChange(e.currentTarget.value)}
													aria-invalid={isInvalid}
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
											<Field>
												<FieldLabel htmlFor={field.name}>Số điện thoại</FieldLabel>
												<Input
													id={field.name}
													name={field.name}
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.currentTarget.value)}
													aria-invalid={isInvalid}
													placeholder='098 *** ****'
													type='tel'
													inputMode='tel'
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										)
									}}
								</form.Field>
							</FieldGroup>
						</FieldSet>
						<FieldSeparator />
						<FieldSet>
							<FieldLegend>Thông tin thanh toán</FieldLegend>
							<FieldDescription>Hình thức thanh toán của khách hàng</FieldDescription>
							<FieldGroup>
								<form.Field name='payment_method'>
									{(field) => (
										<RadioGroup
											value={field.state.value}
											onValueChange={field.handleChange}
											className='xl:grid xl:grid-cols-2'>
											<FieldLabel htmlFor='cash-payment'>
												<Field orientation='horizontal'>
													<Icon name='HandCoins' size={20} className='stroke-muted-foreground' />
													<FieldContent>
														<FieldTitle>Tiền mặt</FieldTitle>
														<FieldDescription>Trả tiền trực tiếp tại quầy thu ngân</FieldDescription>
													</FieldContent>
													<RadioGroupItem value={PaymentMethod.CASH} id='cash-payment' />
												</Field>
											</FieldLabel>
											<FieldLabel htmlFor='transfer-payment'>
												<Field orientation='horizontal'>
													<Icon name='CreditCard' size={20} className='stroke-muted-foreground' />
													<FieldContent>
														<FieldTitle>Chuyển khoản</FieldTitle>
														<FieldDescription>
															Quét mã QR để thanh toán, nhanh chóng và tiện lợi
														</FieldDescription>
													</FieldContent>
													<RadioGroupItem value={PaymentMethod.TRANSFER} id='transfer-payment' />
												</Field>
											</FieldLabel>
										</RadioGroup>
									)}
								</form.Field>
								<form.Field name='paid_amount'>
									{(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

										return (
											<Field>
												<FieldLabel htmlFor={field.name}>Số tiền đã thanh toán</FieldLabel>
												<Input
													id={field.name}
													name={field.name}
													type='number'
													value={field.state.value}
													onBlur={field.handleBlur}
													placeholder={formatCurrency(0)}
													inputMode='numeric'
													onChange={(e) => field.handleChange(+e.currentTarget.value)}
													aria-invalid={isInvalid}
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										)
									}}
								</form.Field>
								<form.Field name='note'>
									{(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

										return (
											<Field>
												<FieldLabel htmlFor={field.name}>Ghi chú</FieldLabel>
												<Textarea
													id={field.name}
													name={field.name}
													value={field.state.value}
													onBlur={field.handleBlur}
													className='field-sizing-fixed'
													rows={5}
													placeholder='Ví dụ: Khách thanh toán qua VISA Napas'
													onChange={(e) => field.handleChange(e.currentTarget.value)}
													aria-invalid={isInvalid}
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										)
									}}
								</form.Field>
							</FieldGroup>
						</FieldSet>
					</FieldGroup>
					<FieldGroup>
						<Field className='bg-card sticky bottom-0 z-10 justify-end' orientation='horizontal'>
							<Button type='button' variant='outline' disabled={isPending} onClick={onCancel}>
								<Icon name='ArrowLeft' />
								Quay về
							</Button>
							<Button type='submit' disabled={isPending}>
								{isPending ? <Spinner /> : <Icon name='Check' />}
								Xác nhận
							</Button>
						</Field>
					</FieldGroup>
				</form>
			</div>

			<div className='bg-background flex flex-col items-stretch rounded-lg p-4'>
				<Typography className='mb-6 text-base font-medium'>Tổng quan hóa đơn</Typography>
				<div className='max-h-full flex-1 basis-full overflow-auto'>
					<Table className='[&_thead_th]:bg-muted [&_tfoot_td:first-child]:text-muted-foreground [&_tfoot_td]:bg-muted [&_thead_th]:text-muted-foreground w-full table-fixed [&_td]:border-x-0 [&_th]:border-x-0'>
						<colgroup>
							<col className='max-w-min' />
							<col className='w-40' />
							<col className='w-40' />
						</colgroup>
						<TableCaption>Các món đã khách gọi</TableCaption>
						<TableHeader className='sticky top-0 z-10'>
							<TableRow>
								<TableHead align='left'>Món/Combo</TableHead>
								<TableHead align='left'>Số lượng</TableHead>
								<TableHead align='left'>Tổng</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array.isArray(data.item_list) && data.item_list.length > 0 ? (
								data.item_list.map((item) => (
									<TableRow>
										<TableCell>
											<Item className='p-0'>
												<ItemMedia variant='image'>
													<Image src={getStorageUrl(item.image?.url)} alt={item.name} />
												</ItemMedia>
												<ItemContent>
													<ItemTitle>{item.name}</ItemTitle>
													<ItemDescription>{formatCurrency(item.unit_price)}</ItemDescription>
												</ItemContent>
											</Item>
										</TableCell>
										<TableCell>
											<span className='inline-flex items-center gap-x-2'>
												<Icon name='X' size={12} className='stroke-muted-foreground' /> {item.quantity}
											</span>
										</TableCell>
										<TableCell>{formatCurrency(tempTotalAmount)}</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={3} align='center' className='text-muted-foreground h-60'>
										Chưa có món nào
									</TableCell>
								</TableRow>
							)}
						</TableBody>
						<TableFooter className='sticky bottom-0 z-10'>
							<TableRow>
								<TableCell>Tạm tính</TableCell>
								<TableCell colSpan={2}>{formatCurrency(tempTotalAmount)}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Trả trước</TableCell>
								<TableCell colSpan={2}>{formatCurrency(depositAmount)}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>VAT (+10%)</TableCell>
								<TableCell colSpan={2}>{formatCurrency(taxAmount)}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Tổng thanh toán</TableCell>
								<TableCell colSpan={2}>{formatCurrency(tempTotalAmount - depositAmount + taxAmount)}</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			</div>
		</div>
	)
}

export default TableCheckout
