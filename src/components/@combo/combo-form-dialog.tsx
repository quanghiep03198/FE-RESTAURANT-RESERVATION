import { useForm } from '@tanstack/react-form'
import { Dialog, DialogContent } from '../ui/dialog'

const ComboFormDialog: React.FC = () => {
	const form = useForm({
		defaultValues: {
			name: '',
			combo_price: null,
			tag: '',
			remark: '',
			// * Thời gian áp dụng chương trình cho Combo
			start_at: null,
			end_at: null,
			// * Thời gian mở bán Combo trong tuần
			days_in_week: [],
			start_time: '',
			end_time: '',
			max_use_times: 100,
			dishes: []
		}
	})

	return (
		<Dialog>
			<DialogContent></DialogContent>
		</Dialog>
	)
}

export default ComboFormDialog
