// {
//   "parent_id": null,
//   "name": "Món mới test",
//   "description": "Danh mục món mới thêm vào menu",
//   "sort_order": 10,
//   "is_active": true
// }
import { boolean, type infer as Infer } from 'zod'
import { createCategorySchema } from './create-category.schema'

export const updateCategorySchema = createCategorySchema.extend({ is_active: boolean().optional() }).partial()

export type TUpdateCategorySchema = typeof updateCategorySchema

export type TUpdateCategoryValues = Infer<typeof updateCategorySchema>
