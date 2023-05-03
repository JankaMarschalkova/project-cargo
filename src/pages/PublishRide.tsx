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
import { Timestamp, addDoc } from 'firebase/firestore';
import { ridesCollection } from '../firebase';

const PublishRide = () => {
	usePageTitle('Publish ride');

	const user = useLoggedInUser();

	const leaving_from = useField('leaving_from', true);
	const going_to = useField('going_to', true);
	const date = null;
	const time = null;
	const seats_available = useField('seats_available', true, '3');
	const price_per_person = useField('price_per_person', true);
	const note = useField('note', false);

	const publishRide = async () => {
		// TODO Validation
		console.log('OK');

		try {
			await addDoc(ridesCollection, {
				leaving_from: leaving_from.value,
				going_to: going_to.value,
				//datetime: (date?.value ?? '') + time,
				datetime: Timestamp.now(),
				seats_available: 5, // TODO
				price_per_person: 10, // TODO
				note: note.value
			});
		} catch (err) {
			// setSubmitError(err instanceof Error ? err.message : 'Unknown error');
		}
	};

	return (
		<>
			<Typography variant="h2">Publish ride</Typography>
			{!user ? (
				<>
					<Typography>
						In order to publish rides, log in first, please
					</Typography>
					<ButtonLink variant="contained" to="/profile">
						Login
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
							// defaultValue={3}
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
							<Button
								// type="submit"
								variant="contained"
								onClick={() => publishRide()}
							>
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
