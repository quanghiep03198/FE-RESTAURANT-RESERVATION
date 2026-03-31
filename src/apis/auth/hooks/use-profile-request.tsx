import generateAvatar from '@/common/libs/generate-avatar'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { AxiosError, type AxiosRequestConfig } from 'axios'
import { useEffect, useMemo, useRef } from 'react'
import { AuthService } from '../services'
import useAuth from './use-auth-request'

export const PROFILE_QUERY_KEY = 'PROFILE'

export const getUserProfileQuery = (enabled?: boolean, config?: AxiosRequestConfig) => {
	const unexpectedErrorCodes = [AxiosError.ERR_NETWORK, AxiosError.ETIMEDOUT, AxiosError.ECONNABORTED]

	return queryOptions({
		queryKey: [PROFILE_QUERY_KEY, config],
		queryFn: async () => await AuthService.profile(config),
		refetchOnMount: 'always',
		refetchOnReconnect: 'always',
		networkMode: 'always',
		enabled,
		select: (response) => ({
			...response.metadata,
			avatar: generateAvatar({ name: response.metadata?.full_name })
		}),
		retry: (failureCount, error) => {
			if (unexpectedErrorCodes.includes(error.code)) return enabled
			return failureCount <= 2 && enabled
		}
	})
}

export const useGetUserProfileQuery = () => {
	const { isAuthenticated } = useAuth()
	const abortControllerRef = useRef<AbortController>(null)

	if (!abortControllerRef.current) {
		abortControllerRef.current = new AbortController()
	}

	useEffect(() => {
		if (!isAuthenticated) {
			abortControllerRef.current.abort()
			abortControllerRef.current = null
		}
	}, [isAuthenticated])

	const queryOptions = useMemo(() => {
		return getUserProfileQuery(isAuthenticated, { signal: abortControllerRef.current.signal })
	}, [isAuthenticated, abortControllerRef.current?.signal?.aborted])

	return useQuery(getUserProfileQuery(isAuthenticated, { signal: abortControllerRef.current.signal }))
}
