import { useGetCategoriesQuery } from '@/apis/menu/hooks/use-category-request'
import { useCreateOrUpdateComboMutation } from '@/apis/menu/hooks/use-combo-request'
import type { TComboFormValues } from '@/apis/menu/schemas/base-combo.schema'
import { createComboSchema, type TCreateComboSchema } from '@/apis/menu/schemas/create-combo.schema'
import { updateComboSchema, type TUpdateComboSchema } from '@/apis/menu/schemas/update-combo.schema.ts'
import type { ICombo, IDish } from '@/apis/menu/types'
import { CommonActions, DayInWeek } from '@/common/constants/enums'
import { formatCurrency } from '@/common/utils/format-currency'
import { formatDayInWeek, formatStreakDaysInWeek } from '@/common/utils/format-date-time'
import { getStorageUrl } from '@/common/utils/get-storage-url'
import { usePageContext } from '@/contexts/event-context'
import { useForm } from '@tanstack/react-form'
import { omit } from 'lodash-es'
import { Fragment, useMemo, useRef, useState } from 'react'
import { GallaryUpload } from '../customs/gallary-upload'
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
import { DateRangePicker } from '../ui/date-range-picker'
import { Dialog, DialogClose, DialogContent, DialogFooter } from '../ui/dialog'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '../ui/empty'
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet
} from '../ui/field'
import { Icon } from '../ui/icon'
import { Input } from '../ui/input'
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '../ui/item'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Typography } from '../ui/typography'

export type EventEmitterValue =
	| { action: CommonActions.CREATE; payload: { category_id: number } }
	| { action: CommonActions; payload: Partial<ICombo> }

const ComboFormDialog: React.FC = () => {
	const { event$ } = usePageContext()
	const [action, setAction] = useState<CommonActions.CREATE | CommonActions.UPDATE | null>(null)
	const [open, setOpen] = useState<boolean>(!!action)
	const formSchemaRef = useRef<TCreateComboSchema | TUpdateComboSchema | undefined>(undefined)
	const mutation = useCreateOrUpdateComboMutation(action ?? CommonActions.CREATE)
	const { data: categories, isLoading } = useGetCategoriesQuery()
	const dayOptions = Object.values(DayInWeek).map((day) => ({
		label: formatDayInWeek(day),
		value: day
	}))
	const [totalPrice, setTotalPrice] = useState<number>(0)

	const form = useForm({
		defaultValues: {
			name: '',
			discount_price: 0,
			tag: '',
			combo_image: null,
			remark: '',
			// * Thời gian áp dụng chương trình cho Combo
			period: null,
			// * Thời gian mở bán Combo trong tuần
			days_in_week: Object.values(DayInWeek),
			start_time: '07:00',
			end_time: '22:00',
			max_use_times: null,
			dishes: []
		},

		listeners: {
			onChangeDebounceMs: 200,
			onChange: ({ formApi }) => {
				const currentComboDishes = formApi.getFieldValue('dishes')
				const total = currentComboDishes.reduce((acc, curr) => {
					if (!curr.dish || !curr.quantity) return acc
					return acc + curr.dish.price * curr.quantity
				}, 0)
				setTotalPrice(total)
			}
		},
		onSubmit: async ({ value }) => {
			const payload = omit(
				{
					...value,
					combo_image: value.combo_image.file,
					dishes: value.dishes.map((item) => ({ dish_slug: item.dish.slug, quantity: item.quantity })),
					...(value.period &&
						value.period?.from &&
						value.period?.to && { start_at: value.period.from, end_at: value.period.to })
				},
				['period']
			) as TComboFormValues

			if (typeof mutation?.mutateAsync !== 'function') return
			await mutation.mutateAsync(payload as any)
			setOpen(false)
		},
		validators: { onSubmit: formSchemaRef.current as any }
	})

	event$.useSubscription((e: EventEmitterValue) => {
		if (e.action !== CommonActions.CREATE && e.action !== CommonActions.UPDATE) return
		setAction(e.action)
		setOpen(true)
		if (e.action === CommonActions.CREATE) {
			formSchemaRef.current = createComboSchema
		} else {
			form.reset(
				{
					...e.payload,
					dishes: e.payload.dishes.map((dish) => ({
						dish: dish,
						quantity: dish.pivot.quantity
					})),
					...(e.payload.start_at &&
						e.payload.end_at && { period: { from: e.payload.start_at, to: e.payload.end_at } })
				} as any,
				{
					keepDefaultValues: true
				}
			)
			formSchemaRef.current = updateComboSchema
		}
	})

	const categoryOptions = useMemo(
		() =>
			Array.isArray(categories)
				? categories
						.filter((category) => category.dishes.length > 0)
						.map((category) => ({
							name: category.name,
							items: category.dishes.map((dish) => ({
								...dish,
								...(dish.image && {
									image: {
										...dish.image,
										url: getStorageUrl(dish.image.url)
									} satisfies IImageMetadata
								})
							}))
						}))
				: [],
		[categories]
	)

	const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		form.handleSubmit()
	}

	return (
		<Dialog
			open={open || mutation?.isPending}
			onOpenChange={setOpen}
			onOpenChangeComplete={(open) => {
				if (!open) form.reset()
			}}>
			<DialogContent className='max-w-4xl'>
				<form onSubmit={handleSubmit}>
					<FieldGroup className='scrollbar-none! max-h-[80vh] overflow-y-auto pb-6'>
						<FieldSet>
							<FieldLegend>Thông tin Combo</FieldLegend>
							<FieldDescription>
								Điền đầy đủ thông tin để tạo mới một combo hấp dẫn, thu hút khách hàng và tăng doanh thu cho nhà
								hàng của bạn.
							</FieldDescription>
							<FieldGroup>
								<form.Field
									name='name'
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
										return (
											<Field>
												<FieldLabel aria-required>Tên Combo</FieldLabel>
												<Input
													id={field.name}
													name={field.name}
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder='Ví dụ: Happy Sunday'
												/>
												<FieldDescription>Tên combo nên ngắn gọn, dễ nhớ và hấp dẫn.</FieldDescription>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										)
									}}
								/>
								<form.Field
									name='discount_price'
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
										return (
											<Field>
												<FieldLabel aria-required>Trợ giá</FieldLabel>
												<Input
													id={field.name}
													name={field.name}
													value={field.state.value ?? ''}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(Number(e.target.value))}
													placeholder='Giá combo khi áp dụng chương trình'
													type='number'
												/>
												<FieldDescription>
													Giảm giá trên tổng tiền sản phẩm. Bỏ qua nếu không áp dụng triết khấu cho combo
													này
												</FieldDescription>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										)
									}}
								/>
								<form.Field
									name='max_use_times'
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
										return (
											<Field>
												<FieldLabel>Số lượng bán ra</FieldLabel>
												<Input
													id={field.name}
													name={field.name}
													value={field.state.value ?? ''}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(+e.target.value || null)}
													placeholder='Số lượng giới hạn bán ra cho khách hàng'
													type='number'
												/>
												<FieldDescription>
													Bỏ qua nếu không giới hạn số lượng bán ra cho Combo
												</FieldDescription>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										)
									}}
								/>
								<form.Field
									name='tag'
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
										return (
											<Field>
												<FieldLabel aria-required>Tag Combo</FieldLabel>
												<Input
													id={field.name}
													name={field.name}
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder='Ví dụ: Giảm 20%'
												/>
												<FieldDescription>
													Tag combo là một nhãn ngắn gọn, nổi bật thể hiện ưu đãi của combo, giúp thu hút
													sự chú ý của khách hàng.
												</FieldDescription>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										)
									}}
								/>
								<form.Field
									name='remark'
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
										return (
											<Field>
												<FieldLabel>Mô tả Combo</FieldLabel>
												<Textarea
													id={field.name}
													name={field.name}
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													className='field-sizing-fixed'
													rows={5}
													placeholder='Mô tả ngắn gọn về combo, nổi bật ưu đãi và lợi ích cho khách hàng.'
												/>
												<FieldDescription>
													Mô tả combo nên ngắn gọn, hấp dẫn, làm nổi bật ưu đãi và lợi ích của combo để thu
													hút khách hàng.
												</FieldDescription>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										)
									}}
								/>
								<form.Field
									name='combo_image'
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
										return (
											<Field>
												<FieldLabel aria-required>Hình ảnh</FieldLabel>
												<GallaryUpload
													multiple={false}
													{...(field.state.value && {
														defaultImages: [
															{
																name: field.state.value?.['name'],
																id: field.state.value?.['name'],
																url: field.state.value?.['url'],
																size: field.state.value?.['size'],
																type: 'image/webp'
															}
														]
													})}
													onFilesChange={(files) => field.handleChange(files[0])}
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										)
									}}
								/>
								<form.Field name='dishes' mode='array'>
									{(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
										return (
											<Field>
												<FieldLabel aria-required>Món ăn trong Combo</FieldLabel>
												{field.state.value.length > 0 ? (
													<FieldContent className='flex flex-col gap-y-6 rounded-lg border border-dashed p-4'>
														<div className='grid grid-cols-[1fr_1fr_auto] gap-x-4 gap-y-2'>
															{field.state.value.map((_, i) => {
																return (
																	<Fragment key={i}>
																		<form.Field name={`dishes[${i}].dish`}>
																			{(subField) => {
																				const isInvalid =
																					subField.state.meta.isTouched &&
																					!subField.state.meta.isValid
																				return (
																					<Field>
																						<Combobox
																							items={categoryOptions}
																							value={subField.state.value as any}
																							onValueChange={subField.handleChange}
																							itemToStringLabel={(itemValue: IDish) =>
																								itemValue.name
																							}
																							itemToStringValue={(itemValue: IDish) =>
																								itemValue.slug
																							}
																							isItemEqualToValue={(itemValue, value) => {
																								return itemValue.slug === value.slug
																							}}>
																							<ComboboxInput
																								placeholder='Chọn một món ăn'
																								showClear
																							/>
																							<ComboboxContent>
																								<ComboboxEmpty>
																									Không có kết quả phù hợp
																								</ComboboxEmpty>
																								<ComboboxList className='space-y-0.5'>
																									{(
																										category: {
																											name: string
																											items: IDish[]
																										},
																										index: number
																									) => (
																										<ComboboxGroup
																											key={category.name}
																											items={category.items}>
																											<ComboboxLabel>
																												{category.name}
																											</ComboboxLabel>
																											<ComboboxCollection
																												key={category.name}>
																												{(dish: IDish) => {
																													return (
																														<ComboboxItem
																															key={dish.slug}
																															value={dish}>
																															<Item className='p-0'>
																																<ItemMedia variant='image'>
																																	<Image
																																		src={
																																			dish.image?.url
																																		}
																																		alt={dish.name}
																																		className='size-20'
																																	/>
																																</ItemMedia>
																																<ItemContent>
																																	<ItemTitle className='line-clamp-1'>
																																		{dish.name}
																																	</ItemTitle>
																																	<ItemDescription>
																																		{formatCurrency(
																																			dish.price
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
																		<form.Field name={`dishes[${i}].quantity`}>
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
															onClick={() => field.pushValue({ dish_slug: null, quantity: 1 })}>
															<Icon name='Plus' /> Thêm món
														</Button>
														<FieldSeparator />
														<div className='bg-accent text-accent-foreground col-span-full grid grid-cols-[1fr_1fr_auto] rounded-lg p-4'>
															<Typography className='font-medium'>Tổng tiền</Typography>
															<Typography className='col-span-2 font-medium'>
																{formatCurrency(totalPrice)}
															</Typography>
														</div>
													</FieldContent>
												) : (
													<Empty className='border border-dashed'>
														<EmptyHeader>
															<EmptyMedia variant='icon'>
																<Icon name='UtensilsCrossed' />
															</EmptyMedia>
															<EmptyTitle>Chưa có món ăn nào được thêm vào combo</EmptyTitle>
															<EmptyDescription>
																Có vẻ như combo bạn đang tạo chưa có món ăn nào. Hãy thêm món ăn vào
																combo để thu hút khách hàng.
															</EmptyDescription>
														</EmptyHeader>
														<EmptyContent>
															<Button
																type='button'
																className='w-fit!'
																onClick={() => field.pushValue({ dish_slug: null, quantity: 1 })}>
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
								<div className='grid gap-x-4 gap-y-6 xl:grid-cols-2'>
									<form.Field
										name='period'
										children={(field) => {
											const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
											return (
												<Field>
													<FieldLabel>Thời gian áp dụng chương trình</FieldLabel>
													<DateRangePicker
														triggerProps={{
															className: 'max-w-full',
															'aria-invalid': isInvalid
														}}
														calendarProps={{
															selected: field.state.value,
															onSelect: field.handleChange
														}}
													/>
													<FieldDescription>
														Bỏ qua nếu chương trình không giới hạn về thời gian.
													</FieldDescription>
													{isInvalid && <FieldError errors={field.state.meta.errors} />}
												</Field>
											)
										}}
									/>
									<form.Field
										name='days_in_week'
										children={(field) => {
											const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
											return (
												<Field>
													<FieldLabel>Ngày áp dụng trong tuần</FieldLabel>
													<Select
														multiple={true}
														value={field.state.value}
														items={dayOptions}
														onValueChange={(value) => field.handleChange(value)}>
														<SelectTrigger>
															<SelectValue
																placeholder='Các ngày áp dụng trong tuần'
																children={formatStreakDaysInWeek(field.state.value)}
															/>
														</SelectTrigger>
														<SelectContent>
															{dayOptions.map((day) => (
																<SelectItem key={day.value} value={day.value}>
																	{day.label}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FieldDescription>
														Chọn các ngày trong tuần mà combo này được áp dụng.
													</FieldDescription>
													{isInvalid && <FieldError errors={field.state.meta.errors} />}
												</Field>
											)
										}}
									/>
								</div>
								<Field className='grid grid-cols-2'>
									<FieldLabel className='row-start-1'>Khung giờ phục vụ</FieldLabel>
									<form.Field
										name='start_time'
										children={(field) => {
											const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
											return (
												<Field orientation='horizontal' className='row-start-2'>
													<FieldLabel>Từ</FieldLabel>
													<Input
														type='time'
														name={field.name}
														id={field.name}
														value={field.state.value}
														step={60}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
													/>
													{isInvalid && <FieldError errors={field.state.meta.errors} />}
												</Field>
											)
										}}
									/>
									<form.Field
										name='end_time'
										children={(field) => {
											const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
											return (
												<Field orientation='horizontal' className='row-start-2'>
													<FieldLabel>Đến</FieldLabel>
													<Input
														type='time'
														name={field.name}
														id={field.name}
														value={field.state.value}
														step={60}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
													/>
													{isInvalid && <FieldError errors={field.state.meta.errors} />}
												</Field>
											)
										}}
									/>
								</Field>
							</FieldGroup>
						</FieldSet>
					</FieldGroup>
					<DialogFooter>
						<Button type='submit' disabled={mutation?.isPending}>
							Lưu lại
						</Button>
						<DialogClose
							render={
								<Button
									variant='secondary'
									onClick={() => {
										setOpen(false)
									}}>
									Hủy
								</Button>
							}
						/>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default ComboFormDialog
