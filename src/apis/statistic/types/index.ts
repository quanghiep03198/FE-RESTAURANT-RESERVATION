export interface IStatisticSummary {
	filter: {
		year: number
		month: number
		top_limit: number
	}
	revenue: {
		month: {
			label: string
			total_amount: number
		}
		year: {
			label: string
			total_amount: number
		}
	}
	average_service_time: {
		served_sessions: number
		average_minutes: number
		average_hours: number
	}
	top_dishes: Array<{ name: string; image: IImageMetadata | null; quantity_sold: number; revenue_amount: number }>
	top_combos: Array<{
		combo_id: number
		name: string
		image: IImageMetadata | null
		quantity_sold: number
		revenue_amount: number
	}>
}

export interface IRevenueOverallResponse {
	data: Array<{ total_amount: number; date: string }>
}
