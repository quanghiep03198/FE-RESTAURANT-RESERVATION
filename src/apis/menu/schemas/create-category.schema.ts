import { number, object, string, type infer as Infer } from 'zod'

export const createCategorySchema = object({
	parent_id: number().nullish(),
	name: string({ message: 'Vui lòng nhập tên danh mục' })
		.nonempty({ message: 'Vui lòng nhập tên danh mục' })
		.min(3, 'Tên danh mục phải tối thiểu 3 ký tự'),
	description: string({ message: 'Vui lòng nhập tên danh mục' })
		.nonempty({ message: 'Vui lòng nhập tên danh mục' })
		.min(3, 'Tên danh mục phải tối thiểu 3 ký tự')
		.nullish()
})

export type TCreateCategorySchema = typeof createCategorySchema

export type TCreateCategoryValues = Infer<typeof createCategorySchema>
