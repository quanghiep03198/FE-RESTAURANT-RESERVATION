import type { PaymentStatus } from '@/apis/invoice/constants'
import type { IInvoice } from '@/apis/invoice/types'
import type { CellContext } from '@tanstack/react-table'
import React from 'react'
import { Badge } from '../ui/badge'
import { Icon } from '../ui/icon'
import { paymentStatusMetadata } from './invoice-table-toolbar'

const PaymentStatusBadge: React.FC<CellContext<IInvoice, PaymentStatus>> = ({ getValue }) => {
	const value = getValue()
	const currentStatusMeta = paymentStatusMetadata.find((stt) => stt.value === value)

	return (
		<Badge variant='outline'>
			<Icon name={currentStatusMeta?.icon} stroke={currentStatusMeta.color} />
			{currentStatusMeta.label}
		</Badge>
	)
}

export default PaymentStatusBadge
