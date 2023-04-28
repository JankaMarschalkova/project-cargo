import { Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';

const Rides = () => {
	usePageTitle('Your rides');
	return (
		<>
			<Typography variant="h2">Your rides</Typography>
		</>
	);
};

export default Rides;
