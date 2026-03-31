import type { IUser } from '@/apis/user/types'
import type { CommonActions } from '@/common/constants/enums'
import { useEventEmitter } from 'ahooks'
import { type EventEmitter } from 'ahooks/lib/useEventEmitter'
import { createContext, use } from 'react'

type EventEmitterValue =
	| { action: CommonActions.CREATE; payload?: never }
	| { action: CommonActions.UPDATE; payload: Partial<IUser> & { role_id: string } }

type TPageContext = {
	event$: EventEmitter<EventEmitterValue>
}

const PageContext = createContext<TPageContext>(null)

export const PageContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const event$ = useEventEmitter<EventEmitterValue>()

	return <PageContext.Provider value={{ event$ }}>{children}</PageContext.Provider>
}

export const usePageContext = () => use(PageContext)
