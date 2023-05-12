import { Typography } from '@mui/material';

const RideStatus = ({ is_cancelled }: { is_cancelled: boolean }) => (
	<Typography
		fontWeight="bold"
		px={1.3}
		py={0.8}
        mb={-0.5}
		color="#f1f8e9"
		sx={{ backgroundColor: '#7cb342', borderRadius: 1 }}
	>
		{is_cancelled ? 'Cancelled' : 'Active'}
	</Typography>
);

export default RideStatus;
