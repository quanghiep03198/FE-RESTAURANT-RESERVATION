export interface ICategory extends IBaseEntity {
	code: string
	name: string
	total_dishes_qty: number
	description: string
	parent_id: number | null
	dishes: Array<IDish>
	children: Array<ICategory>
}

export interface IDish extends IBaseEntity {}
