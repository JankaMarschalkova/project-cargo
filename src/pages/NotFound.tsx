import { Divider, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

import usePageTitle from '../hooks/usePageTitle';

const NotFound = () => {
	usePageTitle('Not found');

	return (
		<>
			<WarningIcon sx={{ typography: 'h1' }} />
			<Divider/>
			<Typography variant="h2" fontWeight='bold'>Not found</Typography>
		</>
	);
};

export default NotFound;
