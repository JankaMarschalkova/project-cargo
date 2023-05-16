import { Divider, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

import usePageTitle from '../hooks/usePageTitle';

const NotFound = () => {
	usePageTitle('Not found');

	return (
		<>
			<WarningIcon
				sx={{
					color: '#FFFFFF',
					background: '#469597',
					p: 1,
					borderRadius: 1,
					border: '2px solid',
					typography: 'h1'
				}}
				style={{ WebkitTextStroke: 'white 1px' }}
			/>
			<Divider />
			<Typography
				variant="h2"
				fontWeight="bold"
				fontSize={70}
				color="#469597"
				style={{ WebkitTextStroke: 'white 1px' }}
			>
				Not found
			</Typography>
		</>
	);
};

export default NotFound;
