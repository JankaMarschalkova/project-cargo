import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	TextField,
	Typography
} from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import usePageTitle from '../hooks/usePageTitle';
import { useState } from 'react';
import { profilesDocument } from '../firebase';
import LogoutIcon from '@mui/icons-material/Logout';
import SaveIcon from '@mui/icons-material/Save';
import useField from '../hooks/useField';
import useLoggedInUser from '../hooks/useLoggedInUser';

import { setDoc } from 'firebase/firestore';
import useNumberField from '../hooks/useNumberField';

const EditProfile = () => {
	usePageTitle('Edit profile');
	const user = useLoggedInUser();

	const navigate = useNavigate();

	const nickname = useField('nick_name', false);
	const age = useField('age', false);
	const [gender, setGender] = useState('');
	const phone_number = useField('phone_number', false);
	const car = useField('car', false);
	const published_rides = useNumberField('number_published_rides', 0, false);
	const reserved_rides = useNumberField('number_reserved_rides', 0, false);
	const note = useField('note', false);

	const [submitError, setSubmitError] = useState<string>(); // TODO Unnecessary

	const saveProfile = async () => {
		try {
			await setDoc(profilesDocument(user?.email ?? ''), {
				email: user?.email ?? '',
				nickname: nickname.value,
				age: isNaN(parseInt(age.value)) ? 0 : parseInt(age.value),
				phone_number: phone_number.value,
				gender: gender,
				car: car.value,
				published_rides: published_rides.value,
				reserved_rides: reserved_rides.value,
				note: note.value
			});
		} catch (err) {
			setSubmitError(err instanceof Error ? err.message : 'Unknown error');
			console.log('ERR'); // TODO Handle differently, age was not working
		}
		navigate({ to: '/profile' });
	};

	const backToProfileInfo = () => navigate({ to: '/profile' });

	const handleChange = (event: SelectChangeEvent) => {
		setGender(event.target.value as string);
	};

	return (
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
				{/* // TODO Add initial values from original document, so it is not lost on save */}
				<TextField
					label="Nickname"
					{...nickname.props}
					type="text"
					sx={{ mb: 3 }}
				/>
				<TextField label="Age" {...age.props} type="number" />
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Gender</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={gender}
						label="Gender"
						onChange={handleChange}
					>
						<MenuItem value={'Male'}>Male</MenuItem>
						<MenuItem value={'Female'}>Female</MenuItem>
						<MenuItem value={'Non binary'}>Non binary</MenuItem>
						<MenuItem value={'Prefer not to say'}>Prefer not to say</MenuItem>
					</Select>
				</FormControl>
				<TextField label="Phone number" {...phone_number.props} type="text" />
				<TextField label="Car" {...car.props} type="text" />
				<TextField label="Note" {...note.props} type="text" />

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						mt: 3,
						gap: 2
					}}
				>
					<Button variant="outlined" onClick={backToProfileInfo}>
						<LogoutIcon
							sx={{ marginRight: '0.4em', transform: 'scaleX(-1)' }}
						/>
						Back to profile
					</Button>

					<Button variant="contained" onClick={saveProfile}>
						Save changes
						<SaveIcon sx={{ marginLeft: '0.4em' }} />
					</Button>
				</Box>
			</Paper>
		</>
	);
};

export default EditProfile;
