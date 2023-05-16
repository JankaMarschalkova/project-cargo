import {
	Box,
	Button,
	Hidden,
	Paper,
	TextField,
	Typography
} from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';
import ButtonLink from '../components/ButtonLink';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import useField from '../hooks/useField';
import { addDoc, onSnapshot } from 'firebase/firestore';
import {
	ridesCollection,
	Profile as ProfileType,
	profilesCollection
} from '../firebase';
import LoginIcon from '@mui/icons-material/Login';
import useNumberField from '../hooks/useNumberField';
import useDateField from '../hooks/useDateField';
import dayjs from 'dayjs';
import { useNavigate } from '@tanstack/react-router';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import ProfileIcon from '@mui/icons-material/Person2Sharp';

const PublishRide = () => {
	usePageTitle('Publish ride');

	const user = useLoggedInUser();
	const [profile, setProfile] = useState<ProfileType | null>(null);

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

	const navigate = useNavigate();

	const leaving_from = useField('leaving_from', true);
	const going_to = useField('going_to', true);
	const date = useDateField('date', dayjs().add(1, 'day'), true);
	const time = useDateField(
		'time',
		dayjs().add(1, 'hour').set('minute', 0),
		true
	);
	const seats_available = useNumberField('seats_available', 3, true);
	const price_per_person = useNumberField('price_per_person', 5, true);
	const note = useField('note', false);

	const publishRide = async () => {
		// TODO Validation and email validation

		const datetime = date.value
			.set('hour', time.value.hour())
			.set('minute', time.value.minute())
			.set('second', 0)
			.set('millisecond', 0)
			.toISOString();

		try {
			await addDoc(ridesCollection, {
				leaving_from: leaving_from.value,
				going_to: going_to.value,
				datetime: datetime,
				seats_available: seats_available.value,
				price_per_person: price_per_person.value,
				driver: user?.email ?? '',
				passengers: [],
				is_cancelled: false,
				note: note.value
			});

			// Redirect on success
			navigate({ to: '/your-rides' });
		} catch (err) {
			alert(err instanceof Error ? err.message : 'Unknown error');
		}
	};

	return (
		<>
			<Typography
				variant="h2"
				fontWeight="bold"
				fontSize={70}
				color="#469597"
				style={{ WebkitTextStroke: 'white 1px' }}
			>
				<Hidden mdDown>Publish ride</Hidden>
				<Hidden mdUp>Publish</Hidden>
			</Typography>
			{!user ? (
				<Paper
					component="form"
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						p: 4,
						gap: 2
					}}
				>
					<Typography mb={2}>
						In order to publish rides, log in first, please
					</Typography>
					<ButtonLink variant="contained" to="/profile">
						Login
						<LoginIcon sx={{ marginLeft: '0.4em' }} />
					</ButtonLink>
				</Paper>
			) : (
				<>
					{profile && profile.phone_number !== '' && profile.car !== '' ? (
						<Paper
							component="form"
							sx={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								p: 4,
								gap: 2
							}}
							onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
								e.preventDefault();

								if (e?.currentTarget?.checkValidity()) {
									publishRide();
								}
							}}
						>
							<TextField
								label="Leaving from"
								{...leaving_from.props}
								type="text"
							/>
							<TextField
								sx={{ mb: 3 }}
								label="Going to"
								{...going_to.props}
								type="text"
							/>

							<DatePicker
								label="Date of the ride"
								{...date.props}
								minDate={dayjs()}
							/>
							<TimePicker
								sx={{ mb: 3 }}
								label="Time of the ride"
								{...time.props}
							/>

							<TextField
								label="Number of available seats"
								type="number"
								InputLabelProps={{
									shrink: true
								}}
								InputProps={{ inputProps: { min: 1, max: 10 } }}
								{...seats_available.props}
							/>
							<TextField
								sx={{ mb: 3 }}
								label="Price per person (in €)"
								type="number"
								InputLabelProps={{
									shrink: true
								}}
								InputProps={{ inputProps: { min: 1, max: 1000 } }}
								{...price_per_person.props}
							/>

							<TextField
								label="Note"
								variant="outlined"
								multiline
								maxRows={3}
								{...note.props}
							/>

							<Box
								sx={{
									display: 'flex',
									gap: 2,
									alignItems: 'center',
									alignSelf: 'flex-end',
									mt: 3
								}}
							>
								<Button variant="contained" type="submit">
									Publish ride
									<AddIcon sx={{ marginLeft: '0.25em' }} />
								</Button>
							</Box>
						</Paper>
					) : (
						<Paper
							component="form"
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								p: 4,
								gap: 2
							}}
						>
							<Typography mb={2} maxWidth="22em" align="center">
								In order to publish rides, add phone number and car to your
								profile, please
							</Typography>
							<ButtonLink variant="contained" to="/profile">
								Profile
								<ProfileIcon sx={{ marginLeft: '0.4em' }} />
							</ButtonLink>
						</Paper>
					)}
				</>
			)}
		</>
	);
};

export default PublishRide;
