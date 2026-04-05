import { useCreateOrUpdateCombo } from '@/apis/menu/hooks/use-combo-request'
import { useGetDishesQuery } from '@/apis/menu/hooks/use-dish-request'
import { createComboSchema, type TCreateComboSchema } from '@/apis/menu/schemas/create-combo.schema'
import { updateComboSchema, type TUpdateComboSchema } from '@/apis/menu/schemas/update-combo.schema.ts'
import type { ICombo, IDish } from '@/apis/menu/types'
import { CommonActions, DayInWeek } from '@/common/constants/enums'
import { formatCurrency } from '@/common/utils/format-currency'
import { formatDayInWeek, formatStreakDaysInWeek, formatTime } from '@/common/utils/format-time'
import { usePageContext } from '@/contexts/event-context'
import { useForm } from '@tanstack/react-form'
import { useRef, useState } from 'react'
import { GallaryUpload } from '../customs/gallary-upload'
import Image from '../shared/image'
import { Button } from '../ui/button'
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from '../ui/combobox'
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
	FieldSet
} from '../ui/field'
import { Icon } from '../ui/icon'
import { Input } from '../ui/input'
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '../ui/item'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'

export type EventEmitterValue =
	| { action: CommonActions.CREATE; payload: { category_id: number } }
	| { action: CommonActions; payload: Partial<ICombo> }

const ComboFormDialog: React.FC = () => {
	const { event$ } = usePageContext()
	const [action, setAction] = useState<CommonActions.CREATE | CommonActions.UPDATE | null>(null)
	const [open, setOpen] = useState<boolean>(!!action)
	const formSchemaRef = useRef<TCreateComboSchema | TUpdateComboSchema | undefined>(undefined)
	const mutation = useCreateOrUpdateCombo(action ?? CommonActions.CREATE)
	const { data: dishes, isLoading } = useGetDishesQuery()
	const dayOptions = Object.values(DayInWeek).map((day) => ({
		label: formatDayInWeek(day),
		value: day
	}))

	const form = useForm({
		defaultValues: {
			name: '',
			combo_price: null,
			tag: '',
			combo_image: null,
			remark: '',
			// * Thời gian áp dụng chương trình cho Combo
			promotion_validity_dates: null,
			// * Thời gian mở bán Combo trong tuần
			days_in_week: Object.values(DayInWeek),
			start_time: '07:00',
			end_time: '22:00',
			max_use_times: 100,
			dishes: []
		},
		onSubmit: async ({ value }) => {
			const payload = {
				...value,
				combo_image: value.combo_image.file
			}
			console.log('submitted payload', payload)

			// if (typeof mutation?.mutateAsync !== 'function') return
			// await mutation.mutateAsync(payload)
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
					start_time: formatTime(e.payload.start_time),
					end_time: formatTime(e.payload.end_time)
				} as any,
				{
					keepDefaultValues: true
				}
			)
			formSchemaRef.current = updateComboSchema
		}
	})

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
												<FieldLabel>Tên Combo</FieldLabel>
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
									name='combo_price'
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
										return (
											<Field>
												<FieldLabel>Giá Combo</FieldLabel>
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
													Giá combo là giá bán ưu đãi khi khách hàng mua các món trong combo cùng nhau.
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
												<FieldLabel>Tag Combo</FieldLabel>
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
										return (
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
										)
									}}
								/>
								<form.Field name='dishes' mode='array'>
									{(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
										return (
											<Field>
												<FieldLabel>Món ăn trong Combo</FieldLabel>
												{field.state.value.length > 0 ? (
													<FieldContent className='space-y-6 rounded-lg border border-dashed p-4'>
														<div className='grid grid-cols-[1fr_1fr_auto] gap-x-4 gap-y-2'>
															{field.state.value.map((_, i) => {
																return (
																	<>
																		<form.Field key={i} name={`dishes[${i}].dish_slug`}>
																			{(subField) => {
																				return (
																					<Combobox
																						items={dishes}
																						value={subField.state.value as IDish}
																						onValueChange={subField.handleChange}
																						itemToStringLabel={(itemValue: IDish) =>
																							itemValue.name
																						}
																						itemToStringValue={(itemValue: IDish) =>
																							itemValue.slug
																						}>
																						<ComboboxInput
																							placeholder='Chọn một món ăn'
																							showClear
																						/>
																						<ComboboxContent>
																							<ComboboxEmpty>
																								Không có kết quả phù hợp
																							</ComboboxEmpty>
																							<ComboboxList>
																								{(item: IDish) => (
																									<ComboboxItem key={item.slug} value={item}>
																										<Item>
																											<ItemMedia variant='image'>
																												<Image
																													src={item.image?.url}
																													alt={item.name}
																												/>
																											</ItemMedia>
																											<ItemContent>
																												<ItemTitle className='line-clamp-1'>
																													{item.name}
																												</ItemTitle>
																												<ItemDescription>
																													{formatCurrency(item.price)}
																												</ItemDescription>
																											</ItemContent>
																										</Item>
																									</ComboboxItem>
																								)}
																							</ComboboxList>
																						</ComboboxContent>
																					</Combobox>
																				)
																			}}
																		</form.Field>
																		<form.Field key={i} name={`dishes[${i}].quantity`}>
																			{(subField) => {
																				return (
																					<Input
																						value={subField.state.value as string}
																						onChange={(e) =>
																							subField.handleChange(e.target.value)
																						}
																						type='number'
																						placeholder='Số lượng'
																					/>
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
																	</>
																)
															})}
														</div>

														<Button
															type='button'
															className='w-fit! self-center'
															onClick={() => field.pushValue({ name: '', age: 0 })}>
															<Icon name='Plus' /> Thêm món
														</Button>
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
																onClick={() => field.pushValue({ name: '', age: 0 })}>
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
										name='promotion_validity_dates'
										children={(field) => {
											const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
											return (
												<Field>
													<FieldLabel>Thời gian áp dụng chương trình</FieldLabel>
													<DateRangePicker
														triggerProps={{
															'aria-invalid': isInvalid,
															'aria-describedby': isInvalid ? `${field.name}-error` : undefined
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
