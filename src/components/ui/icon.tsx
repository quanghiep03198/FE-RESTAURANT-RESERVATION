import * as icon from '@hugeicons/core-free-icons'
import { HugeiconsIcon, type HugeiconsIconProps } from '@hugeicons/react'

export const Icon: React.FC<HugeiconsIconProps & { icon: keyof typeof icon }> = ({ name, ...props }) => {
	return <HugeiconsIcon icon={icon[name]} {...props} />
}
