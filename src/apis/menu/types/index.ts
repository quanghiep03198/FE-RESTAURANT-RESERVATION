import type { DayInWeek } from '@/common/constants/enums'
import type { ComboTag } from '../constants'

export interface ICategory extends IBaseEntity {
	code: string
	name: string
	total_dishes_qty: number
	description: string
	parent_id: number | null
	dishes: Array<IDish>
	children: Array<ICategory>
}

export interface IDish extends IBaseEntity {
	category_id: number
	slug: string
	name: string
	kitchen_name: string
	description: string
	price: number
	original_price: number | null
	cost_price: number | null
	image: IImageMetadata | null
	unit: string
	is_featured: boolean
	is_new: boolean
	discounted_price: number
	available_from: TTime
	available_to: TTime
}

export interface ICombo extends IBaseEntity {
	name: string
	combo_image: IImageMetadata
	discount_price: number
	selling_price: number
	dishes: Array<IDish & { pivot: { combo_id: number; dish_id: number; quantity: number } }>
	tag: ComboTag
	days_in_week: Array<DayInWeek> // * Ngày áp dụng trong tuần
	start_time: TTime
	end_time: TTime
	start_at: Date
	end_at: Date
	max_use_times: number
}
