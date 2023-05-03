import { Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';
import ButtonLink from '../components/ButtonLink';
import useLoggedInUser from '../hooks/useLoggedInUser';

const PublishRide = () => {
	usePageTitle('Publish ride');
	const user = useLoggedInUser();

	return (
		<>
			<Typography variant="h2">Publish rides</Typography>
			{!user ? (
				<>
					<Typography>
						In order to publish rides, log in first, please
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

export default PublishRide;
