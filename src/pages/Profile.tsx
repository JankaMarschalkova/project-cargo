import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import usePageTitle from '../hooks/usePageTitle';
import { FormEvent, useState } from 'react';
import { signIn, signInWithGoogle, signOut, signUp } from '../firebase';
import useField from '../hooks/useField';
import useLoggedInUser from '../hooks/useLoggedInUser';

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
					<Typography variant="h4" component="h2" textAlign="center" mb={3}>
						'Login'
					</Typography>
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
							{'Sign up'}
						</Button>
						<Button
							type="submit"
							variant="contained"
							onClick={() => setSignUp(false)}
						>
							{'Sign in'}
						</Button>
					</Box>
					<Button variant="contained" onClick={() => signInWithGoogle()}>
						{'Sign in with Google'}
					</Button>
				</Paper>
			) : (
				<>
					<Typography variant="h4" component="h2" textAlign="center" mb={3}>
						Login
					</Typography>
					<Button onClick={signOut}>Logout</Button>
				</>
			)}
		</>
	);
};

export default Profile;
