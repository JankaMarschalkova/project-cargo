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
import BackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import { Ride as RideType, ridesCollection } from '../firebase';
import { onSnapshot } from 'firebase/firestore';
import RideDetail from '../components/RideDetail';

const Results = ({
	leaving_from,
	going_to,
	datetime,
	seats_available
}: {
	leaving_from?: string;
	going_to?: string;
	datetime?: string;
	seats_available?: number;
}) => {
	usePageTitle('Results');

	const searchParams = new URLSearchParams(window.location.search);

	leaving_from = searchParams.get('leaving_from') || '';
	going_to = searchParams.get('going_to') || '';
	datetime = searchParams.get('datetime') || new Date().getTime().toString();
	seats_available = Number(searchParams.get('seats_available')) || 1;

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
					.filter(ride => ride.driver !== user?.email)
					.filter(
						ride =>
							ride.leaving_from == leaving_from &&
							ride.going_to == going_to &&
							ride.seats_available >= (seats_available ?? 0)
					)
					.sort(
						(a, b) =>
							new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
					) ?? null
			);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const goBack = () => {
		window.location.href = `/?leaving_from_arg=${
			leaving_from ?? ''
		}&going_to_arg=${going_to ?? ''}`;
	};

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

						<Typography variant="h4" fontWeight="bold" mt={0.5}>
							From {leaving_from !== '' ? leaving_from : '???'}
						</Typography>
						<Typography variant="h4" fontWeight="bold" mb={1}>
							To {going_to !== '' ? going_to : '???'}
						</Typography>
						<Typography variant="h6" color="#4F4F4F">
							On{' '}
							{new Date(datetime ?? '').toLocaleString('en-US', {
								month: 'short',
								day: 'numeric',
								year: 'numeric',
								hour: 'numeric',
								minute: 'numeric',
								hour12: true
							})}{' '}
							(onwards)
						</Typography>
						<Typography variant="h6" fontSize={16} color="#4F4F4F">
							For at least {seats_available} passenger
							{seats_available != 1 ? 's' : ''}
						</Typography>
					</CardContent>
				</Card>

				<Grid mx={1} my={2}>
					<Divider />

					{!rides || rides.length === 0 ? (
						<>
							<Typography my={4}>No records</Typography>
							<Divider />
						</>
					) : (
						rides?.map((ride, i) => (
							<Grid key={i}>
								<RideDetail ride={ride} />
								<Divider />
							</Grid>
						))
					)}
				</Grid>

				<Button variant="outlined" onClick={() => goBack()} sx={{ mt: 1 }}>
					<BackIcon sx={{ marginRight: '0.4em' }} />
					Back
				</Button>
			</Paper>
		</>
	);
};

export default Results;
