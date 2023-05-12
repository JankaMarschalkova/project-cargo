import { Box, Grid, Typography } from '@mui/material';

import { Ride as RideType } from '../firebase';

const RideDetail = ({ ride }: { ride: RideType }) => {
	return (
		<Grid
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				width: '100%',
				textAlign: 'left',
				my: 2
			}}
		>
			<Typography variant="h6" fontWeight="bold" mb={0.5}>
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
				<Typography>Available seats: {ride.seats_available - ride.passengers.length}</Typography>

				<Typography>Price per person: {ride.price_per_person} €</Typography>

				<Typography>Driver: {ride.driver}</Typography>
			</Box>
			{ride.note && (
				<Typography mt={2} fontStyle="italic">
					{ride.note}
				</Typography>
			)}
		</Grid>
	);
};

export default RideDetail;
