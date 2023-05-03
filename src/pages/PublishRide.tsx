import {
	Box,
	Button,
	Divider,
	Paper,
	TextField,
	Typography
} from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';
import ButtonLink from '../components/ButtonLink';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import useField from '../hooks/useField';
import { addDoc } from 'firebase/firestore';
import { ridesCollection } from '../firebase';
import LoginIcon from '@mui/icons-material/Login';
import useNumberField from '../hooks/useNumberField';
import useDateField from '../hooks/useDateField';

const PublishRide = () => {
	usePageTitle('Publish ride');

	const user = useLoggedInUser();

	const leaving_from = useField('leaving_from', true);
	const going_to = useField('going_to', true);
	const date = useDateField('date', new Date(), true);
	const time = useDateField('time', new Date(), true);
	const seats_available = useNumberField('seats_available', 3, true);
	const price_per_person = useNumberField('price_per_person', 5, true);
	const note = useField('note', false);

	const publishRide = async () => {
		// TODO Validation

		try {
			await addDoc(ridesCollection, {
				leaving_from: leaving_from.value,
				going_to: going_to.value,
				datetime: date?.value ?? new Date(), // TODO
				seats_available: seats_available.value,
				price_per_person: price_per_person.value,
				note: note.value
			});
		} catch (err) {
			// setSubmitError(err instanceof Error ? err.message : 'Unknown error');
		}
	};

	return (
		<>
			<Typography variant="h2" fontWeight="bold">
				Publish ride
			</Typography>
			{!user ? (
				<>
					<Typography>
						In order to publish rides, log in first, please
					</Typography>
					<ButtonLink variant="contained" to="/profile">
						Login
						<LoginIcon sx={{ marginLeft: '0.25em' }} />
					</ButtonLink>
				</>
			) : (
				<>
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
						<TextField
							label="Leaving from"
							{...leaving_from.props}
							type="text"
						/>
						<TextField label="Going to" {...going_to.props} type="text" />
						<Divider />

						<DatePicker label="Date of the ride" value={date} />
						<TimePicker label="Time of the ride" value={time} />
						<Divider />

						<TextField
							label="Number of available seats"
							type="number"
							InputLabelProps={{
								shrink: true
							}}
							{...seats_available.props}
						/>
						<TextField
							label="Price per person (in €)"
							type="number"
							InputLabelProps={{
								shrink: true
							}}
							{...price_per_person.props}
						/>
						<Divider />

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
								mt: 2
							}}
						>
							<Button variant="contained" onClick={() => publishRide()}>
								Publish ride
							</Button>
						</Box>
					</Paper>
				</>
			)}
		</>
	);
};

export default PublishRide;
