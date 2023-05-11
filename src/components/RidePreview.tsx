import { Box, Card, CardContent, Typography } from '@mui/material';

import { Ride as RideType } from '../firebase';

const RidePreview = ({
	ride,
	isPassenger = true
}: {
	ride: RideType;
	isPassenger?: boolean;
}) => {
	return (
		<Card
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				width: '100%',
				textAlign: 'left',
				my: 2,
				background: '#D5D5D5'
			}}
		>
			<CardContent>
				<Typography variant="h6" fontSize={16}>
					On{' '}
					{new Date(ride.datetime).toLocaleString('en-US', {
						month: 'short',
						day: 'numeric',
						year: 'numeric',
						hour: 'numeric',
						minute: 'numeric',
						hour12: true
					})}
				</Typography>
				<Box>
					<Typography variant="h5" fontWeight="bold" mt={1} mb={2}>
						From {ride.leaving_from} to {ride.going_to}
					</Typography>
					<Typography>Price per person: {ride.price_per_person} €</Typography>

					{isPassenger && <Typography>Driver: {ride.driver}</Typography>}
					{!isPassenger && (
						<>
							<Typography>Available seats: {ride.seats_available}</Typography>
							<Typography>
								Passengers:{' '}
								{ride.passengers.length == 0
									? '(none)'
									: ride.passengers.join(', ')}
							</Typography>
						</>
					)}
				</Box>
				{ride.note && (
					<Typography mt={2} fontStyle="italic">
						{ride.note}
					</Typography>
				)}
			</CardContent>
		</Card>
	);
};

export default RidePreview;
