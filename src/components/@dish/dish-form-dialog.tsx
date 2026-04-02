import { useCreateOrUpdateDish } from '@/apis/menu/hooks/use-dish-request'
import { createDishSchema, type TCreateDishSchema } from '@/apis/menu/schemas/create-dish.schema'
import { updateDishSchema, type TUpdateDishSchema } from '@/apis/menu/schemas/update-dish.schema'
import { CommonActions } from '@/common/constants/enums'
import { usePageContext } from '@/contexts/event-context'
import { useForm } from '@tanstack/react-form'
import { useRef, useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { FieldDescription, FieldLegend, FieldSet } from '../ui/field'

const DishFormDialog: React.FC = () => {
	const { event$ } = usePageContext()
	const [action, setAction] = useState<CommonActions.CREATE | CommonActions.UPDATE | null>(null)
	const [open, setOpen] = useState<boolean>(!!action)
	const formSchemaRef = useRef<TCreateDishSchema | TUpdateDishSchema | undefined>(undefined)

	const mutation = useCreateOrUpdateDish(action)

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
			formSchemaRef.current = createDishSchema
		} else {
			formSchemaRef.current = updateDishSchema
			form.reset(e.payload, { keepDefaultValues: true })
		}
	})

	const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		form.handleSubmit()
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<form>
					<FieldSet>
						<FieldLegend>Thông tin món ăn</FieldLegend>
						<FieldDescription>
							Những thông tin này sẽ giúp khách hàng hiểu rõ hơn về hương vị và thành phần của món ăn trước khi
							đặt hàng.
						</FieldDescription>
					</FieldSet>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default DishFormDialog
