import { Typography } from '@mui/material';

const RideStatus = ({
	is_cancelled,
	datetime
}: {
	is_cancelled: boolean;
	datetime: string;
}) => {
	let color, backgroundColor, text;

	if (is_cancelled) {
		color = '#FFEBEE';
		backgroundColor = '#E53935';
		text = 'Cancelled';
	} else if (new Date(datetime) < new Date()) {
		color = '#E0F7FA';
		backgroundColor = '#00ACC1';
		text = 'Active';
	} else {
		color = '#F1F8E9';
		backgroundColor = '#7CB342';
		text = 'Completed';
	}

	return (
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
	);
};

export default RideStatus;
