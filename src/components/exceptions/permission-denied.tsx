import { HttpStatusCode } from 'axios'
import React from 'react'
import { Separator } from '../ui/separator'
import { Typography } from '../ui/typography'

const PermissionDenied: React.FC = () => {
	return (
		<div className='grid min-h-[var(--outlet-wrapper-height,100vh)] w-full place-items-center gap-y-3'>
			<div>
				<div className='flex items-center gap-x-4'>
					<Typography color='destructive' className='font-semibold'>
						{HttpStatusCode.Forbidden}
					</Typography>
					<Separator orientation='vertical' className='h-5 w-0.5' />
					<Typography variant='h4'>Yêu Cầu Quyền Truy Cập</Typography>
				</div>
				<Typography variant='p' className='mt-2 mb-6 text-base leading-7' color='muted'>
					Bạn chưa được cấp quyền thực hiện thao tác này.
				</Typography>
			</div>
		</div>
	)
}

export default PermissionDenied
