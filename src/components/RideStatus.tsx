import { Button, Typography } from '@mui/material';
import { Ride as RideType } from '../firebase';

const RideStatus = ({
	ride,
	isPassenger = true
}: {
	ride: RideType;
	isPassenger?: boolean;
}) => {
	let color, backgroundColor, text;

	if (ride.is_cancelled) {
		color = '#FFEBEE';
		backgroundColor = '#E53935';
		text = 'Cancelled';
	} else if (new Date(ride.datetime) >= new Date()) {
		color = '#E0F7FA';
		backgroundColor = '#00ACC1';
		text = 'Active';
	} else {
		color = '#F1F8E9';
		backgroundColor = '#7CB342';
		text = 'Completed';
	}

	const cancelRide = () => {
		console.log('Cancel'); // TODO
	};

	return (
		<>
			<Typography
				fontWeight="bold"
				px={1}
				py={0.5}
				mb={-0.5}
				color={color}
				sx={{ backgroundColor: { backgroundColor }, borderRadius: 1 }}
			>
				{text}
			</Typography>

			{text === 'Active' && !isPassenger && (
				<Button
					sx={{ ml: 1.5, py: 0.5, color: '#E53935' }}
					onClick={cancelRide}
				>
					Cancel ride
				</Button>
			)}
		</>
	);
};

export default RideStatus;
