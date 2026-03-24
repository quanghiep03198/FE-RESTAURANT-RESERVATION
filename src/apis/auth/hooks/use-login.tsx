import { useMutation } from '@tanstack/react-query'
import type { TLoginFormValues } from '../schemas/login.schema'
import { AuthService } from '../services'

export const useLogin = () => {
	return useMutation({
		mutationFn: async (payload: TLoginFormValues) => await AuthService.login(payload)
	})
}
