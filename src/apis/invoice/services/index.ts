import { axiosInstance } from '@/configs/axios.config'
import type { TInvoiceValues } from '../schemas'
import type { IInvoice } from '../types'

export class InvoiceService {
	public static async getAll() {
		return await axiosInstance.get<unknown, ResponseBody<IInvoice[]>, void>('/table/invoices')
	}

	public static async insertOne(payload: TInvoiceValues) {
		return await axiosInstance.post('/table/invoices', payload)
	}
}
