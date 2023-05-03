import {
	Box,
	Button,
	Paper,
	TextField,
	Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import usePageTitle from '../hooks/usePageTitle';
import useField from '../hooks/useField';

const Home = () => {
	usePageTitle('Home');

	const leaving_from = useField('leaving_from', true);
	const going_to = useField('going_to', true);
	const date = null;
	const seats_available = useField('seats_available', true, '1');

	function searchRides(): void {
		throw new Error('Function not implemented.');
	}

	return (
		<>
			<Typography variant="h1" fontWeight='bold' mb={2}>CarGo</Typography>
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
				<TextField label="Leaving from" {...leaving_from.props} type="text" />
				<TextField label="Going to" {...going_to.props} type="text" />
				<DatePicker label="Date of the ride" value={date} />

				<TextField
					label="Number of available seats"
					type="number"
					InputLabelProps={{
						shrink: true
					}}
					{...seats_available.props}
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
						type="submit"
						variant="contained"
						onClick={() => searchRides()}
					>
						Search
					</Button>
				</Box>
			</Paper>
		</>
	);
};

export default Home;
