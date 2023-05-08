import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import usePageTitle from '../hooks/usePageTitle';
import { FormEvent, useState } from 'react';
import { signIn, signInWithGoogle, signOut, signUp } from '../firebase';
import useField from '../hooks/useField';
import useLoggedInUser from '../hooks/useLoggedInUser';
import LoginIcon from '@mui/icons-material/Login';

const Profile = () => {
	usePageTitle('Profile');
	const user = useLoggedInUser();

	const navigate = useNavigate();

	const [isSignUp, setSignUp] = useState(false);

	const email = useField('email', true);
	const password = useField('password', true);

	const [submitError, setSubmitError] = useState<string>();

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
						<Typography fontWeight="bold">User name: </Typography> {user.email}
						<Typography fontWeight="bold">Age: </Typography>
						<Typography fontWeight="bold">Gender: </Typography>
						<Typography fontWeight="bold">Car:</Typography>
						<Typography fontWeight="bold">
							Number of published rides:
						</Typography>
						<Typography fontWeight="bold">
							Number of your reserved rides:
						</Typography>
						<Typography fontWeight="bold">Note:</Typography>
					</Paper>
					<Box>
						<Button variant="contained">Edit</Button>
						<> </>
						<Button variant="contained" onClick={signOut}>
							Logout
						</Button>
					</Box>
				</>
			)}
		</>
	);
};

export default Profile;
