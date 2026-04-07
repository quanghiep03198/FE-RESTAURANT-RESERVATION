import useAuth from '@/apis/auth/hooks/use-auth-request'
import { getUserProfileQuery } from '@/apis/auth/hooks/use-profile-request'
import { loginSchema, type TLoginFormValues } from '@/apis/auth/schemas/login.schema'
import { AuthService } from '@/apis/auth/services'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { useRef } from 'react'
import { toast } from 'sonner'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Icon } from '../ui/icon'
import { Spinner } from '../ui/spinner'

export function LoginForm() {
	const { accessToken, setAccessToken, setProfile } = useAuth()
	const loginToastRef = useRef<string | number | null>(null)
	const navigate = useNavigate()
	const router = useRouter()
	const queryClient = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: async (payload: TLoginFormValues) => await AuthService.login(payload),
		onMutate: () => {
			loginToastRef.current = toast.loading('Đang xử lý ...')
		},
		onSuccess: async (data) => {
			setAccessToken(data.metadata.access_token)
			toast.success('Đăng nhập thành công !', { id: loginToastRef.current })
			const { metadata } = await queryClient.fetchQuery(getUserProfileQuery(!!accessToken))
			setProfile(metadata)
			router.invalidate({ filter: (d) => d.pathname === '/login' }).then(() => navigate({ to: '/table-map' }))
		},
		onError: () => {
			toast.error('Đăng nhập thất bại', { id: loginToastRef.current })
		}
	})

	const form = useForm({
		defaultValues: { username: '', password: '' },
		onSubmit: async ({ value }) => {
			mutateAsync(value)
		},
		validators: {
			onChange: loginSchema as any
		}
	})

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				form.handleSubmit()
			}}>
			<Card>
				<CardContent>
					<FieldGroup>
						<form.Field
							name='username'
							children={(field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Tài khoản</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder='Tên đăng nhập'
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
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Mật khẩu</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											type='password'
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder='******'
										/>
										{isInvalid && <FieldError errors={field.state.meta.errors} />}
									</Field>
								)
							}}
						/>
					</FieldGroup>
				</CardContent>
				<CardFooter>
					<Field orientation='horizontal'>
						<Button type='submit' className='w-full' size='lg' disabled={isPending}>
							{isPending ? <Spinner /> : <Icon name='LogIn' />}
							Đăng nhập
						</Button>
					</Field>
				</CardFooter>
			</Card>
		</form>
	)
}
