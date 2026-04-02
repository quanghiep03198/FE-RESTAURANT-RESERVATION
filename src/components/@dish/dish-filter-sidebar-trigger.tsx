import { Button } from '../ui/button'
import { Icon } from '../ui/icon'
import { SidebarTrigger } from '../ui/sidebar'

type Props = {}

const DishFilterSidebarTrigger = (props: Props) => {
	return (
		<SidebarTrigger
			render={
				<Button variant='ghost' size='icon-sm' className='mr-1'>
					<Icon name='ListFilterPlus' />
				</Button>
			}
		/>
	)
}

export default DishFilterSidebarTrigger
