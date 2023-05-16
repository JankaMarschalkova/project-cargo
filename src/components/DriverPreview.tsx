import { Grid, Paper, Typography } from '@mui/material';
import useLoggedInProfile from '../hooks/useLoggedInProfile';

const DriverPreview = () => {
	const profile = useLoggedInProfile();
	return (
		<Grid minWidth="30rem">
			<Typography variant="h3" fontWeight="bold" align="left" mt={2} mb={4}>
				Driver profile
			</Typography>

			<Paper
				sx={{
					display: 'flex',
					flexDirection: 'column',
					p: 0,
					boxShadow: 'none'
				}}
			>
				<Grid container spacing={2}>
					<Grid container item xs={6} direction="column">
						<Typography fontStyle="italic">Username</Typography>

						<Typography fontStyle="italic" mb={3}>
							Nickname
						</Typography>
						<Typography fontStyle="italic">Age </Typography>
						<Typography fontStyle="italic">Gender </Typography>
						<Typography fontStyle="italic">Phone number </Typography>
						<Typography fontStyle="italic">Car</Typography>
						<Typography fontStyle="italic">Note</Typography>
					</Grid>
					<Grid container item xs={6} direction="column">
						<Typography fontWeight="bold">{profile?.email}</Typography>
						<Typography fontWeight="bold" mb={3}>
							{profile && profile.nickname !== ''
								? profile?.nickname
								: '(empty)'}
						</Typography>

						<Typography fontWeight="bold">
							{profile && profile.age !== 0 ? profile?.age : '(empty)'}
						</Typography>
						<Typography fontWeight="bold">
							{profile && profile.gender !== '' ? profile?.gender : '(empty)'}
						</Typography>
						<Typography fontWeight="bold">
							{profile && profile.phone_number !== ''
								? profile?.phone_number
								: '(empty)'}
						</Typography>
						<Typography fontWeight="bold">
							{profile && profile.car !== '' ? profile?.car : '(empty)'}
						</Typography>
						<Typography fontWeight="bold">
							{profile && profile.note !== '' ? profile?.note : '(empty)'}
						</Typography>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
};

export default DriverPreview;
