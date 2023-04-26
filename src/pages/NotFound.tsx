import { Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

import usePageTitle from '../hooks/usePageTitle';

const NotFound = () => {
	usePageTitle('Not found');
	return (
		<>
			<WarningIcon sx={{ typography: 'h1' }} />
			<Typography variant="h2">Not found</Typography>
		</>
	);
};

export default NotFound;
