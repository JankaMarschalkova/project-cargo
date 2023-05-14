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

	const searchParams = new URLSearchParams(window.location.search);

	const navigate = useNavigate();

	const leaving_from = useField(
		'leaving_from',
		true,
		searchParams.get('leaving_from_arg') || ''
	);
	const going_to = useField(
		'going_to',
		true,
		searchParams.get('going_to_arg') || ''
	);
	const date = useDateField('date', dayjs(), true);
	const seats_available = useNumberField('seats_available', 1, true);

	const searchRides = () => {
		window.location.href = `/results?leaving_from=${
			leaving_from.value
		}&going_to=${going_to.value}&datetime=${date.value
			.set('hour', 0)
			.set('minute', 0)
			.set('second', 0)
			.set('millisecond', 0)}&seats_available=${seats_available.value}`;
	};

	return (
		<>
			<Box display="flex" alignItems="flex-end" mb={1.5}>
				<Typography
					variant="h1"
					fontWeight="bold"
					mr={1.5}
					mb={-1}
					color="#469597"
					style={{ WebkitTextStroke: 'white 2px' }}
				>
					CarGo
				</Typography>
				<img src="./logo.png" alt="CarGo logo" height="150" />
			</Box>

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
						searchRides();
					}
				}}
			>
				<TextField label="Leaving from" {...leaving_from.props} type="text" />
				<TextField
					sx={{ mb: 3 }}
					label="Going to"
					{...going_to.props}
					type="text"
				/>
				<DatePicker label="Date of the ride" {...date.props} minDate={dayjs()} />

				<TextField
					label="Number of available seats"
					type="number"
					InputLabelProps={{
						shrink: true
					}}
					InputProps={{ inputProps: { min: 1, max: 10 } }}
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
					<Button variant="contained" type="submit">
						Search
						<SearchIcon sx={{ marginLeft: '0.4em' }} />
					</Button>
				</Box>
			</Paper>
		</>
	);
};

export default Home;
