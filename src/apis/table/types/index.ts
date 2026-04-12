import type { TableStatus } from '../constants'

export interface ITable extends IBaseEntity {
	name: string
	capacity: number
	sort_order: number
	status: TableStatus
}
