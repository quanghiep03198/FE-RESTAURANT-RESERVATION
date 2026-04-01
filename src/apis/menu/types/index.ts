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
	description: string
	price: number
	original_price: number | null
	cost_price: number | null
	image_url: string | null
	unit: string
}
