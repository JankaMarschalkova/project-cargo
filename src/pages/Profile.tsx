import { Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';

const Profile = () => {
	usePageTitle('Profile');
	return (
		<>
			<Typography variant="h2">Profile</Typography>
		</>
	);
};

export default Profile;
