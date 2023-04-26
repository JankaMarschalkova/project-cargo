import { Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';

const Rides = () => {
	usePageTitle('Rides');
	return (
		<>
			<Typography variant="h2">Rides</Typography>
		</>
	);
};

export default Rides;
