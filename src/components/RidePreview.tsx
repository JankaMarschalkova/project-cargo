import { Box, Card, CardContent, Typography } from '@mui/material';

import { Ride as RideType } from '../firebase';

const RidePreview = (ride: RideType) => {
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
				<Typography variant="h5" color="textSecondary" mb={1}>
					{new Date(ride.datetime).toLocaleString('en-US', {
						month: 'short',
						day: 'numeric',
						year: 'numeric',
						hour: 'numeric',
						minute: 'numeric',
						hour12: true
					})}
				</Typography>
				<Box >
					<Typography variant="h6" fontWeight='bold' mb={1}>
						From {ride.leaving_from} to {ride.going_to}
					</Typography>
					<Typography>Available seats: {ride.seats_available}</Typography>
					<Typography>Price per person: {ride.price_per_person} €</Typography>
				</Box>
				{ride.note && <Typography mt={2} fontStyle='italic'>{ride.note}</Typography>}
			</CardContent>
		</Card>
	);
};

export default RidePreview;
