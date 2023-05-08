import { Paper, Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';
import ButtonLink from '../components/ButtonLink';
import LoginIcon from '@mui/icons-material/Login';

const YourRides = () => {
	usePageTitle('Your rides');
	const user = useLoggedInUser();

	return (
		<>
			<Typography variant="h2" fontWeight="bold">
				Your rides
			</Typography>
			{!user ? (
				<>
					<Typography>
						In order to see your rides, log in first, please
					</Typography>
					<ButtonLink variant="contained" to="/profile">
						Login
						<LoginIcon sx={{ marginLeft: '4em' }} />
					</ButtonLink>
				</>
			) : (
				<Paper
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
						p: 4,
						gap: 2
					}}
				>
					{/* Add car check */}
					<Typography variant="h4" fontWeight="bold">
						As driver
					</Typography>

					<Typography variant="h4" fontWeight="bold">
						As passenger
					</Typography>
				</Paper>
			)}
		</>
	);
};

export default YourRides;
