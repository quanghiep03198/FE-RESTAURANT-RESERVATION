import { useCookieState } from 'ahooks'
import { addHours } from 'date-fns'

export const useStoredReservation = () => {
	return useCookieState('my-reservation', {
		expires: addHours(new Date(), 12)
	})
}
