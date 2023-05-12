import {
	Box,
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	TextField,
	Typography
} from '@mui/material';
import usePageTitle from '../hooks/usePageTitle';
import { useState } from 'react';
import { Profile as ProfileType, profilesDocument } from '../firebase';
import SaveIcon from '@mui/icons-material/Save';
import useField from '../hooks/useField';
import useLoggedInUser from '../hooks/useLoggedInUser';

import { setDoc } from 'firebase/firestore';
import useNumberField from '../hooks/useNumberField';

const EditProfile = ({ currentProfile }: { currentProfile: ProfileType }) => {
	usePageTitle('Edit profile');
	const user = useLoggedInUser();

	const handleChange = (event: SelectChangeEvent) => {
		setGender(event.target.value as string);
	};

	const nickname = useField('nick_name', false, currentProfile?.nickname);
	const age = useNumberField('age', currentProfile?.age ?? 0, false);
	const [gender, setGender] = useState(currentProfile?.gender ?? '');
	const phone_number = useField(
		'phone_number',
		false,
		currentProfile?.phone_number
	);
	const car = useField('car', false, currentProfile?.car);
	const note = useField('note', false, currentProfile?.note);

	const saveProfile = async () => {
		try {
			await setDoc(profilesDocument(user?.email ?? ''), {
				email: user?.email ?? '',
				nickname: nickname.value,
				age: age.value ? age.value : 0,
				gender: gender,
				phone_number: phone_number.value,
				car: car.value,
				note: note.value
			});
		} catch {
			alert('Error saving profile');
		}
	};

	return (
		<Grid minWidth="22rem">
			<Typography variant="h3" fontWeight="bold" align="left" mt={2} mb={4}>
				<> </>Profile<> </>
			</Typography>
			<Paper
				component="form"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					p: 0,
					gap: 2,
					boxShadow: 'none'
				}}
			>
				<TextField
					label="Nickname"
					{...nickname.props}
					type="text"
					sx={{ mb: 3 }}
				/>
				<TextField
					label="Age"
					{...age.props}
					InputProps={{ inputProps: { min: 0, max: 150 } }}
					type="number"
				/>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Gender</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						label="Gender"
						onChange={handleChange}
						defaultValue={currentProfile?.gender ?? ''}
					>
						<MenuItem value={'Male'}>Male</MenuItem>
						<MenuItem value={'Female'}>Female</MenuItem>
						<MenuItem value={'Non binary'}>Non binary</MenuItem>
						<MenuItem value={'Prefer not to say'}>Prefer not to say</MenuItem>
						<MenuItem value={''}>Not specified</MenuItem>
					</Select>
				</FormControl>
				<TextField label="Phone number" {...phone_number.props} type="text" />
				<TextField label="Car" {...car.props} type="text" />
				<TextField label="Note" {...note.props} type="text" />

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						mt: 3,
						gap: 2
					}}
				>
					<Button
						variant="contained"
						onClick={saveProfile}
						sx={{ width: '100%' }}
					>
						Save changes
						<SaveIcon sx={{ marginLeft: '0.4em' }} />
					</Button>
				</Box>
			</Paper>
		</Grid>
	);
};

export default EditProfile;
