import { useCreateOrUpdateTableMutation } from '@/apis/table/hooks/use-table-request'
import { createTableSchema, type TCreateTableSchema } from '@/apis/table/schemas/create-table.schema'
import { updateTableSchema, type TUpdateTableSchema } from '@/apis/table/schemas/update-table.schema.'
import { CommonActions } from '@/common/constants/enums'
import { usePageContext } from '@/contexts/event-context'
import { useForm } from '@tanstack/react-form'
import { useRef, useState, type SubmitEventHandler } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter } from '../ui/dialog'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '../ui/field'
import { Input } from '../ui/input'

const TableFormDialog: React.FC = () => {
	const [action, setAction] = useState<CommonActions.CREATE | CommonActions.UPDATE>(null)
	const [open, setOpen] = useState(action === CommonActions.CREATE || action === CommonActions.UPDATE)
	const mutation = useCreateOrUpdateTableMutation(action)
	const { event$ } = usePageContext()
	const formSchemaRef = useRef<TCreateTableSchema | TUpdateTableSchema>(null)

	const form = useForm({
		defaultValues: {
			name: '',
			capacity: null
		},
		onSubmit: ({ value }) =>
			typeof mutation.mutateAsync === 'function' && mutation.mutateAsync(value).then(() => setOpen(false)),
		validators: { onSubmit: formSchemaRef.current as any }
	})

	event$.useSubscription((e) => {
		if (e.action !== CommonActions.CREATE && e.action !== CommonActions.UPDATE) return
		setAction(e.action)
		setOpen(true)
		if (e.action === CommonActions.CREATE) {
			form.reset()
			formSchemaRef.current = createTableSchema
		} else {
			formSchemaRef.current = updateTableSchema
			form.reset(e.payload, { keepDefaultValues: true })
		}
	})

	const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
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
			<DialogContent className='max-w-xl'>
				<form onSubmit={handleSubmit}>
					<FieldSet>
						<FieldLegend>Thông tin bàn ăn</FieldLegend>
						<FieldDescription>Điền đầy đủ thông tin để tạo mới hoặc cập nhật bàn ăn</FieldDescription>
					</FieldSet>
					<FieldGroup>
						<form.Field name='name'>
							{(field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

								return (
									<Field>
										<FieldLabel htmlFor={field.name}>Tên bàn</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											onBlur={field.handleBlur}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value.toUpperCase())}
											aria-invalid={isInvalid}
											placeholder='B1'
										/>
										<FieldDescription>Đặt tên cho bàn ăn, ví dụ: B1, B2, ...</FieldDescription>
										{isInvalid && <FieldError errors={field.state.meta.errors} />}
									</Field>
								)
							}}
						</form.Field>
						<form.Field name='capacity'>
							{(field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

								return (
									<Field>
										<FieldLabel htmlFor={field.name}>Sức chứa</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(+e.target.value)}
											aria-invalid={isInvalid}
											placeholder='2'
											type='number'
										/>
										<FieldDescription>Số lượng khách tối đa có thể ngồi tại bàn này</FieldDescription>
										{isInvalid && <FieldError errors={field.state.meta.errors} />}
									</Field>
								)
							}}
						</form.Field>

						<DialogFooter>
							<Button type='submit'>Xác nhận</Button>
							<DialogClose
								render={
									<Button type='button' variant='outline'>
										Hủy
									</Button>
								}
							/>
						</DialogFooter>
					</FieldGroup>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default TableFormDialog
