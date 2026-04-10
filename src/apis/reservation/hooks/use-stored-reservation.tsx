import { useLocalStorageState } from 'ahooks'
import { isAfter } from 'date-fns'
import { useEffect } from 'react'

export const useStoredReservation = () => {
	const [storedReservation, setStoredReservation] = useLocalStorageState<{ code: string; expired: Date } | null>(
		'my-reservation',
		{
			listenStorageChange: true
		}
	)

	const handleChangeReservation = (value) =>
		setStoredReservation(() => {
			if (!value) localStorage.removeItem('my-reservation')
			return value
		})

	useEffect(() => {
		if (isAfter(new Date(), storedReservation?.expired)) localStorage.removeItem('my-reservation')
	}, [])

	return {
		storedReservation,
		setStoredReservation: handleChangeReservation
	}
}
