import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import usePageTitle from '../hooks/usePageTitle';
import { FormEvent, useState } from 'react';
import {
	profilesCollection,
	profilesDocument,
	signIn,
	signInWithGoogle,
	signOut,
	signUp
} from '../firebase';
import useField from '../hooks/useField';
import useLoggedInUser from '../hooks/useLoggedInUser';
import LoginIcon from '@mui/icons-material/Login';
import { addDoc, setDoc } from 'firebase/firestore';
import useNumberField from '../hooks/useNumberField';

const Profile = () => {
	usePageTitle('Profile');
	const user = useLoggedInUser();

	const navigate = useNavigate();

	const [isSignUp, setSignUp] = useState(false);

	const email = useField('email', true);
	const password = useField('password', true);
	const age = useField('age', true);
	const gender = useField('gender', true);
	const car = useField('car', false);
	const published_rides = useNumberField('number_published_rides', 0, true);
	const reserved_rides = useNumberField('number_reserved_rides', 0, true);
	const note = useField('note', false);

	const [submitError, setSubmitError] = useState<string>();
	const editProfile = async () => {
		// TODO Validation

		try {
			await setDoc(profilesDocument(user?.email ?? ''), {
				email: user?.email ?? '',
				age: parseInt(age.value),
				gender: gender.value,
				car: car.value,
				published_rides: published_rides.value,
				reserved_rides: reserved_rides.value,
				note: note.value
			});
		} catch (err) {
			setSubmitError(err instanceof Error ? err.message : 'Unknown error');
		}
	};

	const cleanData = async () => {
		//email.value = '';
		// password = useField('password', true);
		// age = useField('age', true);
		// gender = useField('gender', true);
		// car = useField('car', false);
		// published_rides = useNumberField('number_published_rides', 0, true);
		// reserved_rides = useNumberField('number_reserved_rides', 0, true);
		// note = useField('note', false);
	};

	const onSignOut = () => {
		cleanData();
		signOut();
	};

	return (
		<>
			{!user ? (
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
								age: parseInt(age.value),
								gender: gender.value,
								car: car.value,
								published_rides: published_rides.value,
								reserved_rides: reserved_rides.value,
								note: note.value
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
					<Typography variant="h3" fontWeight="bold" textAlign="center" mb={3}>
						Login
					</Typography>
					<Button variant="contained" onClick={() => signInWithGoogle()}>
						<img
							src="/google-circle.svg"
							alt="Google logo"
							width="24"
							style={{ marginRight: '0.5em' }}
						/>
						{'Log in with Google'}
					</Button>
					<Typography align="center">or using:</Typography>
					<TextField label="Email" {...email.props} type="email" />
					<TextField label="Password" {...password.props} type="password" />
					<Box
						sx={{
							display: 'flex',
							gap: 2,
							alignItems: 'center',
							alignSelf: 'flex-end',
							mt: 2
						}}
					>
						{submitError && (
							<Typography
								variant="caption"
								textAlign="right"
								sx={{ color: 'error.main' }}
							>
								{submitError}
							</Typography>
						)}
						<Button
							type="submit"
							variant="outlined"
							onClick={() => setSignUp(true)}
						>
							{'Create account'}
						</Button>
						<Button
							type="submit"
							variant="contained"
							onClick={() => setSignUp(false)}
						>
							{'Log in'}
							<LoginIcon sx={{ marginLeft: '0.25em' }} />
						</Button>
					</Box>
				</Paper>
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
						<Typography fontWeight="bold" {...email.props}>
							User name:
							<span style={{ fontWeight: 'normal' }}> {user.email}</span>
						</Typography>
						<TextField label="Age" {...age.props} type="number" />
						<TextField label="Gender" {...gender.props} type="text" />
						<TextField label="Car" {...car.props} type="text" />
						<TextField label="Note" {...note.props} type="text" />
						<Typography fontWeight="bold" {...published_rides.props}>
							Number of published rides:{' '}
							<span style={{ fontWeight: 'normal' }}>
								{' '}
								{published_rides.value}
							</span>
						</Typography>
						<Typography fontWeight="bold" {...reserved_rides.props}>
							Number of your reserved rides:{' '}
							<span style={{ fontWeight: 'normal' }}>
								{' '}
								{reserved_rides.value}
							</span>
						</Typography>
					</Paper>
					<Box>
						<Button variant="contained" onClick={editProfile}>
							Save edit
						</Button>
						<> </>
						<Button variant="contained" onClick={onSignOut}>
							Logout
						</Button>
					</Box>
				</>
			)}
		</>
	);
};

export default Profile;
