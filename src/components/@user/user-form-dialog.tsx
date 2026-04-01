import { useGetRolesQuery } from '@/apis/user/hooks/use-role-request'
import { useCreateOrUpdateUserMutataion } from '@/apis/user/hooks/use-user-request'
import { createUserSchema, type TCreateUserSchema } from '@/apis/user/schemas/create-user.schema'
import { updateUserSchema, type TUpdateUserSchema } from '@/apis/user/schemas/update-user.schema'
import { CommonActions } from '@/common/constants/enums'
import { usePageContext } from '@/contexts/event-context'
import { useForm } from '@tanstack/react-form'
import React, { useMemo, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogClose, DialogContent } from '../ui/dialog'
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet
} from '../ui/field'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'

const DEFAULT_FORM_VALUES = Object.freeze({
	user_name: '',
	password: '',
	phone: '',
	full_name: '',
	email: '',
	role: ''
})

const UserFormDialog: React.FC = () => {
	const { event$ } = usePageContext()
	const [action, setAction] = useState<CommonActions.CREATE | CommonActions.UPDATE | null>(null)
	const [open, setOpen] = useState<boolean>(!!action)
	const formSchemaRef = useRef<TCreateUserSchema | TUpdateUserSchema | undefined>(undefined)

	const { data: roles } = useGetRolesQuery()
	const mutation = useCreateOrUpdateUserMutataion(action)

	const form = useForm({
		defaultValues: DEFAULT_FORM_VALUES,
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
			formSchemaRef.current = createUserSchema
		} else {
			formSchemaRef.current = updateUserSchema
			form.reset(e.payload, { keepDefaultValues: true })
		}
	})

	const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		form.handleSubmit()
	}

	const roleOptions: readonly {
		label: string
		value: string
	}[] = useMemo(() => {
		return Array.isArray(roles) ? roles.map((role) => ({ label: role.name, value: String(role.id) })) : []
	}, [roles])

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
			onOpenChangeComplete={(open) => {
				if (!open) {
					form.reset()
					setAction(null)
				}
			}}>
			<DialogContent className='@container max-w-2xl'>
				<form onSubmit={handleSubmit} className='space-y-6'>
					<FieldGroup>
						<FieldSet>
							<FieldLegend>Thông tin đăng nhập</FieldLegend>
							<FieldDescription>
								Người dùng sẽ sử dụng thông tin này để đăng nhập vào tài khoản.
							</FieldDescription>
							<FieldGroup className='xxl:grid-cols-2 grid grid-cols-1'>
								<form.Field
									name='user_name'
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
										return (
											<Field className='col-span-1 @7xl:col-span-2'>
												<FieldLabel>Tài khoản</FieldLabel>
												<Input
													id={field.name}
													name={field.name}
													value={field.state.value as string}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													aria-invalid={isInvalid}
													placeholder='Tên đăng nhập'
													autoComplete='off'
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										)
									}}
								/>
								<form.Field
									name='password'
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
										return (
											<Field className='xxl:col-span-1 col-span-2'>
												<FieldLabel>Mật khẩu</FieldLabel>
												<Input
													id={field.name}
													name={field.name}
													value={field.state.value as string}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													aria-invalid={isInvalid}
													placeholder='******'
													type='password'
													autoComplete='off'
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										)
									}}
								/>
								<form.Field
									name='role_id'
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
										return (
											<Field data-invalid={isInvalid} className='col-span-2'>
												<FieldLabel>Vai trò</FieldLabel>
												<Select
													name={field.name}
													items={roleOptions}
													value={field.state.value}
													onValueChange={({ value }: Record<'label' | 'value', string>) =>
														field.handleChange(value)
													}>
													<SelectTrigger aria-invalid={isInvalid}>
														<SelectValue placeholder='Chọn vai trò' />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															<SelectLabel>Vai trò</SelectLabel>
															{roleOptions.length > 0 ? (
																roleOptions.map((role) => (
																	<SelectItem key={role.value} value={role}>
																		{role.label}
																	</SelectItem>
																))
															) : (
																<SelectItem disabled>Không có dữ liệu</SelectItem>
															)}
														</SelectGroup>
													</SelectContent>
												</Select>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										)
									}}
								/>
							</FieldGroup>
						</FieldSet>
						<FieldSeparator />
						<FieldSet>
							<FieldLegend>Thông tin cá nhân</FieldLegend>
							<FieldDescription>Thông tin liên hệ của người dùng hiển thị trên ứng dụng</FieldDescription>
							<FieldGroup className='xxl:grid-cols-2! grid grid-cols-1'>
								<form.Field
									name='full_name'
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
										return (
											<Field className='col-span-2'>
												<FieldLabel>Họ tên</FieldLabel>
												<Input
													id={field.name}
													name={field.name}
													value={field.state.value as string}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													aria-invalid={isInvalid}
													type='text'
													placeholder='Nguyễn Văn A'
													autoComplete='off'
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										)
									}}
								/>
								<form.Field
									name='email'
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
										return (
											<Field className='xxl:col-span-1 col-span-2'>
												<FieldLabel>Email</FieldLabel>
												<Input
													id={field.name}
													name={field.name}
													value={field.state.value as string}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													aria-invalid={isInvalid}
													placeholder='example@gmail.com'
													autoComplete='off'
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										)
									}}
								/>
								<form.Field
									name='phone'
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
										return (
											<Field className='xxl:col-span-1 col-span-2'>
												<FieldLabel>Số điện thoại</FieldLabel>
												<Input
													id={field.name}
													name={field.name}
													value={field.state.value as string}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													aria-invalid={isInvalid}
													placeholder='******'
													autoComplete='off'
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										)
									}}
								/>
							</FieldGroup>
						</FieldSet>
					</FieldGroup>
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
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default UserFormDialog
