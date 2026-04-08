import { createCustomerReservationSchema } from '@/apis/reservation/schemas/create-customer-reservation.schema'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import { useCookieState } from 'ahooks'

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
		validators: {
			onSubmit: createCustomerReservationSchema as any
		}
	})

	return (
		<section className='mx-auto w-full max-w-4xl rounded-lg p-6 shadow-md'>
			<form>
				<FieldSet>
					<FieldLegend>Thông tin của bạn</FieldLegend>
					<FieldDescription>
						Vui lòng hoàn tất các thông tin dưới đây để chúng tôi có thể phục vụ bạn tốt nhất
					</FieldDescription>
					<FieldGroup>
						<form.Field name='customer_name'>
							{(field) => (
								<Field>
									<FieldLabel>Họ và tên</FieldLabel>
									<Input
										name={field.name}
										id={field.name}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
								</Field>
							)}
						</form.Field>
					</FieldGroup>
				</FieldSet>
			</form>
		</section>
	)
}
