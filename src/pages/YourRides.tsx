import { Grid, Hidden, Paper, Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';
import ButtonLink from '../components/ButtonLink';

import LoginIcon from '@mui/icons-material/Login';
import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import {
	profilesCollection,
	Profile as ProfileType,
	ridesCollection,
	Ride as RideType
} from '../firebase';
import RidePreview from '../components/RidePreview';

const YourRides = () => {
	usePageTitle('Your rides');
	const user = useLoggedInUser();
	const [profile, setProfile] = useState<ProfileType | null>(null);

	useEffect(() => {
		if (!user?.email) {
			return;
		}

		onSnapshot(profilesCollection, snapshot => {
			const profiles = snapshot.docs.map(doc => doc.data());
			setProfile(
				profiles.find(profile => profile.email === user?.email) ?? null
			);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const [driverRides, setDriverRides] = useState<RideType[] | null>(null);
	const [passengerRides, setPassengerRides] = useState<RideType[] | null>(null);

	useEffect(() => {
		if (!user?.email) {
			return;
		}

		onSnapshot(ridesCollection, snapshot => {
			const rides = snapshot.docs
				.map(doc => doc.data())
				.sort(
					(a, b) =>
						new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
				);
			setDriverRides(rides.filter(ride => ride.driver === user?.email) ?? null);
			setPassengerRides(
				rides.filter(ride => ride.passengers.includes(user?.email ?? '')) ??
					null
			);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, profile]);

	return (
		<>
			<Typography
				variant="h2"
				fontWeight="bold"
				fontSize={70}
				color="#469597"
				style={{ WebkitTextStroke: 'white 1px' }}
			>
				<Hidden mdDown>Your rides</Hidden>
				<Hidden mdUp>Rides</Hidden>
			</Typography>
			{!user ? (
				<Paper
					component="form"
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						p: 4,
						gap: 2
					}}
				>
					<Typography mb={2}>
						In order to see your rides, log in first, please
					</Typography>
					<ButtonLink variant="contained" to="/profile">
						Login
						<LoginIcon sx={{ marginLeft: '0.4em' }} />
					</ButtonLink>
				</Paper>
			) : (
				<Paper
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
						p: 4,
						gap: 2
					}}
				>
					<Grid mb={2}>
						<Typography variant="h4" fontWeight="bold" mb={1}>
							As driver
						</Typography>

						{!driverRides || driverRides.length === 0 ? (
							<Typography>No records</Typography>
						) : (
							driverRides?.map((ride, i) => (
								<RidePreview key={i} ride={ride} isPassenger={false} />
							))
						)}
					</Grid>

					<Grid>
						<Typography variant="h4" fontWeight="bold" mb={2}>
							As passenger
						</Typography>
						{!driverRides || driverRides.length === 0 ? (
							<Typography>No records</Typography>
						) : (
							passengerRides?.map((ride, i) => (
								<RidePreview key={i} ride={ride} />
							))
						)}
					</Grid>
				</Paper>
			)}
		</>
	);
};

export default YourRides;
