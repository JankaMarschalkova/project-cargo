import {
	Box,
	Button,
	Divider,
	Grid,
	Paper,
	TextField,
	Typography
} from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import usePageTitle from '../hooks/usePageTitle';
import { FormEvent, useEffect, useState } from 'react';
import {
	signIn,
	signInWithGoogle,
	signOut,
	signUp,
	Profile as ProfileType,
	profilesCollection,
	profilesDocument
} from '../firebase';
import useField from '../hooks/useField';
import useLoggedInUser from '../hooks/useLoggedInUser';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/EditOutlined';
import { onSnapshot, setDoc } from 'firebase/firestore';

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

	const editProfile = () => navigate({ to: '/edit-profile' });

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
								await setDoc(profilesDocument(email.value), {
									email: email.value,
									nickname: profile?.nickname,
									age: profile?.age,
									gender: profile?.gender,
									phone_number: profile?.phone_number,
									car: profile?.car,
									published_rides: profile?.published_rides,
									reserved_rides: profile?.reserved_rides,
									note: profile?.note
								});
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
						<Typography variant="h5" fontWeight="bold">
							Statistics
						</Typography>

						<Grid container spacing={2} mb={2}>
							<Grid container item xs={6} direction="column">
								<Typography fontStyle="italic">
									Published rides (total)
								</Typography>
								<Typography fontStyle="italic">
									Reserved rides (total)
								</Typography>
							</Grid>
							<Grid container item xs={6} direction="column">
								<Typography fontWeight="bold">
									{profile && profile.published_rides !== undefined
										? profile?.published_rides
										: '(empty)'}
								</Typography>
								<Typography fontWeight="bold">
									{profile && profile.reserved_rides !== undefined
										? profile?.reserved_rides
										: '(empty)'}
								</Typography>
							</Grid>
						</Grid>

						<Divider />

						<Typography variant="h5" fontWeight="bold" mt={2}>
							Details
						</Typography>

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
							<Button variant="outlined" onClick={signOut}>
								<LogoutIcon
									sx={{ marginRight: '0.4em', transform: 'scaleX(-1)' }}
								/>
								Logout
							</Button>
							<Button variant="contained" onClick={editProfile}>
								Edit profile
								<EditIcon sx={{ marginLeft: '0.4em' }} />
							</Button>
						</Box>
					</Paper>
				</>
			)}
		</>
	);
};

export default Profile;
