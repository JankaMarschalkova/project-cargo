import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import usePageTitle from '../hooks/usePageTitle';
import useField from '../hooks/useField';
import SearchIcon from '@mui/icons-material/Search';
import useNumberField from '../hooks/useNumberField';
import useDateField from '../hooks/useDateField';
import dayjs from 'dayjs';
import { useNavigate } from '@tanstack/react-router';

const Home = () => {
	usePageTitle('Home');

	const navigate = useNavigate();

	const leaving_from = useField('leaving_from', true);
	const going_to = useField('going_to', true);
	const date = useDateField('date', dayjs(), true);
	const seats_available = useNumberField('seats_available', 1, true);

	const searchRides = async () => {
		window.location.href = `/results?leaving_from=${leaving_from.value}&going_to=${going_to.value}&date=${date.value}&seats_available=${seats_available.value}`;
	};

	return (
		<>
			<img src="./logo.png" alt="CarGo logo" />
			<Typography variant="h1" fontWeight="bold">
				CarGo
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
				<TextField label="Leaving from" {...leaving_from.props} type="text" />
				<TextField
					sx={{ mb: 3 }}
					label="Going to"
					{...going_to.props}
					type="text"
				/>
				<DatePicker label="Date of the ride" {...date.props} />

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
						mt: 3
					}}
				>
					<Button variant="contained" onClick={() => searchRides()}>
						Search
						<SearchIcon sx={{ marginLeft: '0.4em' }} />
					</Button>
				</Box>
			</Paper>
		</>
	);
};

export default Home;
