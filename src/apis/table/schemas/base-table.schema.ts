import { number, object, string } from 'zod'

export const baseTableSchema = object({
	name: string({ message: 'Vui lòng điền tên bàn' }).nonempty({ message: 'Vui lòng điền tên bàn' }),
	capacity: number({ message: 'Vui lòng nhập sức chứa của bàn' }).min(2, { message: 'Sức chứa tối thiểu là 2' })
})
