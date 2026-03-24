import type { IUser } from '@/apis/auth/types'
import { shared } from 'use-broadcast-ts'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface IAuthState {
	user: IUser | null
	accessToken: string
	setAccessToken: (accessToken: string) => void
	setProfile: (profile: Partial<IUser>) => void
	resetCredentials: () => void
}

const initialState: Pick<IAuthState, 'user' | 'accessToken'> = { user: null, accessToken: null }

export const useAuthStore = create(
	shared(
		persist<IAuthState>(
			(set, get) => ({
				...initialState,
				setProfile: (profile: IUser) => {
					const state = get()
					set({
						user: {
							...state.user,
							...profile
						}
					})
				},
				setAccessToken: (accessToken) => {
					const state = get()
					set({
						...state,
						accessToken
					})
				},
				resetCredentials: () => {
					set(initialState)
				}
			}),
			{
				name: 'credentials'
			}
		)
	)
)
