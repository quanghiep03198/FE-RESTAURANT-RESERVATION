// * Các role thực tế sẽ được sử dụng (Chủ nhà hàng, Thu ngân, Phục vụ)
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
	phone?: string
	role: IUserRole
	avatar: string
}
