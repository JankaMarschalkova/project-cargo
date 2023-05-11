import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';
import {
	Button,
	Card,
	CardContent,
	Divider,
	Grid,
	Paper,
	Typography
} from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { Dayjs } from 'dayjs';
import BackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import { Ride as RideType, ridesCollection } from '../firebase';
import { onSnapshot } from 'firebase/firestore';
import RideDetail from '../components/RideDetail';

const Results = ({
	leaving_from = 'A',
	going_to = 'B',
	date,
	seats_available = 1
}: {
	leaving_from: string;
	going_to: string;
	date: Dayjs;
	seats_available: number;
}) => {
	usePageTitle('Results');

	const user = useLoggedInUser();

	const navigate = useNavigate();

	const [rides, setRides] = useState<RideType[] | null>(null);

	useEffect(() => {
		if (!user?.email) {
			return;
		}

		onSnapshot(ridesCollection, snapshot => {
			setRides(
				snapshot.docs
					.map(doc => doc.data())
					.filter(ride => ride.driver !== user?.email) ?? null
			);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<>
			<Typography variant="h2" fontWeight="bold">
				Search
			</Typography>
			<Paper
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					p: 2,
					gap: 2
				}}
			>
				<Card
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						width: '100%',
						textAlign: 'left',
						background: '#D5D5D5'
					}}
				>
					<CardContent>
						<Typography variant="h6" fontWeight="bold" fontSize={16}>
							Showing results
						</Typography>

						<Typography variant="h4" fontWeight="bold" mt={-0.5} mb={1}>
							From {leaving_from} to {going_to}
						</Typography>
						<Typography variant="h6"  color="#4F4F4F">
							On{' '}
							{new Date().toLocaleString('en-US', {
								month: 'short',
								day: 'numeric',
								year: 'numeric',
								hour: 'numeric',
								minute: 'numeric',
								hour12: true
							})}{' '}
							(onwards)
						</Typography>
						<Typography
							variant="h6"
							fontSize={16}
							color="#4F4F4F"
							mt={-0.5}
						>
							For at least {seats_available} passenger
							{seats_available != 1 ? 's' : ''}
						</Typography>
					</CardContent>
				</Card>

				<Grid mx={1} my={2}>
					<Divider />

					{!rides || rides.length === 0 ? (
						<>
							<Typography>No records</Typography>
							<Divider />
						</>
					) : (
						rides?.map((ride, i) => (
							<>
								<RideDetail key={i} ride={ride} />
								<Divider />
							</>
						))
					)}
				</Grid>

				<Button
					variant="outlined"
					onClick={() => navigate({ to: '/' })}
					sx={{ mt: 1 }}
				>
					<BackIcon sx={{ marginRight: '0.4em' }} />
					Back
				</Button>
			</Paper>
		</>
	);
};

export default Results;
