import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { Profile } from '../firebase';

const DriverPreview = ({ profile }: { profile: Profile | null}) => {
	return (
		<>
			<Typography variant="h2" fontWeight="bold">
				Driver profile
			</Typography>

			<Paper
				component="form"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					p: 4,
					gap: 2
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

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						mt: 3,
						gap: 2
					}}
				>
					<Button variant="contained">Back</Button>
				</Box>
			</Paper>
		</>
	);
};

export default DriverPreview;
