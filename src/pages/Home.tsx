import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import usePageTitle from '../hooks/usePageTitle';
import useField from '../hooks/useField';
import { useState } from 'react';

const Home = () => {
	usePageTitle('Home');

	const leaving_from = useField('leaving_from', true);
	const going_to = useField('going_to', true);
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');
	const [date, setDate] = useState<Date | null>(null);
	const [numPeople, setNumPeople] = useState(1);

	function searchRides(): void {
		throw new Error('Function not implemented.');
	}

	return (
		<>
			<Typography variant="h2">Home</Typography>
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
				<DatePicker label="Date of the ride" />
				<FormControl fullWidth sx={{ mb: 2 }}>
					<InputLabel id="num-people-label">Number of people</InputLabel>
					<Select
						labelId="num-people-label"
						value={numPeople}
						onChange={e => setNumPeople(e.target.value as number)}
					>
						{[1, 2, 3, 4, 5, 6].map(num => (
							<MenuItem key={num} value={num}>
								{num}
							</MenuItem>
						))}
					</Select>
				</FormControl>
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
