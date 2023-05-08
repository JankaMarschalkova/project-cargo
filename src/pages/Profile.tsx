import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import usePageTitle from '../hooks/usePageTitle';
import { FormEvent, useEffect, useState } from 'react';
import {
	signIn,
	signInWithGoogle,
	signOut,
	signUp,
	Profile as ProfileType,
	profilesCollection
} from '../firebase';
import useField from '../hooks/useField';
import useLoggedInUser from '../hooks/useLoggedInUser';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/EditOutlined';
import { onSnapshot } from 'firebase/firestore';

const Profile = () => {
	usePageTitle('Profile');
	const user = useLoggedInUser();
	const [profile, setProfile] = useState<ProfileType | null>(null);

	const navigate = useNavigate();

	const [isSignUp, setSignUp] = useState(false);

	const email = useField('email', true);
	const password = useField('password', true);

	const [submitError, setSubmitError] = useState<string>();

	useEffect(() => {
		if (!user?.email) {
			return;
		}

		onSnapshot(profilesCollection, snapshot => {
			const profiles = snapshot.docs.map(doc => doc.data());
			setProfile(
				profiles.find(profile => profile.email === user?.email) ?? null
			);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<>
			{!user ? (
				<>
					<Typography variant="h2" fontWeight="bold" textAlign="center">
						Login
					</Typography>
					<Paper
						component="form"
						onSubmit={async (e: FormEvent) => {
							e.preventDefault();
							try {
								isSignUp
									? await signUp(email.value, password.value)
									: await signIn(email.value, password.value);
								navigate({ to: '/' });
							} catch (err) {
								setSubmitError(
									(err as { message?: string })?.message ?? 'Unknown error'
								);
							}
						}}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							width: '100%',
							p: 4,
							gap: 2
						}}
					>
						<Button variant="contained" onClick={() => signInWithGoogle()}>
							<img
								src="/google-circle.svg"
								alt="Google logo"
								width="24"
								style={{ marginRight: '0.4em' }}
							/>
							Log in with Google
						</Button>
						<Typography align="center">or using:</Typography>
						<TextField label="Email" {...email.props} type="email" />
						<TextField label="Password" {...password.props} type="password" />
						{submitError && (
							<Typography
								variant="caption"
								textAlign="left"
								sx={{ color: 'error.main' }}
							>
								{submitError}
							</Typography>
						)}
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								mt: 3,
								gap: 2
							}}
						>
							<Button
								type="submit"
								variant="outlined"
								onClick={() => setSignUp(true)}
							>
								Create account
							</Button>
							<Button
								type="submit"
								variant="contained"
								onClick={() => setSignUp(false)}
							>
								Log in
								<LoginIcon sx={{ marginLeft: '0.4em' }} />
							</Button>
						</Box>
					</Paper>
				</>
			) : (
				<>
					<Typography variant="h2" fontWeight="bold">
						Profile
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
								<Typography fontStyle="italic">User name</Typography>

								<Typography fontStyle="italic" mb={3}>
									Nick name
								</Typography>
								<Typography fontStyle="italic">Age </Typography>
								<Typography fontStyle="italic">Gender </Typography>
								<Typography fontStyle="italic">Car</Typography>
								<Typography fontStyle="italic" mb={3}>
									Note
								</Typography>

								<Typography fontStyle="italic">Published rides</Typography>
								<Typography fontStyle="italic">Reserved rides</Typography>
							</Grid>
							<Grid container item xs={6} direction="column">
								<Typography fontWeight="bold">{user.email}</Typography>
								<Typography fontWeight="bold" mb={3}>
									{profile && profile.nickname !== ''
										? profile?.nickname
										: '(empty)'}
								</Typography>

								<Typography fontWeight="bold">
									{profile && profile.age !== 0 ? profile?.age : '(empty)'}
								</Typography>
								<Typography fontWeight="bold">
									{profile && profile.gender !== ''
										? profile?.gender
										: '(empty)'}
								</Typography>
								<Typography fontWeight="bold">
									{profile && profile.car !== '' ? profile?.car : '(empty)'}
								</Typography>
								<Typography fontWeight="bold">{profile?.car}</Typography>
								<Typography fontWeight="bold" mb={3}>
									{profile && profile.note !== '' ? profile?.note : '(empty)'}
								</Typography>

								<Typography fontWeight="bold">
									{profile && profile.published_rides !== 0
										? profile?.published_rides
										: '(empty)'}
								</Typography>
								<Typography fontWeight="bold">
									{profile && profile.reserved_rides !== 0
										? profile?.reserved_rides
										: '(empty)'}
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
							<Button variant="outlined">
								<EditIcon sx={{ marginRight: '0.4em' }} />
								Edit
							</Button>

							<Button variant="contained" onClick={signOut}>
								Logout
								<LogoutIcon sx={{ marginLeft: '0.4em' }} />
							</Button>
						</Box>
					</Paper>
				</>
			)}
		</>
	);
};

export default Profile;
