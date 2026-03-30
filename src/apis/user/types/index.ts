export type TUserRoleCode = 'OWNER' | 'MANAGER' | 'CASHIER' | 'WAITER' | 'KITCHEN'

export interface IUserRole extends IBaseEntity {
	name: string
	code: TUserRoleCode
	remark: string
}

export interface IUser extends IBaseEntity {
	user_name: string
	full_name: string
	email: string
	role: IUserRole
	avatar: string
}
