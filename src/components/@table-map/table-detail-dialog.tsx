import { updateCartSchema } from '@/apis/cart/schemas/update-cart.schema'
import { useGetCategoriesQuery } from '@/apis/menu/hooks/use-category-request'
import type { IDish } from '@/apis/menu/types'
import { CommonActions } from '@/common/constants/enums'
import { formatCurrency } from '@/common/utils/format-currency'
import { getStorageUrl } from '@/common/utils/get-storage-url'
import { usePageContext } from '@/contexts/event-context'
import { useForm, useStore } from '@tanstack/react-form'
import { Fragment, useEffect, useMemo, useRef, useState, type SubmitEventHandler } from 'react'
import Image from '../shared/image'
import { Button } from '../ui/button'
import {
	Combobox,
	ComboboxCollection,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxInput,
	ComboboxItem,
	ComboboxLabel,
	ComboboxList,
	ComboboxSeparator
} from '../ui/combobox'
import { Dialog, DialogClose, DialogContent, DialogFooter } from '../ui/dialog'
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet
} from '../ui/field'
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '../ui/item'

import { useGetCartByTableQuery, useUpdateCartMutation } from '@/apis/cart/hooks/use-cart-request'
import { useGetCombosQuery } from '@/apis/menu/hooks/use-combo-request'
import type { ITable } from '@/apis/table/types'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '../ui/empty'
import { Icon } from '../ui/icon'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Spinner } from '../ui/spinner'
import { Typography } from '../ui/typography'

const itemTypes = [
	{ label: 'Gọi món', value: 'dish' },
	{ label: 'Combo', value: 'combo' }
]

type TCartItemGroup = {
	name: string
	items: Array<{
		id: number
		name: string
		price: number
		image: string | null
	}>
}

const TableDetailDialog: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false)
	const [totalPrice, setTotalPrice] = useState<number>(0)
	const { event$ } = usePageContext()
	const currentTableIdRef = useRef<number>(null)
	const currentCartIdRef = useRef<number>(null)
	const { data: categories } = useGetCategoriesQuery()
	const { data: cartData } = useGetCartByTableQuery(currentTableIdRef.current)
	const { data: combos } = useGetCombosQuery()

	const { mutateAsync: updateCartAsync, isPending } = useUpdateCartMutation()

	const form = useForm({
		defaultValues: {
			items: []
		},
		listeners: {
			onChangeDebounceMs: 200,
			onChange: ({ formApi }) => {
				const currentItems = formApi.getFieldValue('items')
				console.log('currentItems', currentItems)

				const total = currentItems.reduce((acc, curr) => {
					if (!curr.item_id || !curr.quantity) return acc
					return acc + curr.item_id.price * curr.quantity
				}, 0)

				setTotalPrice(total)
			}
		},
		onSubmit: async ({ value }) => {
			console.log(value)

			await updateCartAsync({
				cart_id: currentCartIdRef.current,
				items: value.items.map((item) => ({
					item_id: item.item_id?.id,
					item_type: item.item_type,
					quantity: item.quantity
				}))
			})
			setOpen(false)
		},
		validators: updateCartSchema as any
	})

	event$.useSubscription((e: { action: CommonActions; payload: ITable & { cart_id: number } }) => {
		if (e.action !== CommonActions.READ) return
		setOpen(true)
		currentTableIdRef.current = e.payload.id
		currentCartIdRef.current = e.payload.cart_id
	})

	console.log(cartData)

	useEffect(() => {
		// if (Array.isArray(cartData?.items)) form.reset(cartData, { keepDefaultValues: true })
	}, [cartData])

	const categoryOptions: TCartItemGroup[] = useMemo(
		() =>
			Array.isArray(categories)
				? categories
						.filter((category) => category.dishes.length > 0)
						.map<TCartItemGroup>((category) => ({
							name: category.name,
							items: category.dishes.map((dish) => ({
								id: dish.id,
								name: dish.name,
								price: dish.price,
								image: dish.image ? getStorageUrl(dish.image.url) : null
							}))
						}))
				: [],
		[categories]
	)

	const comboOptions: TCartItemGroup[] = useMemo(() => {
		if (!Array.isArray(combos)) return []
		return [
			{
				name: 'Combo hiện có',
				items: combos.map((combo) => ({
					id: combo.id,
					name: combo.name,
					price: combo.selling_price,
					image: combo.combo_image ? getStorageUrl(combo.combo_image.url) : null
				}))
			}
		]
	}, [combos])

	const currentItemTypes = useStore(form.store, (state) => state.values.items.map((item) => item?.item_type))

	const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		form.handleSubmit()
	}

	return (
		<Dialog open={open || isPending} onOpenChange={setOpen}>
			<DialogContent className='max-w-4xl sm:max-lg:h-screen sm:max-lg:rounded-none'>
				<form onSubmit={handleSubmit} className='space-y-3'>
					<FieldSet>
						<FieldLegend>Chi tiết gọi món</FieldLegend>
						<FieldDescription>
							Thông tin chi tiết về các món ăn đã gọi, số lượng, và trạng thái của đơn hàng sẽ được hiển thị ở
							đây. Bạn có thể cập nhật trạng thái của đơn hàng hoặc thêm ghi chú nếu cần thiết.
						</FieldDescription>
						<FieldGroup className='xxl:h-[65vh] h-[60vh] overflow-y-auto [scrollbar-gutter:stable]'>
							<form.Field name='items' mode='array'>
								{(field) => {
									const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
									return (
										<Field className='flex-1 basis-full'>
											<FieldLabel aria-required>Gọi món của khách</FieldLabel>
											{field.state.value.length > 0 ? (
												<FieldContent className='flex flex-col gap-y-6 rounded-lg border border-dashed p-4'>
													<div className='grid grid-cols-[1fr_3fr_1fr_auto] gap-x-2 gap-y-6'>
														{field.state.value.map((_, i) => {
															return (
																<Fragment key={i}>
																	<form.Field
																		name={`items[${i}].item_type`}
																		listeners={{
																			onChange: () => form.setFieldValue(`items[${i}].item_id`, null)
																		}}>
																		{(subField) => {
																			const isInvalid =
																				subField.state.meta.isTouched &&
																				!subField.state.meta.isValid
																			return (
																				<Field>
																					<Select
																						items={itemTypes}
																						onValueChange={subField.handleChange}
																						value={subField.state.value as any}>
																						<SelectTrigger>
																							<SelectValue placeholder='Phân loại' />
																						</SelectTrigger>
																						<SelectContent>
																							{itemTypes.map((type) => (
																								<SelectItem key={type.value} value={type.value}>
																									{type.label}
																								</SelectItem>
																							))}
																						</SelectContent>
																					</Select>
																					{isInvalid && (
																						<FieldError errors={subField.state.meta.errors} />
																					)}
																				</Field>
																			)
																		}}
																	</form.Field>
																	<form.Field name={`items[${i}].item_id`}>
																		{(subField) => {
																			const isInvalid =
																				subField.state.meta.isTouched &&
																				!subField.state.meta.isValid

																			console.log(subField.state['item_type'])

																			return (
																				<Field>
																					<Combobox
																						items={
																							currentItemTypes[i] === 'DISH'
																								? categoryOptions
																								: comboOptions
																						}
																						value={subField.state.value as any}
																						onValueChange={subField.handleChange}
																						itemToStringLabel={(itemValue: IDish) => {
																							return itemValue.name
																						}}
																						itemToStringValue={(itemValue: IDish) => {
																							return String(itemValue.id)
																						}}
																						isItemEqualToValue={(itemValue, value) => {
																							return itemValue.id === value.id
																						}}>
																						<ComboboxInput
																							placeholder='Chọn một món ăn/combo'
																							showClear
																						/>
																						<ComboboxContent>
																							<ComboboxEmpty>
																								Không có kết quả phù hợp
																							</ComboboxEmpty>
																							<ComboboxList className='space-y-0.5'>
																								{(
																									group: {
																										name: string
																										items: TCartItemGroup['items']
																									},
																									index: number
																								) => (
																									<ComboboxGroup
																										key={group.name}
																										items={group.items}>
																										<ComboboxLabel>
																											{group.name}
																										</ComboboxLabel>
																										<ComboboxCollection key={group.name}>
																											{(
																												groupItem: TCartItemGroup['items'][number]
																											) => {
																												return (
																													<ComboboxItem
																														key={groupItem.id}
																														value={groupItem}>
																														<Item className='p-0'>
																															<ItemMedia variant='image'>
																																<Image
																																	src={groupItem.image}
																																	alt={groupItem.name}
																																	className='size-20'
																																/>
																															</ItemMedia>
																															<ItemContent>
																																<ItemTitle className='line-clamp-1'>
																																	{groupItem.name}
																																</ItemTitle>
																																<ItemDescription>
																																	{formatCurrency(
																																		groupItem.price
																																	)}
																																</ItemDescription>
																															</ItemContent>
																														</Item>
																													</ComboboxItem>
																												)
																											}}
																										</ComboboxCollection>
																										{index < categories.length - 1 && (
																											<ComboboxSeparator />
																										)}
																									</ComboboxGroup>
																								)}
																							</ComboboxList>
																						</ComboboxContent>
																					</Combobox>
																					{isInvalid && (
																						<FieldError errors={subField.state.meta.errors} />
																					)}
																				</Field>
																			)
																		}}
																	</form.Field>
																	<form.Field name={`items[${i}].quantity`}>
																		{(subField) => {
																			const isInvalid =
																				subField.state.meta.isTouched &&
																				!subField.state.meta.isValid
																			return (
																				<Field>
																					<Input
																						value={subField.state.value as string}
																						onChange={(e) =>
																							subField.handleChange(+e.target.value)
																						}
																						type='number'
																						placeholder='Số lượng'
																					/>{' '}
																					{isInvalid && (
																						<FieldError errors={subField.state.meta.errors} />
																					)}
																				</Field>
																			)
																		}}
																	</form.Field>
																	<Button
																		variant='ghost'
																		size='icon'
																		type='button'
																		onClick={() => field.removeValue(i)}>
																		<Icon name='X' />
																	</Button>
																</Fragment>
															)
														})}
													</div>
													<Button
														type='button'
														className='w-fit! self-center'
														onClick={() => field.pushValue({ item_id: null, quantity: 1 })}>
														<Icon name='Plus' /> Thêm món
													</Button>
												</FieldContent>
											) : (
												<Empty className='h-full flex-1 basis-full border border-dashed'>
													<EmptyHeader>
														<EmptyMedia variant='icon'>
															<Icon name='UtensilsCrossed' />
														</EmptyMedia>
														<EmptyTitle>Chưa có món ăn hoặc combo nào được chọn</EmptyTitle>
														<EmptyDescription>
															Vui lòng thêm món ăn hoặc combo để bắt đầu gọi món cho khách
														</EmptyDescription>
													</EmptyHeader>
													<EmptyContent>
														<Button
															type='button'
															className='w-fit!'
															onClick={() => field.pushValue({ item_id: null, quantity: 1 })}>
															<Icon name='Plus' /> Thêm món
														</Button>
													</EmptyContent>
												</Empty>
											)}
											{isInvalid && <FieldError errors={field.state.meta.errors} />}
										</Field>
									)
								}}
							</form.Field>
						</FieldGroup>
					</FieldSet>

					<div className='bg-secondary text-secondary-foreground col-span-full grid grid-cols-2 rounded-md p-4'>
						<Typography as='span' variant='h3'>
							Tạm tính
						</Typography>
						<Typography as='span' variant='h3' className='text-right'>
							{formatCurrency(totalPrice)}
						</Typography>
					</div>

					<DialogFooter>
						<Button type='button' size='lg' variant='destructive' className='mr-auto'>
							<Icon name='CreditCard' />
							Chốt thanh toán
						</Button>
						<Button type='submit' size='lg' disabled={isPending}>
							{isPending ? <Spinner /> : <Icon name='Check' />}
							{isPending ? 'Đang cập nhật...' : 'Xác nhận'}
						</Button>
						<DialogClose
							render={
								<Button type='button' size='lg' variant='outline'>
									<Icon name='X' />
									Đóng
								</Button>
							}
						/>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default TableDetailDialog
