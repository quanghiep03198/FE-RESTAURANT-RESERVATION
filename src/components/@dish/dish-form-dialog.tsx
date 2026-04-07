import { useCreateOrUpdateDish } from '@/apis/menu/hooks/use-dish-request'
import {
	createDishSchema,
	type TCreateDishSchema,
	type TCreateDishValues
} from '@/apis/menu/schemas/create-dish.schema'
import {
	updateDishSchema,
	type TUpdateDishSchema,
	type TUpdateDishValues
} from '@/apis/menu/schemas/update-dish.schema'
import type { ICategory, IDish } from '@/apis/menu/types'
import { CommonActions } from '@/common/constants/enums'
import { formatCurrency } from '@/common/utils/format-currency'
import { formatTime } from '@/common/utils/format-date-time'
import { usePageContext } from '@/contexts/event-context'
import { useForm } from '@tanstack/react-form'
import { useRef, useState } from 'react'
import { GallaryUpload } from '../customs/gallary-upload'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
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
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

export type EventEmitterValue =
	| { action: CommonActions.CREATE; payload: { category_id: number } }
	| { action: CommonActions; payload: Partial<IDish> & { category_name: string } }

const DishFormDialog: React.FC = () => {
	const { event$ } = usePageContext()
	const [action, setAction] = useState<CommonActions.CREATE | CommonActions.UPDATE | null>(null)
	const [open, setOpen] = useState<boolean>(!!action)
	const formSchemaRef = useRef<TCreateDishSchema | TUpdateDishSchema | undefined>(undefined)
	const currentCategory = useRef<Pick<ICategory, 'id' | 'name'> | null>(null)
	const mutation = useCreateOrUpdateDish(action)

	const form = useForm({
		defaultValues: {
			name: '',
			kitchen_name: '',
			image: null,
			description: '',
			price: 0,
			cost_price: 0,
			original_price: 0,
			unit: '',
			available_from: '07:00',
			available_to: '22:00',
			is_featured: false
		},
		onSubmit: async ({ value }) => {
			const payload = {
				...value,
				...(currentCategory.current?.id && { category_id: currentCategory.current.id }),
				image: value.image.file
			} as TCreateDishValues | TUpdateDishValues
			if (typeof mutation?.mutateAsync !== 'function') return
			await mutation.mutateAsync(payload)
			setOpen(false)
		},
		validators: { onSubmit: formSchemaRef.current as any }
	})

	event$.useSubscription((e: EventEmitterValue) => {
		if (e.action !== CommonActions.CREATE && e.action !== CommonActions.UPDATE) return
		setAction(e.action)
		setOpen(true)
		if (e.action === CommonActions.CREATE) {
			currentCategory.current = e.payload as Pick<ICategory, 'id' | 'name'>
			formSchemaRef.current = createDishSchema
		} else {
			form.reset(
				{
					...e.payload,
					available_from: formatTime(e.payload.available_from),
					available_to: formatTime(e.payload.available_to)
				} as any,
				{
					keepDefaultValues: true
				}
			)
			currentCategory.current = { id: e.payload.category_id, name: e.payload.category_name }
			formSchemaRef.current = updateDishSchema
		}
	})

	const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		form.handleSubmit()
	}

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
			onOpenChangeComplete={(open) => {
				if (!open) form.reset()
			}}>
			<DialogContent className='max-w-4xl'>
				<form onSubmit={handleSubmit}>
					<div className='scrollbar-none! mb-6 max-h-[80vh] overflow-y-auto'>
						<FieldSet>
							<FieldLegend>Thông tin món ăn</FieldLegend>
							<FieldDescription>
								Những thông tin này sẽ giúp khách hàng hiểu rõ hơn về hương vị và thành phần của món ăn trước
								khi đặt hàng.
							</FieldDescription>
							<FieldGroup>
								<form.Field
									name='name'
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
										return (
											<Field>
												<FieldLabel>Tên món</FieldLabel>
												<Input
													id={field.name}
													name={field.name}
													aria-invalid={isInvalid}
													placeholder='Ví dụ: Phở bò tái chín'
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
												/>
												<FieldDescription>
													Tên món ăn hiển thị cho người dùng. Nên ngắn gọn, dễ hiểu và hấp dẫn để thu hút
													khách hàng.
												</FieldDescription>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										)
									}}
								/>
								<Field>
									<FieldLabel>Danh mục</FieldLabel>
									<Input readOnly value={currentCategory.current?.name} />
								</Field>
								<form.Field
									name='image'
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
										return (
											<Field>
												<FieldLabel>Hình ảnh</FieldLabel>
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
								<form.Field
									name='description'
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
										return (
											<Field>
												<FieldLabel>Mô tả</FieldLabel>
												<Textarea
													id={field.name}
													name={field.name}
													aria-invalid={isInvalid}
													value={field.state.value}
													onBlur={field.handleBlur}
													rows={5}
													autoComplete='on'
													className='field-sizing-fixed h-auto'
													placeholder='Ví dụ: Món phở bò đặc trưng với nước dùng thơm ngon, thịt bò mềm và bánh phở dai ngon.'
													onChange={(e) => field.handleChange(e.target.value)}
												/>
												<FieldDescription>
													Mô tả chi tiết về món ăn, bao gồm thành phần, hương vị, cách chế biến,... để
													khách hàng có thể hình dung rõ hơn về món ăn trước khi đặt hàng.
												</FieldDescription>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										)
									}}
								/>
								<div className='grid grid-cols-3 gap-6'>
									<form.Field
										name='cost_price'
										children={(field) => {
											const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
											return (
												<Field>
													<FieldLabel>Giá vốn</FieldLabel>
													<Input
														id={field.name}
														name={field.name}
														aria-invalid={isInvalid}
														value={field.state.value}
														onBlur={field.handleBlur}
														type='number'
														autoComplete='on'
														placeholder={formatCurrency(1000)}
														onChange={(e) => field.handleChange(+e.target.value)}
													/>
													<FieldDescription>
														Giá vốn nội bộ để theo dõi kinh doanh, không phải giá bán cho khách.
													</FieldDescription>
													{isInvalid && <FieldError errors={field.state.meta.errors} />}
												</Field>
											)
										}}
									/>
									<form.Field
										name='price'
										children={(field) => {
											const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
											return (
												<Field>
													<FieldLabel>Giá bán</FieldLabel>
													<Input
														id={field.name}
														name={field.name}
														aria-invalid={isInvalid}
														value={field.state.value}
														onBlur={field.handleBlur}
														type='number'
														autoComplete='on'
														placeholder={formatCurrency(1000)}
														onChange={(e) => field.handleChange(+e.target.value)}
													/>
													<FieldDescription>
														Giá gốc/tham chiếu trước khuyến mãi để phục vụ hiển thị hoặc so sánh.
													</FieldDescription>
													{isInvalid && <FieldError errors={field.state.meta.errors} />}
												</Field>
											)
										}}
									/>
									<form.Field
										name='unit'
										children={(field) => {
											const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
											return (
												<Field>
													<FieldLabel>Đơn vị tính</FieldLabel>
													<Input
														id={field.name}
														name={field.name}
														aria-invalid={isInvalid}
														value={field.state.value}
														onBlur={field.handleBlur}
														placeholder='Ví dụ: đĩa, tô, phần,...'
														autoComplete='on'
														onChange={(e) => field.handleChange(e.target.value)}
													/>
													<FieldDescription>
														Giá gốc/tham chiếu trước khuyến mãi để phục vụ hiển thị hoặc so sánh.
													</FieldDescription>
													{isInvalid && <FieldError errors={field.state.meta.errors} />}
												</Field>
											)
										}}
									/>
								</div>
								<form.Field
									name='is_featured'
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
										return (
											<Field orientation='horizontal' className='rounded-lg border p-4'>
												<Checkbox
													id={field.name}
													name={field.name}
													aria-invalid={isInvalid}
													checked={field.state.value}
													onBlur={field.handleBlur}
													onCheckedChange={field.handleChange}
												/>
												<FieldContent>
													<FieldLabel>Sản phẩm nổi bật</FieldLabel>
													<FieldDescription>
														Đánh dấu món ăn này là nổi bật để ưu tiên hiển thị và thu hút khách hàng.
													</FieldDescription>
												</FieldContent>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										)
									}}
								/>
								<Field className='grid grid-cols-2'>
									<FieldLabel className='row-start-1'>Khung giờ phục vụ</FieldLabel>
									<form.Field
										name='available_from'
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
										name='available_to'
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
					</div>
					<DialogFooter>
						<Button type='submit'>Xác nhận</Button>
						<DialogClose
							render={
								<Button type='submit' variant='secondary'>
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

export default DishFormDialog
