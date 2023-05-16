import {
	Box,
	Button,
	Dialog,
	DialogContent,
	Grid,
	Typography
} from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBack';

import {
	Profile as ProfileType,
	Ride as RideType,
	profilesCollection,
	ridesCollection,
	ridesDocument
} from '../firebase';
import DriverPreview from './DriverPreview';
import { SimpleDialogProps } from './RidePreview';
import { onSnapshot, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { loadProfile } from '../pages/Profile';

const RideDetail = ({
	ride,
	username
}: {
	ride: RideType;
	username: string;
}) => {
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

	const joinRide = async () => {
		try {
			await setDoc(ridesDocument(rideID ?? ''), {
				leaving_from: ride.leaving_from,
				going_to: ride.going_to,
				datetime: ride.datetime,
				seats_available: ride.seats_available - 1,
				price_per_person: ride.price_per_person,
				driver: ride.driver,
				passengers: [...ride.passengers, username],
				is_cancelled: ride.is_cancelled,
				note: ride.note
			});
		} catch {
			alert('Error saving new passenger to ride!');
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
				passengers: ride.passengers.filter(passenger => passenger !== username),
				is_cancelled: ride.is_cancelled,
				note: ride.note
			});
		} catch {
			alert('Error deleting passenger from ride!');
		}
	};

	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState('');
	const [profile, setProfile] = useState<ProfileType | null>(null);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value: string) => {
		setOpen(false);
		setSelectedValue(value);
	};

	useEffect(() => {
		if (!ride?.driver) return;

		onSnapshot(profilesCollection, snapshot => {
			setProfile(loadProfile(ride.driver ?? '', snapshot));
		});
	}, [ride.driver]);

	const SimpleDialog = (props: SimpleDialogProps) => {
		const { onClose, selectedValue, open } = props;

		const handleClose = () => {
			onClose(selectedValue);
		};

		return (
			<Dialog onClose={handleClose} open={open}>
				<DialogContent>
					<DriverPreview profile={profile} />
				</DialogContent>
				<Grid sx={{ mx: 3, mb: 3, alignItems: 'stretch' }}>
					<Button
						variant="outlined"
						onClick={handleClose}
						sx={{ width: '100%' }}
					>
						<BackIcon sx={{ marginRight: '0.4em' }} />
						Back
					</Button>
				</Grid>
			</Dialog>
		);
	};

	return (
		<Grid
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				width: '100%',
				textAlign: 'left',
				my: 2
			}}
		>
			<Typography variant="h6" fontWeight="bold" mb={0.5}>
				On{' '}
				{new Date(ride.datetime).toLocaleString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric',
					hour: 'numeric',
					minute: 'numeric',
					hour12: true
				})}
			</Typography>
			<Box>
				<Typography>Available seats: {ride.seats_available}</Typography>

				<Typography>Price per person: {ride.price_per_person} €</Typography>

				<>
					<Typography display="flex" alignItems="center">
						Driver:{' '}
						<Button
							sx={{ textTransform: 'none', fontSize: 16 }}
							onClick={handleClickOpen}
						>
							{ride.driver}
						</Button>
					</Typography>
					<SimpleDialog
						selectedValue={selectedValue}
						open={open}
						onClose={handleClose}
					/>
				</>
			</Box>
			{ride.note && (
				<Typography mt={2} fontStyle="italic">
					{ride.note}
				</Typography>
			)}

			{username && dayjs(ride.datetime) >= dayjs() && (
				<Box>
					{ride.passengers.includes(username) ? (
						<Button
							variant="contained"
							onClick={leaveRide}
							sx={{
								'my': 1.5,
								'background': '#E53935',
								':hover': { background: '#E53935' }
							}}
						>
							Leave ride
						</Button>
					) : (
						<Button variant="contained" onClick={joinRide} sx={{ my: 1.5 }}>
							Join ride
						</Button>
					)}
				</Box>
			)}
		</Grid>
	);
};

export default RideDetail;
