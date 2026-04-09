import { useGetMyReservationQuery } from '@/apis/reservation/hooks/use-reservation-request'
import MyReservation from '@/components/@public-reservation/my-reservation'
import ReservationForm from '@/components/@public-reservation/reservation-form'
import { Spinner } from '@/components/ui/spinner'
import { Typography } from '@/components/ui/typography'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public-layout/reservation')({
	component: RouteComponent
})

function RouteComponent() {
	const { data: myReservation, isLoading } = useGetMyReservationQuery()

	return (
		<>
			<title>Đặt bàn</title>
			<meta name='description' content='Đặt bàn Online chỉ với vài thao tác đơn giản' />

			<section className='relative mx-auto flex w-full flex-col items-center justify-center'>
				<div className='bg-secondary text-secondary-foreground w-full place-content-center p-6 text-center'>
					<Typography variant='h1'>ĐẶT BÀN ONLINE</Typography>
				</div>
				{isLoading ? (
					<div className='place-content-center place-items-center p-10'>
						<Spinner className='size-6' />
					</div>
				) : myReservation ? (
					<MyReservation data={myReservation} />
				) : (
					<ReservationForm defaultValues={myReservation} />
				)}
			</section>
		</>
	)
}
