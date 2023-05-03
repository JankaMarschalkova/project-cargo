import { Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';
import ButtonLink from '../components/ButtonLink';

const Rides = () => {
	usePageTitle('Your rides');
	const user = useLoggedInUser();

	return (
		<>
			<Typography variant="h2">Your rides</Typography>
			{!user ? (
				<>
					<Typography>
						In order to see your rides, log in first, please
					</Typography>
					<ButtonLink variant="contained" to="/profile">
						Login
					</ButtonLink>
				</>
			) : (
				''
			)}
		</>
	);
};

export default Rides;
