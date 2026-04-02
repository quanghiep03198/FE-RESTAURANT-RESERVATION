import { Button } from '../ui/button'
import { Icon } from '../ui/icon'
import { SidebarTrigger } from '../ui/sidebar'

const DishFilterSidebarTrigger: React.FC = () => {
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
