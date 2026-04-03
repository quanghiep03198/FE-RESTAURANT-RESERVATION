import { cn } from '@/common/utils/cn'
import React from 'react'
import { Icon } from '../ui/icon'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	src?: string | null
	alt?: string
	fallbackSize?: number // width & height in px
}

const FallbackIcon: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
	<div
		role='img'
		className={cn('bg-muted/80 text-muted-foreground place-content-center place-items-center', className)}
		{...props}>
		<Icon name='Image' size={28} strokeWidth={1.5} />
	</div>
)

const Image: React.FC<ImageProps> = ({ src, alt = '', className, ...props }) => {
	if (!src) {
		return <FallbackIcon {...{ className, ...props }} />
	}

	return <img src={src} alt={alt} className={cn('object-cover', className)} {...props} />
}

export default Image
