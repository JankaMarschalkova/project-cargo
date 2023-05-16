import { Button, Typography } from '@mui/material';
import { Ride as RideType, ridesCollection, ridesDocument } from '../firebase';
import { useEffect, useState } from 'react';
import { onSnapshot, setDoc } from 'firebase/firestore';

import useLoggedInProfile from '../hooks/useLoggedInProfile';

const RideStatus = ({
	ride,
	isPassenger = true
}: {
	ride: RideType;
	isPassenger?: boolean;
}) => {
	let color, backgroundColor, text;
	const profile = useLoggedInProfile();
	if (ride.is_cancelled) {
		color = '#FFEBEE';
		backgroundColor = '#E53935';
		text = 'Cancelled';
	} else if (new Date(ride.datetime) >= new Date()) {
		color = '#E0F7FA';
		backgroundColor = '#00ACC1';
		text = 'Active';
	} else {
		color = '#F1F8E9';
		backgroundColor = '#7CB342';
		text = 'Completed';
	}

	const [rideID, setRideID] = useState<string | undefined>();

	useEffect(() => {
		onSnapshot(ridesCollection, snapshot => {
			const rides = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
			const foundRide = rides.find(
				currentRide =>
					currentRide.driver === ride.driver &&
					currentRide.leaving_from === ride.leaving_from &&
					currentRide.going_to === ride.going_to &&
					currentRide.datetime === ride.datetime
			);
			const rideID = foundRide ? foundRide.id : undefined;
			setRideID(rideID);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ride]);

	const cancelRide = async () => {
		try {
			await setDoc(ridesDocument(rideID ?? ''), {
				leaving_from: ride.leaving_from,
				going_to: ride.going_to,
				datetime: ride.datetime,
				seats_available: 0,
				price_per_person: ride.price_per_person,
				driver: ride.driver,
				passengers: ride.passengers,
				is_cancelled: true,
				note: ride.note
			});
		} catch {
			alert('Error while canceling ride as driver!');
		}
	};

	const leaveRide = async () => {
		try {
			await setDoc(ridesDocument(rideID ?? ''), {
				leaving_from: ride.leaving_from,
				going_to: ride.going_to,
				datetime: ride.datetime,
				seats_available: ride.seats_available + 1,
				price_per_person: ride.price_per_person,
				driver: ride.driver,
				passengers: ride.passengers.filter(
					passenger => passenger !== profile?.email
				),
				is_cancelled: ride.is_cancelled,
				note: ride.note
			});
		} catch {
			alert('Error while canceling ride as driver!');
		}
	};

	return (
		<>
			<Typography
				fontWeight="bold"
				px={1}
				py={0.5}
				mb={-0.5}
				color={color}
				sx={{ backgroundColor: { backgroundColor }, borderRadius: 1 }}
			>
				{text}
			</Typography>

			{text === 'Active' && !isPassenger && (
				<Button
					sx={{ ml: 1.5, py: 0.5, color: '#E53935' }}
					onClick={cancelRide}
				>
					Cancel ride
				</Button>
			)}

			{text === 'Active' && isPassenger && (
				<Button sx={{ ml: 1.5, py: 0.5, color: '#E53935' }} onClick={leaveRide}>
					Leave ride
				</Button>
			)}
		</>
	);
};

export default RideStatus;
