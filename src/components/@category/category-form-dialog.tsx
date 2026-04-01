import { useCreateOrUpdateCategoryMutation } from '@/apis/menu/hooks/use-category-request'
import { createCategorySchema, type TCreateCategorySchema } from '@/apis/menu/schemas/create-category.schema'
import { updateCategorySchema, type TUpdateCategorySchema } from '@/apis/menu/schemas/update-category.schema'
import { CommonActions } from '@/common/constants/enums'
import { usePageContext } from '@/contexts/event-context'
import { useForm } from '@tanstack/react-form'
import { useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogClose, DialogContent } from '../ui/dialog'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '../ui/field'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const CategoryFormDialog: React.FC = () => {
	const { event$ } = usePageContext()
	const [action, setAction] = useState<CommonActions.CREATE | CommonActions.UPDATE | null>(null)
	const [open, setOpen] = useState<boolean>(!!action)
	const formSchemaRef = useRef<TCreateCategorySchema | TUpdateCategorySchema | undefined>(undefined)

	const mutation = useCreateOrUpdateCategoryMutation(action)

	const form = useForm({
		defaultValues: {
			name: '',
			description: ''
		},
		onSubmit: async ({ value }) => {
			if (typeof mutation?.mutateAsync !== 'function') return
			await mutation.mutateAsync(value)
			setOpen(false)
		},
		validators: { onSubmit: formSchemaRef.current } as FirstParameter<typeof useForm>['validators']
	})

	event$.useSubscription((e) => {
		if (e.action !== CommonActions.CREATE && e.action !== CommonActions.UPDATE) return
		setAction(e.action)
		setOpen(true)
		if (e.action === CommonActions.CREATE) {
			form.reset()
			formSchemaRef.current = createCategorySchema
		} else {
			formSchemaRef.current = updateCategorySchema
			form.reset(e.payload, { keepDefaultValues: true })
		}
	})

	const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		form.handleSubmit()
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className='max-w-2xl'>
				<form onSubmit={handleSubmit}>
					<FieldGroup>
						<FieldSet>
							<FieldLegend>Thông tin mục</FieldLegend>
							<FieldDescription>
								Thông tin này sẽ hiển thị trực tiếp trên giao diện đặt món của khách hàng.
							</FieldDescription>
							<FieldGroup>
								<form.Field
									name='name'
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
										return (
											<Field className='col-span-1 @7xl:col-span-2'>
												<FieldLabel>Tên danh mục</FieldLabel>
												<Input
													id={field.name}
													name={field.name}
													value={field.state.value as string}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													aria-invalid={isInvalid}
													placeholder='Tên danh mục'
													autoComplete='off'
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
											<Field className='xxl:col-span-1 col-span-2'>
												<FieldLabel>Mô tả</FieldLabel>
												<Textarea
													id={field.name}
													name={field.name}
													value={field.state.value as string}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													aria-invalid={isInvalid}
													rows={5}
													placeholder='Mô tả chung về danh mục ...'
													autoComplete='off'
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										)
									}}
								/>
							</FieldGroup>
						</FieldSet>
						<Field orientation='horizontal' className='justify-end'>
							<Button type='submit'>Xác nhận</Button>
							<DialogClose
								render={
									<Button type='button' variant='outline'>
										Hủy
									</Button>
								}
							/>
						</Field>
					</FieldGroup>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default CategoryFormDialog
