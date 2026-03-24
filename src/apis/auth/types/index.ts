type UserRoleCode = 'OWNER' | 'MANAGER' | 'CASHIER' | 'WAITER' | 'KITCHEN'

export interface IUserRole extends IBaseEntity {
	name: string
	code: UserRoleCode
	remark: string
}

export interface IUser extends IBaseEntity {
	user_name: string
	full_name: string
	email: string
	role: IUserRole
}

export type TLoginResponse = {
	access_token: string
	token_type: 'bearer'
	expires_in: number
}
